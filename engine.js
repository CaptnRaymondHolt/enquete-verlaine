// ============================================================================
// Moteur générique du jeu d'enquête. Ne connaît AUCUN nom de suspect, de lieu
// ou de scénario en dur — tout passe par la forme générique décrite dans
// scenarios/*.js (suspects[], indices[], lieux[], interrogatoires{}).
// ============================================================================

const SAVE_KEY = "enquete_save_v1";
export const JOURS_OUVRES_REF = 218; // non utilise ici, garde pour reference future

export const DUREE_LIMITE_MIN_DEFAUT = 60;
const PENALITE_ECHEC_PUZZLE_MS = 2 * 60 * 1000;
const PENALITE_AIDE_MS = [0, 60 * 1000, 3 * 60 * 1000]; // coût des aides 1/2/3 (la 1ère est gratuite)

function normaliserSaisie(s) {
  return String(s ?? "").trim().toLowerCase().replace(/\s+/g, "");
}

// ---------------------------------------------------------------------------
// Tirage structuré : résout le scénario abstrait en une partie concrète.
// Le coupable est tiré au hasard parmi les suspects ; les indices "innocent"
// sont répartis en roulement sur les non-coupables pour ne jamais toujours
// cibler le même. Aucune génération de texte : simple remplacement de
// template sur du contenu pré-écrit.
// ---------------------------------------------------------------------------
export function genererPartie(scenario, rng = Math.random) {
  const ids = scenario.suspects.map((s) => s.id);
  const coupableId = ids[Math.floor(rng() * ids.length)];
  const innocents = ids.filter((id) => id !== coupableId);

  let cursor = 0;
  const prochainInnocent = () => innocents[cursor++ % innocents.length];

  const indices = scenario.indices.map((ind) => {
    let cibleId = null;
    if (ind.pointeVers === "coupable") cibleId = coupableId;
    else if (ind.pointeVers === "innocent") cibleId = prochainInnocent();
    else if (typeof ind.pointeVers === "string" && ind.pointeVers.startsWith("suspect:")) {
      cibleId = ind.pointeVers.slice("suspect:".length);
    }

    const cible = cibleId ? scenario.suspects.find((s) => s.id === cibleId) : null;
    const texte = cible
      ? ind.texte.replaceAll("{{nomCible}}", cible.nom).replaceAll("{{pronomSujet}}", cible.pronom || "il/elle")
      : ind.texte;

    return { ...ind, cibleId, texte };
  });

  return {
    scenarioId: scenario.id,
    coupableId,
    indices, // indices résolus, ordre stable = ordre du scénario
    demarreLe: Date.now(),
  };
}

// ---------------------------------------------------------------------------
// État de partie — objet à plat, modifié uniquement par les fonctions pures
// ci-dessous. Sérialisable tel quel pour la sauvegarde.
// ---------------------------------------------------------------------------
export function creerEtatInitial(partieResolue) {
  return {
    scenarioId: partieResolue.scenarioId,
    coupableId: partieResolue.coupableId,
    indicesResolus: partieResolue.indices,
    demarreLe: partieResolue.demarreLe,

    ecran: "briefing",
    ecranLieu: null,
    ecranSuspect: null,

    indicesTrouves: [],
    lieuxVisites: [],
    suspectsInterroges: [],
    questionsPosees: [],
    confrontationsReussies: [],
    dossierPreuves: [],

    penaliteMs: 0,
    tentativesEchoueesPuzzles: {},
    aidesVues: {},
    combinaisonsReussies: [],

    accusation: null, // rempli une fois la partie résolue
  };
}

// ---------------------------------------------------------------------------
// Condition de déblocage générique — pilotée par les données (`requiert`),
// jamais de "si tel indice alors ..." codé en dur par scénario.
// ---------------------------------------------------------------------------
export function estDebloque(requiert, etat) {
  if (!requiert) return true;
  const { indices = [], suspects = [], lieux = [] } = requiert;
  return (
    indices.every((id) => etat.indicesTrouves.includes(id)) &&
    suspects.every((id) => etat.suspectsInterroges.includes(id)) &&
    lieux.every((id) => etat.lieuxVisites.includes(id))
  );
}

// ---------------------------------------------------------------------------
// Requêtes de lecture (utilisées par l'UI)
// ---------------------------------------------------------------------------
export function indicesDuLieu(etat, lieuId) {
  return etat.indicesResolus.filter((ind) => ind.lieu === lieuId);
}

export function indiceParId(etat, indiceId) {
  return etat.indicesResolus.find((ind) => ind.id === indiceId) || null;
}

export function indicesTrouvesDetails(etat) {
  return etat.indicesResolus.filter((ind) => etat.indicesTrouves.includes(ind.id));
}

export function questionsDebloqueesPour(scenario, suspectId, etat) {
  const bloc = scenario.interrogatoires[suspectId];
  if (!bloc) return [];
  return bloc.questions.filter((q) => estDebloque(q.requiert, etat));
}

// ---------------------------------------------------------------------------
// Mutations d'état — chaque appel modifie l'état en place puis sauvegarde.
// ---------------------------------------------------------------------------
export function visiterLieu(etat, lieuId) {
  if (!etat.lieuxVisites.includes(lieuId)) etat.lieuxVisites.push(lieuId);
  etat.ecranLieu = lieuId;
  etat.ecran = "lieu";
  sauvegarder(etat);
}

export function trouverIndice(etat, indiceId) {
  if (!etat.indicesTrouves.includes(indiceId)) etat.indicesTrouves.push(indiceId);
  sauvegarder(etat);
}

export function ouvrirInterrogatoire(etat, suspectId) {
  if (!etat.suspectsInterroges.includes(suspectId)) etat.suspectsInterroges.push(suspectId);
  etat.ecranSuspect = suspectId;
  etat.ecran = "suspect";
  sauvegarder(etat);
}

// Pose une question normale (pas de confrontation). Retourne l'objet
// question posé pour que l'UI affiche la réponse.
export function poserQuestion(scenario, etat, suspectId, questionId) {
  const bloc = scenario.interrogatoires[suspectId];
  const question = bloc?.questions.find((q) => q.id === questionId);
  if (!question) return null;
  const clef = `${suspectId}:${questionId}`;
  if (!etat.questionsPosees.includes(clef)) etat.questionsPosees.push(clef);
  sauvegarder(etat);
  return question;
}

// Confronte un suspect avec un indice précis pendant une question déjà
// posée. Si l'indice correspond au `contredicteurPar` de la question,
// débloque la réaction spéciale (et l'éventuel indice qu'elle révèle).
export function clefConfrontation(suspectId, questionId) {
  return `${suspectId}:${questionId}`;
}

export function confronter(scenario, etat, suspectId, questionId, indiceId) {
  const bloc = scenario.interrogatoires[suspectId];
  const question = bloc?.questions.find((q) => q.id === questionId);
  if (!question) return { reussite: false };

  const reussite = question.contredicteurPar === indiceId && etat.indicesTrouves.includes(indiceId);
  if (reussite) {
    const clef = clefConfrontation(suspectId, questionId);
    if (!etat.confrontationsReussies.includes(clef)) etat.confrontationsReussies.push(clef);
    if (question.reveleIndice) trouverIndice(etat, question.reveleIndice);
  }
  sauvegarder(etat);
  return { reussite, reactionSpeciale: reussite ? question.reactionConfrontation : null };
}

// ---------------------------------------------------------------------------
// Puzzles à code — inspirés d'Unlock! : un indice peut être verrouillé
// derrière un code à saisir plutôt qu'un simple clic. Une mauvaise saisie ne
// bloque jamais la partie, elle coûte simplement du temps. Un système d'aide
// à 3 paliers évite de rester bloqué sans maître du jeu (la 1ère est
// gratuite, les suivantes coûtent davantage de temps).
// ---------------------------------------------------------------------------
export function tenterPuzzle(scenario, etat, indiceId, reponse) {
  const ind = scenario.indices.find((i) => i.id === indiceId);
  if (!ind?.puzzle) return false;
  const reussite = normaliserSaisie(reponse) === normaliserSaisie(ind.puzzle.solution);
  if (reussite) {
    trouverIndice(etat, indiceId);
  } else {
    etat.tentativesEchoueesPuzzles[indiceId] = (etat.tentativesEchoueesPuzzles[indiceId] || 0) + 1;
    etat.penaliteMs += PENALITE_ECHEC_PUZZLE_MS;
    sauvegarder(etat);
  }
  return reussite;
}

export function demanderAide(etat, indiceId) {
  const niveau = etat.aidesVues[indiceId] || 0;
  if (niveau >= 3) return niveau;
  const nouveauNiveau = niveau + 1;
  etat.aidesVues[indiceId] = nouveauNiveau;
  etat.penaliteMs += PENALITE_AIDE_MS[nouveauNiveau - 1];
  sauvegarder(etat);
  return nouveauNiveau;
}

// ---------------------------------------------------------------------------
// Combinaison d'indices — façon Unlock! (deux objets rapprochés révèlent
// autre chose). Purement additif : un scénario sans `combinaisons` n'est
// pas affecté. Jamais de pénalité sur un mauvais essai de combinaison, pour
// encourager à essayer librement.
// ---------------------------------------------------------------------------
export function combinaisonsPossibles(scenario, etat) {
  return (scenario.combinaisons || []).filter((c) => {
    const clef = [c.a, c.b].sort().join("+");
    return (
      etat.indicesTrouves.includes(c.a) &&
      etat.indicesTrouves.includes(c.b) &&
      !etat.combinaisonsReussies.includes(clef)
    );
  });
}

export function combiner(scenario, etat, idA, idB) {
  const combo = (scenario.combinaisons || []).find(
    (c) => (c.a === idA && c.b === idB) || (c.a === idB && c.b === idA)
  );
  if (!combo) return { reussite: false };
  if (!etat.indicesTrouves.includes(combo.a) || !etat.indicesTrouves.includes(combo.b)) return { reussite: false };
  const clef = [combo.a, combo.b].sort().join("+");
  if (!etat.combinaisonsReussies.includes(clef)) etat.combinaisonsReussies.push(clef);
  if (combo.resultat) trouverIndice(etat, combo.resultat);
  sauvegarder(etat);
  return { reussite: true, resultat: combo.resultat };
}

// ---------------------------------------------------------------------------
// Minuteur de session — jamais bloquant : dépasser le temps imparti pèse
// simplement sur la note finale (cf. faireAccusation), aucune fin de partie
// forcée. Les pénalités de puzzle/aide s'ajoutent au temps écoulé affiché.
// ---------------------------------------------------------------------------
export function tempsEcouleMs(etat) {
  return Date.now() - etat.demarreLe + (etat.penaliteMs || 0);
}

export function tempsRestantMs(scenario, etat) {
  const limiteMs = (scenario.dureeLimiteMin || DUREE_LIMITE_MIN_DEFAUT) * 60000;
  return limiteMs - tempsEcouleMs(etat);
}

export function ajouterAuDossier(etat, indiceId) {
  if (!etat.dossierPreuves.includes(indiceId)) etat.dossierPreuves.push(indiceId);
  sauvegarder(etat);
}

export function retirerDuDossier(etat, indiceId) {
  etat.dossierPreuves = etat.dossierPreuves.filter((id) => id !== indiceId);
  sauvegarder(etat);
}

export function allerA(etat, ecran) {
  etat.ecran = ecran;
  sauvegarder(etat);
}

// ---------------------------------------------------------------------------
// Accusation finale — dossier de preuves librement constitué + corroboration
// multi-catégories (mobile / moyen / opportunite), inspiré d'Obra Dinn.
// Jamais bloquant : le joueur peut accuser avec un dossier faible, la
// notation en tiendra simplement compte.
// ---------------------------------------------------------------------------
export function evaluerDossier(etat, suspectAccuseId) {
  const preuves = etat.dossierPreuves
    .map((id) => indiceParId(etat, id))
    .filter((ind) => ind && ind.cibleId === suspectAccuseId && ind.categorie);
  const categories = new Set(preuves.map((ind) => ind.categorie));
  return { preuvesPertinentes: preuves, categoriesCouvertes: categories, solide: categories.size >= 3 };
}

export function faireAccusation(scenario, etat, suspectAccuseId) {
  const { categoriesCouvertes, solide } = evaluerDossier(etat, suspectAccuseId);
  const correcte = suspectAccuseId === etat.coupableId;

  const pctIndices = etat.indicesResolus.length > 0 ? etat.indicesTrouves.length / etat.indicesResolus.length : 0;
  const limiteMs = (scenario.dureeLimiteMin || DUREE_LIMITE_MIN_DEFAUT) * 60000;
  const depassementRatio = Math.max(0, (tempsEcouleMs(etat) - limiteMs) / limiteMs);
  const pctTemps = Math.max(0, 1 - depassementRatio);

  const pointsIndices = pctIndices * 30;
  const pointsAccusation = correcte ? 35 : 0;
  const pointsCorroboration = (Math.min(categoriesCouvertes.size, 3) / 3) * 20;
  const pointsTemps = pctTemps * 15;
  const score = Math.round(pointsIndices + pointsAccusation + pointsCorroboration + pointsTemps);

  let qualificatif;
  if (correcte && solide && pctIndices >= 0.6) qualificatif = "AFFAIRE CLASSÉE";
  else if (correcte) qualificatif = "DOUTE RAISONNABLE";
  else qualificatif = "ERREUR JUDICIAIRE";

  etat.accusation = {
    suspectId: suspectAccuseId,
    correcte,
    categoriesCouvertes: [...categoriesCouvertes],
    dossierSolide: solide,
    pctIndicesTrouves: pctIndices,
    dansLesTemps: depassementRatio === 0,
    score,
    qualificatif,
  };
  etat.ecran = "resolution";
  sauvegarder(etat);
  return etat.accusation;
}

// ---------------------------------------------------------------------------
// Sauvegarde / reprise — le RÉSULTAT du tirage est sérialisé (pas une seed),
// pour qu'une partie reprise garde exactement la même solution même si le
// moteur évolue entre deux sessions.
// ---------------------------------------------------------------------------
export function sauvegarder(etat) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(etat));
  } catch (e) {
    /* quota dépassé ou navigation privée : on continue sans sauvegarde */
  }
}

export function chargerSave() {
  try {
    return JSON.parse(localStorage.getItem(SAVE_KEY) || "null");
  } catch (e) {
    return null;
  }
}

export function effacerSave() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (e) {
    /* ignore */
  }
}

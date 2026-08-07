// ============================================================================
// Moteur générique du jeu d'enquête. Ne connaît AUCUN nom de suspect, de lieu
// ou de scénario en dur — tout passe par la forme générique décrite dans
// scenarios/*.js (suspects[], indices[], lieux[], interrogatoires{}).
// ============================================================================

const SAVE_KEY = "enquete_save_v1";
export const JOURS_OUVRES_REF = 218; // non utilise ici, garde pour reference future

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
  const pointsIndices = pctIndices * 40;
  const pointsAccusation = correcte ? 40 : 0;
  const pointsCorroboration = (Math.min(categoriesCouvertes.size, 3) / 3) * 20;
  const score = Math.round(pointsIndices + pointsAccusation + pointsCorroboration);

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

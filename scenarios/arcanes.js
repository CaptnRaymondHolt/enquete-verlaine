// ============================================================================
// Scénario "Le Tournoi des Arcanes" — heroic fantasy, guilde de mages.
// Test de généralisation : vocabulaire et univers inventés (mana, runes,
// gardiens spectraux), ton mêlant formalisme et mystique — dernier des 4
// nouveaux registres, après le corporate cyberpunk et le contemporain informel.
// ============================================================================

export const scenario = {
  id: "arcanes",
  titre: "Le Tournoi des Arcanes",
  accroche:
    "L'archimage Sylvara Thornwood, Grand Maître de la Guilde des Arcanes, est retrouvée sans vie dans son sanctum, peu après avoir annoncé la découverte d'un artefact d'une puissance inégalée. Cinq membres de la guilde avaient tous une raison de la voir disparaître.",

  faitsFixes: {
    victime: "Archimage Sylvara Thornwood, Grand Maître de la Guilde des Arcanes.",
    arme: "Une dague enchantée, exposée dans le sanctum, disparue de son socle.",
    heureMort: "Peu après le discours de clôture du tournoi, quand les runes de garde du sanctum se sont éteintes.",
    lieuCrime: "sanctum",
  },

  lieux: [
    { id: "sanctum", nom: "Le sanctum", description: "Sanctuaire privé de l'archimage — là où son corps a été découvert." },
    { id: "arene-tournoi", nom: "L'arène du tournoi", description: "Où se tenait le Grand Tournoi des Arcanes, devant toute la guilde." },
    { id: "bibliotheque-archives", nom: "La bibliothèque des archives", description: "Mémoire écrite de la guilde, gardée jour et nuit." },
    { id: "atelier-alchimie", nom: "L'atelier d'alchimie", description: "Où se préparent onguents, potions et catalyseurs de rituel." },
    { id: "caveau-artefacts", nom: "Le caveau des artefacts", description: "Chambre forte protégée où repose la découverte annoncée." },
  ],

  suspects: [
    {
      id: "rivale-mage",
      nom: "Dame Ilyria Vex",
      pronom: "elle",
      profil: "Mage senior de la guilde, prétendante de longue date au titre de Grand Maître.",
      alibiDeclare: "Prétend avoir salué les vainqueurs du tournoi dans l'arène jusqu'à la fin.",
    },
    {
      id: "paladin",
      nom: "Sire Cadoc",
      pronom: "il",
      profil: "Paladin protecteur de la guilde, gardien des serments et de la justice des Arcanes.",
      alibiDeclare: "Prétend être resté en faction à l'entrée de l'arène tout le tournoi.",
    },
    {
      id: "apprentie",
      nom: "Wren",
      pronom: "elle",
      profil: "Jeune apprentie de l'archimage depuis trois ans, prometteuse mais secrète.",
      alibiDeclare: "Prétend avoir révisé ses formules dans l'atelier d'alchimie toute la soirée.",
    },
    {
      id: "marchand-artefacts",
      nom: "Oswin Faircroft",
      pronom: "il",
      profil: "Marchand d'artefacts anciens, longtemps fournisseur privilégié de la guilde.",
      alibiDeclare: "Prétend avoir inventorié sa dernière livraison au caveau des artefacts.",
    },
    {
      id: "voleuse",
      nom: "Sable",
      pronom: "elle",
      profil: "Contact discret de la guilde des voleurs, tolérée par la guilde pour ses services occasionnels.",
      alibiDeclare: "Prétend s'être tenue discrètement dans les archives toute la soirée.",
    },
  ],

  indices: [
    { id: "dague-disparue", lieu: "sanctum", pointeVers: null, categorie: null,
      texte: "La dague enchantée exposée dans le sanctum a disparu de son socle rituel." },
    { id: "runes-eteintes", lieu: "sanctum", pointeVers: null, categorie: null,
      texte: "Les runes de garde du sanctum, habituellement actives en permanence, se sont éteintes à l'heure exacte du drame." },
    { id: "decouverte-annoncee", lieu: "arene-tournoi", pointeVers: null, categorie: null,
      texte: "L'archimage venait d'annoncer, devant toute la guilde, la découverte d'un artefact d'une puissance inégalée." },
    { id: "rumeurs-succession", lieu: "bibliotheque-archives", pointeVers: null, categorie: null,
      texte: "Des rumeurs de succession contestée circulent dans la guilde depuis des semaines." },
    { id: "sceau-brise-caveau", lieu: "caveau-artefacts", pointeVers: null, categorie: null,
      texte: "Un sceau protecteur du caveau a été retrouvé brisé, sans qu'on sache ce qui en a été retiré." },
    { id: "murmure-etrange", lieu: "atelier-alchimie", pointeVers: null, categorie: null,
      texte: "Un apprenti rapporte avoir entendu un murmure étrange près du sanctum, juste avant l'alerte générale." },

    // Mobiles fixes
    { id: "decret-declassement", lieu: "bibliotheque-archives", pointeVers: "suspect:rivale-mage", categorie: "mobile",
      texte: "Un décret déjà rédigé déclasse Ilyria Vex au profit d'un rival plus jeune pour le titre de Grand Maître." },
    { id: "ordre-liberation", lieu: "bibliotheque-archives", pointeVers: "suspect:paladin", categorie: "mobile",
      texte: "Un ordre de libération, signé de l'archimage, concerne un hérétique que Sire Cadoc avait juré de voir puni." },
    { id: "grimoire-interdit", lieu: "atelier-alchimie", pointeVers: "suspect:apprentie", categorie: "mobile",
      texte: "Un grimoire de magie interdite est caché parmi les affaires de l'apprentie Wren." },
    { id: "contrat-annule", lieu: "caveau-artefacts", pointeVers: "suspect:marchand-artefacts", categorie: "mobile",
      texte: "Un contrat de vente, annulé par l'archimage, ruine les affaires d'Oswin Faircroft." },
    { id: "preuve-vol", lieu: "caveau-artefacts", pointeVers: "suspect:voleuse", categorie: "mobile",
      texte: "Un rapport prouve un vol commis dans les archives de la guilde, imputé à Sable." },

    // Moyen / opportunité, attachés au coupable
    { id: "trace-mana", lieu: "sanctum", pointeVers: "coupable", categorie: "opportunite",
      texte: "Une signature de mana résiduelle, propre à {{nomCible}}, imprègne encore l'air du sanctum." },
    { id: "gants-rituels", lieu: "atelier-alchimie", pointeVers: "coupable", categorie: "moyen",
      texte: "Une paire de gants rituels, portant une trace suspecte, est dissimulée parmi les affaires de {{nomCible}}." },
    { id: "garde-spectral-temoin", lieu: "arene-tournoi", pointeVers: "coupable", categorie: "opportunite",
      texte: "Un gardien spectral affirme avoir vu {{nomCible}} se diriger vers le sanctum peu après le discours, sans raison apparente." },
    { id: "connaissance-sceau", lieu: "bibliotheque-archives", pointeVers: "coupable", categorie: "moyen",
      texte: "{{nomCible}} est l'un·e des rares membres de la guilde à connaître la formule désactivant les runes de garde du sanctum." },
    { id: "absence-remarquee-tournoi", lieu: "caveau-artefacts", pointeVers: "coupable", categorie: "opportunite",
      texte: "Un autre mage se souvient que {{nomCible}} a disparu du tournoi pendant un moment critique, sans explication." },

    // Indices à décharge, roulement sur les non-coupables
    { id: "temoin-arene", lieu: "arene-tournoi", pointeVers: "innocent", categorie: "opportunite",
      texte: "Plusieurs mages confirment avoir vu {{nomCible}} dans l'arène sans interruption au moment des faits." },
    { id: "alibi-atelier", lieu: "atelier-alchimie", pointeVers: "innocent", categorie: "opportunite",
      texte: "Les cristaux de mesure de l'atelier montrent que {{nomCible}} était en pleine expérimentation, enregistrée en continu." },
    { id: "mains-sans-trace", lieu: "bibliotheque-archives", pointeVers: "innocent", categorie: "moyen",
      texte: "Aucune trace de mana suspecte ne marque les mains ni les affaires de {{nomCible}}." },
    { id: "temoin-caveau", lieu: "caveau-artefacts", pointeVers: "innocent", categorie: "opportunite",
      texte: "Le gardien du caveau confirme avoir croisé {{nomCible}} loin du sanctum, occupé·e à inventorier les artefacts." },
  ],

  interrogatoires: {
    "rivale-mage": {
      questions: [
        { id: "rivale-mage-q1", label: "Quelle était votre relation avec l'archimage Thornwood ?", requiert: null,
          reponse: "« Une rivalité ancienne, mais jamais malveillante — du moins, je le croyais. »" },
        { id: "rivale-mage-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« Dans l'arène, à saluer les vainqueurs du tournoi, comme il se doit. »" },
        { id: "rivale-mage-q3", label: "Parlez-moi de ce décret de déclassement.", requiert: { indices: ["decret-declassement"] },
          reponse: "« Une rumeur de couloir, rien de plus. »",
          contredicteurPar: "decret-declassement",
          reactionConfrontation: "« Soit. Elle s'apprêtait à me remplacer par un novice à peine formé. Une trahison, oui. Mais je n'ai pas besoin d'une dague pour gagner mes batailles. »" },
      ],
    },
    paladin: {
      questions: [
        { id: "paladin-q1", label: "Quel était votre serment envers la guilde ?", requiert: null,
          reponse: "« Protéger ses membres, et faire respecter la justice des Arcanes. »" },
        { id: "paladin-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« En faction à l'entrée de l'arène, comme chaque soir de tournoi. »" },
        { id: "paladin-q3", label: "Parlez-moi de cet ordre de libération.", requiert: { indices: ["ordre-liberation"] },
          reponse: "« Une décision de l'archimage. Je n'ai fait qu'obéir. »",
          contredicteurPar: "ordre-liberation",
          reactionConfrontation: "« Elle a libéré un hérétique que j'avais juré de voir puni. Une offense à mon serment, oui. Mais je ne romps pas mes vœux par le meurtre. »" },
      ],
    },
    apprentie: {
      questions: [
        { id: "apprentie-q1", label: "Depuis combien de temps étudiez-vous sous l'archimage ?", requiert: null,
          reponse: "« Trois ans. Elle était sévère, mais juste, je le croyais. »" },
        { id: "apprentie-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« Dans l'atelier, à réviser mes formules pour le tournoi. »" },
        { id: "apprentie-q3", label: "Parlez-moi de ce grimoire interdit.", requiert: { indices: ["grimoire-interdit"] },
          reponse: "« Un ouvrage d'étude, rien de plus dangereux que la curiosité. »",
          contredicteurPar: "grimoire-interdit",
          reactionConfrontation: "« Elle avait découvert mon grimoire, oui. J'ai eu peur d'être renvoyée, ou pire. Mais j'ai encore trop à apprendre pour vouloir la voir morte. »" },
      ],
    },
    "marchand-artefacts": {
      questions: [
        { id: "marchand-q1", label: "Quelle affaire vous liait à l'archimage ?", requiert: null,
          reponse: "« Le commerce des artefacts anciens. Une relation autrefois profitable. »" },
        { id: "marchand-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« Au caveau, à inventorier ma dernière livraison. »" },
        { id: "marchand-q3", label: "Parlez-moi de ce contrat annulé.", requiert: { indices: ["contrat-annule"] },
          reponse: "« Un désaccord commercial, sans plus de gravité. »",
          contredicteurPar: "contrat-annule",
          reactionConfrontation: "« Elle a annulé un contrat qui m'aurait sauvé de la ruine. Une trahison commerciale, oui. Mais je préfère négocier que tuer — c'est mauvais pour les affaires. »" },
      ],
    },
    voleuse: {
      questions: [
        { id: "voleuse-q1", label: "Que faisiez-vous à la guilde ce soir-là ?", requiert: null,
          reponse: "« J'observais. C'est mon métier, après tout. »" },
        { id: "voleuse-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« Dans les archives, en train de... disons, me faire discrète. »" },
        { id: "voleuse-q3", label: "Parlez-moi de ce vol qu'on vous impute.", requiert: { indices: ["preuve-vol"] },
          reponse: "« Une accusation sans fondement. On m'accuse facilement, dans mon métier. »",
          contredicteurPar: "preuve-vol",
          reactionConfrontation: "« Elle avait des preuves d'un larcin, c'est vrai. Ça m'aurait coûté cher. Mais une voleuse habile ne tue pas, elle disparaît — et je suis très habile. »" },
      ],
    },
  },
};

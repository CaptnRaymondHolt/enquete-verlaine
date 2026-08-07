// ============================================================================
// Scénario "Minuit à l'Asile de Ravenmoor" — horreur.
// Test de généralisation : ambiance de dread plutôt que de whodunit classique,
// indices sensoriels/atmosphériques mêlés à des preuves très concrètes
// (rushs de tournage, comptabilité, dossiers médicaux), coupable humain —
// jamais de surnaturel réel, l'horreur vient du décor et du non-dit.
// ============================================================================

export const scenario = {
  id: "ravenmoor",
  titre: "Minuit à l'Asile de Ravenmoor",
  accroche:
    "Vivienne Thorne, animatrice vedette de l'émission « Fréquences de l'Au-delà », est retrouvée morte dans l'ancienne salle d'opération de l'asile de Ravenmoor, en pleine émission en direct. Cinq membres de l'équipe de tournage, chacun avec quelque chose à cacher.",

  faitsFixes: {
    victime: "Vivienne Thorne, animatrice et médium autoproclamée de l'émission « Fréquences de l'Au-delà ».",
    arme: "Un scalpel d'époque, accessoire de tournage exposé dans la vitrine de la salle d'opération, disparu.",
    heureMort: "Pendant la coupure de courant générale qui a interrompu la retransmission en direct.",
    lieuCrime: "salle-operation",
  },

  lieux: [
    { id: "salle-operation", nom: "L'ancienne salle d'opération", description: "Scène du crime — vitrine brisée, table métallique, silence pesant." },
    { id: "chambre-isolement", nom: "La chambre d'isolement", description: "Une ancienne cellule capitonnée, encore meublée d'un lit métallique et d'un vieux registre." },
    { id: "bureau-directeur", nom: "L'ancien bureau du directeur", description: "Archives poussiéreuses de l'asile et matériel de production du tournage." },
    { id: "chapelle-asile", nom: "La chapelle désaffectée", description: "Bancs renversés, vitraux fendus, un endroit où le micro grésille sans raison." },
    { id: "sous-sol-morgue", nom: "La morgue du sous-sol", description: "Tiroirs métalliques vides, humidité, tableau électrique du bâtiment." },
  ],

  suspects: [
    {
      id: "sceptique",
      nom: "Dr Adrian Voss",
      pronom: "il",
      profil: "Débunker scientifique engagé par l'émission pour contrebalancer Vivienne.",
      alibiDeclare: "Déclare avoir été face caméra, en plein débunkage, au moment des faits.",
    },
    {
      id: "productrice",
      nom: "Meredith Kaplan",
      pronom: "elle",
      profil: "Productrice de l'émission, sous pression pour boucler la saison dans les temps.",
      alibiDeclare: "Déclare avoir été au bureau du directeur à vérifier les plans de tournage.",
    },
    {
      id: "descendante",
      nom: "Nora Ashby",
      pronom: "elle",
      profil: "Recrutée comme consultante historique — descendante d'une ancienne infirmière de l'asile.",
      alibiDeclare: "Déclare avoir été à la chambre d'isolement, à chercher des traces de sa famille.",
    },
    {
      id: "gardien-historien",
      nom: "Silas Crane",
      pronom: "il",
      profil: "Gardien officieux et historien du site, seul à en connaître chaque recoin.",
      alibiDeclare: "Déclare avoir été au sous-sol, à vérifier les installations avant la coupure.",
    },
    {
      id: "technicienne-son",
      nom: "Priya Malhotra",
      pronom: "elle",
      profil: "Technicienne son et image de l'équipe, en poste depuis trois saisons.",
      alibiDeclare: "Déclare avoir été à la chapelle, à réajuster un micro défaillant.",
    },
  ],

  indices: [
    { id: "scalpel-disparu", lieu: "salle-operation", pointeVers: null, categorie: null,
      texte: "Le scalpel d'époque, accessoire de tournage, a disparu de la vitrine brisée de la salle d'opération." },
    { id: "coupure-generale", lieu: "salle-operation", pointeVers: null, categorie: null,
      texte: "Une coupure de courant générale a interrompu la retransmission en direct — un seul des multiples générateurs de secours a été touché." },
    { id: "legende-asile", lieu: "chapelle-asile", pointeVers: null, categorie: null,
      texte: "Une légende locale prétend que l'asile n'a jamais vraiment « libéré » ses anciens patients." },
    { id: "micro-gresillant", lieu: "bureau-directeur", pointeVers: null, categorie: null,
      texte: "Les enregistrements audio de la soirée sont parasités d'un grésillement inexpliqué, exactement à l'heure du drame." },
    { id: "registre-patients", lieu: "chambre-isolement", pointeVers: null, categorie: null,
      texte: "Un vieux registre de patients, aux pages écornées, traîne encore sur un bureau poussiéreux." },
    { id: "odeur-etrange", lieu: "sous-sol-morgue", pointeVers: null, categorie: null,
      texte: "Plusieurs membres de l'équipe rapportent avoir senti une odeur inexplicable dans les couloirs, juste avant l'alerte." },

    // Mobiles fixes
    { id: "preuves-truquees", lieu: "bureau-directeur", pointeVers: "suspect:sceptique", categorie: "mobile",
      texte: "Des documents montrent que Vivienne s'apprêtait à révéler que le Dr Voss avait lui-même truqué des manifestations lors d'une précédente émission." },
    { id: "comptes-truques", lieu: "bureau-directeur", pointeVers: "suspect:productrice", categorie: "mobile",
      texte: "Un relevé de comptes prouve des malversations sur le budget de la série, que Vivienne menaçait d'exposer en direct." },
    { id: "secret-famille", lieu: "chambre-isolement", pointeVers: "suspect:descendante", categorie: "mobile",
      texte: "Un dossier médical ancien révèle un secret de famille que Vivienne comptait dévoiler à l'antenne pour faire de l'audience." },
    { id: "inventaire-pille", lieu: "sous-sol-morgue", pointeVers: "suspect:gardien-historien", categorie: "mobile",
      texte: "Un inventaire prouve que des objets historiques du site ont été discrètement pillés et revendus par le gardien." },
    { id: "rapport-sabotage", lieu: "chapelle-asile", pointeVers: "suspect:technicienne-son", categorie: "mobile",
      texte: "Un rapport accuse la technicienne d'avoir saboté un tournage précédent — motif d'un licenciement que Vivienne s'apprêtait à annoncer." },

    // Moyen / opportunité, attachés au coupable
    { id: "trace-scalpel", lieu: "salle-operation", pointeVers: "coupable", categorie: "opportunite",
      texte: "Une trace compatible avec le scalpel disparu est retrouvée près du corps — un geste que {{nomCible}} aurait pu accomplir sans être vu·e pendant la coupure." },
    { id: "gants-chirurgicaux", lieu: "chambre-isolement", pointeVers: "coupable", categorie: "moyen",
      texte: "Une paire de gants chirurgicaux d'époque, accessoire de tournage, est retrouvée maculée parmi les affaires de {{nomCible}}." },
    { id: "temoin-couloir", lieu: "chapelle-asile", pointeVers: "coupable", categorie: "opportunite",
      texte: "Un membre de l'équipe affirme avoir vu {{nomCible}} se diriger vers la salle d'opération juste avant la coupure de courant." },
    { id: "connaissance-tableau", lieu: "sous-sol-morgue", pointeVers: "coupable", categorie: "moyen",
      texte: "{{nomCible}} fait partie des rares membres de l'équipe à savoir précisément où se trouve le tableau électrique du bâtiment." },
    { id: "absence-rushs", lieu: "bureau-directeur", pointeVers: "coupable", categorie: "opportunite",
      texte: "Les rushs de tournage montrent que {{nomCible}} a disparu du plan pendant plusieurs minutes critiques, sans que personne ne s'en inquiète sur le moment." },

    // Indices à décharge, roulement sur les non-coupables
    { id: "alibi-rushs", lieu: "bureau-directeur", pointeVers: "innocent", categorie: "opportunite",
      texte: "Les rushs de tournage montrent {{nomCible}} face caméra sans interruption au moment des faits." },
    { id: "temoin-chapelle", lieu: "chapelle-asile", pointeVers: "innocent", categorie: "opportunite",
      texte: "Un membre de l'équipe confirme avoir été avec {{nomCible}} à la chapelle pendant toute la durée de la coupure." },
    { id: "materiel-intact", lieu: "chambre-isolement", pointeVers: "innocent", categorie: "moyen",
      texte: "Le matériel personnel de {{nomCible}} ne présente aucune trace suspecte." },
    { id: "temoin-morgue", lieu: "sous-sol-morgue", pointeVers: "innocent", categorie: "opportunite",
      texte: "Un autre membre de l'équipe atteste avoir croisé {{nomCible}} au sous-sol, loin de la salle d'opération." },
  ],

  interrogatoires: {
    sceptique: {
      questions: [
        { id: "sceptique-q1", label: "Que pensiez-vous vraiment de cette émission ?", requiert: null,
          reponse: "« Du spectacle, rien de plus. Mon travail est de le prouver, encore et encore. »" },
        { id: "sceptique-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« Face caméra, en plein débunkage d'une prétendue voix venue d'outre-tombe. »" },
        { id: "sceptique-q3", label: "Parlez-moi de ces preuves truquées.", requiert: { indices: ["preuves-truquees"] },
          reponse: "« Des insinuations sans fondement. Je n'ai rien à cacher. »",
          contredicteurPar: "preuves-truquees",
          reactionConfrontation: "« Bon, très bien. J'ai arrangé une scène, une fois, pour un meilleur effet dramatique. Ça ne fait pas de moi le genre à tuer pour le cacher. »" },
      ],
    },
    productrice: {
      questions: [
        { id: "productrice-q1", label: "Comment se portait la production de l'émission ?", requiert: null,
          reponse: "« Sous pression, comme toujours en fin de saison. »" },
        { id: "productrice-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« Au bureau du directeur, à vérifier les derniers plans de tournage. »" },
        { id: "productrice-q3", label: "Parlez-moi de ces comptes truqués.", requiert: { indices: ["comptes-truques"] },
          reponse: "« Des ajustements comptables, rien d'illégal. »",
          contredicteurPar: "comptes-truques",
          reactionConfrontation: "« D'accord, j'ai gonflé quelques factures. Vivienne l'avait découvert et menaçait de tout dire en direct — ça m'aurait ruinée. Mais je ne tue pas pour un budget, aussi serré soit-il. »" },
      ],
    },
    descendante: {
      questions: [
        { id: "descendante-q1", label: "Pourquoi avoir rejoint cette équipe ?", requiert: null,
          reponse: "« Pour comprendre ce qui est arrivé à ma famille, ici, il y a des décennies. »" },
        { id: "descendante-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« À la chambre d'isolement, à chercher des traces de mon aïeule. »" },
        { id: "descendante-q3", label: "Parlez-moi de ce secret de famille.", requiert: { indices: ["secret-famille"] },
          reponse: "« Un vieux dossier parmi d'autres, sans grande importance. »",
          contredicteurPar: "secret-famille",
          reactionConfrontation: "« Elle voulait exposer le secret de ma famille en direct, pour l'audience, sans se soucier de ce que ça me ferait. Ça m'a mise hors de moi, oui. Mais je suis venue chercher la vérité, pas la vengeance. »" },
      ],
    },
    "gardien-historien": {
      questions: [
        { id: "gardien-historien-q1", label: "Depuis combien de temps veillez-vous sur ce lieu ?", requiert: null,
          reponse: "« Depuis plus longtemps que je ne veux l'admettre. Quelqu'un doit s'en souvenir. »" },
        { id: "gardien-historien-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« Au sous-sol, à vérifier que rien ne bougeait là où ça ne devrait pas. »" },
        { id: "gardien-historien-q3", label: "Parlez-moi de ces objets disparus de l'inventaire.", requiert: { indices: ["inventaire-pille"] },
          reponse: "« Je préserve ce lieu du pillage, pas l'inverse. »",
          contredicteurPar: "inventaire-pille",
          reactionConfrontation: "« J'ai vendu quelques pièces, oui, pour financer l'entretien du site que personne d'autre ne finance. Elle allait m'exposer publiquement pour ça. Mais j'ai passé ma vie à protéger cet endroit, pas à y verser du sang. »" },
      ],
    },
    "technicienne-son": {
      questions: [
        { id: "technicienne-son-q1", label: "Quel était votre rôle sur ce tournage ?", requiert: null,
          reponse: "« Le son, l'image, tout ce qui capte ce qu'on ne devrait peut-être pas capter. »" },
        { id: "technicienne-son-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« À la chapelle, à réajuster un micro qui grésillait sans raison. »" },
        { id: "technicienne-son-q3", label: "Parlez-moi de ce rapport de sabotage.", requiert: { indices: ["rapport-sabotage"] },
          reponse: "« Un incident technique, rien de plus, sur un tournage précédent. »",
          contredicteurPar: "rapport-sabotage",
          reactionConfrontation: "« Elle comptait me faire porter le chapeau et me renvoyer pour un incident qui n'était même pas de ma faute. Ça m'a mise en colère, c'est vrai. Mais je répare les choses, je ne les détruis pas. »" },
      ],
    },
  },
};

// ============================================================================
// Scénario "Alerte sur Prométhée-7" — station de recherche isolée en orbite.
//
// Objectif de ce 2e scénario : tester la généralisation du moteur avec un
// univers, un vocabulaire et un type de preuve totalement différents du
// manoir (indices numériques — badges, caméras, journaux réseau — plutôt
// que des traces physiques ; ton sec et professionnel plutôt que mondain).
// Même discipline d'écriture fair-play que manoir-1926.js.
// ============================================================================

export const scenario = {
  id: "promethee-7",
  titre: "Alerte sur Prométhée-7",
  accroche:
    "Le commandant Aris Voss est retrouvé mort dans le poste de commandement de la station Prométhée-7, quelques jours après l'annonce d'une découverte scientifique majeure. La navette de secours n'arrivera que dans soixante-douze heures. L'équipage est réduit à cinq personnes — et chacune avait une raison de vouloir sa disparition.",

  faitsFixes: {
    victime: "Commandant Aris Voss, 47 ans, responsable de la station.",
    arme: "Une clé dynamométrique de maintenance, habituellement rangée à l'atelier, introuvable depuis les faits.",
    heureMort: "Entre 02h14 et 02h41, heure-station, d'après les capteurs de pression du sas du poste de commandement.",
    lieuCrime: "commandement",
  },

  lieux: [
    { id: "commandement", nom: "Le poste de commandement", description: "Où le corps du commandant Voss a été découvert, au petit matin, heure-station." },
    { id: "labo", nom: "Le laboratoire de recherche", description: "Là où l'échantillon récemment découvert est étudié jour et nuit." },
    { id: "quartiers", nom: "Les quartiers d'équipage", description: "Cabines individuelles et espace de vie commun." },
    { id: "atelier", nom: "L'atelier de maintenance", description: "Outils, combinaisons et pièces détachées de la station." },
    { id: "sas", nom: "Le sas d'amarrage", description: "Zone de stockage et poste de surveillance de l'unique accès extérieur." },
  ],

  suspects: [
    {
      id: "ingenieure",
      nom: "Dr. Naomi Reyes",
      pronom: "elle",
      profil: "Ingénieure en chef, responsable du réacteur et des systèmes vitaux de la station.",
      alibiDeclare: "Déclare avoir passé la nuit au labo, à surveiller une manipulation en cours.",
    },
    {
      id: "exobiologiste",
      nom: "Dr. Kenji Arata",
      pronom: "il",
      profil: "Exobiologiste, à l'origine de la découverte récente qui a fait la une de l'Agence.",
      alibiDeclare: "Déclare être resté connecté au poste de surveillance du sas toute la nuit, par précaution.",
    },
    {
      id: "second",
      nom: "Commandant en second Talia Brennan",
      pronom: "elle",
      profil: "Second de la station, en poste depuis trois ans, réputée pour sa rigueur.",
      alibiDeclare: "Déclare avoir partagé un quart de veille avec un autre membre d'équipage toute la nuit.",
    },
    {
      id: "medecin",
      nom: "Dr. Soren Vahl",
      pronom: "il",
      profil: "Médecin de bord, seul membre d'équipage habilité à accéder sans restriction à la pharmacie.",
      alibiDeclare: "Déclare avoir dormi sans interruption dans ses quartiers.",
    },
    {
      id: "contractuel",
      nom: "Yusuf Demir",
      pronom: "il",
      profil: "Technicien de maintenance sous contrat privé, arrivé sur la dernière rotation de ravitaillement.",
      alibiDeclare: "Déclare avoir passé la nuit à l'atelier, à calibrer ses outils pour la rotation suivante.",
    },
  ],

  indices: [
    // --- Faits de cadrage ---
    { id: "outil-manquant", lieu: "atelier", pointeVers: null, categorie: null,
      texte: "La clé dynamométrique de l'atelier ne figure plus sur son support. Le relevé d'inventaire automatique la signale manquante." },
    { id: "capteurs-pression", lieu: "commandement", pointeVers: null, categorie: null,
      texte: "Les capteurs de pression du sas du poste de commandement enregistrent une variation anormale entre 02h14 et 02h41, heure-station." },
    { id: "journal-systeme", lieu: "commandement", pointeVers: null, categorie: null,
      texte: "Le journal de bord automatique s'interrompt brutalement à 02h19, sans explication technique enregistrée." },
    { id: "decouverte-recente", lieu: "labo", pointeVers: null, categorie: null,
      texte: "Un tableau d'affichage rappelle l'annonce, la semaine dernière, d'une découverte scientifique majeure — sans préciser à qui en revient le crédit officiel." },
    { id: "ambiance-tension", lieu: "quartiers", pointeVers: null, categorie: null,
      texte: "Plusieurs messages internes, sans destinataire précis, évoquent une ambiance « invivable » à bord ces derniers jours." },

    // --- Mobiles fixes (un par suspect, vrais quel que soit le tirage) ---
    { id: "rapport-reacteur", lieu: "atelier", pointeVers: "suspect:ingenieure", categorie: "mobile",
      texte: "Un rapport, rédigé par Voss mais jamais transmis, attribuait à Naomi Reyes une défaillance récente du réacteur — une faute qu'elle affirme ne pas avoir commise." },
    { id: "credit-decouverte", lieu: "labo", pointeVers: "suspect:exobiologiste", categorie: "mobile",
      texte: "Un brouillon de communiqué, signé du seul nom de Voss, s'apprêtait à revendiquer pour lui seul la découverte menée sur le terrain par Kenji Arata." },
    { id: "evaluation-falsifiee", lieu: "quartiers", pointeVers: "suspect:second", categorie: "mobile",
      texte: "Un rapport d'évaluation, aux dates modifiées a posteriori, a coûté à Talia Brennan la promotion qu'elle attendait depuis deux rotations." },
    { id: "registre-pharmacie", lieu: "labo", pointeVers: "suspect:medecin", categorie: "mobile",
      texte: "Un registre de la pharmacie de bord montre des prélèvements que Soren Vahl peine à justifier — Voss en avait connaissance et s'en servait comme moyen de pression." },
    { id: "contrat-parallele", lieu: "sas", pointeVers: "suspect:contractuel", categorie: "mobile",
      texte: "Un contrat non déclaré lie Yusuf Demir à une société concurrente de l'Agence — Voss venait tout juste de le découvrir." },

    // --- Moyen / opportunité, s'attachent au coupable tiré ce run ---
    { id: "badge-acces", lieu: "commandement", pointeVers: "coupable", categorie: "opportunite",
      texte: "Le journal d'accès badge indique que {{nomCible}} a ouvert le sas du poste de commandement à l'heure exacte du crime — alors que {{pronomSujet}} prétend avoir été ailleurs." },
    { id: "gants-atelier", lieu: "atelier", pointeVers: "coupable", categorie: "moyen",
      texte: "Une paire de gants de maintenance, portant des résidus caractéristiques de l'atelier, est rangée dans les affaires de {{nomCible}} — qui n'avait pourtant aucune tâche prévue à l'atelier ce jour-là." },
    { id: "camera-couloir", lieu: "sas", pointeVers: "coupable", categorie: "opportunite",
      texte: "Une caméra de couloir a filmé {{nomCible}} se dirigeant vers le poste de commandement peu avant l'incident, sans qu'aucune tâche de service ne le justifie." },
    { id: "connaissance-verrou", lieu: "labo", pointeVers: "coupable", categorie: "moyen",
      texte: "{{nomCible}} fait partie des rares membres d'équipage à connaître le code de dérivation manuelle du verrou du poste de commandement." },
    { id: "deconnexion-reseau", lieu: "quartiers", pointeVers: "coupable", categorie: "opportunite",
      texte: "L'IA de bord signale que {{nomCible}} s'est déconnecté·e du réseau interne pendant vingt minutes cette nuit-là, sans justification enregistrée." },

    // --- Indices à décharge, répartis en roulement sur les non-coupables ---
    { id: "alibi-labo", lieu: "labo", pointeVers: "innocent", categorie: "opportunite",
      texte: "Les journaux du laboratoire montrent que {{nomCible}} était en pleine manipulation d'échantillon, enregistrée en continu, au moment exact des faits." },
    { id: "alibi-quart-veille", lieu: "quartiers", pointeVers: "innocent", categorie: "opportunite",
      texte: "Un autre membre d'équipage confirme avoir partagé un quart de veille ininterrompu avec {{nomCible}} cette nuit-là." },
    { id: "outils-calibres", lieu: "atelier", pointeVers: "innocent", categorie: "moyen",
      texte: "Les outils personnels de {{nomCible}} sont rangés et calibrés, sans la moindre trace d'utilisation récente hors procédure normale." },
    { id: "connexion-continue", lieu: "sas", pointeVers: "innocent", categorie: "opportunite",
      texte: "Le journal réseau confirme que {{nomCible}} est resté·e connecté·e au poste de surveillance du sas sans interruption toute la nuit." },

    // --- Indice verrouillé derrière un puzzle à code (façon Unlock!) ---
    { id: "signal-etrange", lieu: "sas", pointeVers: null, categorie: null,
      requiert: { indices: ["journal-systeme"] },
      texte: "Un fragment de journal technique mentionne un signal indéterminé, capté juste avant l'incident, sans qu'aucun lien n'ait pu être établi avec les faits.",
      puzzle: {
        enonce: "Un terminal de diagnostic, verrouillé par un code d'horodatage à 4 chiffres, bloque l'accès aux journaux capteurs de cette zone.",
        solution: "0219",
        aides: [
          "Un détail déjà noté ailleurs, dans un journal du poste de commandement, mentionne un horodatage précis.",
          "Le journal de bord automatique du poste de commandement s'est interrompu à un instant précis — relisez cet indice-là.",
          "Le code est 0219 — l'heure exacte où le journal de bord s'est interrompu.",
        ],
      } },

    // --- Indice révélé par combinaison de deux pièces déjà trouvées ---
    { id: "correlation-signal-tension", lieu: null, pointeVers: null, categorie: null,
      texte: "En recoupant les messages internes tendus des derniers jours avec l'horodatage du signal indéterminé, un même motif ressort : la tension à bord a grimpé exactement au moment où ce signal a été capté — sans qu'on sache encore pourquoi." },
  ],

  combinaisons: [
    { a: "ambiance-tension", b: "signal-etrange", resultat: "correlation-signal-tension" },
  ],

  interrogatoires: {
    ingenieure: {
      questions: [
        { id: "ingenieure-q1", label: "Quelle était votre relation de travail avec le commandant Voss ?", requiert: null,
          reponse: "« Professionnelle. Tendue, ces derniers temps, mais professionnelle. »" },
        { id: "ingenieure-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« Au labo, à surveiller une manipulation. Les journaux du système devraient le confirmer. »" },
        { id: "ingenieure-q3", label: "Parlez-moi de ce rapport sur le réacteur.", requiert: { indices: ["rapport-reacteur"] },
          reponse: "« Un malentendu technique. Rien qui mérite qu'on en fasse une affaire. »",
          contredicteurPar: "rapport-reacteur",
          reactionConfrontation: "« Très bien : il comptait me faire porter le chapeau pour une défaillance qui ne venait pas de moi. Mais vouloir défendre ma réputation n'a jamais tué personne. »" },
      ],
    },
    exobiologiste: {
      questions: [
        { id: "exobiologiste-q1", label: "Que représentait cette découverte pour vous ?", requiert: null,
          reponse: "« Le travail de toute une carrière. Peut-être plus. »" },
        { id: "exobiologiste-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« Au poste de surveillance du sas. Je reste souvent connecté la nuit, par précaution. »" },
        { id: "exobiologiste-q3", label: "Parlez-moi de ce communiqué non publié.", requiert: { indices: ["credit-decouverte"] },
          reponse: "« Un brouillon parmi d'autres. Ces choses-là se discutent, se corrigent. »",
          contredicteurPar: "credit-decouverte",
          reactionConfrontation: "« D'accord ! Il s'apprêtait à signer seul ce que j'ai découvert sur le terrain, au péril de ma santé. Vous imaginez ce que ça fait ? Mais ça ne fait pas de moi un meurtrier. »" },
      ],
    },
    second: {
      questions: [
        { id: "second-q1", label: "Comment décririez-vous le commandement de Voss ?", requiert: null,
          reponse: "« Efficace. Un peu trop soucieux de son image, peut-être. »" },
        { id: "second-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« En quart de veille, avec un collègue. Ce n'était pas mon tour d'être seule. »" },
        { id: "second-q3", label: "Parlez-moi de votre évaluation de promotion.", requiert: { indices: ["evaluation-falsifiee"] },
          reponse: "« Une décision de l'Agence, pas la sienne. Je ne vois pas où vous voulez en venir. »",
          contredicteurPar: "evaluation-falsifiee",
          reactionConfrontation: "« Il a changé les dates, altéré le rapport. Deux rotations de ma carrière, envolées sur un mensonge. Ça, oui, ça m'a mise en colère. Mais colère n'est pas préméditation. »" },
      ],
    },
    medecin: {
      questions: [
        { id: "medecin-q1", label: "Voss vous consultait-il souvent ?", requiert: null,
          reponse: "« Comme tout le monde ici. Rien d'inhabituel. »" },
        { id: "medecin-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« Dans mes quartiers, à dormir. Personne ne peut le confirmer, la nuit est calme ici. »" },
        { id: "medecin-q3", label: "Parlez-moi du registre de la pharmacie.", requiert: { indices: ["registre-pharmacie"] },
          reponse: "« Des prélèvements justifiés par mon activité. Je ne vois pas ce qu'il y a d'anormal. »",
          contredicteurPar: "registre-pharmacie",
          reactionConfrontation: "« Bon, très bien. Il le savait, et il en jouait à sa guise pour obtenir ce qu'il voulait de moi. Mais je n'ai jamais eu l'intention d'aller plus loin que le silence. »" },
      ],
    },
    contractuel: {
      questions: [
        { id: "contractuel-q1", label: "Depuis combien de temps êtes-vous à bord ?", requiert: null,
          reponse: "« Une seule rotation. Je ne connais pas grand monde ici, encore. »" },
        { id: "contractuel-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« À l'atelier, à calibrer mon matériel pour la prochaine rotation. Seul, tard dans la nuit. »" },
        { id: "contractuel-q3", label: "Parlez-moi de ce contrat parallèle.", requiert: { indices: ["contrat-parallele"] },
          reponse: "« Un arrangement personnel, sans rapport avec mon travail ici. »",
          contredicteurPar: "contrat-parallele",
          reactionConfrontation: "« Il m'avait percé à jour, oui. Un rapport de ma part, et c'était la fin de mon contrat — et sans doute pire. Mais j'ai encore besoin de ce travail pour vivre, pas de le perdre en prison. »" },
      ],
    },
  },
};

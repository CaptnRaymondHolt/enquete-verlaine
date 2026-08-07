// ============================================================================
// Scénario "Minuit au Manoir Verlaine" — huis clos années 1920.
//
// Discipline d'écriture (règles fair-play, cf. plan de conception) :
// - Chaque suspect a un mobile FIXE (categorie "mobile", pointeVers
//   "suspect:<id>") — vrai qu'il soit coupable ou non ce run. C'est ce qui
//   garantit la double polarité : tout le monde a une raison plausible,
//   avoir un mobile ne prouve jamais rien à soi seul.
// - Les indices de "moyen" et "opportunite" sont la preuve matérielle de la
//   scène de crime : ils s'attachent au coupable tiré ce run (pointeVers
//   "coupable"), écrits de façon strictement interchangeable entre suspects
//   (jamais de trait physique ou de fait qui ne vaudrait que pour une
//   personne précise).
// - Les indices "innocent" (alibi confirmé) sont répartis en roulement sur
//   les non-coupables — ce sont les indices à décharge.
// ============================================================================

export const scenario = {
  id: "manoir-1926",
  titre: "Minuit au Manoir Verlaine",
  accroche:
    "Édouard Verlaine, industriel richissime, est retrouvé mort dans son bureau juste après minuit, lors de la réception donnée pour ses noces d'argent. L'arme du crime a disparu. La police n'arrivera qu'au matin — jusque-là, c'est à vous de démêler le vrai du faux parmi les cinq personnes qui avaient toutes une raison de le vouloir mort.",

  faitsFixes: {
    victime: "Édouard Verlaine, 58 ans, industriel.",
    arme: "Un coupe-papier en argent, disparu du bureau depuis la réception.",
    heureMort: "Entre 23h50 et 00h15, d'après l'horloge de bureau arrêtée par la chute du corps.",
    lieuCrime: "bureau",
  },

  lieux: [
    { id: "bureau", nom: "Le bureau", description: "Là où le corps a été découvert, peu avant minuit et demi." },
    { id: "salon", nom: "Le grand salon", description: "Où se tenait la réception, pleine de monde et de bruit jusqu'à tard." },
    { id: "jardin_hiver", nom: "Le jardin d'hiver", description: "Verrière attenante au bureau, par une porte dérobée rarement fermée à clé." },
    { id: "chambres", nom: "L'aile des chambres", description: "Accès réservé aux proches et aux domestiques logés sur place." },
    { id: "cave", nom: "La cave à vin", description: "Réserve personnelle d'Édouard, où le personnel descend chercher les bouteilles de la soirée." },
  ],

  suspects: [
    {
      id: "veuve",
      nom: "Clémence Verlaine",
      pronom: "elle",
      profil: "L'épouse d'Édouard, remariée avec lui en secondes noces il y a près de cinq ans.",
      alibiDeclare: "Prétend avoir passé toute la soirée au jardin d'hiver, à prendre l'air loin du bruit de la fête.",
    },
    {
      id: "neveu",
      nom: "Gustave Verlaine",
      pronom: "il",
      profil: "Neveu d'Édouard, la trentaine, connu pour ses dettes de jeu.",
      alibiDeclare: "Prétend avoir fumé seul sur la terrasse une bonne partie de la soirée.",
    },
    {
      id: "majordome",
      nom: "Antoine Fresnel",
      pronom: "il",
      profil: "Majordome de la maison depuis vingt ans, d'une loyauté jamais mise en doute jusqu'ici.",
      alibiDeclare: "Prétend avoir servi les digestifs au salon sans interruption jusqu'après minuit.",
    },
    {
      id: "associe",
      nom: "Marcel Ibert",
      pronom: "il",
      profil: "Associé d'affaires d'Édouard depuis quinze ans, invité d'honneur de la soirée.",
      alibiDeclare: "Prétend être resté au fumoir avec deux autres invités toute la soirée.",
    },
    {
      id: "maitresse",
      nom: "Hélène Duroy",
      pronom: "elle",
      profil: "Ancienne relation d'Édouard, invitée à la dernière minute — sa présence a surpris tout le monde.",
      alibiDeclare: "Prétend être arrivée tard et n'avoir quitté le grand salon à aucun moment.",
    },
  ],

  indices: [
    // --- Faits de cadrage (ambiance, ne ciblent personne) ---
    { id: "coupe-papier-manquant", lieu: "bureau", pointeVers: null, categorie: null,
      texte: "Le porte-coupe-papier du bureau est vide. L'objet — en argent, un cadeau de mariage — a disparu." },
    { id: "horloge-arretee", lieu: "bureau", pointeVers: null, categorie: null,
      texte: "L'horloge de bureau, renversée dans la chute, s'est arrêtée à 00h07. Le médecin de la réception estime la mort entre 23h50 et 00h15." },
    { id: "porte-derobee", lieu: "jardin_hiver", pointeVers: null, categorie: null,
      texte: "Une porte dérobée relie le jardin d'hiver au bureau. Elle n'est presque jamais fermée à clé — tout le monde le sait dans la maison." },
    { id: "reception-bruyante", lieu: "salon", pointeVers: null, categorie: null,
      texte: "L'orchestre jouait fort et les rires couvraient tout. Personne n'affirme avoir entendu quoi que ce soit d'anormal avant la découverte du corps." },
    { id: "journal-intime", lieu: "chambres", pointeVers: null, categorie: null,
      texte: "Un fragment de journal intime d'Édouard, daté de la semaine passée : « Je crains, depuis peu, que l'un des miens ne veuille ma perte. »" },

    // --- Mobiles fixes (un par suspect, vrais quel que soit le tirage) ---
    { id: "contrat-mariage", lieu: "chambres", pointeVers: "suspect:veuve", categorie: "mobile",
      texte: "Le contrat de mariage de Clémence stipule qu'elle n'hérite de la fortune d'Édouard que si le mariage atteint cinq années pleines — une échéance qui tombe dans deux jours." },
    { id: "testament-recent", lieu: "bureau", pointeVers: "suspect:neveu", categorie: "mobile",
      texte: "Un testament daté d'hier, portant la signature fraîche d'Édouard, déshérite intégralement Gustave au profit d'une œuvre de charité." },
    { id: "lettre-comptable", lieu: "chambres", pointeVers: "suspect:majordome", categorie: "mobile",
      texte: "Une lettre comptable dans les affaires d'Antoine évoque des « ajustements de caisse » difficiles à justifier sur plusieurs années." },
    { id: "dossier-contrat", lieu: "bureau", pointeVers: "suspect:associe", categorie: "mobile",
      texte: "Un dossier de contrat montre qu'Édouard était le seul obstacle à la vente de l'entreprise — une vente qui enrichirait considérablement Marcel." },
    { id: "lettre-chantage", lieu: "chambres", pointeVers: "suspect:maitresse", categorie: "mobile",
      texte: "Le brouillon d'une lettre, dans l'écriture d'Hélène, menace Édouard de « tout révéler à qui de droit » s'il ne cède pas à ses demandes." },

    // --- Moyen / opportunité, s'attachent au coupable tiré ce run ---
    { id: "trace-boue-jardin", lieu: "jardin_hiver", pointeVers: "coupable", categorie: "opportunite",
      texte: "Des traces de boue fraîche mènent du jardin d'hiver droit à la porte dérobée du bureau — {{nomCible}} n'a pas d'explication évidente pour s'y être aventuré·e ce soir." },
    { id: "alibi-conteste", lieu: "salon", pointeVers: "coupable", categorie: "opportunite",
      texte: "Deux invités affirment ne PAS avoir vu {{nomCible}} à l'endroit où {{pronomSujet}} prétend avoir passé la soirée, à l'heure du crime." },
    { id: "gants-tache", lieu: "chambres", pointeVers: "coupable", categorie: "moyen",
      texte: "Une paire de gants portant une tache suspecte est cachée au fond d'un tiroir, parmi les affaires de {{nomCible}}." },
    { id: "connaissance-bureau", lieu: "salon", pointeVers: "coupable", categorie: "moyen",
      texte: "Un invité se souvient que {{nomCible}} connaissait très bien la disposition du bureau d'Édouard, jusqu'à savoir exactement où trouver le coupe-papier." },
    { id: "absence-remarquee", lieu: "cave", pointeVers: "coupable", categorie: "opportunite",
      texte: "Le personnel de cuisine se souvient que {{nomCible}} a disparu de la réception pendant un bon quart d'heure, juste avant minuit." },

    // --- Indices à décharge, répartis en roulement sur les non-coupables ---
    { id: "alibi-confirme-salon", lieu: "salon", pointeVers: "innocent", categorie: "opportunite",
      texte: "Trois témoins concordants placent {{nomCible}} au grand salon sans interruption entre 23h45 et minuit passé." },
    { id: "temoin-cuisine", lieu: "cave", pointeVers: "innocent", categorie: "opportunite",
      texte: "Le chef cuisinier confirme avoir vu {{nomCible}} à la cave à l'heure exacte du crime, occupé·e à choisir des bouteilles pour le dessert." },
    { id: "mains-propres", lieu: "bureau", pointeVers: "innocent", categorie: "moyen",
      texte: "Rien dans les affaires de {{nomCible}} ne trahit un contact récent avec le bureau ou ses objets — pas la moindre trace suspecte." },
    { id: "temoignage-terrasse", lieu: "jardin_hiver", pointeVers: "innocent", categorie: "opportunite",
      texte: "Un jardinier de nuit atteste avoir croisé {{nomCible}} loin du jardin d'hiver, à l'opposé du manoir, au moment critique." },

    // --- Indice de progression / révélation lors d'une confrontation réussie ---
    { id: "carnet-huissier", lieu: "cave", pointeVers: null, categorie: null,
      texte: "Un carnet d'huissier, caché derrière les bouteilles les plus anciennes, semble avoir été consulté récemment par quelqu'un de la maison." },
  ],

  interrogatoires: {
    veuve: {
      questions: [
        { id: "veuve-q1", label: "Comment décririez-vous votre mariage avec Édouard ?", requiert: null,
          reponse: "« Nous étions heureux. Enfin... je le croyais. »" },
        { id: "veuve-q2", label: "Où étiez-vous exactement au moment du drame ?", requiert: null,
          reponse: "« Au jardin d'hiver, je vous l'ai dit. L'air y est plus respirable qu'au salon. »" },
        { id: "veuve-q3", label: "Parlez-moi de votre contrat de mariage.", requiert: { indices: ["contrat-mariage"] },
          reponse: "Elle se raidit. « Une clause parmi d'autres. Rien qui mérite qu'on s'y attarde. »",
          contredicteurPar: "contrat-mariage",
          reactionConfrontation: "« Très bien. Oui, dans deux jours, tout aurait été plus simple pour moi. Mais vouloir un héritage n'a jamais tué personne. »" },
      ],
    },
    neveu: {
      questions: [
        { id: "neveu-q1", label: "Quelle était votre relation avec votre oncle ?", requiert: null,
          reponse: "« Compliquée, ces derniers temps. Il ne comprenait pas mes choix de vie. »" },
        { id: "neveu-q2", label: "Où étiez-vous au moment du drame ?", requiert: null,
          reponse: "« Sur la terrasse, à fumer. Seul. Personne ne peut le confirmer, je sais. »" },
        { id: "neveu-q3", label: "Parlez-moi du nouveau testament.", requiert: { indices: ["testament-recent"] },
          reponse: "Gustave blêmit. « Ce n'est qu'une broutille administrative, ça ne veut rien dire. »",
          contredicteurPar: "testament-recent",
          reactionConfrontation: "« D'accord ! Il m'a déshérité hier, en pleine réception, sans un mot d'explication. Vous croyez que ça me donne envie de pleurer sa mort ? »" },
      ],
    },
    majordome: {
      questions: [
        { id: "majordome-q1", label: "Depuis combien de temps êtes-vous au service de la famille ?", requiert: null,
          reponse: "« Vingt ans, monsieur. Vingt ans de loyauté sans faille. »" },
        { id: "majordome-q2", label: "Où étiez-vous au moment du drame ?", requiert: null,
          reponse: "« Au salon, à servir les digestifs. Une trentaine d'invités peuvent en témoigner. »" },
        { id: "majordome-q3", label: "Parlez-moi de ces ajustements de caisse.", requiert: { indices: ["lettre-comptable"] },
          reponse: "Il pâlit imperceptiblement. « Une erreur de tenue de livres, monsieur. Rien de plus. »",
          contredicteurPar: "lettre-comptable",
          reactionConfrontation: "« Monsieur Verlaine m'en avait parlé ce soir même. Il comptait me dénoncer demain matin. Vingt ans de service, ruinés pour une erreur de jeunesse que j'ai voulu réparer trop tard. »" },
      ],
    },
    associe: {
      questions: [
        { id: "associe-q1", label: "Comment se portaient vos affaires avec Édouard ?", requiert: null,
          reponse: "« Très bien, en surface. Les affaires ont toujours leurs tensions, vous savez. »" },
        { id: "associe-q2", label: "Où étiez-vous au moment du drame ?", requiert: null,
          reponse: "« Au fumoir, avec deux autres invités. Demandez-leur, ils confirmeront. »" },
        { id: "associe-q3", label: "Parlez-moi de ce contrat de vente.", requiert: { indices: ["dossier-contrat"] },
          reponse: "« Une clause technique. Édouard finissait toujours par signer, tôt ou tard. »",
          contredicteurPar: "dossier-contrat",
          reactionConfrontation: "« Bon, très bien : il bloquait la vente depuis des mois, et ça me coûtait une fortune chaque semaine. Mais bloquer une vente n'est pas un crime, que je sache. »" },
      ],
    },
    maitresse: {
      questions: [
        { id: "maitresse-q1", label: "Pourquoi étiez-vous invitée ce soir ?", requiert: null,
          reponse: "« Édouard a insisté. Je n'ai jamais vraiment su pourquoi. »" },
        { id: "maitresse-q2", label: "Où étiez-vous au moment du drame ?", requiert: null,
          reponse: "« Au grand salon, du début à la fin. Je ne connaissais presque personne, alors je ne l'ai pas quitté. »" },
        { id: "maitresse-q3", label: "Parlez-moi de cette lettre retrouvée dans vos affaires.", requiert: { indices: ["lettre-chantage"] },
          reponse: "Elle blêmit. « Un brouillon jamais envoyé. Un moment de colère, rien de plus. »",
          contredicteurPar: "lettre-chantage",
          reactionConfrontation: "« Il m'avait promis de m'aider, il y a des années, puis plus rien. Alors oui, j'ai eu envie de le faire payer. D'argent, seulement. Rien de plus. »" },
      ],
    },
  },
};

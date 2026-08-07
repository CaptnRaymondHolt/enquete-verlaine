// ============================================================================
// Scénario "Interférence à Néo-Kaïto" — mégacorporation, cyberpunk.
// Test de généralisation : évidences très majoritairement numériques
// (authentification neurale, journaux réseau, drones de sécurité) et un
// ton sec, corporate, sans détour — à l'opposé du registre médiéval/mondain.
// ============================================================================

export const scenario = {
  id: "neo-kaito",
  titre: "Interférence à Néo-Kaïto",
  accroche:
    "Le directeur Marcus Kade, CTO de Zenith Dynamics, est retrouvé mort dans son bureau le soir même où il venait d'annoncer « Le Lien », un implant neuronal révolutionnaire. Cinq personnes présentes à la soirée de lancement avaient toutes une raison de vouloir sa disparition.",

  faitsFixes: {
    victime: "Marcus Kade, 44 ans, directeur technique de Zenith Dynamics.",
    arme: "Un injecteur neural, habituellement réservé aux essais du Lien, disparu du bureau.",
    heureMort: "Entre 23h50 et 00h10, d'après une coupure de courant localisée et volontaire dans le bureau de direction.",
    lieuCrime: "bureau-direction",
  },

  lieux: [
    { id: "bureau-direction", nom: "Le bureau de direction", description: "Au sommet de la tour Zenith — là où le corps de Kade a été découvert." },
    { id: "labo-rd", nom: "Le laboratoire R&D", description: "Où le Lien a été mis au point, encore éclairé toute la nuit." },
    { id: "salle-serveurs", nom: "La salle des serveurs", description: "Cœur numérique de l'entreprise, accès strictement contrôlé." },
    { id: "bar-panoramique", nom: "Le bar panoramique", description: "Où se tenait la soirée de lancement du Lien." },
    { id: "parking-souterrain", nom: "Le parking souterrain", description: "Accès privé aux véhicules autonomes des cadres de la société." },
  ],

  suspects: [
    {
      id: "hackeuse",
      nom: "Elena \"Vex\" Cho",
      pronom: "elle",
      profil: "Ancienne hackeuse indépendante, recrutée par Kade pour développer le prototype du Lien.",
      alibiDeclare: "Déclare avoir passé la nuit au labo R&D, en pleine simulation.",
    },
    {
      id: "chef-securite",
      nom: "Dorian Vasquez",
      pronom: "il",
      profil: "Chef de la sécurité de la tour, ancien militaire.",
      alibiDeclare: "Déclare avoir surveillé la soirée depuis le bar panoramique toute la nuit.",
    },
    {
      id: "rivale-corpo",
      nom: "Yumi Sato",
      pronom: "elle",
      profil: "Directrice d'une société concurrente, invitée pour négocier une licence sur le Lien.",
      alibiDeclare: "Déclare avoir attendu son chauffeur au parking souterrain une bonne partie de la soirée.",
    },
    {
      id: "ia-handler",
      nom: "Petra Lindqvist",
      pronom: "elle",
      profil: "Responsable de la conformité éthique des programmes d'intelligence artificielle de Zenith.",
      alibiDeclare: "Déclare avoir documenté seule les derniers essais du Lien au labo R&D.",
    },
    {
      id: "ex-associe",
      nom: "Iggy Okafor",
      pronom: "il",
      profil: "Cofondateur historique de Zenith Dynamics, évincé de la société quelques années plus tôt.",
      alibiDeclare: "Déclare être resté seul au bar panoramique, à l'écart de la foule.",
    },
  ],

  indices: [
    { id: "injecteur-disparu", lieu: "bureau-direction", pointeVers: null, categorie: null,
      texte: "L'injecteur neural utilisé pour les essais du Lien ne se trouve plus dans le tiroir sécurisé du bureau de direction." },
    { id: "coupure-courant", lieu: "bureau-direction", pointeVers: null, categorie: null,
      texte: "Le journal du bâtiment signale une coupure de courant localisée et manuelle dans le bureau de direction, entre 23h50 et 00h10." },
    { id: "enregistrement-corrompu", lieu: "bureau-direction", pointeVers: null, categorie: null,
      texte: "L'enregistrement vidéo du bureau de direction pour cette plage horaire est corrompu — effacé, semble-t-il, avec méthode." },
    { id: "annonce-lien", lieu: "labo-rd", pointeVers: null, categorie: null,
      texte: "Un écran affiche encore la présentation du Lien, dévoilée quelques heures plus tôt devant tout le conseil d'administration." },
    { id: "tensions-conseil", lieu: "bar-panoramique", pointeVers: null, categorie: null,
      texte: "Plusieurs invités évoquent, à mots couverts, des tensions vives au sein du conseil d'administration ces dernières semaines." },
    { id: "signal-anonyme", lieu: "parking-souterrain", pointeVers: null, categorie: null,
      texte: "Le système de sécurité a intercepté un message anonyme, la veille : « On ne peut plus le laisser faire. » Aucune signature identifiable." },

    // Mobiles fixes
    { id: "piratage-prototype", lieu: "labo-rd", pointeVers: "suspect:hackeuse", categorie: "mobile",
      texte: "Des journaux internes montrent que Kade a copié le prototype personnel de Vex pour le déposer sous son seul nom." },
    { id: "transaction-marche-noir", lieu: "salle-serveurs", pointeVers: "suspect:chef-securite", categorie: "mobile",
      texte: "Un relevé de transactions chiffrées révèle des ventes de données de sécurité de la tour, tracées jusqu'au terminal de Dorian Vasquez." },
    { id: "offre-refusee", lieu: "bureau-direction", pointeVers: "suspect:rivale-corpo", categorie: "mobile",
      texte: "Un e-mail de Kade refuse catégoriquement l'offre de licence de Yumi Sato, compromettant gravement la position de sa société." },
    { id: "rapport-ethique-truque", lieu: "labo-rd", pointeVers: "suspect:ia-handler", categorie: "mobile",
      texte: "Un brouillon de rapport, rédigé par Kade, s'apprêtait à faire porter à Petra Lindqvist la responsabilité d'essais illégaux qu'il avait lui-même autorisés." },
    { id: "clause-eviction", lieu: "bureau-direction", pointeVers: "suspect:ex-associe", categorie: "mobile",
      texte: "Un document d'éviction actionnariale, vieux de plusieurs années, a coûté à Iggy Okafor sa part de l'entreprise qu'il a cofondée." },

    // Moyen / opportunité, attachés au coupable
    { id: "badge-neural", lieu: "bureau-direction", pointeVers: "coupable", categorie: "opportunite",
      texte: "Le journal d'authentification neurale indique que {{nomCible}} s'est connecté·e au terminal du bureau de direction à l'heure exacte du crime." },
    { id: "traces-effraction", lieu: "salle-serveurs", pointeVers: "coupable", categorie: "moyen",
      texte: "Des traces de contournement du pare-feu physique de la salle des serveurs portent une signature d'outil propre à {{nomCible}}." },
    { id: "drone-securite", lieu: "parking-souterrain", pointeVers: "coupable", categorie: "opportunite",
      texte: "Un drone de sécurité a filmé {{nomCible}} garant un véhicule non enregistré près d'un accès de service, peu avant l'heure du crime." },
    { id: "implant-signature", lieu: "labo-rd", pointeVers: "coupable", categorie: "moyen",
      texte: "Une signature d'implant neuronal correspondant exactement au profil de {{nomCible}} figure dans les journaux du terminal de la scène de crime." },
    { id: "absence-soiree", lieu: "bar-panoramique", pointeVers: "coupable", categorie: "opportunite",
      texte: "Les caméras du bar panoramique montrent que {{nomCible}} a disparu de la soirée de lancement pendant vingt minutes critiques, sans que personne ne le remarque sur le moment." },

    // Indices à décharge, roulement sur les non-coupables
    { id: "alibi-camera-bar", lieu: "bar-panoramique", pointeVers: "innocent", categorie: "opportunite",
      texte: "Les caméras confirment la présence continue de {{nomCible}} au bar panoramique pendant toute la plage horaire du crime." },
    { id: "alibi-labo", lieu: "labo-rd", pointeVers: "innocent", categorie: "opportunite",
      texte: "Les journaux du labo montrent que {{nomCible}} était en pleine simulation, enregistrée en continu, au moment exact des faits." },
    { id: "absence-signature", lieu: "salle-serveurs", pointeVers: "innocent", categorie: "moyen",
      texte: "Aucune signature d'outil ou de piratage ne correspond au profil de {{nomCible}} dans les journaux de sécurité de la salle des serveurs." },
    { id: "vehicule-enregistre", lieu: "parking-souterrain", pointeVers: "innocent", categorie: "opportunite",
      texte: "Le véhicule de {{nomCible}} est resté immobile et enregistré au même emplacement toute la soirée, selon le journal du parking." },
  ],

  interrogatoires: {
    hackeuse: {
      questions: [
        { id: "hackeuse-q1", label: "Quel était votre lien avec Marcus Kade ?", requiert: null,
          reponse: "« Un partenariat qui a mal tourné. Rien de plus à dire. »" },
        { id: "hackeuse-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« Dans le labo, en simulation. Vérifiez les journaux, ils ne mentent pas. »" },
        { id: "hackeuse-q3", label: "Parlez-moi de ce prototype piraté.", requiert: { indices: ["piratage-prototype"] },
          reponse: "« Une erreur d'attribution. Ça arrive, dans ce milieu. »",
          contredicteurPar: "piratage-prototype",
          reactionConfrontation: "« Très bien. Il a volé mon travail pour se l'approprier. Mais voler une idée n'est pas un crime capital, pas dans mon monde. »" },
      ],
    },
    "chef-securite": {
      questions: [
        { id: "chef-securite-q1", label: "Depuis combien de temps travaillez-vous pour Zenith Dynamics ?", requiert: null,
          reponse: "« Assez longtemps pour savoir où sont enterrés les vrais secrets. »" },
        { id: "chef-securite-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« Au bar, à surveiller la soirée. Standard. »" },
        { id: "chef-securite-q3", label: "Parlez-moi de ces transactions suspectes.", requiert: { indices: ["transaction-marche-noir"] },
          reponse: "« Des arrangements personnels, sans rapport avec la sécurité de la tour. »",
          contredicteurPar: "transaction-marche-noir",
          reactionConfrontation: "« D'accord, j'ai arrondi mes fins de mois. Ça ne fait pas de moi un meurtrier, juste quelqu'un de fatigué d'être sous-payé. »" },
      ],
    },
    "rivale-corpo": {
      questions: [
        { id: "rivale-corpo-q1", label: "Pourquoi étiez-vous invitée ce soir ?", requiert: null,
          reponse: "« Affaires. Kade et moi avions des choses à régler. »" },
        { id: "rivale-corpo-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« Au parking, à attendre mon chauffeur. Il confirmera, si vous le retrouvez. »" },
        { id: "rivale-corpo-q3", label: "Parlez-moi de cette offre refusée.", requiert: { indices: ["offre-refusee"] },
          reponse: "« Une négociation comme une autre. Rien de personnel. »",
          contredicteurPar: "offre-refusee",
          reactionConfrontation: "« Il a refusé une offre qui aurait sauvé ma société. Ça m'a mise en colère, oui. Mais je ne tue pas mes partenaires d'affaires, je les rachète. »" },
      ],
    },
    "ia-handler": {
      questions: [
        { id: "ia-handler-q1", label: "Quel était votre rôle exact auprès de Kade ?", requiert: null,
          reponse: "« Superviser l'éthique du programme Le Lien. Un rôle qu'il rendait chaque jour plus difficile. »" },
        { id: "ia-handler-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« Dans le labo, à documenter les derniers essais. Seule, malheureusement. »" },
        { id: "ia-handler-q3", label: "Parlez-moi de ce rapport truqué.", requiert: { indices: ["rapport-ethique-truque"] },
          reponse: "« Un brouillon parmi d'autres. Rien n'était encore décidé. »",
          contredicteurPar: "rapport-ethique-truque",
          reactionConfrontation: "« Il allait me faire porter le chapeau pour ses propres décisions. Vous appelez ça de l'éthique ? Moi, j'appelle ça une trahison — mais pas un motif de meurtre, pas pour moi. »" },
      ],
    },
    "ex-associe": {
      questions: [
        { id: "ex-associe-q1", label: "Comment avez-vous vécu votre éviction de l'entreprise ?", requiert: null,
          reponse: "« Comme on vit une amputation. On survit, mais rien ne repousse. »" },
        { id: "ex-associe-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« Au bar, à ressasser de vieux souvenirs, seul dans mon coin. »" },
        { id: "ex-associe-q3", label: "Parlez-moi de cette clause d'éviction.", requiert: { indices: ["clause-eviction"] },
          reponse: "« De l'histoire ancienne. Je ne vois pas ce que ça change aujourd'hui. »",
          contredicteurPar: "clause-eviction",
          reactionConfrontation: "« Il m'a tout pris, ce qu'on avait bâti ensemble. Mais j'ai fait le deuil de cette colère il y a longtemps — ou du moins, je le pensais. »" },
      ],
    },
  },
};

// ============================================================================
// Scénario "Dernière Commande" — contemporain, restaurant gastronomique.
// Test de généralisation : évidences mixtes physiques ET numériques (comme
// la vraie vie actuelle), ton contemporain, informel mais tendu — entre le
// formalisme du manoir/château et l'aridité corporate du cyberpunk.
// ============================================================================

export const scenario = {
  id: "derniere-commande",
  titre: "Dernière Commande",
  accroche:
    "Le chef Étienne Vasseur est retrouvé mort dans sa propre cuisine, le soir même où toute l'équipe attendait l'appel du guide Michelin. Cinq personnes présentes ce soir-là avaient toutes une raison de le voir disparaître.",

  faitsFixes: {
    victime: "Étienne Vasseur, 51 ans, chef et propriétaire du restaurant.",
    arme: "Le couteau signature du chef, manquant du bloc à couteaux.",
    heureMort: "Entre la fin du service et l'appel attendu du guide Michelin, d'après les caméras de cuisine.",
    lieuCrime: "cuisine",
  },

  lieux: [
    { id: "cuisine", nom: "La cuisine", description: "Là où le corps du chef Vasseur a été découvert, après le coup de feu du service." },
    { id: "salle-reception", nom: "La salle", description: "Où les derniers clients terminaient leur repas." },
    { id: "reserve", nom: "La réserve", description: "Chambre froide et stock, à l'écart du bruit de la cuisine." },
    { id: "bureau-chef", nom: "Le bureau du chef", description: "Petit bureau attenant à la cuisine, où Vasseur gérait les comptes." },
    { id: "terrasse", nom: "La terrasse", description: "Espace extérieur, pause cigarette du personnel." },
  ],

  suspects: [
    {
      id: "sous-chef",
      nom: "Camille Aury",
      pronom: "elle",
      profil: "Sous-chef depuis trois ans, la relève naturelle de Vasseur — du moins le pensait-elle.",
      alibiDeclare: "Déclare être restée à son poste en cuisine tout le service.",
    },
    {
      id: "patissier",
      nom: "Julien Roth",
      pronom: "il",
      profil: "Chef pâtissier, auteur d'une recette signature très remarquée par la critique.",
      alibiDeclare: "Déclare avoir préparé les desserts en réserve toute la soirée.",
    },
    {
      id: "critique",
      nom: "Nadia Ferrand",
      pronom: "elle",
      profil: "Critique gastronomique influente, présente ce soir-là pour un dernier passage avant verdict.",
      alibiDeclare: "Déclare être restée en salle, à table, tout le service.",
    },
    {
      id: "investisseur",
      nom: "Marc Delrue",
      pronom: "il",
      profil: "Associé financier du restaurant, dans une situation personnelle difficile.",
      alibiDeclare: "Déclare avoir passé la soirée au bureau, à éplucher les comptes.",
    },
    {
      id: "ex-associe",
      nom: "Sophie Lenoir",
      pronom: "elle",
      profil: "Ancienne chef et cofondatrice du restaurant, écartée quelques années plus tôt.",
      alibiDeclare: "Déclare être restée sur la terrasse à fumer, loin de la cuisine.",
    },
  ],

  indices: [
    { id: "couteau-manquant", lieu: "cuisine", pointeVers: null, categorie: null,
      texte: "Le couteau signature de Vasseur, habituellement à sa place, a disparu du bloc à couteaux." },
    { id: "cameras-coupees", lieu: "cuisine", pointeVers: null, categorie: null,
      texte: "Les caméras de la cuisine se coupent mystérieusement pendant douze minutes, exactement au moment des faits." },
    { id: "annonce-attendue", lieu: "salle-reception", pointeVers: null, categorie: null,
      texte: "Toute l'équipe attendait, ce soir-là, un appel du guide Michelin annonçant une éventuelle étoile." },
    { id: "tensions-service", lieu: "reserve", pointeVers: null, categorie: null,
      texte: "Plusieurs messages internes, sur le téléphone professionnel du restaurant, évoquent un service « invivable » ces dernières semaines." },
    { id: "reservation-mystere", lieu: "terrasse", pointeVers: null, categorie: null,
      texte: "Une réservation a été faite au nom d'un client inconnu, jamais arrivé ce soir-là." },
    { id: "carnet-notes", lieu: "bureau-chef", pointeVers: null, categorie: null,
      texte: "Un carnet de notes de Vasseur a plusieurs pages arrachées récemment, sans qu'on sache lesquelles ni pourquoi." },

    // Mobiles fixes
    { id: "rapport-erreur", lieu: "bureau-chef", pointeVers: "suspect:sous-chef", categorie: "mobile",
      texte: "Un brouillon d'annonce de licenciement blâme Camille pour une erreur de service qu'elle affirme ne pas avoir commise." },
    { id: "recette-volee", lieu: "reserve", pointeVers: "suspect:patissier", categorie: "mobile",
      texte: "Des notes manuscrites de Vasseur recopient, mot pour mot, la recette signature de Julien." },
    { id: "releve-bancaire", lieu: "bureau-chef", pointeVers: "suspect:critique", categorie: "mobile",
      texte: "Un relevé bancaire montre des versements réguliers de Vasseur vers Nadia Ferrand — la trace de pots-de-vin qu'elle redoutait de voir exposée." },
    { id: "offre-rachat", lieu: "bureau-chef", pointeVers: "suspect:investisseur", categorie: "mobile",
      texte: "Une offre de rachat des parts du restaurant, refusée catégoriquement par Vasseur malgré la situation financière critique de Marc." },
    { id: "contrat-eviction", lieu: "bureau-chef", pointeVers: "suspect:ex-associe", categorie: "mobile",
      texte: "Un document présente comme « démission volontaire » ce que Sophie affirme avoir été un renvoi déguisé." },

    // Moyen / opportunité, attachés au coupable
    { id: "badge-acces-cuisine", lieu: "cuisine", pointeVers: "coupable", categorie: "opportunite",
      texte: "Le système de badge de la cuisine montre que {{nomCible}} y est entré·e à l'heure exacte du crime, contredisant sa version des faits." },
    { id: "tablier-tache", lieu: "reserve", pointeVers: "coupable", categorie: "moyen",
      texte: "Un tablier taché, dissimulé au fond de la réserve, appartient à {{nomCible}}." },
    { id: "camera-terrasse", lieu: "terrasse", pointeVers: "coupable", categorie: "opportunite",
      texte: "La caméra de la terrasse a filmé {{nomCible}} rentrant précipitamment vers la cuisine, juste avant l'heure du crime." },
    { id: "connaissance-couteaux", lieu: "cuisine", pointeVers: "coupable", categorie: "moyen",
      texte: "{{nomCible}} est l'une des rares personnes de l'équipe à connaître l'emplacement exact du couteau signature de Vasseur." },
    { id: "absence-signalee", lieu: "salle-reception", pointeVers: "coupable", categorie: "opportunite",
      texte: "Un serveur remarque que {{nomCible}} a disparu de son poste pendant un quart d'heure critique, sans que personne ne s'en inquiète sur le moment." },

    // Indices à décharge, roulement sur les non-coupables
    { id: "alibi-reception", lieu: "salle-reception", pointeVers: "innocent", categorie: "opportunite",
      texte: "Plusieurs clients confirment avoir vu {{nomCible}} en salle sans interruption au moment des faits." },
    { id: "alibi-camera-cuisine", lieu: "cuisine", pointeVers: "innocent", categorie: "opportunite",
      texte: "Les caméras de cuisine montrent {{nomCible}} occupé·e en continu à un poste éloigné du lieu du crime." },
    { id: "ustensiles-ranges", lieu: "reserve", pointeVers: "innocent", categorie: "moyen",
      texte: "Rien dans le poste de travail de {{nomCible}} ne trahit un contact récent avec le couteau disparu." },
    { id: "temoin-terrasse", lieu: "terrasse", pointeVers: "innocent", categorie: "opportunite",
      texte: "Un collègue confirme avoir partagé une pause avec {{nomCible}} sur la terrasse tout le long de la plage horaire critique." },
  ],

  interrogatoires: {
    "sous-chef": {
      questions: [
        { id: "sous-chef-q1", label: "Comment décririez-vous votre relation avec le chef Vasseur ?", requiert: null,
          reponse: "« Exigeante. Il attendait la perfection, tout le temps. »" },
        { id: "sous-chef-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« En cuisine, à mon poste, comme toujours à cette heure. »" },
        { id: "sous-chef-q3", label: "Parlez-moi de ce brouillon de licenciement.", requiert: { indices: ["rapport-erreur"] },
          reponse: "« Une formalité administrative, sans plus. »",
          contredicteurPar: "rapport-erreur",
          reactionConfrontation: "« Bon, d'accord : il comptait me faire porter le chapeau pour une erreur qui n'était pas la mienne. Mais perdre mon poste n'est pas une raison pour perdre la tête. »" },
      ],
    },
    patissier: {
      questions: [
        { id: "patissier-q1", label: "Que représentait cette recette pour vous ?", requiert: null,
          reponse: "« Des années de travail. Ma signature, littéralement. »" },
        { id: "patissier-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« En réserve, à préparer les desserts pour le service du soir. »" },
        { id: "patissier-q3", label: "Parlez-moi de cette recette copiée.", requiert: { indices: ["recette-volee"] },
          reponse: "« Une coïncidence culinaire. Ça arrive plus souvent qu'on ne croit. »",
          contredicteurPar: "recette-volee",
          reactionConfrontation: "« Il voulait se l'approprier pour l'étoile, oui. C'est du vol, pur et simple. Mais je n'allais pas le tuer pour une recette, aussi précieuse soit-elle. »" },
      ],
    },
    critique: {
      questions: [
        { id: "critique-q1", label: "Pourquoi étiez-vous présente ce soir-là ?", requiert: null,
          reponse: "« Pour le service, comme n'importe quel soir de test. »" },
        { id: "critique-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« En salle, à table, à observer et prendre des notes. »" },
        { id: "critique-q3", label: "Parlez-moi de ces versements réguliers.", requiert: { indices: ["releve-bancaire"] },
          reponse: "« Une collaboration professionnelle, rien de plus. »",
          contredicteurPar: "releve-bancaire",
          reactionConfrontation: "« Il menaçait de tout révéler si je ne garantissais pas son étoile, c'est vrai. Mais j'ai des avocats pour ça, pas des couteaux. »" },
      ],
    },
    investisseur: {
      questions: [
        { id: "investisseur-q1", label: "Quel était l'état de vos relations d'affaires avec Vasseur ?", requiert: null,
          reponse: "« Tendu. Cet endroit me coûte plus qu'il ne me rapporte, ces derniers temps. »" },
        { id: "investisseur-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« Au bureau, à éplucher les comptes une fois de plus. »" },
        { id: "investisseur-q3", label: "Parlez-moi de cette offre de rachat refusée.", requiert: { indices: ["offre-rachat"] },
          reponse: "« Une proposition parmi d'autres. Rien d'urgent. »",
          contredicteurPar: "offre-rachat",
          reactionConfrontation: "« Il a refusé de me sauver alors qu'il en avait les moyens. Ça m'a mis dans une situation désespérée, oui. Mais désespéré n'est pas meurtrier. »" },
      ],
    },
    "ex-associe": {
      questions: [
        { id: "ex-associe-q1", label: "Comment s'est passé votre départ du restaurant ?", requiert: null,
          reponse: "« Mal. Très mal. On ne se remet pas facilement de ce genre de chose. »" },
        { id: "ex-associe-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« Sur la terrasse, à fumer, loin de tout ce monde. »" },
        { id: "ex-associe-q3", label: "Parlez-moi de ce contrat d'éviction.", requiert: { indices: ["contrat-eviction"] },
          reponse: "« De l'histoire ancienne, réglée depuis longtemps. »",
          contredicteurPar: "contrat-eviction",
          reactionConfrontation: "« Il a maquillé mon renvoi en démission pour ne pas payer ce qu'il me devait. Ça m'a rongée pendant des mois. Mais j'ai tourné la page, ou du moins, j'essayais. »" },
      ],
    },
  },
};

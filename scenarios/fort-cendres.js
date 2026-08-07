// ============================================================================
// Scénario "L'Héritage de Fort-Cendres" — post-apocalyptique.
// Test de généralisation : rareté et survie comme ressort des mobiles
// (plutôt que l'ambition ou le prestige), indices de récupération et de
// bricolage plutôt que high-tech ou magie, ton las et pragmatique.
// ============================================================================

export const scenario = {
  id: "fort-cendres",
  titre: "L'Héritage de Fort-Cendres",
  accroche:
    "La Doyenne Mareva Solh, fondatrice de l'enclave de Fort-Cendres, est retrouvée sans vie dans la salle du conseil, peu après avoir annoncé la découverte d'une serre encore fonctionnelle — de quoi nourrir l'enclave pour des mois. Cinq survivants clés avaient tous une raison de la voir disparaître.",

  faitsFixes: {
    victime: "Doyenne Mareva Solh, fondatrice et dirigeante de l'enclave de Fort-Cendres.",
    arme: "Une machette de récupération, habituellement rangée au poste de garde, disparue.",
    heureMort: "Peu après l'annonce de la découverte de la serre, pendant l'appel du rationnement du soir.",
    lieuCrime: "salle-conseil",
  },

  lieux: [
    { id: "salle-conseil", nom: "La salle du conseil", description: "Où l'annonce a été faite — et où le corps de la Doyenne a été découvert." },
    { id: "serre", nom: "La serre retrouvée", description: "Une serre pré-effondrement, remise en état, source d'un espoir inattendu." },
    { id: "infirmerie", nom: "L'infirmerie", description: "Ce qu'il reste de matériel médical, précieusement gardé." },
    { id: "poste-garde", nom: "Le poste de garde", description: "Armurerie improvisée et poste de surveillance de l'enclave." },
    { id: "reserve-eau", nom: "La réserve d'eau", description: "Système de purification vital, entretenu jour et nuit." },
  ],

  suspects: [
    {
      id: "medecin-enclave",
      nom: "Iris Kanto",
      pronom: "elle",
      profil: "Médecin de l'enclave, gardienne des derniers stocks de médicaments.",
      alibiDeclare: "Déclare être restée à l'infirmerie à trier les réserves toute la soirée.",
    },
    {
      id: "chef-garde",
      nom: "Bram Oyelaran",
      pronom: "il",
      profil: "Chef de la garde, responsable de la sécurité et des rondes de l'enclave.",
      alibiDeclare: "Déclare avoir supervisé la relève du soir au poste de garde.",
    },
    {
      id: "ingenieure-eau",
      nom: "Talia Mbeki",
      pronom: "elle",
      profil: "Ingénieure chargée du système de purification d'eau, seul rempart contre la soif.",
      alibiDeclare: "Déclare avoir colmaté une fuite à la réserve d'eau pendant des heures.",
    },
    {
      id: "marchande",
      nom: "Corvin Achebe",
      pronom: "il",
      profil: "Négociant itinérant, seul lien commercial de l'enclave avec l'extérieur.",
      alibiDeclare: "Déclare avoir négocié l'usage des premières récoltes dans la serre.",
    },
    {
      id: "ancien-rival",
      nom: "Doran Vasilis",
      pronom: "il",
      profil: "Cofondateur historique de l'enclave, écarté du conseil il y a plusieurs années.",
      alibiDeclare: "Déclare être resté seul à la réserve d'eau, loin du conseil.",
    },
  ],

  indices: [
    { id: "machette-manquante", lieu: "poste-garde", pointeVers: null, categorie: null,
      texte: "Une machette de récupération manque à l'inventaire du poste de garde." },
    { id: "lampe-eteinte", lieu: "salle-conseil", pointeVers: null, categorie: null,
      texte: "La lampe à manivelle de la salle du conseil est retrouvée froide, signe qu'elle n'a pas servi depuis un moment avant la découverte du corps." },
    { id: "annonce-serre", lieu: "serre", pointeVers: null, categorie: null,
      texte: "Un tableau griffonné à la craie rappelle l'annonce de la Doyenne : une serre fonctionnelle, capable de nourrir l'enclave pour des mois." },
    { id: "rumeurs-succession", lieu: "reserve-eau", pointeVers: null, categorie: null,
      texte: "Des rumeurs sur qui prendra la tête de l'enclave circulent déjà, à peine l'annonce faite." },
    { id: "messager-exterieur", lieu: "serre", pointeVers: null, categorie: null,
      texte: "Un survivant rapporte avoir vu un messager inconnu, venu de l'extérieur, rôder près de l'enclave la veille." },
    { id: "registre-dechire", lieu: "salle-conseil", pointeVers: null, categorie: null,
      texte: "Plusieurs pages du registre du conseil ont été arrachées récemment, sans qu'on sache lesquelles." },

    // Mobiles fixes
    { id: "registre-medicaments", lieu: "infirmerie", pointeVers: "suspect:medecin-enclave", categorie: "mobile",
      texte: "Un registre révèle des détournements de médicaments rares vers des trocs extérieurs, tenus par Iris Kanto." },
    { id: "rançon-pillards", lieu: "poste-garde", pointeVers: "suspect:chef-garde", categorie: "mobile",
      texte: "Une preuve montre que Bram Oyelaran a laissé entrer des pillards contre rançon, à l'insu du conseil." },
    { id: "rapport-erreur-eau", lieu: "reserve-eau", pointeVers: "suspect:ingenieure-eau", categorie: "mobile",
      texte: "Un rapport impute la récente pénurie d'eau à une erreur de calcul de Talia Mbeki." },
    { id: "registre-commerce", lieu: "serre", pointeVers: "suspect:marchande", categorie: "mobile",
      texte: "Un document annonce la rupture de tout commerce extérieur, ruinant les affaires de Corvin Achebe." },
    { id: "proces-verbal-eviction", lieu: "salle-conseil", pointeVers: "suspect:ancien-rival", categorie: "mobile",
      texte: "Un procès-verbal, vieux de plusieurs années, a écarté Doran Vasilis du conseil qu'il avait pourtant cofondé." },

    // Moyen / opportunité, attachés au coupable
    { id: "trace-machette", lieu: "salle-conseil", pointeVers: "coupable", categorie: "opportunite",
      texte: "Une trace de lame, compatible avec la machette manquante, est retrouvée près du corps — un geste que {{nomCible}} maîtrise visiblement bien." },
    { id: "vetements-taches", lieu: "poste-garde", pointeVers: "coupable", categorie: "moyen",
      texte: "Des vêtements tachés, dissimulés à la hâte, sont retrouvés parmi les affaires de {{nomCible}}." },
    { id: "temoin-serre", lieu: "serre", pointeVers: "coupable", categorie: "opportunite",
      texte: "Un survivant affirme avoir vu {{nomCible}} se diriger vers la salle du conseil peu après l'annonce, sans raison apparente." },
    { id: "connaissance-passages", lieu: "reserve-eau", pointeVers: "coupable", categorie: "moyen",
      texte: "{{nomCible}} est l'un·e des rares survivants à connaître les passages secondaires menant à la salle du conseil sans passer par le poste de garde." },
    { id: "absence-rationnement", lieu: "poste-garde", pointeVers: "coupable", categorie: "opportunite",
      texte: "Un garde note que {{nomCible}} a manqué l'appel du rationnement du soir, sans justification." },

    // Indices à décharge, roulement sur les non-coupables
    { id: "temoin-rationnement", lieu: "poste-garde", pointeVers: "innocent", categorie: "opportunite",
      texte: "Plusieurs survivants confirment avoir vu {{nomCible}} à l'appel du rationnement, sans interruption." },
    { id: "alibi-serre", lieu: "serre", pointeVers: "innocent", categorie: "opportunite",
      texte: "Le registre de la serre montre que {{nomCible}} y travaillait sans discontinuer au moment des faits." },
    { id: "mains-propres-poste", lieu: "infirmerie", pointeVers: "innocent", categorie: "moyen",
      texte: "Rien chez {{nomCible}} ne trahit un contact récent avec une arme quelconque." },
    { id: "temoin-reserve", lieu: "reserve-eau", pointeVers: "innocent", categorie: "opportunite",
      texte: "Un autre survivant confirme avoir croisé {{nomCible}} à la réserve d'eau, loin de la salle du conseil." },
  ],

  interrogatoires: {
    "medecin-enclave": {
      questions: [
        { id: "medecin-enclave-q1", label: "Quel était votre rôle auprès de la Doyenne ?", requiert: null,
          reponse: "« Soigner ceux qui peuvent encore l'être. Un rôle qu'elle respectait, je crois. »" },
        { id: "medecin-enclave-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« À l'infirmerie, à trier ce qu'il nous reste de médicaments. »" },
        { id: "medecin-enclave-q3", label: "Parlez-moi de ce registre de médicaments.", requiert: { indices: ["registre-medicaments"] },
          reponse: "« Une comptabilité approximative, rien de plus. »",
          contredicteurPar: "registre-medicaments",
          reactionConfrontation: "« Bon, d'accord. J'ai échangé quelques doses contre de quoi survivre. Ici, tout se troque, docteur y compris. Mais je soigne les gens, je ne les tue pas. »" },
      ],
    },
    "chef-garde": {
      questions: [
        { id: "chef-garde-q1", label: "Comment décririez-vous votre rôle dans l'enclave ?", requiert: null,
          reponse: "« Je garde ce qu'il reste. Ce n'est jamais assez pour tout le monde. »" },
        { id: "chef-garde-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« Au poste de garde, à superviser la relève du soir. »" },
        { id: "chef-garde-q3", label: "Parlez-moi de cette histoire de pillards.", requiert: { indices: ["rançon-pillards"] },
          reponse: "« Une rumeur de plus. On en entend tellement, ici. »",
          contredicteurPar: "rançon-pillards",
          reactionConfrontation: "« J'ai laissé entrer des gens en échange de vivres. Personne n'a été blessé. Mais oui, elle l'a découvert, et ça, ça pouvait me coûter cher. »" },
      ],
    },
    "ingenieure-eau": {
      questions: [
        { id: "ingenieure-eau-q1", label: "Comment se porte le système de purification ?", requiert: null,
          reponse: "« Il tient. À peine, mais il tient. »" },
        { id: "ingenieure-eau-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« À la réserve, à colmater une fuite depuis des heures. »" },
        { id: "ingenieure-eau-q3", label: "Parlez-moi de cette erreur de calcul.", requiert: { indices: ["rapport-erreur-eau"] },
          reponse: "« Les moyens du bord ont leurs limites. Je fais ce que je peux. »",
          contredicteurPar: "rapport-erreur-eau",
          reactionConfrontation: "« Une erreur de calcul, oui. Ça arrive quand on travaille avec les moyens du bord. Mais elle allait m'en faire porter tout le poids, devant tout le monde. »" },
      ],
    },
    marchande: {
      questions: [
        { id: "marchande-q1", label: "Quel commerce entreteniez-vous avec l'extérieur ?", requiert: null,
          reponse: "« De quoi nous garder en vie. Rien de plus, rien de moins. »" },
        { id: "marchande-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« Dans la serre, à négocier l'usage des premières récoltes. »" },
        { id: "marchande-q3", label: "Parlez-moi de cette rupture de commerce annoncée.", requiert: { indices: ["registre-commerce"] },
          reponse: "« Un projet parmi d'autres. Rien n'était encore signé. »",
          contredicteurPar: "registre-commerce",
          reactionConfrontation: "« Elle voulait couper tout lien avec l'extérieur. Ça m'aurait ruiné, et l'enclave avec moi, à terme. Mais je préfère négocier que tuer, toujours. »" },
      ],
    },
    "ancien-rival": {
      questions: [
        { id: "ancien-rival-q1", label: "Quel était votre rôle dans la fondation de l'enclave ?", requiert: null,
          reponse: "« Je l'ai bâtie avec elle, pierre après pierre. Elle a préféré l'oublier. »" },
        { id: "ancien-rival-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« Seul, à la réserve d'eau, loin du conseil. »" },
        { id: "ancien-rival-q3", label: "Parlez-moi de votre éviction du conseil.", requiert: { indices: ["proces-verbal-eviction"] },
          reponse: "« De l'histoire ancienne. Je ne vois pas ce que ça change aujourd'hui. »",
          contredicteurPar: "proces-verbal-eviction",
          reactionConfrontation: "« Elle m'a écarté du pouvoir qu'on avait construit ensemble. Une trahison, oui. Mais j'ai fait le deuil de cette place, il y a longtemps. »" },
      ],
    },
  },
};

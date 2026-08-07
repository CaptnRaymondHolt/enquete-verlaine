// ============================================================================
// Scénario "Le Poison du Château de Brandael" — médiéval, cour et intrigues.
// Test de généralisation : retour à des indices physiques (comme le manoir)
// mais dans un registre de langue et une logistique très différents (cour
// féodale, alchimie, sceaux et messagers plutôt que badges et invités mondains).
// ============================================================================

export const scenario = {
  id: "brandael",
  titre: "Le Poison du Château de Brandael",
  accroche:
    "Le baron Aldric de Brandael s'effondre au dernier toast d'un festin scellant une alliance de mariage. Le poison qui l'a tué provient de sa propre officine. Cinq personnes de sa maison avaient toutes une raison de le voir mort.",

  faitsFixes: {
    victime: "Baron Aldric de Brandael, seigneur du domaine.",
    arme: "Une fiole de poison rare, disparue de l'officine du château.",
    heureMort: "Pendant le dernier toast du festin, peu avant l'heure de complies.",
    lieuCrime: "grande-salle",
  },

  lieux: [
    { id: "grande-salle", nom: "La grande salle", description: "Où se tenait le festin — là où le baron s'est effondré." },
    { id: "chambre-baron", nom: "La chambre du baron", description: "Ses appartements privés, au coffre scellé." },
    { id: "officine", nom: "L'officine", description: "Le laboratoire de l'alchimiste et physicien de la maison." },
    { id: "chapelle", nom: "La chapelle", description: "Lieu de prière du château, tenue par le chapelain." },
    { id: "cave-tonneaux", nom: "La cave à provisions", description: "Réserve de vins et de vivres du domaine." },
  ],

  suspects: [
    {
      id: "seneschal",
      nom: "Maître Ossian",
      pronom: "il",
      profil: "Sénéchal du château, chargé de l'intendance depuis vingt ans.",
      alibiDeclare: "Prétend avoir supervisé le service à la grande salle tout le festin.",
    },
    {
      id: "chevalier",
      nom: "Sire Bertrand",
      pronom: "il",
      profil: "Chevalier de la maison, dont les fiançailles avec la fille du baron viennent d'être rompues.",
      alibiDeclare: "Prétend s'être entretenu avec d'autres chevaliers, loin de la table haute.",
    },
    {
      id: "medecin-alchimiste",
      nom: "Maître Yvon",
      pronom: "il",
      profil: "Physicien et alchimiste attitré du baron.",
      alibiDeclare: "Prétend avoir préparé des remèdes en son officine tout le festin.",
    },
    {
      id: "rival-noble",
      nom: "Comte Renauld",
      pronom: "il",
      profil: "Seigneur voisin, invité pour sceller une paix territoriale contestée.",
      alibiDeclare: "Prétend s'être entretenu avec son intendant, à l'écart de la foule.",
    },
    {
      id: "dame-compagnie",
      nom: "Dame Isabeau",
      pronom: "elle",
      profil: "Dame de compagnie de la baronne, à son service depuis son mariage.",
      alibiDeclare: "Prétend être restée auprès de la baronne, à la table haute, tout le festin.",
    },
  ],

  indices: [
    { id: "fiole-manquante", lieu: "officine", pointeVers: null, categorie: null,
      texte: "Une fiole étiquetée d'un symbole rare manque à l'inventaire de l'officine." },
    { id: "derniere-parole", lieu: "grande-salle", pointeVers: null, categorie: null,
      texte: "Le baron aurait murmuré un mot incompréhensible juste avant de s'effondrer, selon un témoin proche." },
    { id: "rumeurs-cour", lieu: "chapelle", pointeVers: null, categorie: null,
      texte: "Des rumeurs de trahison circulent à la cour depuis plusieurs semaines, sans qu'on sache d'où elles viennent." },
    { id: "messager-etrange", lieu: "cave-tonneaux", pointeVers: null, categorie: null,
      requiert: { indices: ["cloche-arretee"] },
      texte: "Un messager inconnu aurait livré un pli au château la veille, sans qu'on sache pour qui il était destiné. Le pli lui-même est resté scellé dans un petit coffret de voyage, retrouvé parmi les tonneaux.",
      puzzle: {
        enonce: "Le coffret du messager est verrouillé par un anneau gravé de chiffres romains, qu'il faut aligner sur le bon nombre.",
        solution: "VII",
        aides: [
          "Un détail déjà noté ailleurs, dans la grande salle, mentionne un compte précis.",
          "La cloche du dernier toast s'est arrêtée sur un coup bien particulier : relisez cet indice-là.",
          "Le code est VII — le coup sur lequel la cloche s'est tue.",
        ],
      } },
    { id: "sceau-brise", lieu: "chambre-baron", pointeVers: null, categorie: null,
      texte: "Le sceau du coffre personnel du baron a été retrouvé brisé, sans qu'on sache ce qui en a été retiré." },
    { id: "cloche-arretee", lieu: "grande-salle", pointeVers: null, categorie: null,
      texte: "La cloche annonçant le dernier toast s'est tue avant l'heure prévue, restée bloquée sur son septième coup — un fait que nul ne sait expliquer." },

    // Mobiles fixes
    { id: "registre-comptable", lieu: "officine", pointeVers: "suspect:seneschal", categorie: "mobile",
      texte: "Un registre caché révèle des détournements de fonds du domaine sur plusieurs années, tenus par le sénéchal." },
    { id: "lettre-rupture", lieu: "chambre-baron", pointeVers: "suspect:chevalier", categorie: "mobile",
      texte: "Une lettre du baron rompt les fiançailles de Sire Bertrand pour un parti jugé plus avantageux." },
    { id: "ingredients-interdits", lieu: "officine", pointeVers: "suspect:medecin-alchimiste", categorie: "mobile",
      texte: "Des ingrédients prohibés par l'Église sont dissimulés dans l'officine de Maître Yvon." },
    { id: "carte-territoire", lieu: "grande-salle", pointeVers: "suspect:rival-noble", categorie: "mobile",
      texte: "Une carte de territoires contestés, annotée d'un refus signé du baron, prive le Comte Renauld de terres qu'il revendique." },
    { id: "lettre-chantage", lieu: "chambre-baron", pointeVers: "suspect:dame-compagnie", categorie: "mobile",
      texte: "Un billet évoque une liaison secrète de Dame Isabeau et une menace de révélation publique." },

    // Moyen / opportunité, attachés au coupable
    { id: "coupe-empoisonnee", lieu: "grande-salle", pointeVers: "coupable", categorie: "opportunite",
      texte: "La coupe du baron porte des résidus qui ne peuvent avoir été versés que par quelqu'un s'étant approché seul de la table haute — {{nomCible}}, selon plusieurs témoins." },
    { id: "gants-tachés", lieu: "chambre-baron", pointeVers: "coupable", categorie: "moyen",
      texte: "Une paire de gants tachés d'un résidu suspect est cachée parmi les affaires de {{nomCible}}." },
    { id: "garde-temoin", lieu: "chapelle", pointeVers: "coupable", categorie: "opportunite",
      texte: "Un garde atteste avoir vu {{nomCible}} quitter discrètement la grande salle, juste avant le toast fatal." },
    { id: "connaissance-officine", lieu: "officine", pointeVers: "coupable", categorie: "moyen",
      texte: "{{nomCible}} est l'une des rares personnes du château à avoir un accès libre à l'officine et à ses poisons." },
    { id: "absence-remarquee-festin", lieu: "cave-tonneaux", pointeVers: "coupable", categorie: "opportunite",
      texte: "Un servant se souvient que {{nomCible}} a disparu du festin un bref moment, sans explication, juste avant l'heure fatidique." },

    // Indices à décharge, roulement sur les non-coupables
    { id: "temoin-grande-salle", lieu: "grande-salle", pointeVers: "innocent", categorie: "opportunite",
      texte: "Plusieurs convives attestent avoir vu {{nomCible}} assis·e à sa place tout le long du festin." },
    { id: "alibi-chapelle", lieu: "chapelle", pointeVers: "innocent", categorie: "opportunite",
      texte: "Le chapelain confirme que {{nomCible}} priait à la chapelle au moment exact des faits." },
    { id: "mains-propres-officine", lieu: "chambre-baron", pointeVers: "innocent", categorie: "moyen",
      texte: "Rien dans les affaires de {{nomCible}} ne trahit un contact quelconque avec un poison." },
    { id: "temoin-cave", lieu: "cave-tonneaux", pointeVers: "innocent", categorie: "opportunite",
      texte: "Le sommelier atteste avoir croisé {{nomCible}} à la cave, occupé·e à choisir les vins, loin de la grande salle." },

    // --- Indice révélé par combinaison de deux pièces déjà trouvées ---
    { id: "lettre-decachetee", lieu: null, pointeVers: null, categorie: null,
      texte: "Une fois décacheté, le pli du messager révèle une missive anonyme évoquant les rumeurs de trahison qui courent la cour — signée d'une simple initiale, impossible à identifier avec certitude." },
  ],

  combinaisons: [
    { a: "messager-etrange", b: "rumeurs-cour", resultat: "lettre-decachetee" },
  ],

  interrogatoires: {
    seneschal: {
      questions: [
        { id: "seneschal-q1", label: "Depuis combien de temps servez-vous la maison de Brandael ?", requiert: null,
          reponse: "« Depuis mon plus jeune âge, messire. Toute ma vie y est vouée. »" },
        { id: "seneschal-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« Je supervisais le service à la grande salle, comme chaque soir de fête. »" },
        { id: "seneschal-q3", label: "Parlez-moi de ce registre secret.", requiert: { indices: ["registre-comptable"] },
          reponse: "« Une erreur de tenue de comptes, rien de plus. »",
          contredicteurPar: "registre-comptable",
          reactionConfrontation: "« Soit. J'ai puisé dans les coffres, il est vrai. Mais un homme pendu ne rembourse jamais sa dette — j'avais bien l'intention de tout rendre. »" },
      ],
    },
    chevalier: {
      questions: [
        { id: "chevalier-q1", label: "Quelle était votre relation avec le baron ?", requiert: null,
          reponse: "« Une alliance de sang, brisée par son seul caprice. »" },
        { id: "chevalier-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« Je m'entretenais avec d'autres chevaliers, loin de la table haute. »" },
        { id: "chevalier-q3", label: "Parlez-moi de cette rupture de fiançailles.", requiert: { indices: ["lettre-rupture"] },
          reponse: "« Une affaire de famille qui ne regarde que moi. »",
          contredicteurPar: "lettre-rupture",
          reactionConfrontation: "« Il a bafoué l'honneur de ma maison pour un parti plus riche. Mais l'honneur se lave par le duel, non par le poison. »" },
      ],
    },
    "medecin-alchimiste": {
      questions: [
        { id: "medecin-q1", label: "Quel était votre rôle auprès du baron ?", requiert: null,
          reponse: "« Veiller sur sa santé, comme sur celle de toute la maisonnée. »" },
        { id: "medecin-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« Dans mon officine, à préparer les remèdes du lendemain. »" },
        { id: "medecin-q3", label: "Parlez-moi de ces ingrédients interdits.", requiert: { indices: ["ingredients-interdits"] },
          reponse: "« Des remèdes que l'on comprend mal, rien de plus. »",
          contredicteurPar: "ingredients-interdits",
          reactionConfrontation: "« Des remèdes que l'Église condamne sans les comprendre. Il menaçait de me perdre pour cela, oui. Mais j'ai voué ma vie à guérir, non à ôter la vie. »" },
      ],
    },
    "rival-noble": {
      questions: [
        { id: "rival-noble-q1", label: "Pourquoi étiez-vous convié à ce festin ?", requiert: null,
          reponse: "« Pour sceller une paix que le baron refusait obstinément. »" },
        { id: "rival-noble-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« Je m'entretenais avec mon intendant, à l'écart de la foule. »" },
        { id: "rival-noble-q3", label: "Parlez-moi de ce différend territorial.", requiert: { indices: ["carte-territoire"] },
          reponse: "« Une querelle de frontières, ancienne et sans grand mystère. »",
          contredicteurPar: "carte-territoire",
          reactionConfrontation: "« Ces terres me reviennent de droit ancien. Son refus m'a coûté cher, il est vrai. Mais je préfère la guerre ouverte au poison des lâches. »" },
      ],
    },
    "dame-compagnie": {
      questions: [
        { id: "dame-compagnie-q1", label: "Quel était votre office auprès de la baronne ?", requiert: null,
          reponse: "« Sa plus fidèle compagne, depuis son mariage. »" },
        { id: "dame-compagnie-q2", label: "Où étiez-vous au moment des faits ?", requiert: null,
          reponse: "« Auprès de ma maîtresse, à la table haute, comme toujours. »" },
        { id: "dame-compagnie-q3", label: "Parlez-moi de ce billet compromettant.", requiert: { indices: ["lettre-chantage"] },
          reponse: "« Une correspondance privée qui ne regarde que moi. »",
          contredicteurPar: "lettre-chantage",
          reactionConfrontation: "« Il menaçait de me perdre pour un secret qui n'appartenait qu'à moi. J'ai craint le déshonneur, oui. Mais je n'ai jamais souhaité sa mort, seulement son silence. »" },
      ],
    },
  },
};

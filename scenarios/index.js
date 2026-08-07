// Registre des scénarios disponibles. Un futur thème s'ajoute ici sans
// toucher au moteur ni à l'interface — juste un nouveau fichier + une entrée.
export const SCENARIOS = [
  {
    id: "manoir-1926",
    titre: "Minuit au Manoir Verlaine",
    accroche: "Huis clos dans un manoir des années 1920 — un industriel assassiné, cinq invités, tous un mobile.",
    charger: () => import("./manoir-1926.js").then((m) => m.scenario),
  },
  {
    id: "promethee-7",
    titre: "Alerte sur Prométhée-7",
    accroche: "Une station de recherche isolée, un commandant retrouvé mort, cinq membres d'équipage — et une découverte qui change tout.",
    charger: () => import("./promethee-7.js").then((m) => m.scenario),
  },
  {
    id: "neo-kaito",
    titre: "Interférence à Néo-Kaïto",
    accroche: "Une mégacorporation, un directeur technique assassiné le soir du lancement d'un implant neuronal révolutionnaire — cyberpunk.",
    charger: () => import("./neo-kaito.js").then((m) => m.scenario),
  },
  {
    id: "brandael",
    titre: "Le Poison du Château de Brandael",
    accroche: "Un baron empoisonné au dernier toast d'un festin médiéval — cour, intrigues et alchimie interdite.",
    charger: () => import("./brandael.js").then((m) => m.scenario),
  },
  {
    id: "derniere-commande",
    titre: "Dernière Commande",
    accroche: "Un chef étoilé retrouvé mort en cuisine, le soir de l'appel du guide Michelin — contemporain.",
    charger: () => import("./derniere-commande.js").then((m) => m.scenario),
  },
  {
    id: "arcanes",
    titre: "Le Tournoi des Arcanes",
    accroche: "Un Grand Maître de guilde assassiné après avoir annoncé une découverte magique majeure — heroic fantasy.",
    charger: () => import("./arcanes.js").then((m) => m.scenario),
  },
  {
    id: "fort-cendres",
    titre: "L'Héritage de Fort-Cendres",
    accroche: "Une enclave de survivants, une fondatrice assassinée après l'annonce d'une découverte vitale — post-apocalyptique.",
    charger: () => import("./fort-cendres.js").then((m) => m.scenario),
  },
];

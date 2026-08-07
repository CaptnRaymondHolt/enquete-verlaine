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
];

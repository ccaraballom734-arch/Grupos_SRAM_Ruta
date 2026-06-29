export interface ComponentWeight {
  name: string;
  red: number; // weight in grams
  force: number;
  rival: number;
}

export interface ComponentPart {
  id: string;
  name: string;
  icon: string;
  description: string;
  redSpecs: string;
  forceSpecs: string;
  rivalSpecs: string;
}

export interface GroupInfo {
  id: 'red' | 'force' | 'rival';
  name: string;
  tagline: string;
  tier: string;
  color: string;
  badgeBg: string;
  description: string;
  ergonomics: string;
  power: string;
  frontDerailleur: string;
  technologies: string[];
  totalWeight: number;
  weightSavings: number; // savings compared to previous generation
  toolInfo: string;
  parts: {
    manetas: string;
    bielas: string;
    cadena: string;
    desviadorTrat: string;
    discos: string;
  };
}

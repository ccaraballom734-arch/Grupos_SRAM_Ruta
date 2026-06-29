import { GroupInfo, ComponentWeight, ComponentPart } from './types';

export const GROUPS: GroupInfo[] = [
  {
    id: 'red',
    name: 'SRAM RED AXS',
    tagline: 'El desarrollo de nuestros frenos más potentes y la transmisión electrónica más ligera',
    tier: 'TOP TIER / COMPETICIÓN',
    color: '#E11D22',
    badgeBg: 'bg-black text-white',
    description: 'SRAM RED AXS es la cúspide de la tecnología de ciclismo de ruta. Cada componente se ha refinado para ofrecer una experiencia sin esfuerzo, combinando frenado con un solo dedo, ergonomía superior y el peso más ligero de su categoría.',
    ergonomics: 'Manetas extremadamente cómodas. Modifica el alcance de la leva (Reach Adjust) y el punto de contacto de las pastillas (sólo en RED) para personalizar el tacto. Protuberancia delantera inclinada hacia el interior para reducir la fatiga. Leva de freno abierta hacia el exterior. Pivote elevado para frenar con un solo dedo aplicando un 80% menos de fuerza.',
    power: 'Pinzas de freno más rígidas gracias a su estructura unida. Pistones desplazados radialmente hacia fuera 1 mm para mayor brazo de palanca. El conjunto de manetas y pinzas es 83g más ligero que la generación anterior, ofreciendo un 13% menos de peso, 11% más de rigidez y mayor potencia desde el inicio del recorrido de la leva.',
    frontDerailleur: 'Rediseñado para cambios de plato X-Range rápidos, precisos y sin roces. Compatible con todos los tamaños de platos mediante dos orificios roscados. Incluye guías de ajuste específicas (roja para platos 46/33 a 50/37 y verde para platos 52/39 a 56/43).',
    technologies: ['Orbit Chain Management', 'X-Range Gearing', 'AXS Wireless', 'HollowPin Chain', 'Reach Adjust', 'Contact Point Adjustment', 'Bonus Buttons'],
    totalWeight: 2496,
    weightSavings: 153,
    toolInfo: 'Útil rojo para platos 46/33 a 50/37, útil verde para platos 52/39 a 56/43.',
    parts: {
      manetas: 'Ahorran 83 gramos. Cuentan con Bonus Buttons para cambiar con los pulgares o controlar ciclocomputadores. Ergo superior, pivote elevado.',
      bielas: 'Laminado de carbono perfeccionado con ayuda de Zipp. Ahorran 29 gramos manteniendo la rigidez máxima.',
      cadena: 'Tecnología HollowPin (bulón hueco). Los orificios en los eslabones restan 13 gramos y aumentan la resistencia.',
      desviadorTrat: 'Roldana más grande, rodamientos cerámicos y pesa 16 gramos menos que la generación anterior.',
      discos: 'Discos Paceline X con araña de aluminio, 8 gramos más ligeros en conjunto que la versión anterior.'
    }
  },
  {
    id: 'force',
    name: 'SRAM FORCE AXS',
    tagline: 'Misma precisión, más personalización y medidor de potencia integrado',
    tier: 'PRO PERFORMANCE',
    color: '#4B5563',
    badgeBg: 'bg-gray-600 text-white',
    description: 'SRAM Force AXS incorpora la tecnología validada por profesionales en un paquete altamente personalizable. Cuenta con medidor de potencia integrado de precisión extrema con sistema Thread Mount para un mantenimiento sencillo y cambios de plato rápidos.',
    ergonomics: 'Manetas sumamente ergonómicas basadas en la tecnología de RED. Ajuste de alcance de leva (Reach Adjust) para un control total. Incorpora Bonus Buttons para ampliar la conectividad y opciones de cambio rápido al alcance de tus pulgares.',
    power: 'Excelente respuesta de frenado con modulación optimizada. Pinzas rígidas y ligeras que ofrecen una frenada potente y segura desde cualquier posición de las manos, reduciendo la fatiga en descensos largos.',
    frontDerailleur: 'Cambio de plato rápido, preciso y suave de diseño X-Range. Ajuste simplificado mediante el útil de alineación de color rojo compatible con platos de 46/33 a 50/37 dientes.',
    technologies: ['Thread Mount Power Meter', 'X-Range Gearing', 'AXS Wireless', 'Reach Adjust', 'Orbit Dampener', 'Bonus Buttons'],
    totalWeight: 2670,
    weightSavings: 85,
    toolInfo: 'Útil de ajuste rojo compatible con platos de 46/33 a 50/37 dientes.',
    parts: {
      manetas: 'Ahorran 74 gramos. Ergonomía mejorada y menor peso que permite un excelente balance al mover la bici de lado a lado.',
      bielas: 'Completamente nuevas, restando más de 30 gramos. Brazos de carbono de alta tecnología optimizados para máxima transferencia.',
      cadena: 'Eslabones ahuecados con bulones macizos, logrando rebajar 11 gramos en total comparado con la generación previa.',
      desviadorTrat: 'Adopta el diseño y la roldana inferior más grande del RED, logrando ser 12 gramos más ligero.',
      discos: 'Paceline X con araña de aluminio pulido que ahorra 8 gramos manteniendo estabilidad térmica perfecta.'
    }
  },
  {
    id: 'rival',
    name: 'SRAM RIVAL AXS',
    tagline: 'Tecnología profesional validada al alcance de todos los ciclistas',
    tier: 'PREMIUM ENTRADA / ACCESS',
    color: '#9CA3AF',
    badgeBg: 'bg-gray-300 text-gray-800',
    description: 'SRAM Rival AXS ofrece prestaciones excepcionales a un precio competitivo. Considerablemente más ligero que antes, acerca a más ciclistas que nunca la frenada potente sin esfuerzo, cambios precisos y la conectividad AXS.',
    ergonomics: 'Diseño ergonómico optimizado para todo tamaño de manos. Reach Adjust (alcance de la leva) ajustable individualmente para una envoltura de dedos perfecta sin riesgo de atrapamiento al frenar.',
    power: 'Frenado hidráulico potente y dosificado. Reducción sustancial del esfuerzo requerido para detener la bicicleta (80% menos desde las manetas, 33% menos desde la curva del manillar).',
    frontDerailleur: 'Al igual que RED y Force, Rival cuenta con cambios X-Range rápidos y sin roces. Configuración exacta gracias al útil rojo para platos de 46/33 a 48/35 dientes.',
    technologies: ['AXS Wireless', 'X-Range Gearing', 'DUB Crankset', 'Reach Adjust', 'Paceline Braking'],
    totalWeight: 3109,
    weightSavings: 112,
    toolInfo: 'Útil de ajuste rojo compatible con platos de 46/33 a 48/35 dientes.',
    parts: {
      manetas: 'Ahorran 72 gramos. Cómodas, resistentes y con excelente envoltura para garantizar la seguridad del ciclista en cualquier terreno.',
      bielas: 'Rediseño radical en aluminio con orificio central, restando más de 50 gramos al conjunto sin comprometer rigidez.',
      cadena: 'Placas externas perforadas con orificios estratégicos para reducir peso e incrementar la suavidad de engranaje.',
      desviadorTrat: 'Reducción de 20 gramos de peso gracias a un meticuloso análisis de materiales y diseño optimizado.',
      discos: 'Discos Paceline estándar con araña de aluminio que restan 20 gramos al pasar de araña de acero a aluminio.'
    }
  }
];

export const COMPONENT_WEIGHTS: ComponentWeight[] = [
  { name: 'Manetas y Pinzas (par)', red: 556, force: 642, rival: 712 },
  { name: 'Bielas y Platos', red: 580, force: 715, rival: 840 },
  { name: 'Cadena', red: 249, force: 266, rival: 282 },
  { name: 'Desviador Trasero', red: 262, force: 295, rival: 327 },
  { name: 'Desviador Delantero', red: 142, force: 182, rival: 198 },
  { name: 'Discos de Freno (par)', red: 220, force: 245, rival: 270 },
  { name: 'Baterías y Misceláneos', red: 487, force: 325, rival: 480 } // Adjust to match total exactly
];

export const PARTS: ComponentPart[] = [
  {
    id: 'manetas',
    name: 'Manetas de Cambio/Freno',
    icon: 'sports_motorsports',
    description: 'El centro neurálgico de la transmisión. Controlan cambios inalámbricos, frenada hidráulica y telemetría de botones.',
    redSpecs: 'Superficie de agarre reducida, Bonus Buttons integrados, Reach Adjust, Contact Point Adjust. 83g ahorrados.',
    forceSpecs: 'Reach Adjust, Bonus Buttons integrados para cambios con los pulgares. 74g ahorrados.',
    rivalSpecs: 'Ergonomía optimizada para múltiples manos, Reach Adjust. 72g ahorrados.'
  },
  {
    id: 'bielas',
    name: 'Bielas y Platos',
    icon: 'cached',
    description: 'Transmiten la potencia del ciclista. Cuentan con desarrollos de platos integrados X-Range y opciones de potenciómetro.',
    redSpecs: 'Laminado de carbono de alta gama optimizado por Zipp. Bielas huecas muy rígidas. Ahorran 29g.',
    forceSpecs: 'Brazos de carbono completamente nuevos. Interfaz Thread Mount para potenciómetro fácil. Ahorran >30g.',
    rivalSpecs: 'Rediseño de aluminio con orificio pasante, restando más de 50g en el conjunto.'
  },
  {
    id: 'cadena',
    name: 'Cadena Flattop',
    icon: 'linear_scale',
    description: 'El eslabón superior plano distintivo de SRAM. Ofrece un funcionamiento silencioso, cambios rápidos y alta durabilidad.',
    redSpecs: 'Tecnología HollowPin (bulones huecos) y placas internas/externas perforadas. Ahorra 13g.',
    forceSpecs: 'Combinación de eslabones internos perforados con bulones macizos. Rebaja 11g.',
    rivalSpecs: 'Placas externas con orificios de reducción de peso para suavidad de engranaje.'
  },
  {
    id: 'desviadores',
    name: 'Desviador Trasero y Delantero',
    icon: 'settings_backup_restore',
    description: 'Ejecutan los cambios de marcha de forma completamente inalámbrica. El desviador trasero actúa como el cerebro del sistema.',
    redSpecs: 'Cambio trasero con roldana más grande, rodamientos cerámicos (-16g). Desviador delantero optimizado (-4g).',
    forceSpecs: 'Cambio trasero con diseño tipo RED y roldana inferior más grande (-12g). Delantero rápido y preciso.',
    rivalSpecs: 'Cambio trasero aligerado 20g tras análisis de materiales. Delantero confiable de amplio rango.'
  },
  {
    id: 'discos',
    name: 'Discos y Pinzas de Freno',
    icon: 'album',
    description: 'Aportan la mayor potencia de frenado con modulación hidráulica superior para rodar con total seguridad.',
    redSpecs: 'Discos Paceline X con soporte de aluminio de peso reducido (-8g). Pinza unida un 11% más rígida.',
    forceSpecs: 'Discos Paceline X ligeros con araña de aluminio pulido. Excelente disipación de calor.',
    rivalSpecs: 'Discos Paceline con araña de aluminio estándar, ahorrando 20g en comparación con la araña de acero anterior.'
  }
];

export const APP_FEATURES = [
  {
    title: 'Conectar Componentes',
    description: 'Empareje y conecte sus desviadores, manetas y tijas vía Bluetooth directamente con su smartphone.',
    icon: 'bluetooth'
  },
  {
    title: 'Perfiles de Bicicleta',
    description: 'Cree y personalice perfiles para múltiples bicicletas y realice un seguimiento pormenorizado.',
    icon: 'pedal_bike'
  },
  {
    title: 'Estado y Rendimiento',
    description: 'Monitoree el nivel de carga de las baterías, cantidad de cambios realizados y estado de salud general.',
    icon: 'analytics'
  },
  {
    title: 'Personalizar Comportamiento',
    description: 'Adapte la transmisión a su estilo: active cambios secuenciales, compensatorios o configure los botones.',
    icon: 'tune'
  },
  {
    title: 'Botones y Mandos',
    description: 'Asigne acciones personalizadas a los controles físicos y configure los Bonus Buttons o Wireless Blips.',
    icon: 'touch_app'
  },
  {
    title: 'Actualizaciones de Firmware',
    description: 'Mantenga sus componentes al día con parches inalámbricos para garantizar la máxima compatibilidad y rendimiento.',
    icon: 'system_update'
  }
];

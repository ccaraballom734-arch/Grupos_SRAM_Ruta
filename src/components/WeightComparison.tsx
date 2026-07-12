import { useState } from 'react';

interface GroupSelection {
  manetas: 'red' | 'force' | 'rival';
  bielas: 'red' | 'force' | 'rival';
  cadena: 'red' | 'force' | 'rival';
  desviadorTrat: 'red' | 'force' | 'rival';
  desviadorDel: 'red' | 'force' | 'rival';
  discos: 'red' | 'force' | 'rival';
}

export default function WeightComparison() {
  const [selectedGroup, setSelectedGroup] = useState<'red' | 'force' | 'rival'>('red');
  
  // Mix and Match state
  const [mixMatch, setMixMatch] = useState<GroupSelection>({
    manetas: 'red',
    bielas: 'force',
    cadena: 'red',
    desviadorTrat: 'red',
    desviadorDel: 'force',
    discos: 'red',
  });

  const weights = {
    red: {
      manetas: 556,
      bielas: 580,
      cadena: 249,
      desviadorTrat: 262,
      desviadorDel: 142,
      discos: 220,
      miscelaneos: 487, // batteries, wires, fluids, cassette
      total: 2496,
    },
    force: {
      manetas: 642,
      bielas: 715,
      cadena: 266,
      desviadorTrat: 295,
      desviadorDel: 182,
      discos: 245,
      miscelaneos: 325,
      total: 2670,
    },
    rival: {
      manetas: 712,
      bielas: 840,
      cadena: 282,
      desviadorTrat: 327,
      desviadorDel: 198,
      discos: 270,
      miscelaneos: 480,
      total: 3109,
    },
  };

  const calculateCustomWeight = () => {
    return (
      weights[mixMatch.manetas].manetas +
      weights[mixMatch.bielas].bielas +
      weights[mixMatch.cadena].cadena +
      weights[mixMatch.desviadorTrat].desviadorTrat +
      weights[mixMatch.desviadorDel].desviadorDel +
      weights[mixMatch.discos].discos +
      380 // average miscellaneous
    );
  };

  const customWeight = calculateCustomWeight();

  // Helper to get color of selected element
  const getGroupColor = (groupId: 'red' | 'force' | 'rival') => {
    if (groupId === 'red') return 'bg-[#E11D22]';
    if (groupId === 'force') return 'bg-gray-600';
    return 'bg-gray-300 text-gray-800';
  };

  const getGroupTextColor = (groupId: 'red' | 'force' | 'rival') => {
    if (groupId === 'red') return 'text-[#E11D22]';
    if (groupId === 'force') return 'text-gray-600';
    return 'text-gray-400';
  };

  return (
    <div id="weight-comparison" className="backdrop-blur-xl bg-white/45 border border-white/60 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="font-display font-bold text-xl uppercase tracking-wide text-gray-800">
            Comparativa Dinámica de Pesos
          </h3>
          <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-0.5">Sección 9 • Configuración Personalizada</p>
        </div>
        
        {/* Quick presets selectors */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl self-start">
          {(['red', 'force', 'rival'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGroup(g)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedGroup === g
                  ? g === 'red'
                    ? 'bg-[#E11D22] text-white'
                    : g === 'force'
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-400 text-white'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-600 mb-6 leading-relaxed">
        El peso es vital. Descubra cómo influyen las tecnologías en cada componente. 
        Compare los tres grupos estándar o cree su propia <strong>bici personalizada híbrida (Mix & Match)</strong> abajo para recalcular el peso del conjunto:
      </p>

      {/* Main Bar Chart Comparison */}
      <div className="space-y-4 mb-8 bg-white/70 p-5 rounded-2xl border border-gray-100 shadow-sm">
        <h4 className="text-[10px] uppercase font-black tracking-wider text-gray-400 mb-2">
          PESO TOTAL DEL GRUPO (GRAMOS)
        </h4>

        {/* RED Bar */}
        <div className={`space-y-1 transition-all duration-300 ${selectedGroup === 'red' ? 'scale-[1.01]' : 'opacity-70'}`}>
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-bold text-gray-800">SRAM RED AXS (Competición)</span>
            <span className="font-mono text-xs font-black text-[#E11D22]">2.496g</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#E11D22] rounded-full transition-all duration-500" style={{ width: `${(2496 / 3109) * 100}%` }}></div>
          </div>
        </div>

        {/* FORCE Bar */}
        <div className={`space-y-1 transition-all duration-300 ${selectedGroup === 'force' ? 'scale-[1.01]' : 'opacity-70'}`}>
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-bold text-gray-800">SRAM FORCE AXS (Pro Performance)</span>
            <span className="font-mono text-xs font-black text-gray-600">2.670g</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gray-600 rounded-full transition-all duration-500" style={{ width: `${(2670 / 3109) * 100}%` }}></div>
          </div>
        </div>

        {/* RIVAL Bar */}
        <div className={`space-y-1 transition-all duration-300 ${selectedGroup === 'rival' ? 'scale-[1.01]' : 'opacity-70'}`}>
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-bold text-gray-800">SRAM RIVAL AXS (Acceso Premium)</span>
            <span className="font-mono text-xs font-black text-gray-400">3.109g</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gray-400 rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
          </div>
        </div>

        {/* Custom Mix & Match Bar */}
        <div className="space-y-1 border-t border-gray-100 pt-4 mt-2">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-bold text-[#E11D22] uppercase tracking-wide flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
              Tu Configuración Híbrida
            </span>
            <span className="font-mono text-xs font-black text-red-600">{customWeight}g</span>
          </div>
          <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-600 to-gray-700 rounded-full transition-all duration-300" style={{ width: `${(customWeight / 3109) * 100}%` }}></div>
          </div>
        </div>
      </div>

      {/* Mix & Match Configurator Board */}
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-brand-red text-sm">construction</span>
          <h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-widest">
            Tablero Mix & Match: Diseña tu Transmisión
          </h4>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          {/* Manetas */}
          <div>
            <label className="block text-[9px] uppercase font-bold text-gray-500 mb-1">Manetas y Pinzas</label>
            <select
              value={mixMatch.manetas}
              onChange={(e) => setMixMatch(prev => ({ ...prev, manetas: e.target.value as any }))}
              className="w-full bg-white border border-gray-200 rounded-xl p-1.5 text-[10px] font-semibold cursor-pointer"
            >
              <option value="red">RED ({weights.red.manetas}g)</option>
              <option value="force">Force ({weights.force.manetas}g)</option>
              <option value="rival">Rival ({weights.rival.manetas}g)</option>
            </select>
          </div>

          {/* Bielas */}
          <div>
            <label className="block text-[9px] uppercase font-bold text-gray-500 mb-1">Bielas y Platos</label>
            <select
              value={mixMatch.bielas}
              onChange={(e) => setMixMatch(prev => ({ ...prev, bielas: e.target.value as any }))}
              className="w-full bg-white border border-gray-200 rounded-xl p-1.5 text-[10px] font-semibold cursor-pointer"
            >
              <option value="red">RED ({weights.red.bielas}g)</option>
              <option value="force">Force ({weights.force.bielas}g)</option>
              <option value="rival">Rival ({weights.rival.bielas}g)</option>
            </select>
          </div>

          {/* Cadena */}
          <div>
            <label className="block text-[9px] uppercase font-bold text-gray-500 mb-1">Cadena Flattop</label>
            <select
              value={mixMatch.cadena}
              onChange={(e) => setMixMatch(prev => ({ ...prev, cadena: e.target.value as any }))}
              className="w-full bg-white border border-gray-200 rounded-xl p-1.5 text-[10px] font-semibold cursor-pointer"
            >
              <option value="red">RED ({weights.red.cadena}g)</option>
              <option value="force">Force ({weights.force.cadena}g)</option>
              <option value="rival">Rival ({weights.rival.cadena}g)</option>
            </select>
          </div>

          {/* Desviador Trasero */}
          <div>
            <label className="block text-[9px] uppercase font-bold text-gray-500 mb-1">Cambio Trasero</label>
            <select
              value={mixMatch.desviadorTrat}
              onChange={(e) => setMixMatch(prev => ({ ...prev, desviadorTrat: e.target.value as any }))}
              className="w-full bg-white border border-gray-200 rounded-xl p-1.5 text-[10px] font-semibold cursor-pointer"
            >
              <option value="red">RED ({weights.red.desviadorTrat}g)</option>
              <option value="force">Force ({weights.force.desviadorTrat}g)</option>
              <option value="rival">Rival ({weights.rival.desviadorTrat}g)</option>
            </select>
          </div>

          {/* Desviador Delantero */}
          <div>
            <label className="block text-[9px] uppercase font-bold text-gray-500 mb-1">Desviador Del.</label>
            <select
              value={mixMatch.desviadorDel}
              onChange={(e) => setMixMatch(prev => ({ ...prev, desviadorDel: e.target.value as any }))}
              className="w-full bg-white border border-gray-200 rounded-xl p-1.5 text-[10px] font-semibold cursor-pointer"
            >
              <option value="red">RED ({weights.red.desviadorDel}g)</option>
              <option value="force">Force ({weights.force.desviadorDel}g)</option>
              <option value="rival">Rival ({weights.rival.desviadorDel}g)</option>
            </select>
          </div>

          {/* Discos */}
          <div>
            <label className="block text-[9px] uppercase font-bold text-gray-500 mb-1">Discos de Freno</label>
            <select
              value={mixMatch.discos}
              onChange={(e) => setMixMatch(prev => ({ ...prev, discos: e.target.value as any }))}
              className="w-full bg-white border border-gray-200 rounded-xl p-1.5 text-[10px] font-semibold cursor-pointer"
            >
              <option value="red">RED ({weights.red.discos}g)</option>
              <option value="force">Force ({weights.force.discos}g)</option>
              <option value="rival">Rival ({weights.rival.discos}g)</option>
            </select>
          </div>
        </div>

        {/* Customized Stats Details */}
        <div className="mt-4 pt-4 border-t border-gray-200/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <p className="text-[10px] font-bold text-gray-600 uppercase">
              Ahorro de Peso Estimado:
            </p>
            <p className="text-xs text-gray-500">
              {customWeight < 3109 
                ? `Estás ahorrando ${3109 - customWeight}g comparado con un grupo Rival completo.` 
                : 'Tu peso está optimizado respecto a estándares básicos.'}
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setMixMatch({ manetas: 'red', bielas: 'red', cadena: 'red', desviadorTrat: 'red', desviadorDel: 'red', discos: 'red' })}
              className="px-2.5 py-1.5 border border-gray-200 bg-white hover:bg-gray-100 text-[9px] font-bold uppercase rounded-lg transition-colors cursor-pointer"
            >
              Todo RED
            </button>
            <button 
              onClick={() => setMixMatch({ manetas: 'rival', bielas: 'rival', cadena: 'rival', desviadorTrat: 'rival', desviadorDel: 'rival', discos: 'rival' })}
              className="px-2.5 py-1.5 border border-gray-200 bg-white hover:bg-gray-100 text-[9px] font-bold uppercase rounded-lg transition-colors cursor-pointer"
            >
              Todo Rival
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

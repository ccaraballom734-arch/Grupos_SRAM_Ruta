import { useState } from 'react';

interface CodePart {
  type: string;
  name: string;
  desc: string;
}

export default function ModelCodeTool() {
  const [productType, setProductType] = useState('RD');
  const [platform, setPlatform] = useState('RED');
  const [version, setVersion] = useState('E');
  const [iteration, setIteration] = useState('1');

  const productTypes: Record<string, CodePart> = {
    'RD': { type: 'Desviador Trasero', name: 'Rear Derailleur', desc: 'Controla el cambio de coronas en el cassette. Es el componente principal (cerebro) del sistema AXS.' },
    'FD': { type: 'Desviador Delantero', name: 'Front Derailleur', desc: 'Gestiona el cambio entre platos. Cuenta con tecnología de autoalineación para evitar roces de la cadena.' },
    'ED': { type: 'Manetas y Frenos', name: 'Electronic Disc', desc: 'Conjunto de manetas de freno/cambio hidráulico electrónico de alta precisión.' },
    'FC': { type: 'Bielas', name: 'Crankset', desc: 'Transmite la fuerza directa de pedaleo. Disponible con potenciómetro integrado.' },
    'CS': { type: 'Cassette', name: 'Cassette', desc: 'Piñonera de ruta de amplio rango con tallado X-Range.' },
    'CN': { type: 'Cadena', name: 'Chain', desc: 'Cadena Flattop con parte superior plana para incrementar la resistencia y durabilidad.' }
  };

  const platforms: Record<string, CodePart> = {
    'RED': { type: 'SRAM RED AXS', name: 'RED', desc: 'La serie de competición de máxima categoría. Diseñada para lograr el mínimo peso, máxima rigidez y prestaciones de élite.' },
    'FOR': { type: 'SRAM FORCE AXS', name: 'Force', desc: 'Serie de alto rendimiento para competición y ciclistas exigentes. Ofrece la precisión de RED con un peso muy contenido.' },
    'RIV': { type: 'SRAM RIVAL AXS', name: 'Rival', desc: 'Serie premium de entrada. Excelente relación costo-beneficio, durabilidad extrema y conectividad total AXS.' }
  };

  const versions: Record<string, string> = {
    'E': 'Quinta Generación (E - Electronic)',
    'D': 'Cuarta Generación',
    'C': 'Tercera Generación',
    'A': 'Primera Generación / Iteración Original'
  };

  const iterations: Record<string, string> = {
    '1': 'Primera iteración de diseño',
    '2': 'Segunda iteración (refinamiento)',
    '3': 'Tercera iteración (actualización)'
  };

  const generatedCode = `${productType}-${platform}-${version}-${iteration}`;

  return (
    <div id="model-code-tool" className="backdrop-blur-md bg-white/45 border border-white/60 p-6 rounded-3xl shadow-xl transition-all hover:shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-xl uppercase tracking-wide text-gray-800">
          Identificador de Código de Modelo
        </h3>
        <span className="material-symbols-outlined text-[#E11D22] animate-pulse">qr_code_scanner</span>
      </div>
      
      <p className="text-xs text-gray-600 mb-6 leading-relaxed">
        El código de modelo y los detalles de especificaciones se identifican mediante el número de serie. 
        Úselo para identificar piezas de repuesto, mantenimiento y compatibilidad. Seleccione componentes a continuación para decodificar un modelo:
      </p>

      {/* Interactive Display Card */}
      <div className="bg-gray-900 text-white rounded-2xl p-5 mb-6 font-mono text-center shadow-inner relative overflow-hidden">
        <div className="absolute top-0 left-0 bg-brand-red px-2 py-0.5 text-[8px] uppercase tracking-widest font-sans font-bold">
          CÓDIGO GENERADO
        </div>
        <div className="flex justify-center items-center gap-2 text-xl md:text-2xl font-bold tracking-widest my-2 select-all">
          <span className="text-red-400 border-b-2 border-red-400 pb-1">{productType}</span>
          <span className="text-gray-500">-</span>
          <span className="text-blue-400 border-b-2 border-blue-400 pb-1">{platform}</span>
          <span className="text-gray-500">-</span>
          <span className="text-yellow-400 border-b-2 border-yellow-400 pb-1">{version}</span>
          <span className="text-gray-500">-</span>
          <span className="text-green-400 border-b-2 border-green-400 pb-1">{iteration}</span>
        </div>
        <p className="text-[10px] text-gray-400 font-sans mt-2 italic">
          Pulse los selectores de abajo para modificar el código dinámicamente.
        </p>
      </div>

      {/* Selectors Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">1. Tipo Producto</label>
          <select 
            value={productType} 
            onChange={(e) => setProductType(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl p-2 text-xs font-medium focus:outline-none focus:border-brand-red cursor-pointer"
          >
            {Object.keys(productTypes).map(key => (
              <option key={key} value={key}>{key} ({productTypes[key].type})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">2. Plataforma / Serie</label>
          <select 
            value={platform} 
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl p-2 text-xs font-medium focus:outline-none focus:border-brand-red cursor-pointer"
          >
            {Object.keys(platforms).map(key => (
              <option key={key} value={key}>{key} ({platforms[key].name})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">3. Versión</label>
          <select 
            value={version} 
            onChange={(e) => setVersion(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl p-2 text-xs font-medium focus:outline-none focus:border-brand-red cursor-pointer"
          >
            {Object.keys(versions).map(key => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">4. Iteración</label>
          <select 
            value={iteration} 
            onChange={(e) => setIteration(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl p-2 text-xs font-medium focus:outline-none focus:border-brand-red cursor-pointer"
          >
            {Object.keys(iterations).map(key => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Explanatory Breakdown Panel */}
      <div className="bg-white/70 rounded-2xl border border-gray-100 p-4 space-y-3 shadow-sm">
        <h4 className="text-[10px] uppercase font-black tracking-wider text-gray-500 border-b border-gray-100 pb-1">
          Desglose Explicativo del Código:
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-red-100 text-brand-red flex items-center justify-center font-bold text-xs font-mono shrink-0">
              {productType}
            </span>
            <div>
              <p className="text-xs font-bold text-gray-800">{productTypes[productType].type}</p>
              <p className="text-[10px] text-gray-500 leading-relaxed">{productTypes[productType].desc}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs font-mono shrink-0">
              {platform}
            </span>
            <div>
              <p className="text-xs font-bold text-gray-800">{platforms[platform].type}</p>
              <p className="text-[10px] text-gray-500 leading-relaxed">{platforms[platform].desc}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-yellow-100 text-yellow-700 flex items-center justify-center font-bold text-xs font-mono shrink-0">
              {version}
            </span>
            <div>
              <p className="text-xs font-bold text-gray-800">Generación del Componente</p>
              <p className="text-[10px] text-gray-500 leading-relaxed">{versions[version]}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs font-mono shrink-0">
              {iteration}
            </span>
            <div>
              <p className="text-xs font-bold text-gray-800">Iteración de Desarrollo</p>
              <p className="text-[10px] text-gray-500 leading-relaxed">{iterations[iteration]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

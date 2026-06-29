import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bike, 
  Settings, 
  Activity, 
  Bluetooth, 
  Cpu, 
  Gauge, 
  Layers, 
  RotateCcw, 
  Info, 
  Sliders, 
  Smartphone, 
  Wrench, 
  Download, 
  AlertCircle, 
  ChevronRight, 
  ExternalLink,
  SlidersHorizontal,
  Weight,
  HelpCircle,
  Code
} from 'lucide-react';

import { GROUPS, COMPONENT_WEIGHTS, PARTS, APP_FEATURES } from './data';
import { GroupInfo, ComponentPart } from './types';
import ModelCodeTool from './components/ModelCodeTool';
import PairingSimulator from './components/PairingSimulator';
import WeightComparison from './components/WeightComparison';
import GroupModal from './components/GroupModal';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('presentacion');
  const [selectedGroupFilter, setSelectedGroupFilter] = useState<'all' | 'red' | 'force' | 'rival'>('all');
  const [selectedPartFilter, setSelectedPartFilter] = useState<string>('all');
  const [selectedGroupModal, setSelectedGroupModal] = useState<GroupInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-scroll indicator or visual cues helper
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['presentacion', 'modelo', 'app-axs', 'emparejamiento', 'red-info', 'force-info', 'rival-info', 'comparativa'];
      const scrollPos = window.scrollY + 250;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  const handleOpenDetailModal = (groupId: 'red' | 'force' | 'rival') => {
    const group = GROUPS.find(g => g.id === groupId);
    if (group) {
      setSelectedGroupModal(group);
      setIsModalOpen(true);
    }
  };

  // Filtered Parts list for Section 9 Portfolio Gallery
  const filteredParts = selectedPartFilter === 'all' 
    ? PARTS 
    : PARTS.filter(p => p.id === selectedPartFilter);

  const filteredGroups = selectedGroupFilter === 'all'
    ? GROUPS
    : GROUPS.filter(g => g.id === selectedGroupFilter);

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex flex-col text-[#1A1A1A] overflow-x-hidden font-sans">
      
      {/* 1. Header Section */}
      <header className="sticky top-0 h-20 bg-white/95 border-b border-gray-200 flex items-center justify-between px-6 md:px-12 z-40 backdrop-blur-md shadow-sm transition-all">
        <div className="flex items-center gap-4">
          {/* Brand logo custom styled with premium scale animations */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-[#E11D22] text-white px-5 py-1.5 font-black text-2xl tracking-tighter italic cursor-pointer shadow-md shadow-red-200"
            onClick={() => scrollToSection('presentacion')}
            id="brand-logo"
          >
            SRAM
          </motion.div>
          <div className="h-8 w-[1px] bg-gray-300 hidden sm:block"></div>
          <span className="font-display font-medium tracking-widest text-[10px] uppercase text-gray-500 hidden sm:block">
            AXS Road Ecosystem
          </span>
        </div>

        {/* Active Desktop Navigation */}
        <nav className="hidden lg:flex gap-8 text-[11px] uppercase tracking-widest font-bold">
          <button 
            onClick={() => scrollToSection('presentacion')}
            className={`cursor-pointer hover:text-[#E11D22] transition-colors pb-1 border-b-2 ${activeSection === 'presentacion' ? 'text-[#E11D22] border-[#E11D22]' : 'text-gray-500 border-transparent'}`}
          >
            Portafolio
          </button>
          <button 
            onClick={() => scrollToSection('modelo')}
            className={`cursor-pointer hover:text-[#E11D22] transition-colors pb-1 border-b-2 ${activeSection === 'modelo' ? 'text-[#E11D22] border-[#E11D22]' : 'text-gray-500 border-transparent'}`}
          >
            ID Modelo
          </button>
          <button 
            onClick={() => scrollToSection('app-axs')}
            className={`cursor-pointer hover:text-[#E11D22] transition-colors pb-1 border-b-2 ${activeSection === 'app-axs' ? 'text-[#E11D22] border-[#E11D22]' : 'text-gray-500 border-transparent'}`}
          >
            App AXS
          </button>
          <button 
            onClick={() => scrollToSection('emparejamiento')}
            className={`cursor-pointer hover:text-[#E11D22] transition-colors pb-1 border-b-2 ${activeSection === 'emparejamiento' ? 'text-[#E11D22] border-[#E11D22]' : 'text-gray-500 border-transparent'}`}
          >
            Sincronización
          </button>
          <button 
            onClick={() => scrollToSection('comparativa')}
            className={`cursor-pointer hover:text-[#E11D22] transition-colors pb-1 border-b-2 ${activeSection === 'comparativa' ? 'text-[#E11D22] border-[#E11D22]' : 'text-gray-500 border-transparent'}`}
          >
            Pesos
          </button>
        </nav>

        {/* Action Button */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => scrollToSection('comparativa')}
          className="bg-black hover:bg-[#E11D22] text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer hidden md:flex items-center gap-1.5 shadow-sm"
          id="action-calc-btn"
        >
          <Weight size={12} />
          Configurador Híbrido
        </motion.button>
      </header>

      <div className="flex-1 flex max-w-[1400px] mx-auto w-full relative">
        
        {/* Floating Lateral Navigation Rail (Sections indicators) */}
        <aside className="w-16 bg-white border-r border-gray-200 hidden xl:flex flex-col items-center py-10 gap-6 sticky top-20 h-[calc(100vh-80px)] shrink-0 justify-between">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-mono text-gray-400 font-bold tracking-widest uppercase rotate-90 my-6 whitespace-nowrap">SECCIONES</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red mb-1"></span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            {[
              { id: 'presentacion', label: '01', title: 'Presentación' },
              { id: 'modelo', label: '02', title: 'Modelo ID' },
              { id: 'app-axs', label: '03', title: 'App AXS' },
              { id: 'emparejamiento', label: '04', title: 'Pairing' },
              { id: 'red-info', label: '06', title: 'SRAM RED' },
              { id: 'force-info', label: '07', title: 'SRAM Force' },
              { id: 'rival-info', label: '08', title: 'SRAM Rival' },
              { id: 'comparativa', label: '09', title: 'Pesos' }
            ].map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                title={sec.title}
                className={`w-8 h-8 rounded-full text-[10px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                  activeSection === sec.id 
                    ? 'bg-[#E11D22] text-white shadow-sm' 
                    : 'text-gray-400 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>

          <div className="rotate-90 origin-center translate-y-6 mt-4">
            <span className="text-[9px] font-black tracking-widest text-gray-400 uppercase whitespace-nowrap">SCROLL EXPLORE</span>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-10 space-y-16">
          
          {/* SECTION 1: PRESENTACIÓN */}
          <section id="presentacion" className="scroll-mt-24 space-y-6">
            <div className="backdrop-blur-md bg-white/45 border border-white/60 p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_top_right,_rgba(225,29,34,0.1),_transparent_60%)] pointer-events-none"></div>
              
              <div className="max-w-2xl space-y-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                  01 • Portafolio de Ruta
                </span>
                <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-gray-900 leading-none">
                  Grupos SRAM <span className="text-[#E11D22]">AXS</span> de Ruta
                </h1>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium">
                  Bienvenido al ecosistema interactivo de la transmisión de ruta más sofisticada de SRAM. 
                  Conectividad inalámbrica total, ergonomía perfeccionada, rendimiento supremo y el peso más ligero de su clase.
                  Explore cada grupo a continuación, decodifique su código o empareje sus componentes en tiempo real.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button 
                    onClick={() => scrollToSection('comparativa')}
                    className="px-5 py-2.5 bg-[#E11D22] hover:bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-red-200 hover:shadow-none"
                  >
                    Comparador de Pesos
                  </button>
                  <button 
                    onClick={() => scrollToSection('emparejamiento')}
                    className="px-5 py-2.5 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Sincronizador Inalámbrico
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: IDENTIFICACIÓN DEL CÓDIGO DE MODELO */}
          <section id="modelo" className="scroll-mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                  02 • Identificación de Modelo
                </span>
                <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-tight text-gray-900">
                  ¿Cómo leer su código SRAM?
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed">
                  El código de modelo y las especificaciones del producto pueden identificarse mediante el número de serie único grabado en cada pieza.
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Este identificador alfanumérico le ayuda a conocer exactamente el año, plataforma, generación e iteración del producto. Es indispensable para seleccionar piezas de repuesto originales, kits de mantenimiento preventivo y verificar la compatibilidad de lubricantes y fluidos de frenos hidráulicos.
                </p>

                {/* Example Explanatory box */}
                <div className="bg-white/90 p-4 rounded-2xl border border-gray-100 shadow-sm space-y-2 font-sans">
                  <p className="text-[9px] font-black uppercase text-brand-red tracking-wider">
                    Ejemplo de Código Oficial:
                  </p>
                  <div className="font-mono text-base font-bold bg-gray-100 p-2.5 rounded-xl border border-gray-200 text-center text-gray-800">
                    RD-RED-E-E1
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[10px] pt-1">
                    <div className="border-r border-gray-100 pr-1.5">
                      <p className="font-bold text-gray-700">RD</p>
                      <p className="text-gray-500">Desviador Trasero</p>
                    </div>
                    <div className="border-r border-gray-100 px-1.5">
                      <p className="font-bold text-gray-700">RED</p>
                      <p className="text-gray-500">Plataforma</p>
                    </div>
                    <div className="pl-1.5">
                      <p className="font-bold text-gray-700">E1</p>
                      <p className="text-gray-500">5ª Gen / 1ª Iteración</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive decoder widget */}
              <div className="lg:col-span-7">
                <ModelCodeTool />
              </div>
            </div>
          </section>

          {/* SECTION 3: APLICACIÓN SRAM AXS */}
          <section id="app-axs" className="scroll-mt-24 space-y-6">
            <div className="backdrop-blur-md bg-white/45 border border-white/60 p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left col - Details */}
                <div className="lg:col-span-7 space-y-5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full border border-gray-100 shadow-sm inline-block">
                    03 • Aplicación SRAM AXS
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase leading-none text-gray-900">
                    Sincronice su experiencia con SRAM AXS
                  </h2>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Descargue la aplicación SRAM AXS de forma gratuita en su tienda de aplicaciones para crear su cuenta, agregar componentes y personalizar su estilo de conducción. 
                  </p>
                  
                  {/* Advantages grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {APP_FEATURES.map((feat) => (
                      <div key={feat.title} className="bg-white/80 p-3.5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-3">
                        <span className="material-symbols-outlined text-[#E11D22] text-xl shrink-0 mt-0.5">
                          {feat.icon}
                        </span>
                        <div>
                          <h4 className="text-xs font-bold text-gray-800">{feat.title}</h4>
                          <p className="text-[10px] text-gray-500 leading-relaxed mt-0.5">{feat.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-[10px] text-gray-500 leading-relaxed border-l-2 border-[#E11D22] pl-3 italic">
                    Para lograr un rendimiento óptimo y compatibilidad del sistema, asegúrese de tener instalada la última versión de la aplicación SRAM AXS y del firmware de los componentes. Las actualizaciones se realizan de forma completamente inalámbrica.
                  </p>
                </div>

                {/* Right col - App mockup with download simulation */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center bg-gray-900 text-white p-6 rounded-3xl relative overflow-hidden shadow-inner h-[400px]">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-brand-red/10 rounded-full blur-2xl"></div>
                  
                  <span className="text-[8px] tracking-widest font-bold uppercase text-brand-red mb-1">DASHBOARD DE LA APP</span>
                  <div className="w-full max-w-[240px] bg-black/60 border border-gray-800 rounded-3xl p-4 space-y-4 shadow-2xl relative">
                    {/* Phone frame top notches */}
                    <div className="w-20 h-4 bg-black rounded-b-xl mx-auto -mt-4 mb-2 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                    </div>
                    
                    {/* App Head */}
                    <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                      <span className="text-[9px] font-black tracking-widest text-[#E11D22]">SRAM AXS</span>
                      <span className="text-[8px] text-green-500 font-mono font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        BT CONECTADO
                      </span>
                    </div>

                    {/* Bike profile */}
                    <div className="bg-gray-900/90 p-2.5 rounded-xl text-center border border-gray-800">
                      <p className="text-[8px] text-gray-400 uppercase font-bold tracking-wider">Mi Bicicleta</p>
                      <p className="text-xs font-black italic text-white tracking-wide">RED AXS SL-1</p>
                    </div>

                    {/* Component battery meter */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[8px] text-gray-400">
                        <span>Desviador Trasero (RD)</span>
                        <span className="text-green-400 font-bold">90%</span>
                      </div>
                      <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full w-[90%]"></div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[8px] text-gray-400">
                        <span>Desviador Delantero (FD)</span>
                        <span className="text-green-400 font-bold">100%</span>
                      </div>
                      <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full w-full"></div>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="pt-2">
                      <a 
                        href="https://www.sram.com/es/sram/road/technologies/axs" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full py-2 bg-brand-red text-white hover:bg-white hover:text-black rounded-lg text-[9px] font-bold tracking-widest uppercase text-center block transition-all shadow-md shadow-red-950"
                      >
                        Descargar Gratis App
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SECTION 4 & 5: EMPAREJAMIENTO DEL SISTEMA Y WIRELESS BLIPS */}
          <section id="emparejamiento" className="scroll-mt-24 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column - Detailed pairing instructions */}
              <div className="lg:col-span-5 space-y-5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full border border-gray-100 shadow-sm inline-block">
                  04 • Emparejamiento
                </span>
                <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-tight text-gray-900">
                  Emparejamiento del sistema SRAM AXS
                </h2>
                
                <div className="space-y-4 text-xs text-gray-600 leading-relaxed">
                  <p>
                    Cada sistema AXS tiene un componente principal que comienza y termina la sesión de emparejamiento: el <strong>desviador trasero (Rear Derailleur)</strong>. 
                  </p>
                  <p>
                    El emparejamiento inalámbrico permite que cada componente periférico (manetas, Blips, desviador delantero, potenciómetro, tija de sillín Reverb AXS) se comunique en un ecosistema cerrado cuando se transmite la orden de cambio.
                  </p>
                </div>

                <div className="border-t border-gray-200/60 pt-4 space-y-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full border border-gray-100 shadow-sm inline-block">
                    05 • Wireless Blips
                  </span>
                  <h3 className="text-lg font-bold text-gray-800">
                    Asignación de los Wireless Blips
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Al emparejar los Wireless Blips de forma secuencial en el sistema, se les asigna una acción según su orden:
                  </p>
                  
                  {/* Blip sequence explanation */}
                  <div className="space-y-2 bg-white/70 p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex gap-2.5 items-center">
                      <span className="w-5 h-5 rounded-lg bg-red-100 text-[#E11D22] font-mono font-bold flex items-center justify-center text-xs">1°</span>
                      <p className="text-[11px] font-semibold text-gray-700">Primer Blip: Cambio hacia FUERA (bajar piñón)</p>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-5 h-5 rounded-lg bg-red-100 text-[#E11D22] font-mono font-bold flex items-center justify-center text-xs">2°</span>
                      <p className="text-[11px] font-semibold text-gray-700">Segundo Blip: Cambio hacia DENTRO (subir piñón)</p>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-5 h-5 rounded-lg bg-black text-white font-mono font-bold flex items-center justify-center text-xs">1+2</span>
                      <p className="text-[11px] font-semibold text-gray-700">Pulsar Ambos: Acciona el desviador delantero</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    *Puede emparejar hasta cuatro juegos de Wireless Blips en el mismo sistema para tener múltiples puntos de cambio de marcha (por ejemplo, en las curvas del manillar o acoples de triatlón).
                  </p>
                </div>
              </div>

              {/* Right Column - Interactive pairing simulation console */}
              <div className="lg:col-span-7">
                <PairingSimulator />
              </div>

            </div>
          </section>

          {/* SECTION 6, 7 & 8: SPECIFIC DETAIL SECTIONS FOR GROUPS */}
          <section id="groups-info" className="space-y-12">
            
            {/* Header intro of detail groups specs */}
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tecnología de Transmisión Inalámbrica</span>
              <h2 className="text-3xl font-black italic tracking-tighter uppercase text-gray-900">
                La Gama de Ruta SRAM AXS
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                Profundice en los aspectos de ergonomía, ahorro de peso y diseño de los componentes clave de cada serie: SRAM RED, SRAM Force y SRAM Rival.
              </p>
            </div>

            {/* RED (06) Detail view */}
            <div id="red-info" className="scroll-mt-24 bg-white/50 border border-gray-200/60 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 bg-[#E11D22] text-white px-4 py-1 text-[10px] font-bold tracking-widest uppercase">
                SERIE 06 • TOP TIER
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-6 space-y-4">
                  <h3 className="text-4xl font-black italic tracking-tighter text-gray-900">
                    SRAM RED <span className="text-[#E11D22]">AXS</span>
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">El desarrollo de nuestros frenos más potentes</p>
                  
                  <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
                    <p>
                      Las manetas SRAM RED AXS son el centro neurálgico de tus sensaciones. No solo sirven para cambiar y frenar, también son un cómodo punto de contacto ergonómico y una vía excelente para interactuar con tu ciclocomputador mediante los <strong>Bonus Buttons</strong> programables.
                    </p>
                    <p>
                      Hemos ahorrado peso en todos los puntos posibles: el conjunto de manetas y pinzas es <strong>83g más ligero</strong> que la generación anterior. Las pinzas no solo son más ligeras; la estructura unida de sus dos mitades las hace notablemente más rígidas, desplazando los pistones hacia fuera para ganar potencia de frenado y reducir un <strong>80% el esfuerzo</strong> requerido desde las manetas.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2.5 py-1 bg-black text-white text-[9px] font-bold rounded-md uppercase">HollowPin</span>
                    <span className="px-2.5 py-1 bg-black text-white text-[9px] font-bold rounded-md uppercase">Reach Adjust</span>
                    <span className="px-2.5 py-1 bg-black text-white text-[9px] font-bold rounded-md uppercase">Contact Point</span>
                    <span className="px-2.5 py-1 bg-black text-white text-[9px] font-bold rounded-md uppercase">Paceline X</span>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-white/90 p-5 rounded-2xl border border-gray-100 space-y-4">
                  <h4 className="text-[10px] uppercase font-black tracking-wider text-gray-400">Detalles de Innovación y Peso (RED):</h4>
                  
                  <div className="space-y-3 text-[11px] text-gray-600 leading-relaxed">
                    <div className="border-b border-gray-100 pb-2">
                      <p className="font-bold text-gray-800">Manetas y Frenos:</p>
                      <p>Pivote de leva desplazado hacia arriba para aumentar el brazo de palanca. Menor fatiga, frenado seguro con un solo dedo.</p>
                    </div>
                    <div className="border-b border-gray-100 pb-2">
                      <p className="font-bold text-gray-800">Transmisión Electrónica:</p>
                      <p>Desviador delantero con útil de ajuste rojo (platos 46/33 a 50/37) y verde (platos 52/39 a 56/43).</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Bielas y Cadena:</p>
                      <p>Bielas de carbono ultra-ligeras con laminación optimizada por Zipp (-29g). Cadena con bulones huecos HollowPin (-13g).</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleOpenDetailModal('red')}
                    className="w-full py-2.5 bg-[#E11D22] hover:bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Ver Información Ampliada RED
                  </button>
                </div>
              </div>
            </div>

            {/* FORCE (07) Detail view */}
            <div id="force-info" className="scroll-mt-24 bg-white/50 border border-gray-200/60 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 bg-gray-600 text-white px-4 py-1 text-[10px] font-bold tracking-widest uppercase">
                SERIE 07 • PRO PERFORMANCE
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-6 space-y-4">
                  <h3 className="text-4xl font-black italic tracking-tighter text-gray-900">
                    SRAM FORCE <span className="text-gray-600 font-normal">AXS</span>
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Misma precisión, más personalización</p>

                  <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
                    <p>
                      El grupo SRAM Force AXS adopta las mismas tecnologías de diseño de RED pero orientadas a un paquete de máxima durabilidad y mantenimiento accesible. 
                    </p>
                    <p>
                      Su medidor de potencia integrado ofrece la misma estabilidad y precisión que los medidores tope de gama de SRAM, pero ahora con mayores posibilidades de personalización. Permite cambiar platos de forma rápida y cómoda gracias al innovador sistema <strong>Thread Mount</strong>.
                    </p>
                    <p>
                      Además, las bielas de carbono han sido rediseñadas por completo, restando más de <strong>30 gramos</strong> de peso al conjunto de transmisión sin perder un solo vatio de rigidez estructural.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2.5 py-1 bg-gray-600 text-white text-[9px] font-bold rounded-md uppercase">Thread Mount</span>
                    <span className="px-2.5 py-1 bg-gray-600 text-white text-[9px] font-bold rounded-md uppercase">Reach Adjust</span>
                    <span className="px-2.5 py-1 bg-gray-600 text-white text-[9px] font-bold rounded-md uppercase">Orbit Dampener</span>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-white/90 p-5 rounded-2xl border border-gray-100 space-y-4">
                  <h4 className="text-[10px] uppercase font-black tracking-wider text-gray-400">Detalles de Innovación y Peso (Force):</h4>

                  <div className="space-y-3 text-[11px] text-gray-600 leading-relaxed">
                    <div className="border-b border-gray-100 pb-2">
                      <p className="font-bold text-gray-800">Manetas y Frenos:</p>
                      <p>Ahorro de peso de 74 gramos en las manetas de carbono Force, ofreciendo un control reactivo y excelente modulación.</p>
                    </div>
                    <div className="border-b border-gray-100 pb-2">
                      <p className="font-bold text-gray-800">Útil de Ajuste de Desviador:</p>
                      <p>Alineación perfecta gracias al útil de ajuste de desviador SRAM AXS de color rojo, compatible con platos de 46/33 a 50/37 dientes.</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Cadena de Transmisión:</p>
                      <p>La cadena Force AXS combina eslabones internos ahuecados con bulones macizos, reduciendo 11 gramos en total.</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleOpenDetailModal('force')}
                    className="w-full py-2.5 bg-gray-600 hover:bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Ver Información Ampliada Force
                  </button>
                </div>
              </div>
            </div>

            {/* RIVAL (08) Detail view */}
            <div id="rival-info" className="scroll-mt-24 bg-white/50 border border-gray-200/60 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 bg-gray-300 text-gray-800 px-4 py-1 text-[10px] font-bold tracking-widest uppercase">
                SERIE 08 • ACCESS GAMA
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-6 space-y-4">
                  <h3 className="text-4xl font-black italic tracking-tighter text-gray-900">
                    SRAM RIVAL <span className="text-gray-400 font-normal">AXS</span>
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Tecnología validada por profesionales al alcance de todos</p>

                  <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
                    <p>
                      Rival AXS ofrece excelentes prestaciones de cambio electrónico inalámbrico a un precio altamente competitivo. Es considerablemente más ligero que generaciones previas y ofrece a los ciclistas aficionados una potente frenada modular sin casi esfuerzo.
                    </p>
                    <p>
                      Aporta medición de potencia integrada en el eje, una suave y rápida conectividad inalámbrica AXS para cambiar relaciones de marcha sobre la marcha, y un diseño ergonómico de maneta con Reach Adjust (ajuste de distancia de leva).
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2.5 py-1 bg-gray-300 text-gray-700 text-[9px] font-bold rounded-md uppercase">DUB Crankset</span>
                    <span className="px-2.5 py-1 bg-gray-300 text-gray-700 text-[9px] font-bold rounded-md uppercase">AXS Wireless</span>
                    <span className="px-2.5 py-1 bg-gray-300 text-gray-700 text-[9px] font-bold rounded-md uppercase">Paceline</span>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-white/90 p-5 rounded-2xl border border-gray-100 space-y-4">
                  <h4 className="text-[10px] uppercase font-black tracking-wider text-gray-400">Detalles de Innovación y Peso (Rival):</h4>

                  <div className="space-y-3 text-[11px] text-gray-600 leading-relaxed">
                    <div className="border-b border-gray-100 pb-2">
                      <p className="font-bold text-gray-800">Bielas y platos rediseñados:</p>
                      <p>Nuevas bielas de aluminio de alta resistencia con diseño optimizado que restan más de 50 gramos al conjunto.</p>
                    </div>
                    <div className="border-b border-gray-100 pb-2">
                      <p className="font-bold text-gray-800">Desviador Delantero:</p>
                      <p>Sincronización exacta con útil de alineación rojo diseñado especialmente para platos de 46/33 a 48/35 dientes.</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Cambio Trasero:</p>
                      <p>Análisis exhaustivo de materiales y vaciado que elimina 20 gramos de peso innecesario.</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleOpenDetailModal('rival')}
                    className="w-full py-2.5 bg-gray-400 hover:bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Ver Información Ampliada Rival
                  </button>
                </div>
              </div>
            </div>

          </section>

          {/* SECTION 9: GALERÍA INTERACTIVA DE COMPONENTES, TECNOLOGÍAS Y PESOS */}
          <section id="comparativa" className="scroll-mt-24 space-y-8">
            
            {/* Gallery Intro */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full border border-gray-100 shadow-sm inline-block">
                09 • Galería Interactiva y Portafolio
              </span>
              <h2 className="text-3xl font-black italic tracking-tighter uppercase text-gray-900 leading-none">
                Galería de Componentes y Comparador de Pesos
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed max-w-2xl">
                Utilice los filtros para examinar de manera detallada las especificaciones comparativas de cada pieza de la transmisión. 
                Vea qué tecnologías implementa cada grupo en sus manetas, bielas, cadenas, desviadores o discos de freno.
              </p>
            </div>

            {/* Interactive Filters Panel */}
            <div className="bg-white/85 p-5 rounded-3xl border border-gray-200/60 shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Part type selector */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Filtrar por Componente:</label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'all', label: 'Todos' },
                      { id: 'manetas', label: 'Manetas' },
                      { id: 'bielas', label: 'Bielas' },
                      { id: 'cadena', label: 'Cadenas' },
                      { id: 'desviadores', label: 'Desviadores' },
                      { id: 'discos', label: 'Discos/Frenos' }
                    ].map((part) => (
                      <button
                        key={part.id}
                        onClick={() => setSelectedPartFilter(part.id)}
                        className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                          selectedPartFilter === part.id
                            ? 'bg-[#E11D22] text-white shadow-sm shadow-red-200'
                            : 'bg-gray-100 text-gray-500 hover:text-gray-800'
                        }`}
                      >
                        {part.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Group selector */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block text-left sm:text-right">Mostrar Grupo:</label>
                  <div className="flex gap-1.5">
                    {[
                      { id: 'all', label: 'Todos los Grupos' },
                      { id: 'red', label: 'SRAM RED' },
                      { id: 'force', label: 'SRAM Force' },
                      { id: 'rival', label: 'SRAM Rival' }
                    ].map((grp) => (
                      <button
                        key={grp.id}
                        onClick={() => setSelectedGroupFilter(grp.id as any)}
                        className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                          selectedGroupFilter === grp.id
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-500 hover:text-gray-800'
                        }`}
                      >
                        {grp.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Dynamic Interactive Components Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {filteredParts.map((part) => (
                  <motion.div
                    key={part.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/90 p-5 rounded-2xl border border-gray-100 hover:border-brand-red/40 hover:shadow-lg transition-all space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-brand-red text-xl bg-red-50 p-2 rounded-xl">
                          {part.icon}
                        </span>
                        <div>
                          <h4 className="text-xs font-bold text-gray-800">{part.name}</h4>
                          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Especificación Comparativa</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-600 leading-relaxed italic border-l border-gray-200 pl-2.5">
                      {part.description}
                    </p>

                    <div className="space-y-2 pt-1">
                      {/* RED row */}
                      {(selectedGroupFilter === 'all' || selectedGroupFilter === 'red') && (
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline text-[11px] border-b border-gray-100 pb-1.5">
                          <span className="font-bold text-[#E11D22] uppercase tracking-wide">🔴 SRAM RED AXS:</span>
                          <span className="text-gray-700 sm:text-right max-w-[280px]">{part.redSpecs}</span>
                        </div>
                      )}
                      
                      {/* Force row */}
                      {(selectedGroupFilter === 'all' || selectedGroupFilter === 'force') && (
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline text-[11px] border-b border-gray-100 pb-1.5">
                          <span className="font-bold text-gray-600 uppercase tracking-wide">⚪ SRAM Force AXS:</span>
                          <span className="text-gray-700 sm:text-right max-w-[280px]">{part.forceSpecs}</span>
                        </div>
                      )}

                      {/* Rival row */}
                      {(selectedGroupFilter === 'all' || selectedGroupFilter === 'rival') && (
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline text-[11px]">
                          <span className="font-bold text-gray-400 uppercase tracking-wide">⚫ SRAM Rival AXS:</span>
                          <span className="text-gray-700 sm:text-right max-w-[280px]">{part.rivalSpecs}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Dynamic Comparison Tool Component */}
            <div className="pt-2">
              <WeightComparison />
            </div>

          </section>

        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-10 mt-16 text-center z-10 font-sans">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <span className="bg-[#E11D22] text-white px-3 py-1 font-black italic text-base tracking-tighter">SRAM</span>
            <span className="font-bold uppercase tracking-widest text-[9px] text-gray-400">AXS Road Ecosystem</span>
          </div>

          <p className="max-w-md md:text-right leading-relaxed">
            © 2026 SRAM LLC. Todos los derechos reservados. Desarrollado con tecnología de punta bajo el estilo Editorial Minimalista SRAM para fanáticos y profesionales del ciclismo.
          </p>
        </div>
      </footer>

      {/* Amplified Group Detail Modal */}
      <GroupModal
        group={selectedGroupModal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
}

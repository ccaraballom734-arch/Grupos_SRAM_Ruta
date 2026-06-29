import { motion, AnimatePresence } from 'motion/react';
import { GroupInfo } from '../types';

interface GroupModalProps {
  group: GroupInfo | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function GroupModal({ group, isOpen, onClose }: GroupModalProps) {
  if (!group) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            class="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Content container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            class="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white/95 border border-white rounded-3xl p-6 md:p-8 shadow-2xl z-10 font-sans"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              class="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-[#E11D22] hover:text-white text-gray-500 rounded-full transition-all duration-200 cursor-pointer"
              id="close-modal-btn"
            >
              <span class="material-symbols-outlined text-sm font-bold">close</span>
            </button>

            {/* Header / Brand */}
            <div class="mb-6">
              <span class={`px-3 py-1 text-[9px] font-bold tracking-widest rounded-md uppercase ${group.badgeBg}`}>
                {group.tier}
              </span>
              <h2 class="text-3xl md:text-4xl font-black italic tracking-tighter text-gray-900 mt-2">
                {group.name}
              </h2>
              <p class="text-sm font-medium text-[#E11D22] italic mt-1 leading-snug">
                {group.tagline}
              </p>
            </div>

            {/* Body Tabs / Sections */}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column - Key Features */}
              <div class="space-y-5">
                <div>
                  <h3 class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5 flex items-center gap-1">
                    <span class="material-symbols-outlined text-xs">info</span> Descripción General
                  </h3>
                  <p class="text-xs text-gray-700 leading-relaxed">
                    {group.description}
                  </p>
                </div>

                <div>
                  <h3 class="text-xs font-bold uppercase tracking-widest text-[#E11D22] mb-1.5 flex items-center gap-1">
                    <span class="material-symbols-outlined text-xs">sports_motorsports</span> Ergonomía del Sistema
                  </h3>
                  <p class="text-xs text-gray-600 leading-relaxed">
                    {group.ergonomics}
                  </p>
                </div>

                <div>
                  <h3 class="text-xs font-bold uppercase tracking-widest text-[#E11D22] mb-1.5 flex items-center gap-1">
                    <span class="material-symbols-outlined text-xs">album</span> Potencia de Frenada
                  </h3>
                  <p class="text-xs text-gray-600 leading-relaxed">
                    {group.power}
                  </p>
                </div>
              </div>

              {/* Right Column - Tech Specs, Parts Details */}
              <div class="space-y-5 bg-gray-50/80 p-5 rounded-2xl border border-gray-100">
                <div>
                  <h3 class="text-xs font-bold uppercase tracking-widest text-gray-700 mb-2 flex items-center gap-1">
                    <span class="material-symbols-outlined text-xs">settings_backup_restore</span> Desviador Delantero y Ajustes
                  </h3>
                  <p class="text-xs text-gray-600 leading-relaxed">
                    {group.frontDerailleur}
                  </p>
                  <p class="text-[10px] font-bold text-gray-500 mt-2 bg-white px-2.5 py-1.5 rounded-lg border border-gray-100 italic">
                    🔧 Útiles de ajuste incluidos: {group.toolInfo}
                  </p>
                </div>

                <div>
                  <h3 class="text-xs font-bold uppercase tracking-widest text-gray-700 mb-2 flex items-center gap-1">
                    <span class="material-symbols-outlined text-xs">widgets</span> Componentes del Grupo
                  </h3>
                  <div class="space-y-2 text-[11px]">
                    <div class="flex justify-between border-b border-gray-200 pb-1.5">
                      <span class="font-bold text-gray-800">Manetas:</span>
                      <span class="text-gray-600 text-right max-w-[180px]">{group.parts.manetas}</span>
                    </div>
                    <div class="flex justify-between border-b border-gray-200 pb-1.5">
                      <span class="font-bold text-gray-800">Bielas y Platos:</span>
                      <span class="text-gray-600 text-right max-w-[180px]">{group.parts.bielas}</span>
                    </div>
                    <div class="flex justify-between border-b border-gray-200 pb-1.5">
                      <span class="font-bold text-gray-800">Cadena:</span>
                      <span class="text-gray-600 text-right max-w-[180px]">{group.parts.cadena}</span>
                    </div>
                    <div class="flex justify-between border-b border-gray-200 pb-1.5">
                      <span class="font-bold text-gray-800">Desviador Trasero:</span>
                      <span class="text-gray-600 text-right max-w-[180px]">{group.parts.desviadorTrat}</span>
                    </div>
                    <div class="flex justify-between border-b border-gray-200 pb-1.5">
                      <span class="font-bold text-gray-800">Discos de Freno:</span>
                      <span class="text-gray-600 text-right max-w-[180px]">{group.parts.discos}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">
                    Tecnologías Destacadas
                  </h3>
                  <div class="flex flex-wrap gap-1.5">
                    {group.technologies.map((tech) => (
                      <span key={tech} class="px-2.5 py-1 bg-[#E11D22]/10 text-[#E11D22] text-[9px] font-bold uppercase tracking-wider rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer / Comparison Stats */}
            <div class="mt-8 pt-5 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Peso Total del Grupo</p>
                <p class="text-2xl font-black text-gray-900 font-mono">
                  {group.totalWeight}g
                  <span class="text-xs text-green-600 font-bold ml-2">
                    (-{group.weightSavings}g ahorrados)
                  </span>
                </p>
              </div>
              <button
                onClick={onClose}
                class="w-full sm:w-auto px-6 py-2.5 bg-black text-white hover:bg-[#E11D22] rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-200 cursor-pointer"
              >
                Volver al Portafolio
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type PairingState = 'IDLE' | 'RD_PAIRING' | 'PAIRING_OTHERS' | 'PAIRED_SUCCESS';

interface ComponentItem {
  id: string;
  name: string;
  type: 'RD' | 'FD' | 'LEVER_L' | 'LEVER_R' | 'BLIP_OUT' | 'BLIP_IN';
  paired: boolean;
  pairingOrder?: number;
}

export default function PairingSimulator() {
  const [pairingState, setPairingState] = useState<PairingState>('IDLE');
  const [components, setComponents] = useState<ComponentItem[]>([
    { id: 'rd', name: 'Desviador Trasero (Cerebro)', type: 'RD', paired: false },
    { id: 'fd', name: 'Desviador Delantero', type: 'FD', paired: false },
    { id: 'lever_l', name: 'Maneta Izquierda (Bajar Marcha)', type: 'LEVER_L', paired: false },
    { id: 'lever_r', name: 'Maneta Derecha (Subir Marcha)', type: 'LEVER_R', paired: false },
    { id: 'blip_1', name: 'Wireless Blip 1 (Cambio Hacia Fuera)', type: 'BLIP_OUT', paired: false },
    { id: 'blip_2', name: 'Wireless Blip 2 (Cambio Hacia Dentro)', type: 'BLIP_IN', paired: false },
  ]);
  const [pairedOrderCount, setPairedOrderCount] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>(['Sistema listo para iniciar emparejamiento.']);

  const addLog = (message: string) => {
    setLogs((prev) => [message, ...prev.slice(0, 7)]);
  };

  const startRDPairing = () => {
    setPairingState('RD_PAIRING');
    setComponents(prev => prev.map(c => c.id === 'rd' ? { ...c, paired: true } : { ...c, paired: false }));
    setPairedOrderCount(1);
    addLog('🟢 Desviador trasero (RD) activado como componente principal. LED parpadeando lento.');
    addLog('👉 Mantenga presionados los botones AXS de los otros componentes para sincronizarlos.');
  };

  const pairComponent = (id: string) => {
    if (pairingState !== 'RD_PAIRING' && pairingState !== 'PAIRING_OTHERS') return;
    
    setComponents((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          if (c.paired) return c;
          const nextOrder = pairedOrderCount + 1;
          setPairedOrderCount(nextOrder);
          
          let actionLabel = '';
          if (c.type === 'BLIP_OUT') actionLabel = ' - Asignado por defecto: Cambio hacia FUERA';
          if (c.type === 'BLIP_IN') actionLabel = ' - Asignado por defecto: Cambio hacia DENTRO';
          
          addLog(`⚡ Sincronizado: ${c.name}${actionLabel}. LED parpadeó rápido.`);
          return { ...c, paired: true, pairingOrder: nextOrder };
        }
        return c;
      })
    );
    setPairingState('PAIRING_OTHERS');
  };

  const finishPairing = () => {
    setPairingState('PAIRED_SUCCESS');
    addLog('🎉 ¡Emparejamiento finalizado con éxito! El sistema AXS está listo para rodar.');
    addLog('📱 Abra la aplicación SRAM AXS para ver la configuración completa y personalizar botones.');
  };

  const resetPairing = () => {
    setPairingState('IDLE');
    setComponents(prev => prev.map(c => ({ ...c, paired: false, pairingOrder: undefined })));
    setPairedOrderCount(0);
    setLogs(['Sistema reiniciado. Listo para iniciar de nuevo.']);
  };

  return (
    <div id="pairing-simulator" class="backdrop-blur-md bg-white/45 border border-white/60 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="font-display font-bold text-xl uppercase tracking-wide text-gray-800">
            Simulador de Emparejamiento AXS
          </h3>
          <p class="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-0.5">Secciones 4 y 5 • Interactivo</p>
        </div>
        <span class="material-symbols-outlined text-brand-red text-2xl">settings_input_antenna</span>
      </div>

      <p class="text-xs text-gray-600 mb-5 leading-relaxed">
        Cada sistema SRAM AXS tiene un componente principal (el desviador trasero) que inicia y finaliza la sesión. 
        Siga las instrucciones en pantalla para simular la configuración de su transmisión inalámbrica de ruta:
      </p>

      {/* Guide Steps */}
      <div class="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-6">
        <h4 class="text-[11px] font-bold text-gray-700 uppercase tracking-widest mb-2 flex items-center gap-1">
          <span class="material-symbols-outlined text-xs text-brand-red">info</span> Paso Actual de Emparejamiento:
        </h4>
        <div class="text-xs font-medium text-gray-700 leading-relaxed">
          {pairingState === 'IDLE' && (
            <div class="flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-brand-red text-white flex items-center justify-center font-bold text-[10px]">1</span>
              <span>Mantenga pulsado el botón AXS en el <strong>Desviador Trasero (RD)</strong> hasta que el LED parpadee en verde lentamente para iniciar el modo emparejamiento.</span>
            </div>
          )}
          {(pairingState === 'RD_PAIRING' || pairingState === 'PAIRING_OTHERS') && (
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-brand-red text-white flex items-center justify-center font-bold text-[10px]">2</span>
                <span>Haga clic en los botones de cambio, desviador o Blips inalámbricos para emparejarlos en el sistema AXS.</span>
              </div>
              <p class="text-[10px] text-brand-red font-bold uppercase pl-7">
                💡 Nota: Los Blips se emparejan primero hacia fuera y luego hacia dentro para crear un juego funcional.
              </p>
            </div>
          )}
          {pairingState === 'PAIRED_SUCCESS' && (
            <div class="flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-[10px]">✓</span>
              <span>¡Sistema totalmente emparejado y listo! Configurado con un juego funcional de Wireless Blips.</span>
            </div>
          )}
        </div>
      </div>

      {/* Grid of Interactive Components */}
      <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {components.map((comp) => {
          const isMainRD = comp.type === 'RD';
          const canClick = (isMainRD && pairingState === 'IDLE') || (!isMainRD && (pairingState === 'RD_PAIRING' || pairingState === 'PAIRING_OTHERS'));
          
          return (
            <div 
              key={comp.id}
              onClick={() => canClick && (isMainRD ? startRDPairing() : pairComponent(comp.id))}
              class={`border rounded-2xl p-3.5 flex flex-col justify-between h-28 cursor-pointer select-none transition-all ${
                comp.paired 
                  ? 'border-green-200 bg-green-50/70 shadow-sm shadow-green-100' 
                  : canClick 
                    ? 'border-gray-200 bg-white hover:border-brand-red hover:shadow-md' 
                    : 'border-gray-100 bg-gray-50/50 opacity-50 cursor-not-allowed'
              }`}
            >
              <div class="flex justify-between items-start">
                <span class="material-symbols-outlined text-gray-400 text-lg">
                  {comp.type === 'RD' ? 'settings_backup_restore' : 
                   comp.type === 'FD' ? 'directions_bike' : 
                   comp.type.startsWith('LEVER') ? 'sports_motorsports' : 'touch_app'}
                </span>
                
                {/* Visual LED Status Indicator */}
                <div class="flex items-center gap-1.5">
                  <span class="text-[9px] text-gray-400 font-bold uppercase tracking-widest">LED</span>
                  <span class={`w-2.5 h-2.5 rounded-full ${
                    comp.paired 
                      ? pairingState === 'RD_PAIRING' && isMainRD
                        ? 'bg-green-500 animate-ping'
                        : 'bg-green-500'
                      : 'bg-gray-300'
                  }`}></span>
                </div>
              </div>

              <div class="mt-2">
                <p class="text-xs font-bold text-gray-800 leading-tight">{comp.name}</p>
                {comp.paired && comp.pairingOrder && (
                  <p class="text-[9px] text-green-700 font-bold mt-1 uppercase tracking-wider">
                    Sincronizado #{comp.pairingOrder}
                  </p>
                )}
                {isMainRD && comp.paired && (
                  <p class="text-[9px] text-brand-red font-bold mt-1 uppercase tracking-wider animate-pulse">
                    Principal (Activo)
                  </p>
                )}
                {!comp.paired && canClick && (
                  <p class="text-[9px] text-brand-red font-semibold mt-1 uppercase tracking-wide">
                    Haga Clic para emparejar
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulator Actions */}
      <div class="flex gap-3 mb-6">
        {(pairingState === 'RD_PAIRING' || pairingState === 'PAIRING_OTHERS') && (
          <button
            onClick={finishPairing}
            class="flex-1 py-2.5 bg-black text-white hover:bg-brand-red rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            Finalizar en Desviador Trasero
          </button>
        )}
        
        {pairingState === 'PAIRED_SUCCESS' && (
          <button
            onClick={resetPairing}
            class="flex-1 py-2.5 bg-green-600 text-white hover:bg-green-700 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            Emparejar Nuevamente (Reiniciar)
          </button>
        )}

        {pairingState !== 'IDLE' && pairingState !== 'PAIRED_SUCCESS' && (
          <button
            onClick={resetPairing}
            class="py-2.5 px-4 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>

      {/* Live Activity Logs console */}
      <div class="bg-gray-900 rounded-2xl p-4 font-mono text-[10px] text-gray-300">
        <p class="text-gray-500 font-bold uppercase tracking-widest border-b border-gray-800 pb-1 mb-2">
          Consola del Sistema AXS • Live Logs
        </p>
        <div class="space-y-1.5 h-24 overflow-y-auto">
          <AnimatePresence>
            {logs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                class="leading-relaxed border-l-2 border-gray-700 pl-2"
              >
                {log}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

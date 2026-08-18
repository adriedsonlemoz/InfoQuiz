export const MODULES = [
            { id: 'basico', icon: '🔌', label: 'Fundamentos' },
            { id: 'hardware', icon: '⚙️', label: 'Hardware' },
            { id: 'windows', icon: '🪟', label: 'Windows' },
            { id: 'internet', icon: '🌐', label: 'Internet' },
            { id: 'word', icon: '📝', label: 'MS Word' },
            { id: 'excel', icon: '📊', label: 'MS Excel' },
            { id: 'seguranca', icon: '🛡️', label: 'Segurança' },
            { id: 'redes', icon: '📡', label: 'Redes de Comp.' },
            { id: 'programacao', icon: '💻', label: 'Lógica & Código' },
            { id: 'banco', icon: '🗄️', label: 'Banco de Dados' },
            { id: 'nuvem', icon: '☁️', label: 'Cloud Computing' },
            { id: 'ia', icon: '🤖', label: 'Intel. Artificial' }
        ];

export const MODULE_NAMES = MODULES.reduce(
  (acc, module) => ({ ...acc, [module.id]: module.label }),
  { revisao: 'Revisão de Erros' },
);

export const DEFAULT_UNLOCKED_MODULES = MODULES.reduce(
  (acc, module, index) => ({ ...acc, [module.id]: index === 0 }),
  {},
);

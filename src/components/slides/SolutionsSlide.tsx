import { useState, useEffect, useRef } from "react";
import { Bot, Users, Gift, Smartphone, Network, Database, BarChart, FileText, X, CheckCircle2, ChevronRight, Calendar, UserCheck, ArrowLeft, Clock, Zap, Target, User, Bell, RefreshCw, Copy, Check } from "lucide-react";
import { CLIENT_NAME } from "../../config";

// ─── DATA DEFINITION ───
const solutionsData = [
  {
    id: "ia",
    icon: Bot,
    title: "Recepção VIP com IA",
    desc: "A inteligência atende, qualifica e agenda em segundos, 24 horas por dia.",
    modalContent: { title: "", subtitle: "" }
  },
  {
    id: "followup",
    icon: RefreshCw,
    title: "Follow-ups Automáticos",
    desc: "Nenhuma conversa morre no vácuo. A IA insiste por você até o paciente agendar — sem depender da memória da recepção.",
    modalContent: {
      title: "O paciente queria agendar. Só parou de responder.",
      subtitle: "Quando a conversa esfria, a IA retoma o contato sozinha, no tempo certo e quantas vezes for preciso, até o paciente agendar — sem depender da memória da recepção.",
    }
  },
  {
    id: "lembretes",
    icon: Gift,
    title: "Lembretes da Agenda",
    desc: "Chega de faltas (No-Show). Lembretes automáticos via WhatsApp.",
    modalContent: {
      title: "Cada paciente que falta é dinheiro que sai do seu caixa.",
      subtitle: "A IA lembra cada paciente 24h antes, confirma pelo WhatsApp e atualiza sua agenda automaticamente. Sua secretária faz o que importa, não fica no telefone confirmando.",
    }
  },
  {
    id: "crm",
    icon: Database,
    title: "Solução de CRM",
    desc: "Gestão visual e inteligente do relacionamento comercial com pacientes.",
    modalContent: {
      title: "Visão 360º do Paciente",
      subtitle: "Saiba exatamente quem entrou em contato, quem parou de responder e quem já agendou. O CRM organiza o fluxo em colunas simples para que nenhum paciente seja esquecido.",
    }
  },
  {
    id: "multi",
    icon: Smartphone,
    title: "Plataforma Multi-WhatsApp",
    desc: "Vários colaboradores usando o mesmo número de WhatsApp simultaneamente.",
    modalContent: {
      title: "Um Número, Toda a Clínica",
      subtitle: "Acabe com a bagunça de celulares espalhados. O WhatsApp principal da clínica é roteado para a recepção, financeiro e enfermagem. Tudo centralizado.",
    }
  },
  {
    id: "metricas",
    icon: BarChart,
    title: "Dashboards e Métricas",
    desc: "Acompanhamento em tempo real das métricas de atendimento e do funil comercial para decisões baseadas em dados.",
    modalContent: {
      title: "Gestão Baseada em Dados",
      subtitle: "Acompanhamento em tempo real das métricas de atendimento e do funil comercial para decisões baseadas em dados.",
    }
  },
];

// ─── UTILITIES ───
const AnimatedCounter = ({ target, duration = 2000, suffix = "", prefix = "", isStatic = false, start = false, startValue = 0 }: { target: number | string, duration?: number, suffix?: string, prefix?: string, isStatic?: boolean, start?: boolean, startValue?: number }) => {
  const [count, setCount] = useState(startValue);

  useEffect(() => {
    if (isStatic || typeof target === 'string' || !start) return;
    let startTime: number | null = null;
    const numericTarget = target as number;
    const diff = numericTarget - startValue;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easeProgress = progress * (2 - progress);
      setCount(Math.floor(startValue + (easeProgress * diff)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration, isStatic, start, startValue]);

  if (isStatic || typeof target === 'string') return <span>{prefix}{target}{suffix}</span>;
  return <span>{prefix}{count}{suffix}</span>;
};

const TypingBubble = ({ isBot, userAvatar }: { isBot: boolean, userAvatar?: string }) => (
  <div className={`flex gap-3 w-full ${isBot ? 'flex-row' : 'flex-row-reverse'} animate-fade-in`}>
    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden ${isBot ? 'bg-[hsl(var(--primary))] text-primary-foreground shadow-sm shadow-primary/20' : 'bg-muted border border-border shadow-sm'}`}>
      {isBot ? <Bot className="w-4 h-4" /> : <img src={userAvatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100"} alt="Paciente" className="w-full h-full object-cover" />}
    </div>
    <div className={`bg-${isBot ? '[hsl(var(--primary)/0.1)]' : '[hsl(var(--muted))]'} px-4 py-3 rounded-2xl ${isBot ? 'rounded-tl-sm' : 'rounded-tr-sm'} shadow-sm flex items-center h-[44px]`}>
      <div className="flex gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  </div>
);

const ChatMessage = ({ isBot, children, show = false, className = "", userAvatar }: { isBot: boolean, children: React.ReactNode, show?: boolean, className?: string, userAvatar?: string }) => {
  if (!show) return null;
  return (
    <div className={`flex gap-3 w-full ${isBot ? 'flex-row' : 'flex-row-reverse'} animate-fade-in ${className}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden ${isBot ? 'bg-[hsl(var(--primary))] text-primary-foreground shadow-sm shadow-primary/20' : 'bg-muted border border-border shadow-sm'}`}>
        {isBot ? <Bot className="w-4 h-4" /> : <img src={userAvatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100"} alt="Paciente" className="w-full h-full object-cover" />}
      </div>
      <div className="flex flex-col gap-2 max-w-[85%]">
        {children}
      </div>
    </div>
  );
};

const Bubble = ({ isBot, children }: { isBot: boolean, children: React.ReactNode }) => (
  <div className={`${isBot ? 'bg-[hsl(var(--primary))] text-primary-foreground rounded-tl-sm shadow-md' : 'bg-[hsl(var(--muted))] text-muted-foreground rounded-tr-sm shadow-sm'} px-5 py-3 rounded-2xl text-[15px]`}>
    {children}
  </div>
);

const TypedTitle = ({ onComplete }: { onComplete: () => void }) => {
  const text = "Sua clínica perde paciente toda vez que o WhatsApp demora 5 minutos.";
  const [len, setLen] = useState(0);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLen(i);
      i++;
      if (i > text.length) {
        clearInterval(interval);
        onComplete();
      }
    }, 35);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentText = text.substring(0, len);

  return (
    <h2 className="text-3xl md:text-4xl font-light text-foreground leading-tight mb-4 min-h-[96px]">
      {currentText.substring(0, 12)}
      <span className="font-bold text-red-500">{currentText.substring(12, 26)}</span>
      {currentText.substring(26)}
      {len < text.length && <span className="animate-pulse text-[hsl(var(--primary))] ml-1">|</span>}
    </h2>
  );
};



// ─── VISUALIZER COMPONENTS (Others) ───

const LembretesVisual = () => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1000);
    const timer2 = setTimeout(() => setStep(2), 3000);
    const timer3 = setTimeout(() => setStep(3), 4000);
    const timer4 = setTimeout(() => setStep(0), 7000);
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); clearTimeout(timer4); };
  }, [step === 0]);

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className={`bg-card border border-border shadow-lg rounded-2xl p-4 w-64 transform transition-all duration-500 ${step >= 1 ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center shrink-0">
            <Gift className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">Consulta Amanhã</p>
            <p className="text-[10px] text-muted-foreground mt-1">Lembrete: Sua consulta é amanhã às 14h. Digite "Sim" para confirmar.</p>
          </div>
        </div>
      </div>
      <div className={`self-end bg-[hsl(var(--primary))] text-primary-foreground px-4 py-2 rounded-2xl rounded-tr-sm text-sm shadow-md transition-all duration-500 mr-8 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 hidden'}`}>
        Sim, confirmado!
      </div>
      <div className={`bg-card border border-[hsl(var(--primary)/0.3)] shadow-[0_0_20px_hsl(var(--primary)/0.15)] rounded-2xl p-4 w-64 flex items-center justify-between transform transition-all duration-500 ${step >= 3 ? 'scale-100 opacity-100' : 'scale-95 opacity-0 hidden'}`}>
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm font-bold text-foreground line-through decoration-[hsl(var(--primary))] decoration-2 opacity-60">Aguardando</span>
        </div>
        <div className="flex items-center gap-1 text-[hsl(var(--primary))] font-bold text-xs bg-[hsl(var(--primary)/0.1)] px-2 py-1 rounded-md">
          <CheckCircle2 className="w-3 h-3" /> Confirmado
        </div>
      </div>
    </div>
  );
};

const DigitalizacaoVisual = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(s => (s + 1) % 4);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-64 h-80 bg-card border border-border rounded-2xl shadow-xl p-4 overflow-hidden flex flex-col gap-3 text-left">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-2 shrink-0">
        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Tenaz Extrator IA</span>
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
      </div>

      {/* OCR/Document scan area or fields */}
      <div className="flex-1 flex flex-col justify-center gap-2.5 relative">
        {(step === 0 || step === 1) && (
          <div className="absolute top-0 left-0 w-full h-[1.5px] bg-[hsl(var(--primary))] shadow-[0_0_8px_hsl(var(--primary))] animate-[scanner_2.5s_ease-in-out_infinite]" />
        )}

        {/* Source Doc name */}
        <div className="p-2 rounded bg-muted/30 border border-border/50 text-[8px] flex items-center justify-between">
          <span className="text-muted-foreground truncate max-w-[140px]">carteirinha_unimed.png</span>
          <span className="text-foreground font-semibold">{step === 0 ? "Lendo..." : "Lido"}</span>
        </div>

        {/* Field 1: Paciente */}
        <div className="p-2 rounded border border-border bg-background flex items-center justify-between text-[8px]">
          <div className="flex-1 min-w-0 pr-1.5">
            <span className="text-[6px] text-muted-foreground uppercase font-bold block">Paciente</span>
            <span className="font-bold text-foreground truncate block">
              {step >= 1 ? "MARIA SILVA DE ALMEIDA" : "•••••••••••••••••••••"}
            </span>
          </div>
          {step >= 1 && (
            <button className="h-5 px-1.5 rounded bg-muted/50 border border-border text-[7px] text-muted-foreground flex items-center gap-0.5">
              <Copy className="w-2 h-2" />
              <span>Copiar</span>
            </button>
          )}
        </div>

        {/* Field 2: Carteirinha */}
        <div className={`p-2 rounded border transition-all duration-300 flex items-center justify-between text-[8px] ${
          step >= 2
            ? step === 2
              ? 'border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.02)]'
              : 'border-border bg-background'
            : 'border-border bg-background'
        }`}>
          <div className="flex-1 min-w-0 pr-1.5">
            <span className="text-[6px] text-muted-foreground uppercase font-bold block">Nº Carteirinha</span>
            <span className="font-bold text-foreground truncate block">
              {step >= 1 ? "0021 3491 2948 1009" : "•••••••••••••••••••••"}
            </span>
          </div>
          {step >= 1 && (
            <button className={`h-5 px-1.5 rounded flex items-center gap-0.5 border transition-all ${
              step >= 2 ? 'bg-green-500 text-white border-green-600 font-bold' : 'bg-muted/50 border-border text-muted-foreground'
            }`}>
              {step >= 2 ? (
                <>
                  <Check className="w-2 h-2" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-2 h-2" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Field 3: TUSS */}
        <div className="p-2 rounded border border-border bg-background flex items-center justify-between text-[8px]">
          <div className="flex-1 min-w-0 pr-1.5">
            <span className="text-[6px] text-muted-foreground uppercase font-bold block">Procedimento TUSS</span>
            <span className="font-bold text-foreground truncate block">
              {step >= 1 ? "40101010 - ELETROCARDIOGRAMA" : "•••••••••••••••••••••"}
            </span>
          </div>
          {step >= 1 && (
            <button className="h-5 px-1.5 rounded bg-muted/50 border border-border text-[7px] text-muted-foreground flex items-center gap-0.5">
              <Copy className="w-2 h-2" />
              <span>Copiar</span>
            </button>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {step === 2 && (
        <div className="bg-emerald-600 text-white text-[7.5px] font-bold py-1 px-2.5 rounded-md flex items-center gap-1 animate-pulse shadow-md">
          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
          <span>Nº Copiado! Pronto para colar.</span>
        </div>
      )}

      {/* Status Bar */}
      <div className="bg-muted/40 p-2 rounded-lg text-[8px] font-bold text-foreground/80 flex items-center gap-1.5 mt-auto">
        <RefreshCw className={`w-3 h-3 text-[hsl(var(--primary))] ${step === 0 ? 'animate-spin' : ''}`} />
        <span>
          {step === 0 && "Lendo imagem..."}
          {step === 1 && "Extraído! Pronto para cópia."}
          {step === 2 && "Copiado com 1 clique!"}
          {step === 3 && "Finalizado."}
        </span>
      </div>

      <style>{`
        @keyframes scanner { 0%, 100% { top: 10%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; top: 90%; } }
      `}</style>
    </div>
  );
};


const CRMVisual = () => {
  const [activeCol, setActiveCol] = useState(0);
  const columns = ['Novo Contato', 'Qualificado', 'Agendado'];

  useEffect(() => {
    const cycle = () => {
      setActiveCol(0);
      const t1 = setTimeout(() => setActiveCol(1), 2000);
      const t2 = setTimeout(() => setActiveCol(2), 4000);
      const t3 = setTimeout(cycle, 7000);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    };
    const cleanup = cycle();
    return cleanup;
  }, []);

  return (
    <div className="flex gap-3 w-full h-64">
      {columns.map((title, i) => (
        <div key={title} className="flex-1 bg-muted/30 rounded-xl p-3 flex flex-col border border-border/50 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-muted-foreground uppercase">{title}</span>
            {activeCol === i && (
              <span className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] animate-pulse" />
            )}
          </div>
          <div
            className="transition-all duration-500 ease-in-out"
            style={{
              opacity: activeCol === i ? 1 : 0,
              transform: activeCol === i ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.96)',
              pointerEvents: activeCol === i ? 'auto' : 'none',
            }}
          >
            <div className={`bg-card border rounded-lg p-3 shadow-sm ${activeCol === i ? 'border-[hsl(var(--primary)/0.4)] shadow-[0_4px_16px_hsl(var(--primary)/0.12)]' : 'border-border'}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-[hsl(var(--primary)/0.2)]" />
                <div className="flex flex-col gap-1">
                  <div className="w-16 h-1.5 bg-muted rounded-full" />
                  <div className="w-10 h-1.5 bg-muted/60 rounded-full" />
                </div>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full mb-1" />
              <div className="w-2/3 h-1.5 bg-muted/60 rounded-full" />
              {activeCol === i && (
                <div className="mt-2 flex items-center gap-1">
                  <span className="text-[9px] font-bold text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)] px-2 py-0.5 rounded-full">
                    {i === 0 ? 'novo' : i === 1 ? 'qualificado' : '✓ agendado'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


const MultiVisual = () => {
  const [step, setStep] = useState(0);
  // Steps: 0=idle, 1=call incoming, 2=IA intercepts, 3=route to sector, 4=complete
  const [activeSector, setActiveSector] = useState<number | null>(null);
  const sectors = [
    { label: 'Recepção', color: 'bg-blue-500/15', text: 'text-blue-600', border: 'border-blue-400/40' },
    { label: 'Enfermagem', color: 'bg-green-500/15', text: 'text-green-600', border: 'border-green-400/40' },
    { label: 'Financeiro', color: 'bg-purple-500/15', text: 'text-purple-600', border: 'border-purple-400/40' },
    { label: 'Médico', color: 'bg-amber-500/15', text: 'text-amber-600', border: 'border-amber-400/40' },
  ];

  useEffect(() => {
    const run = () => {
      setStep(0); setActiveSector(null);
      const t1 = setTimeout(() => setStep(1), 600);
      const t2 = setTimeout(() => setStep(2), 1800);
      const t3 = setTimeout(() => { setStep(3); setActiveSector(0); }, 3000);
      const t4 = setTimeout(() => setActiveSector(1), 4500);
      const t5 = setTimeout(() => setActiveSector(2), 6000);
      const t6 = setTimeout(() => setActiveSector(3), 7500);
      const t7 = setTimeout(run, 10000);
      return () => [t1, t2, t3, t4, t5, t6, t7].forEach(clearTimeout);
    };
    const cleanup = run();
    return cleanup;
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center gap-4 py-2 select-none">

      {/* Top: incoming call pill */}
      <div className={`transition-all duration-500 ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}>
        <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-md">
          <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <Smartphone className="w-3 h-3 text-green-600" />
          </div>
          <span className="text-[11px] font-bold text-foreground tracking-wide">(11) 98765-4321</span>
          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full transition-colors duration-300 ${step >= 1 ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}`}>
            {step >= 1 ? 'entrando...' : ''}
          </span>
        </div>
      </div>

      {/* Arrow down */}
      <div className={`transition-all duration-300 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-[2px] h-5 bg-gradient-to-b from-border to-[hsl(var(--primary)/0.4)] mx-auto" />
      </div>

      {/* Center: IA node */}
      <div className={`relative transition-all duration-500 ${step >= 2 ? 'scale-100 opacity-100' : 'scale-90 opacity-40'}`}>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 ${step >= 2 ? 'bg-[hsl(var(--primary))] text-white shadow-[0_0_24px_hsl(var(--primary)/0.4)]' : 'bg-muted text-muted-foreground'}`}>
          <Bot className="w-7 h-7" />
        </div>
        {step >= 2 && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card flex items-center justify-center animate-pulse">
            <span className="text-[6px] text-white font-black">IA</span>
          </div>
        )}
        <div className={`absolute inset-0 rounded-2xl border-2 border-[hsl(var(--primary))] transition-opacity duration-300 ${step >= 2 ? 'animate-ping opacity-20' : 'opacity-0'}`} />
      </div>

      {/* Label */}
      <div className={`transition-all duration-300 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-[9px] font-bold text-[hsl(var(--primary))] uppercase tracking-widest">
          {step >= 3 ? 'roteando para setor...' : 'identificando intenção...'}
        </span>
      </div>

      {/* Sectors grid */}
      <div className="grid grid-cols-2 gap-2 w-full max-w-[280px]">
        {sectors.map((s, i) => (
          <div
            key={s.label}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-500 ${activeSector !== null && activeSector >= i
              ? `${s.color} ${s.border} shadow-sm scale-[1.02]`
              : 'bg-muted/20 border-border/30 scale-100'
              }`}
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 ${activeSector !== null && activeSector >= i ? s.color : 'bg-muted'}`}>
              <Users className={`w-3 h-3 transition-colors duration-300 ${activeSector !== null && activeSector >= i ? s.text : 'text-muted-foreground'}`} />
            </div>
            <span className={`text-[10px] font-bold transition-colors duration-300 ${activeSector !== null && activeSector >= i ? s.text : 'text-muted-foreground'}`}>{s.label}</span>
            {activeSector !== null && activeSector >= i && (
              <CheckCircle2 className={`w-3 h-3 ml-auto ${s.text} animate-fade-in`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const FollowUpVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center min-h-[250px]">
    <div className="relative z-10 w-16 h-16 rounded-2xl bg-[hsl(var(--primary))] text-primary-foreground flex items-center justify-center shadow-lg">
      <RefreshCw className="w-8 h-8 animate-spin" style={{ animationDuration: '6s' }} />
    </div>
  </div>
);

const IntegracaoVisual = () => (
  <div className="w-full flex items-center justify-center gap-8 h-32">
    <div className="bg-card border border-border shadow-lg p-6 rounded-2xl flex flex-col items-center gap-3">
      <Network className="w-8 h-8 text-[hsl(var(--primary))]" />
      <span className="text-[10px] font-bold uppercase text-muted-foreground">Sistema {CLIENT_NAME}</span>
    </div>
    <div className="relative w-32 h-2 bg-muted rounded-full overflow-hidden">
      <div className="absolute top-0 left-0 h-full w-8 bg-[hsl(var(--primary))] rounded-full animate-[sync_1.5s_ease-in-out_infinite_alternate]" />
    </div>
    <div className="bg-card border border-border shadow-lg p-6 rounded-2xl flex flex-col items-center gap-3">
      <Database className="w-8 h-8 text-blue-500" />
      <span className="text-[10px] font-bold uppercase text-muted-foreground">Seu ERP Médico</span>
    </div>
    <style>{`@keyframes sync { 0% { left: 0%; transform: translateX(0); } 100% { left: 100%; transform: translateX(-100%); } }`}</style>
  </div>
);

const MetricasVisual = () => {
  const [tick, setTick] = useState(0);
  const [barReveal, setBarReveal] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBarReveal(true), 300);
    const interval = setInterval(() => setTick(t => t + 1), 3000);
    return () => { clearTimeout(t); clearInterval(interval); };
  }, []);

  const barData = [
    { label: 'Jan', v: 42 }, { label: 'Fev', v: 58 }, { label: 'Mar', v: 51 },
    { label: 'Abr', v: 74 }, { label: 'Mai', v: 88 }, { label: 'Jun', v: 100 },
  ];

  const kpis = [
    { label: 'Agendamentos', values: ['+18%', '+24%', '+31%'], color: 'text-[hsl(var(--primary))]', bg: 'bg-[hsl(var(--primary)/0.08)]', border: 'border-[hsl(var(--primary)/0.2)]' },
    { label: 'No-Show', values: ['-42%', '-55%', '-73%'], color: 'text-green-600', bg: 'bg-green-500/8', border: 'border-green-400/20' },
    { label: 'Resp. Média', values: ['4min', '2min', '18s'], color: 'text-blue-600', bg: 'bg-blue-500/8', border: 'border-blue-400/20' },
  ];

  // Sparkline path (simple upward trend)
  const sparkPoints = [30, 28, 35, 32, 45, 42, 55, 52, 70, 68, 85, 100];
  const sparkPath = sparkPoints.map((y, x) => `${x === 0 ? 'M' : 'L'} ${(x / (sparkPoints.length - 1)) * 100} ${100 - y}`).join(' ');

  return (
    <div className="w-full flex flex-col gap-3 select-none">

      {/* KPI Row */}
      <div className="grid grid-cols-3 gap-2">
        {kpis.map((k, i) => (
          <div key={k.label} className={`${k.bg} border ${k.border} rounded-xl p-3 flex flex-col gap-1`}>
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{k.label}</span>
            <span className={`text-lg font-black ${k.color} transition-all duration-500`}>
              {k.values[tick % k.values.length]}
            </span>
            <div className="flex items-center gap-1">
              <div className="flex-1 h-1 bg-muted/40 rounded-full overflow-hidden">
                <div className={`h-full ${k.color.replace('text-', 'bg-').replace('[hsl(var(--primary))]', '[hsl(var(--primary))]')} rounded-full transition-all duration-700`}
                  style={{ width: `${[65, 80, 55][i]}%`, background: i === 0 ? 'hsl(var(--primary))' : i === 1 ? '#16a34a' : '#2563eb' }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="bg-card border border-border rounded-xl p-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold text-foreground uppercase tracking-widest">Agendamentos / Mês</span>
          <span className="text-[9px] font-bold text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)] px-2 py-0.5 rounded-full">+138% no semestre</span>
        </div>
        <div className="flex items-end gap-1.5 h-24 border-b border-border/40">
          {barData.map((b, i) => (
            <div key={b.label} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end justify-center" style={{ height: '80px' }}>
                <div
                  className="w-full rounded-t-md transition-all duration-700 ease-out"
                  style={{
                    height: barReveal ? `${b.v}%` : '0%',
                    transitionDelay: `${i * 100}ms`,
                    background: i === 5
                      ? 'hsl(var(--primary))'
                      : `hsl(var(--primary) / ${0.35 + i * 0.1})`,
                  }}
                />
              </div>
              <span className="text-[8px] text-muted-foreground font-medium">{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sparkline mini-card */}
      <div className="bg-card border border-border rounded-xl p-3 flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Satisfação</span>
          <span className="text-base font-black text-[hsl(var(--primary))]">98.2%</span>
        </div>
        <div className="flex-1 h-10">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={sparkPath + ' L 100 100 L 0 100 Z'} fill="url(#sparkGrad)" />
            <path d={sparkPath} fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="text-[9px] font-bold text-green-600 bg-green-500/10 px-2 py-1 rounded-full">↑ +2.1%</div>
      </div>

    </div>
  );
};



// ─── CUSTOM IAMODAL COMPONENT ───
const IAModal = ({ onClose }: { onClose: () => void }) => {
  const [entryStep, setEntryStep] = useState(0);
  const [chatStep, setChatStep] = useState(-1);

  // Entry sequence orchestrator
  useEffect(() => {
    if (entryStep === 1) setTimeout(() => setEntryStep(2), 500); // Subtitle -> Stats
    else if (entryStep === 2) setTimeout(() => setEntryStep(3), 800); // Stats -> Bullets
    else if (entryStep === 3) setTimeout(() => setEntryStep(4), 800); // Bullets -> Chat
  }, [entryStep]);

  // Start chat sequence once entry reaches step 4
  useEffect(() => {
    if (entryStep >= 4 && chatStep === -1) {
      setChatStep(0);
    }
  }, [entryStep, chatStep]);

  // Chat sequence orchestrator
  useEffect(() => {
    if (chatStep === -1) return;
    let t: NodeJS.Timeout;
    if (chatStep === 0) t = setTimeout(() => setChatStep(1), 1500); // Pt msg 1
    else if (chatStep === 1) t = setTimeout(() => setChatStep(2), 1200); // Bot typing
    else if (chatStep === 2) t = setTimeout(() => setChatStep(3), 2000); // Bot msg 1 (options)
    else if (chatStep === 3) t = setTimeout(() => setChatStep(4), 2500); // Pt typing
    else if (chatStep === 4) t = setTimeout(() => setChatStep(5), 1000); // Pt msg 2 (16h)
    else if (chatStep === 5) t = setTimeout(() => setChatStep(6), 1000); // Bot typing
    else if (chatStep === 6) t = setTimeout(() => setChatStep(7), 1500); // Bot msg 2 (qualification)
    else if (chatStep === 7) t = setTimeout(() => setChatStep(8), 2000); // Pt typing
    else if (chatStep === 8) t = setTimeout(() => setChatStep(9), 1000); // Pt msg 3 (Unimed)
    else if (chatStep === 9) t = setTimeout(() => setChatStep(10), 1000); // Bot typing
    else if (chatStep === 10) t = setTimeout(() => setChatStep(11), 1500); // Bot msg 3 (Success)
    else if (chatStep === 11) t = setTimeout(() => setChatStep(0), 4000); // Loop wait (4s)
    return () => clearTimeout(t);
  }, [chatStep]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-lg transition-opacity animate-fade-in" onClick={onClose} />

      <div className="relative z-10 w-full max-w-6xl min-h-0 sm:min-h-[600px] lg:min-h-[700px] max-h-[90vh] bg-card border border-border rounded-[2rem] shadow-2xl overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row animate-fade-in">

        {/* LEFT COLUMN */}
        <div className="flex-[1] flex flex-col justify-between p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[hsl(var(--primary)/0.15)] bg-[hsl(var(--primary)/0.06)] relative overflow-y-auto">

          <button onClick={onClose} className="absolute top-6 left-6 text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-bold transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>

          {/* Zona 1: Headline & Subtitle */}
          <div className="mt-12 mb-10">
            {entryStep >= 0 && <TypedTitle onComplete={() => setEntryStep(1)} />}

            <p className={`text-lg text-muted-foreground transition-all duration-700 ${entryStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              A Recepção VIP responde em 3 segundos, 24h por dia, e já sai com a consulta agendada.
            </p>
          </div>

          {/* Zona 3: Stats */}
          <div className={`grid grid-cols-3 gap-3 mb-10 transition-all duration-700 ${entryStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col justify-center text-center">
              <span className="text-2xl md:text-3xl font-black text-[hsl(var(--primary))] mb-1">
                <AnimatedCounter target={3} suffix="s" start={entryStep >= 2} />
              </span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Tempo de<br />Resposta</span>
            </div>
            <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col justify-center text-center">
              <span className="text-2xl md:text-3xl font-black text-blue-500 mb-1">
                <AnimatedCounter target={20} prefix="+" suffix="%" start={entryStep >= 2} />
              </span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Conversão<br />de Leads</span>
            </div>
            <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col justify-center text-center">
              <span className="text-2xl md:text-3xl font-black text-foreground mb-1">
                <AnimatedCounter target="24/7" isStatic start={entryStep >= 2} />
              </span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Cobertura<br />Total</span>
            </div>
          </div>

          {/* Zona 4: Bullets */}
          <div className={`space-y-4 pt-6 border-t border-border transition-all duration-700 ${entryStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] flex items-center justify-center shrink-0"><Bot className="w-4 h-4" /></div>
              <span className="text-sm text-foreground font-medium">Entende áudio e texto naturalmente</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] flex items-center justify-center shrink-0"><Network className="w-4 h-4" /></div>
              <span className="text-sm text-foreground font-medium">Cruza dados com a agenda médica em tempo real</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] flex items-center justify-center shrink-0"><Target className="w-4 h-4" /></div>
              <span className="text-sm text-foreground font-medium">Qualifica convênio e tipo antes de agendar</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CHAT ANIMATION */}
        <div className="flex-[1.2] bg-background flex items-start justify-center p-6 lg:p-10 relative overflow-hidden min-h-[500px]">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

          {entryStep >= 4 && (
            <div className="relative z-10 w-full max-w-lg flex flex-col gap-3 justify-start h-full py-4 animate-fade-in">

              {/* Act 1 */}
              {chatStep === 0 && <TypingBubble isBot={false} />}
              <ChatMessage isBot={false} show={chatStep >= 1}>
                <Bubble isBot={false}>Oii! preciso marcar com o dr carlos p/ amanhã.. será q tem vaga? 🙏</Bubble>
              </ChatMessage>

              {/* Act 2 */}
              {chatStep === 2 && <TypingBubble isBot={true} />}
              <ChatMessage isBot={true} show={chatStep >= 3}>
                <div className="flex flex-col gap-2">
                  <Bubble isBot={true}>
                    Olá! O Dr. Carlos tem esses horários livres amanhã. Qual fica melhor pra você?
                  </Bubble>
                  {/* Clickable Pills */}
                  <div className="flex gap-2 ml-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <span className="bg-background border border-[hsl(var(--primary)/0.4)] text-[hsl(var(--primary))] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 14:00
                    </span>
                    <span className="bg-background border border-[hsl(var(--primary)/0.4)] text-[hsl(var(--primary))] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1 bg-[hsl(var(--primary)/0.05)] ring-2 ring-[hsl(var(--primary)/0.3)]">
                      <Clock className="w-3 h-3" /> 16:00
                    </span>
                  </div>
                </div>
              </ChatMessage>

              {/* Act 3 */}
              {chatStep === 4 && <TypingBubble isBot={false} />}
              <ChatMessage isBot={false} show={chatStep >= 5}>
                <Bubble isBot={false}>Pode ser às 16h!</Bubble>
              </ChatMessage>

              {/* Act 4 */}
              {chatStep === 6 && <TypingBubble isBot={true} />}
              <ChatMessage isBot={true} show={chatStep >= 7}>
                <Bubble isBot={true}>Perfeito! Só pra eu registrar, a consulta é particular ou por algum convênio?</Bubble>
              </ChatMessage>

              {/* Act 5 */}
              {chatStep === 8 && <TypingBubble isBot={false} />}
              <ChatMessage isBot={false} show={chatStep >= 9}>
                <Bubble isBot={false}>Pela Unimed</Bubble>
              </ChatMessage>

              {/* Act 6 */}
              {chatStep === 10 && <TypingBubble isBot={true} />}
              <ChatMessage isBot={true} show={chatStep >= 11} className="relative">
                <Bubble isBot={true}>Prontinho! Sua consulta está confirmada ✅</Bubble>

                {/* SUCCESS CARD FLOATING UP */}
                <div className="absolute top-16 left-1/2 md:left-[40%] w-72 bg-card border border-[hsl(var(--primary)/0.5)] shadow-[0_20px_50px_hsl(var(--primary)/0.2)] rounded-2xl p-5 flex flex-col gap-3 animate-[slideUp_0.6s_cubic-bezier(0.34,1.56,0.64,1)_forwards]">
                  <div className="flex items-center gap-3 border-b border-border pb-3">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-green-500/30">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground uppercase tracking-wider">Agendamento Criado</p>
                      <p className="text-xs text-[hsl(var(--primary))] font-medium">Sincronizado na agenda</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-1 px-1">
                    <div className="flex items-center gap-2 text-sm text-foreground font-medium"><UserCheck className="w-4 h-4 text-muted-foreground" /> Dr. Carlos</div>
                    <div className="flex items-center gap-1.5 text-sm font-bold bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] px-3 py-1 rounded-md"><Clock className="w-4 h-4" /> 16:00</div>
                  </div>
                </div>
                <style>{`
                  @keyframes slideUp {
                    from { transform: translate(-50%, 80px); opacity: 0; }
                    to { transform: translate(-50%, 0); opacity: 1; }
                  }
                `}</style>
              </ChatMessage>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

// ─── CUSTOM FOLLOWUPMODAL COMPONENT ───
const FollowUpModal = ({ onClose }: { onClose: () => void }) => {
  const [entryStep, setEntryStep] = useState(0);

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (entryStep === 0) t = setTimeout(() => setEntryStep(1), 100);
    else if (entryStep === 1) t = setTimeout(() => setEntryStep(2), 400);
    else if (entryStep === 2) t = setTimeout(() => setEntryStep(3), 700);
    else if (entryStep === 3) t = setTimeout(() => setEntryStep(4), 700);
    return () => clearTimeout(t);
  }, [entryStep]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-lg transition-opacity animate-fade-in" onClick={onClose} />

      <div className="relative z-10 w-full max-w-6xl min-h-0 sm:min-h-[600px] lg:min-h-[700px] max-h-[90vh] bg-card border border-border rounded-[2rem] shadow-2xl overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row animate-fade-in">

        {/* LEFT COLUMN */}
        <div className="flex-[1] flex flex-col justify-between p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[hsl(var(--primary)/0.15)] bg-[hsl(var(--primary)/0.06)] relative overflow-y-auto">

          <button onClick={onClose} className="absolute top-6 left-6 text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-bold transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>

          {/* Zona 1: Título e Parágrafo de Apoio */}
          <div className="mt-12 mb-10">
            <h2 className={`text-3xl md:text-4xl font-light text-foreground leading-tight mb-4 min-h-[80px] transition-all duration-700 ${entryStep >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              O paciente queria agendar. <span className="font-bold text-[hsl(var(--primary))]">Só parou de responder.</span>
            </h2>
            <p className={`text-[15px] font-light leading-relaxed text-muted-foreground transition-all duration-700 ${entryStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Quando a conversa esfria, a IA retoma o contato sozinha, no tempo certo e quantas vezes for preciso, até o paciente agendar —{' '}
              <span className="relative font-medium text-foreground whitespace-nowrap">
                sem depender da memória da recepção.
                <span className={`absolute -bottom-[1px] left-0 h-[2px] bg-[hsl(var(--primary))] transition-all ease-out ${entryStep >= 1 ? 'w-full' : 'w-0'}`} style={{ transitionDuration: '1200ms', transitionDelay: '800ms' }} />
              </span>
            </p>
          </div>

          {/* Zona 3: 2 Cards de Métrica */}
          <div className={`grid grid-cols-2 gap-4 md:gap-6 mb-10 transition-all duration-700 ${entryStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 flex flex-col justify-center shadow-sm">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">FOLLOW-UPS MANUAIS</span>
              <div className="text-4xl md:text-5xl font-black text-green-500 tracking-tight">
                0
              </div>
            </div>
            <div className="bg-card border-2 border-[hsl(var(--primary)/0.2)] rounded-2xl p-6 flex flex-col justify-center shadow-[0_10px_40px_hsl(var(--primary)/0.1)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary)/0.05)] to-transparent" />
              <span className="relative z-10 text-[11px] font-bold text-[hsl(var(--primary))] uppercase tracking-widest mb-2">CONVERSAS RECUPERADAS</span>
              <div className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight">
                1 em 3
              </div>
            </div>
          </div>

          {/* Zona 4: Lista de 4 Bullets com Ícones */}
          <div className={`space-y-4 pt-6 border-t border-border transition-all duration-700 ${entryStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] flex items-center justify-center shrink-0">
                <Target className="w-4 h-4" />
              </div>
              <span className="text-sm text-foreground font-medium">Detecta conversas paradas automaticamente, sem ninguém precisar monitorar</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-sm text-foreground font-medium">Cadência inteligente: retoma no momento certo, sem parecer insistência</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] flex items-center justify-center shrink-0">
                <UserCheck className="w-4 h-4" />
              </div>
              <span className="text-sm text-foreground font-medium">Quem responde volta direto pro fluxo de agendamento da Recepção VIP</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] flex items-center justify-center shrink-0">
                <BarChart className="w-4 h-4" />
              </div>
              <span className="text-sm text-foreground font-medium">Relatório de conversas recuperadas e agendamentos salvos por follow-up</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: MOCKUP DE CONVERSA */}
        <div className="flex-[1.2] bg-background flex items-center justify-center p-6 lg:p-10 relative overflow-hidden min-h-[500px]">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

          <div className={`relative z-10 w-full max-w-lg bg-card/95 border border-border/80 rounded-2xl shadow-xl p-5 md:p-6 flex flex-col gap-4 backdrop-blur-xs transition-all duration-700 ${entryStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

            {/* Header do card */}
            <div className="flex items-center gap-2 pb-3 border-b border-border/60">
              <div className="w-7 h-7 rounded-full bg-[hsl(var(--primary)/0.15)] flex items-center justify-center text-[hsl(var(--primary))]">
                <RefreshCw className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
              </div>
              <span className="text-xs font-bold text-[hsl(var(--primary))] uppercase tracking-wider">
                FOLLOW-UP EM AÇÃO
              </span>
            </div>

            {/* Conversa Container */}
            <div className="flex flex-col gap-3.5 my-2">
              {/* Bolha de mensagem do paciente (fundo branco, alinhada à esquerda) */}
              <div className="flex items-end gap-2.5 max-w-[85%] self-start animate-fade-in">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-border shadow-xs">
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100"
                    alt="Paciente"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white border border-border/70 text-slate-900 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex flex-col">
                  <p className="text-sm font-normal text-slate-800 leading-snug">
                    Preciso ver minha escala no trabalho, te confirmo
                  </p>
                  <span className="text-[10px] text-slate-400 text-right mt-1 font-medium">14:32</span>
                </div>
              </div>

              {/* Tag/badge central */}
              <div className="self-center my-2 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-muted/80 text-muted-foreground text-[11px] font-medium border border-border/60 shadow-xs animate-fade-in">
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                <span>2h sem resposta · follow-up automático</span>
              </div>

              {/* Bolha de resposta da IA (fundo verde da marca, texto branco, alinhada à direita) */}
              <div className="flex items-end gap-2.5 max-w-[90%] self-end flex-row-reverse animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary))] text-white flex items-center justify-center shrink-0 shadow-sm shadow-primary/30">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-[hsl(var(--primary))] text-primary-foreground px-4 py-3 rounded-2xl rounded-br-sm shadow-md flex flex-col">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-white/90 mb-1">
                    <Bot className="w-3.5 h-3.5 text-white" />
                    <span>Tenaz IA</span>
                  </div>
                  <p className="text-sm font-normal text-white leading-snug">
                    Oi João! Conseguiu ver sua escala? Ainda tenho quinta às 14h ou sábado às 9h com a Dra. Paula — qual encaixa melhor?
                  </p>
                  <span className="text-[10px] text-white/80 text-right mt-1 font-medium">16:40</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

// ─── DEFAULT MODAL COMPONENT (For other solutions) ───
const DefaultSolutionModal = ({ solution, onClose }: { solution: typeof solutionsData[0]; onClose: () => void }) => {
  const Icon = solution.icon;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  const renderVisualizer = () => {
    switch (solution.id) {
      case "lembretes": return <LembretesVisual />;
      case "guias": return <DigitalizacaoVisual />;
      case "crm": return <CRMVisual />;
      case "multi": return <MultiVisual />;
      case "followup":
      case "ativacao": return <FollowUpVisual />;
      case "integracao": return <IntegracaoVisual />;
      case "metricas": return <MetricasVisual />;
      default: return <div className="text-muted-foreground">Animação em breve</div>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-lg transition-opacity animate-fade-in" onClick={onClose} />
      <div className="relative z-10 w-full max-w-5xl min-h-0 sm:min-h-[600px] lg:min-h-[650px] bg-card border border-border rounded-3xl shadow-2xl overflow-y-auto md:overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-fade-in">

        {/* Left: Text & Context */}
        <div className="flex-1 flex flex-col justify-center p-8 md:p-14 lg:p-16 border-b md:border-b-0 md:border-r border-[hsl(var(--primary)/0.15)] bg-[hsl(var(--primary)/0.06)]">
          <div className="w-12 h-12 rounded-xl bg-[hsl(var(--primary)/0.15)] flex items-center justify-center text-[hsl(var(--primary))] mb-6">
            <Icon className="w-6 h-6" />
          </div>
          <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-3">{solution.title}</h4>
          <h2 className="text-3xl md:text-4xl font-light text-foreground leading-tight mb-6">{solution.modalContent.title}</h2>
          <p className="text-base text-muted-foreground leading-relaxed border-l-2 border-[hsl(var(--primary))] pl-4">
            {solution.modalContent.subtitle}
          </p>
          <button onClick={onClose} className="mt-10 self-start px-6 py-3 bg-secondary text-secondary-foreground hover:bg-muted font-bold text-sm rounded-xl transition-colors">
            Voltar para Soluções
          </button>
        </div>

        {/* Right: Visualizer */}
        <div className="flex-1 bg-background flex items-center justify-center p-8 md:p-12 relative min-h-[400px]">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            {renderVisualizer()}
          </div>
        </div>

      </div>
    </div>
  );
};


// ─── LEMBRETES MODAL ───
const pacientes = [
  { slot: '08:00', nome: 'Maria S.', acao: 'confirmar' },
  { slot: '09:00', nome: 'João P.', acao: 'confirmar' },
  { slot: '10:00', nome: 'Carla M.', acao: 'confirmar' },
  { slot: '11:00', nome: 'Pedro L.', acao: 'reagendar' },
  { slot: '14:00', nome: 'Ana R.', acao: 'confirmar' },
  { slot: '15:00', nome: 'Lucas F.', acao: 'confirmar' },
];

type SlotStatus = 'aguardando' | 'reagendando' | 'confirmado';
interface SlotState { status: SlotStatus; nome: string; flash: boolean; }
interface ChatMsg { id: number; isBot: boolean; dest?: string; text: string; photo?: string; }

// Photo map by patient name
const PATIENT_PHOTOS: Record<string, string> = {
  'Maria S.': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=56&h=56', // mulher jovem
  'João P.': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=56&h=56', // homem maduro
  'Carla M.': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=56&h=56', // mulher profissional
  'Pedro L.': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=56&h=56', // homem mais velho
  'Ana R.': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=56&h=56', // mulher sorridente
  'Lucas F.': 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=56&h=56', // homem jovem
  'Beatriz N.': 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=56&h=56', // mulher diferente
};

const TIMELINE = [
  { t: 500, type: 'chat', isBot: true, dest: 'Maria S.', text: 'Oi Maria! Sua consulta é amanhã às 08:00. Posso confirmar?' },
  { t: 1600, type: 'chat', isBot: false, dest: 'Maria S.', text: '✓ Confirmado!' },
  { t: 2300, type: 'slot', index: 0, status: 'confirmado' as SlotStatus, flash: true },
  { t: 2700, type: 'clear' },
  { t: 3000, type: 'chat', isBot: true, dest: 'João P.', text: 'Oi João! Sua consulta é amanhã às 09:00. Posso confirmar?' },
  { t: 4100, type: 'chat', isBot: false, dest: 'João P.', text: '✓ Confirmado!' },
  { t: 4800, type: 'slot', index: 1, status: 'confirmado' as SlotStatus, flash: true },
  { t: 5200, type: 'clear' },
  { t: 5500, type: 'chat', isBot: true, dest: 'Carla M.', text: 'Oi Carla! Sua consulta é amanhã às 10:00. Posso confirmar?' },
  { t: 6600, type: 'chat', isBot: false, dest: 'Carla M.', text: '✓ Confirmado!' },
  { t: 7300, type: 'slot', index: 2, status: 'confirmado' as SlotStatus, flash: true },
  { t: 7700, type: 'clear' },
  { t: 8000, type: 'chat', isBot: true, dest: 'Pedro L.', text: 'Oi Pedro! Sua consulta é amanhã às 11:00. Posso confirmar?' },
  { t: 9200, type: 'chat', isBot: false, dest: 'Pedro L.', text: 'Preciso reagendar 😕' },
  { t: 9900, type: 'slot', index: 3, status: 'reagendando' as SlotStatus, flash: false },
  { t: 10300, type: 'clear' },
  { t: 10600, type: 'chat', isBot: true, dest: 'Pedro L.', text: 'Temos vaga na quarta às 10h ou quinta às 15h. Qual prefere?' },
  { t: 11800, type: 'chat', isBot: false, dest: 'Pedro L.', text: 'Quarta às 10h fica ótimo!' },
  { t: 12500, type: 'chat', isBot: true, dest: 'Pedro L.', text: 'Confirmado! Reagendei para quarta às 10h. O horário de amanhã às 11h foi liberado. 🚀' },
  { t: 13200, type: 'slot', index: 3, status: 'aguardando' as SlotStatus, flash: true, newNome: 'Vaga Liberada' },
  { t: 13600, type: 'clear' },
  { t: 14000, type: 'chat', isBot: true, dest: 'Ana R.', text: 'Oi Ana! Sua consulta é amanhã às 14:00. Posso confirmar?' },
  { t: 15100, type: 'chat', isBot: false, dest: 'Ana R.', text: '✓ Confirmado!' },
  { t: 15800, type: 'slot', index: 4, status: 'confirmado' as SlotStatus, flash: true },
  { t: 16200, type: 'clear' },
  { t: 16500, type: 'chat', isBot: true, dest: 'Lucas F.', text: 'Oi Lucas! Sua consulta é amanhã às 15:00. Posso confirmar?' },
  { t: 17600, type: 'chat', isBot: false, dest: 'Lucas F.', text: '✓ Confirmado!' },
  { t: 18300, type: 'slot', index: 5, status: 'confirmado' as SlotStatus, flash: true },
];

const CYCLE_MS = 20000;

const LembretesModal = ({ onClose }: { onClose: () => void }) => {
  const initialSlots = (): SlotState[] =>
    pacientes.map(p => ({ status: 'aguardando' as SlotStatus, nome: p.nome, flash: false }));

  const [slots, setSlots] = useState<SlotState[]>(initialSlots());
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [confirmed, setConfirmed] = useState(0);
  const msgId = useRef(0);
  const timers = useRef<NodeJS.Timeout[]>([]);

  const clearAll = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const runCycle = () => {
    clearAll();
    setSlots(initialSlots());
    setMessages([]);
    setConfirmed(0);
    msgId.current = 0;

    TIMELINE.forEach(ev => {
      const t = setTimeout(() => {
        if (ev.type === 'clear') {
          setMessages([]);
        } else if (ev.type === 'chat') {
          const id = ++msgId.current;
          const photo = ev.dest ? PATIENT_PHOTOS[ev.dest] : undefined;
          setMessages(prev => {
            const next = [...prev, { id, isBot: ev.isBot!, dest: ev.dest, text: ev.text!, photo }];
            return next.length > 6 ? next.slice(next.length - 6) : next;
          });
        } else if (ev.type === 'slot') {
          const { index, status, flash, newNome } = ev as { index: number; status: SlotStatus; flash: boolean; newNome?: string };
          setSlots(prev => prev.map((s, i) =>
            i === index
              ? { ...s, status, flash, ...(newNome ? { nome: newNome } : {}) }
              : s
          ));
          if (status === 'confirmado') setConfirmed(c => c + 1);
          if (flash) {
            setTimeout(() => setSlots(prev => prev.map((s, i) => i === index ? { ...s, flash: false } : s)), 700);
          }
        }
      }, ev.t);
      timers.current.push(t);
    });

    const loop = setTimeout(runCycle, CYCLE_MS);
    timers.current.push(loop);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    runCycle();
    return () => { clearAll(); document.body.style.overflow = 'auto'; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const slotStyle = (s: SlotState) => {
    if (s.status === 'confirmado') return { bg: '#E1F5EE', border: '#1D9E75', hourColor: '#0F6E56' };
    if (s.status === 'reagendando') return { bg: '#FAEEDA', border: '#BA7517', hourColor: '#7A4E10' };
    return { bg: '#FAF6F0', border: '#D3D1C7', hourColor: '#888' };
  };

  const BadgeSlot = ({ s }: { s: SlotState }) => {
    if (s.status === 'confirmado') return (
      <span style={{ background: '#1D9E75', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 99, display: 'flex', alignItems: 'center', gap: 4 }}>
        <CheckCircle2 style={{ width: 10, height: 10 }} /> confirmado
      </span>
    );
    if (s.status === 'reagendando') return (
      <span style={{ background: '#BA7517', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 99, display: 'flex', alignItems: 'center', gap: 4 }}>
        <RefreshCw style={{ width: 10, height: 10 }} /> remarcando
      </span>
    );
    return (
      <span style={{ background: '#fff', color: '#888', border: '1px solid #D3D1C7', fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 99, display: 'flex', alignItems: 'center', gap: 4 }}>
        <Clock style={{ width: 10, height: 10 }} /> aguardando
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-lg animate-fade-in" onClick={onClose} />
      <div className="relative z-10 w-full max-w-6xl min-h-0 sm:min-h-[600px] lg:min-h-[700px] max-h-[90vh] bg-card border border-border rounded-[2rem] shadow-2xl overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row animate-fade-in">

        {/* LEFT: TEXT */}
        <div className="flex-[1] flex flex-col justify-center p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[hsl(var(--primary)/0.15)] bg-[hsl(var(--primary)/0.06)] relative">
          <button onClick={onClose} className="absolute top-6 left-6 text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-bold transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-foreground leading-tight mb-5">
              Cada paciente que falta é <span className="font-bold text-[hsl(var(--primary))]">dinheiro que sai</span> do seu caixa.
            </h2>
            <p className="text-base font-light leading-relaxed text-muted-foreground">
              A IA lembra cada paciente 24h antes, confirma pelo WhatsApp e atualiza sua agenda automaticamente. Sua secretária faz o que importa,{' '}
              <span className="relative font-medium text-foreground whitespace-nowrap">
                não fica no telefone confirmando.
                <span className="absolute -bottom-[1px] left-0 h-[2px] bg-[hsl(var(--primary))] w-full" />
              </span>
            </p>
          </div>
          <div className="space-y-4 pt-8 border-t border-border/60">
            {[
              { icon: Bell, text: 'Lembrete automático 24h antes da consulta' },
              { icon: CheckCircle2, text: 'Paciente confirma ou reagenda direto no WhatsApp' },
              { icon: Calendar, text: 'Agenda atualizada em tempo real, sem intervenção' },
            ].map(({ icon: Icon2, text }, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon2 className="w-4 h-4" />
                </div>
                <span className="text-[15px] text-foreground font-medium leading-snug">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: ANIMATION */}
        <div className="flex-[1.3] bg-background flex items-center justify-center p-4 lg:p-6 relative overflow-hidden min-h-[500px]">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

          <div className="relative z-10 w-full flex flex-col sm:flex-row gap-4 h-auto sm:h-[480px] max-w-[580px] py-4">

            {/* Chat Panel — clean, no phone frame */}
            <div className="flex-1 flex flex-col gap-0 overflow-hidden min-h-[250px] sm:min-h-0">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-full bg-[hsl(var(--primary)/0.15)] flex items-center justify-center">
                  <Bot className="w-3 h-3 text-[hsl(var(--primary))]" />
                </div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">WhatsApp · IA {CLIENT_NAME}</span>
              </div>
              <div className="flex-1 flex flex-col justify-center gap-3 overflow-hidden">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex items-end gap-2 ${msg.isBot ? 'flex-row' : 'flex-row-reverse'} animate-fade-in`}>
                    {/* Avatar */}
                    <div className={`w-7 h-7 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center shadow-sm ${msg.isBot ? 'bg-[hsl(var(--primary))]' : 'bg-muted border border-border'}`}>
                      {msg.isBot
                        ? <Bot className="w-3.5 h-3.5 text-white" />
                        : <img src={msg.photo || PATIENT_PHOTOS['Maria S.']} alt={msg.dest || 'Paciente'} className="w-full h-full object-cover" />
                      }
                    </div>
                    {/* Bubble */}
                    <div className="flex flex-col gap-0.5 max-w-[80%]">
                      {msg.isBot && msg.dest && (
                        <span className="text-[8px] text-muted-foreground ml-1 font-medium">→ {msg.dest}</span>
                      )}
                      <div
                        className="text-[11px] leading-snug px-3 py-2 shadow-sm"
                        style={{
                          background: msg.isBot ? 'hsl(var(--card))' : 'hsl(var(--primary) / 0.12)',
                          border: msg.isBot ? '1px solid hsl(var(--border))' : '1px solid hsl(var(--primary) / 0.2)',
                          borderRadius: msg.isBot ? '10px 10px 10px 2px' : '10px 10px 2px 10px',
                          color: 'hsl(var(--foreground))',
                        }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agenda Panel */}
            <div className="flex-1 flex flex-col bg-card rounded-2xl shadow-lg overflow-hidden border border-border min-h-[300px] sm:min-h-0">
              <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border bg-background">
                <Calendar className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
                <span className="text-xs font-bold text-foreground">Agenda · Qui 14</span>
              </div>
              <div className="flex-1 flex flex-col gap-1.5 p-2 overflow-hidden">
                {slots.map((s, i) => {
                  const style = slotStyle(s);
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between px-2 py-1.5 rounded-lg"
                      style={{
                        background: style.bg,
                        borderLeft: `3px solid ${style.border}`,
                        transition: 'background 0.5s ease, border-color 0.5s ease',
                        boxShadow: s.flash ? '0 0 0 8px rgba(29,158,117,0)' : 'none',
                        animation: s.flash ? 'slotFlash 0.7s ease-out' : 'none',
                      }}
                    >
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black" style={{ color: style.hourColor }}>{pacientes[i]?.slot ?? s.nome.split(' ')[0]}</span>
                        <span className="text-[9px] font-medium text-gray-500">{s.nome}</span>
                      </div>
                      <BadgeSlot s={s} />
                    </div>
                  );
                })}
              </div>
              <div className="px-3 py-2 border-t border-border flex items-center justify-between">
                <span className="text-[9px] text-muted-foreground font-medium uppercase tracking-wide">Confirmadas</span>
                <span className="text-sm font-black" style={{ color: '#1D9E75' }}>{confirmed}<span className="text-muted-foreground font-normal">/6</span></span>
              </div>
            </div>

          </div>
          <style>{`
            @keyframes slotFlash {
              0% { box-shadow: 0 0 0 0 rgba(29,158,117,0.4); }
              100% { box-shadow: 0 0 0 10px rgba(29,158,117,0); }
            }
          `}</style>
        </div>

      </div>
    </div>
  );
};

// ─── MAIN SLIDE COMPONENT ───
const SolutionsSlide = () => {
  const [selectedSolution, setSelectedSolution] = useState<typeof solutionsData[0] | null>(null);

  return (
    <div className="flex-1 w-full min-h-[100dvh] flex flex-col justify-center px-6 md:px-16 pt-20 pb-20 relative">
      <div className="max-w-7xl mx-auto w-full">

        <div className="mb-14 text-center md:text-left">
          <div className="section-label-line mb-4 justify-center md:justify-start">
            <span className="section-label">O Ecossistema {CLIENT_NAME}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-[hsl(var(--foreground))] leading-tight">
            Tecnologia focada em <br className="hidden md:block" />
            <span className="font-bold text-[hsl(var(--primary))]">Performance Clínica</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Clique em cada solução para ver como a tecnologia funciona na prática.
          </p>
        </div>

        {/* Grid de Soluções */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {solutionsData.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedSolution(item)}
                className="clean-card w-full p-6 md:p-8 hover:-translate-y-1 hover:border-[hsl(var(--primary)/0.4)] hover:shadow-[0_10px_30px_hsl(var(--primary)/0.1)] group flex flex-col text-left transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center text-muted-foreground mb-6 group-hover:bg-[hsl(var(--primary)/0.1)] group-hover:border-[hsl(var(--primary)/0.3)] group-hover:text-[hsl(var(--primary))] transition-all duration-500 group-hover:scale-110">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-[hsl(var(--primary))] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {item.desc}
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[hsl(var(--primary))] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                  Ver demonstração <ChevronRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* RENDER MODALS */}
      {selectedSolution && (
        selectedSolution.id === "ia" ? <IAModal onClose={() => setSelectedSolution(null)} /> :
          (selectedSolution.id === "followup" || selectedSolution.id === "ativacao") ? <FollowUpModal onClose={() => setSelectedSolution(null)} /> :
            selectedSolution.id === "lembretes" ? <LembretesModal onClose={() => setSelectedSolution(null)} /> :
              <DefaultSolutionModal solution={selectedSolution} onClose={() => setSelectedSolution(null)} />
      )}
    </div>
  );
};

export default SolutionsSlide;

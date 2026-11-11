import { useState, useEffect, useRef } from "react";
import { CLIENT_NAME } from "../config";
import {
  Bot,
  Users,
  Gift,
  FileText,
  Database,
  Network,
  Smartphone,
  BarChart,
  CheckCircle2,
  Clock,
  Calendar,
  UserCheck,
  ArrowRightLeft,
  MessageSquare,
  ShieldCheck,
  Server,
  TrendingUp,
  ChevronRight,
  RefreshCw,
  Zap,
  User,
  Bell,
  Copy,
  Check
} from "lucide-react";

// ─── RESPONSIVE WRAPPER FOR MOCKUPS ───
const ResponsiveMockupWrapper = ({ children, maxW = 380, h = 460 }: { children: React.ReactNode; maxW?: number; h?: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const parentWidth = containerRef.current.getBoundingClientRect().width;
      if (parentWidth < maxW) {
        setScale(parentWidth / maxW);
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    const timer = setTimeout(handleResize, 150);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [maxW]);

  return (
    <div
      ref={containerRef}
      className="w-full flex items-center justify-center overflow-hidden relative"
      style={{ height: `${h * scale}px`, minHeight: `${h * scale}px` }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          width: `${maxW}px`,
          height: `${h}px`,
          flexShrink: 0
        }}
        className="transition-transform duration-200 ease-out flex-shrink-0"
      >
        {children}
      </div>
    </div>
  );
};

// ─── UTILITIES & HELPERS FOR ANIMATIONS ───

const TypingBubble = ({ isBot, userAvatar }: { isBot: boolean; userAvatar?: string }) => (
  <div className={`flex gap-3 w-full ${isBot ? 'flex-row' : 'flex-row-reverse'} animate-fade-in`}>
    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden ${isBot ? 'bg-[hsl(var(--primary))] text-primary-foreground shadow-sm shadow-primary/20' : 'bg-muted border border-border shadow-sm'}`}>
      {isBot ? <Bot className="w-4 h-4" /> : <img src={userAvatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100"} alt="Paciente" className="w-full h-full object-cover" />}
    </div>
    <div className={`px-4 py-3 rounded-2xl ${isBot ? 'rounded-tl-sm bg-[hsl(var(--primary)/0.1)]' : 'rounded-tr-sm bg-muted'} shadow-sm flex items-center h-[44px]`}>
      <div className="flex gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  </div>
);

const ChatMessage = ({ isBot, children, show = false, className = "", userAvatar }: { isBot: boolean; children: React.ReactNode; show?: boolean; className?: string; userAvatar?: string }) => {
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

const Bubble = ({ isBot, children }: { isBot: boolean; children: React.ReactNode }) => (
  <div className={`${isBot ? 'bg-[hsl(var(--primary))] text-primary-foreground rounded-tl-sm shadow-md' : 'bg-muted text-muted-foreground rounded-tr-sm shadow-sm'} px-5 py-3 rounded-2xl text-[15px]`}>
    {children}
  </div>
);

const PATIENT_PHOTOS: Record<string, string> = {
  'Maria S.': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=56&h=56',
  'João P.': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=56&h=56',
  'Carla M.': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=56&h=56',
  'Pedro L.': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=56&h=56',
  'Ana R.': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=56&h=56',
  'Lucas F.': 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=56&h=56',
  'Beatriz N.': 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=56&h=56',
};

// Mockup 1: Recepção VIP com IA
const RecepcaoMockup = () => {
  const [chatStep, setChatStep] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (chatStep === 0) t = setTimeout(() => setChatStep(1), 1500);
    else if (chatStep === 1) t = setTimeout(() => setChatStep(2), 1200);
    else if (chatStep === 2) t = setTimeout(() => setChatStep(3), 2000);
    else if (chatStep === 3) t = setTimeout(() => setChatStep(4), 2500);
    else if (chatStep === 4) t = setTimeout(() => setChatStep(5), 1000);
    else if (chatStep === 5) t = setTimeout(() => setChatStep(6), 1000);
    else if (chatStep === 6) t = setTimeout(() => setChatStep(7), 1500);
    else if (chatStep === 7) t = setTimeout(() => setChatStep(8), 2000);
    else if (chatStep === 8) t = setTimeout(() => setChatStep(9), 1000);
    else if (chatStep === 9) t = setTimeout(() => setChatStep(10), 1000);
    else if (chatStep === 10) t = setTimeout(() => setChatStep(11), 1500);
    else if (chatStep === 11) t = setTimeout(() => setChatStep(0), 4000);
    return () => clearTimeout(t);
  }, [chatStep]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [chatStep]);

  return (
    <div className="w-full h-full bg-card border border-border shadow-xl rounded-2xl overflow-hidden text-left flex flex-col relative">
      <div className="bg-muted/40 px-4 py-3 border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-primary-foreground shadow-sm">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-foreground leading-none">Recepcionista Virtual</h4>
            <span className="text-[9px] text-emerald-500 font-medium flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Online
            </span>
          </div>
        </div>
        <span className="text-[9px] bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] font-bold px-2 py-0.5 rounded-full">
          Simulação
        </span>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto bg-background/50 flex flex-col justify-start relative text-[11px] gap-3.5 scrollbar-none pb-24"
      >
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

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
            <div className="flex gap-1.5 ml-2 mt-1 animate-fade-in">
              <span className="bg-background border border-[hsl(var(--primary)/0.4)] text-[hsl(var(--primary))] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-0.5">
                <Clock className="w-2.5 h-2.5" /> 14:00
              </span>
              <span className="bg-background border border-[hsl(var(--primary)/0.4)] text-[hsl(var(--primary))] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-0.5 bg-[hsl(var(--primary)/0.05)] ring-1 ring-[hsl(var(--primary)/0.3)]">
                <Clock className="w-2.5 h-2.5" /> 16:00
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
        <ChatMessage isBot={true} show={chatStep >= 11} className="relative pb-24">
          <Bubble isBot={true}>Prontinho! Sua consulta está confirmada ✅</Bubble>

          <div className="absolute top-14 left-1/2 -translate-x-1/2 w-[95%] bg-card border border-[hsl(var(--primary)/0.5)] shadow-[0_12px_30px_rgba(0,0,0,0.15)] rounded-2xl p-3.5 flex flex-col gap-2.5 animate-[slideUp_0.5s_cubic-bezier(0.34,1.56,0.64,1)_forwards]">
            <div className="flex items-center gap-2 border-b border-border pb-2">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-[9px] font-bold text-foreground uppercase tracking-wider">Agendamento Criado</p>
                <p className="text-[8px] text-[hsl(var(--primary))] font-medium">Sincronizado com a agenda</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <div className="flex items-center gap-1.5 text-[10px] text-foreground font-medium">
                <UserCheck className="w-3 h-3 text-muted-foreground" /> Dr. Carlos
              </div>
              <div className="flex items-center gap-0.5 text-[10px] font-bold bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] px-2 py-0.5 rounded">
                <Clock className="w-3 h-3" /> 16:00
              </div>
            </div>
          </div>
        </ChatMessage>
      </div>
    </div>
  );
};

// Mockup 2: Follow-ups Automáticos
const FollowUpMockup = () => {
  return (
    <div className="w-full h-full bg-card border border-border shadow-xl rounded-2xl overflow-hidden text-left flex flex-col justify-between relative">
      {/* Header do mockup */}
      <div className="bg-muted/40 px-4 py-3 border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[hsl(var(--primary)/0.15)] border border-[hsl(var(--primary)/0.25)] flex items-center justify-center text-[hsl(var(--primary))]">
            <RefreshCw className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--primary))]">
            FOLLOW-UP AUTOMÁTICO
          </span>
        </div>
        <span className="text-[9px] bg-emerald-500/10 text-emerald-600 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Ativo
        </span>
      </div>

      {/* Conteúdo / Conversa */}
      <div className="flex-1 p-4 bg-background/50 flex flex-col justify-center gap-3.5 relative overflow-hidden text-xs">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

        {/* Bolha de mensagem do paciente (fundo cinza claro, alinhada à esquerda) */}
        <div className="flex items-end gap-2.5 max-w-[88%] self-start animate-fade-in z-10">
          <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-border shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100"
              alt="João P."
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-muted border border-border/80 text-foreground px-3.5 py-2.5 rounded-2xl rounded-bl-xs shadow-xs flex flex-col">
            <p className="text-[11.5px] font-normal leading-snug text-foreground/90">
              Preciso ver minha escala no trabalho, te confirmo
            </p>
            <span className="text-[9px] text-muted-foreground text-right mt-1 font-medium">14:32</span>
          </div>
        </div>

        {/* Badge central em formato pill, cinza claro */}
        <div className="self-center my-1 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted border border-border/80 text-muted-foreground text-[10px] font-medium shadow-xs animate-fade-in">
          <Clock className="w-3 h-3 text-muted-foreground" />
          <span>2h sem resposta · follow-up automático</span>
        </div>

        {/* Bolha de resposta da IA (fundo verde da marca, texto branco, alinhada à direita) */}
        <div className="flex items-end gap-2.5 max-w-[92%] self-end flex-row-reverse animate-fade-in z-10">
          <div className="w-7 h-7 rounded-full bg-[hsl(var(--primary))] text-primary-foreground flex items-center justify-center shrink-0 shadow-sm shadow-primary/30">
            <Bot className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <div className="bg-[hsl(var(--primary))] text-primary-foreground px-3.5 py-2.5 rounded-2xl rounded-br-xs shadow-md flex flex-col">
            <div className="flex items-center gap-1 text-[10px] font-bold text-primary-foreground/90 mb-1">
              <Bot className="w-3 h-3 text-primary-foreground" />
              <span>Tenaz IA</span>
            </div>
            <p className="text-[11.5px] font-normal leading-snug text-primary-foreground">
              Oi João! Conseguiu ver sua escala? Ainda tenho quinta às 14h ou sábado às 9h com a Dra. Paula — qual encaixa melhor?
            </p>
            <span className="text-[9px] text-primary-foreground/80 text-right mt-1 font-medium">16:32</span>
          </div>
        </div>
      </div>

      {/* Rodapé do mockup */}
      <div className="p-3 bg-muted/20 border-t border-border flex items-center justify-center shrink-0 z-10">
        <button className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.9)] text-primary-foreground font-bold py-2.5 px-4 rounded-xl shadow-sm flex items-center justify-center gap-2 text-[11px] transition-all">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Ver Fluxo Completo</span>
        </button>
      </div>
    </div>
  );
};

// Mockup 3: Lembretes da Agenda
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

const LembretesMockup = () => {
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
            return next.length > 3 ? next.slice(next.length - 3) : next;
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
    runCycle();
    return () => { clearAll(); };
  }, []);

  const slotStyle = (s: SlotState) => {
    if (s.status === 'confirmado') return { bg: 'rgba(29, 158, 117, 0.08)', border: '#1D9E75', hourColor: '#0F6E56' };
    if (s.status === 'reagendando') return { bg: 'rgba(186, 117, 23, 0.08)', border: '#BA7517', hourColor: '#7A4E10' };
    return { bg: 'rgba(0, 0, 0, 0.02)', border: '#D3D1C7', hourColor: '#666' };
  };

  const BadgeSlot = ({ s }: { s: SlotState }) => {
    if (s.status === 'confirmado') return (
      <span className="bg-[#1D9E75] text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shrink-0 animate-fade-in">
        <CheckCircle2 className="w-1.5 h-1.5" /> conf
      </span>
    );
    if (s.status === 'reagendando') return (
      <span className="bg-[#BA7517] text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shrink-0">
        <RefreshCw className="w-1.5 h-1.5 animate-spin" style={{ animationDuration: '2s' }} /> remar
      </span>
    );
    return (
      <span className="bg-background text-muted-foreground border border-border text-[7px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shrink-0">
        <Clock className="w-1.5 h-1.5" /> aguard
      </span>
    );
  };

  return (
    <div className="w-full h-full bg-card border border-border shadow-xl rounded-2xl overflow-hidden text-left flex flex-col relative">
      <div className="bg-muted/40 px-3 py-3 border-b border-border flex items-center justify-between shrink-0">
        <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">Lembretes & Confirmações</span>
        <div className="flex items-center gap-1 text-[9px] text-muted-foreground font-medium">
          Confirmados: <strong className="text-emerald-600 font-black">{confirmed}/6</strong>
        </div>
      </div>

      <div className="flex-1 p-3 bg-background/50 flex gap-2.5 overflow-hidden text-[9px]">
        {/* Left Column - WhatsApp (48% width) */}
        <div className="w-[48%] flex flex-col overflow-hidden h-full border-r border-border/40 pr-2.5">
          <div className="flex items-center gap-1 mb-2.5 shrink-0">
            <div className="w-4 h-4 rounded-full bg-[hsl(var(--primary)/0.15)] flex items-center justify-center">
              <Bot className="w-2.5 h-2.5 text-[hsl(var(--primary))]" />
            </div>
            <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Zap IA</span>
          </div>
          <div className="flex-1 flex flex-col justify-end gap-2.5 overflow-hidden pb-1">
            {messages.map(msg => (
              <div key={msg.id} className={`flex items-end gap-1.5 ${msg.isBot ? 'flex-row' : 'flex-row-reverse'} animate-fade-in`}>
                <div className={`w-5.5 h-5.5 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center shadow-sm ${msg.isBot ? 'bg-[hsl(var(--primary))]' : 'bg-muted border border-border'}`}>
                  {msg.isBot
                    ? <Bot className="w-3 h-3 text-white" />
                    : <img src={msg.photo || PATIENT_PHOTOS['Maria S.']} alt={msg.dest || 'Paciente'} className="w-full h-full object-cover" />
                  }
                </div>
                <div className="flex flex-col gap-0.5 max-w-[82%]">
                  {msg.isBot && msg.dest && (
                    <span className="text-[6px] text-muted-foreground ml-1 font-medium">→ {msg.dest}</span>
                  )}
                  <div
                    className="text-[9px] leading-snug px-2.5 py-1.5 shadow-sm font-medium"
                    style={{
                      background: msg.isBot ? 'hsl(var(--card))' : 'hsl(var(--primary) / 0.12)',
                      border: msg.isBot ? '1px solid hsl(var(--border))' : '1px solid hsl(var(--primary) / 0.2)',
                      borderRadius: msg.isBot ? '6px 6px 6px 2px' : '6px 6px 2px 6px',
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

        {/* Right Column - Agenda (52% width) */}
        <div className="w-[52%] flex flex-col bg-card rounded-xl shadow-sm overflow-hidden border border-border h-full">
          <div className="flex items-center gap-1.5 px-2.5 py-2.5 border-b border-border bg-background shrink-0">
            <Calendar className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
            <span className="text-[9px] font-bold text-foreground">Agenda · Amanhã</span>
          </div>
          <div className="flex-1 flex flex-col gap-2 p-2 justify-between overflow-hidden">
            {slots.map((s, i) => {
              const style = slotStyle(s);
              return (
                <div
                  key={i}
                  className="flex items-center justify-between px-2 py-1 rounded-md"
                  style={{
                    background: style.bg,
                    borderLeft: `2px solid ${style.border}`,
                    transition: 'background 0.5s ease, border-color 0.5s ease',
                    boxShadow: s.flash ? '0 0 0 6px rgba(29, 158, 117, 0)' : 'none',
                    animation: s.flash ? 'slotFlash 0.7s ease-out' : 'none',
                  }}
                >
                  <div className="flex flex-col min-w-0 flex-1 pr-1">
                    <span className="text-[7px] font-black" style={{ color: style.hourColor }}>{pacientes[i]?.slot ?? s.nome.split(' ')[0]}</span>
                    <span className="text-[8.5px] font-bold text-foreground truncate max-w-[80px]">{s.nome}</span>
                  </div>
                  <BadgeSlot s={s} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Mockup 4: Digitalização de Guias com IA
const GuiasMockup = () => {
  const [scanStep, setScanStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanStep(s => (s + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-card border border-border shadow-xl rounded-2xl overflow-hidden text-left flex flex-col relative">
      {/* Header of the Tenaz Extractor interface */}
      <div className="bg-muted/40 px-4 py-3 border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--primary))] animate-pulse" />
          <span className="text-[10px] font-bold uppercase text-foreground tracking-wider">
            Plataforma Tenaz · Extrator IA
          </span>
        </div>
        <span className="text-[8px] font-extrabold bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full uppercase">
          OCR Ativo
        </span>
      </div>

      <div className="flex-1 p-4 bg-background/50 flex flex-col gap-3 justify-between relative overflow-hidden text-[10px]">
        {/* Animated Scan Line - only show during step 0 and 1 */}
        {(scanStep === 0 || scanStep === 1) && (
          <div className="absolute left-0 w-full h-[2px] bg-[hsl(var(--primary))] shadow-[0_0_12px_hsl(var(--primary))] z-20 animate-[scannerLine_2.5s_ease-in-out_infinite]" />
        )}

        {/* Top: Source Indicator */}
        <div className="bg-card border border-border rounded-xl p-2.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${scanStep === 0 ? 'bg-[hsl(var(--primary)/0.2)] text-[hsl(var(--primary))]' : 'bg-muted text-muted-foreground'}`}>
              <FileText className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground">
                {scanStep === 0 ? "Recebendo Guia/Carteirinha..." : "Origem: WhatsApp / Scanner"}
              </span>
              <span className="text-[8px] text-muted-foreground">guia_consulta_unimed.png</span>
            </div>
          </div>
          <span className="text-[8px] bg-muted px-2 py-0.5 rounded text-foreground font-semibold">
            {scanStep === 0 ? "Carregando" : "Lido"}
          </span>
        </div>

        {/* Middle: Tenaz Review Panel */}
        <div className="bg-card border border-border rounded-xl p-3 shadow-sm flex-1 flex flex-col gap-2.5 relative justify-center">
          <div className="flex items-center justify-between border-b border-border pb-1.5 shrink-0">
            <span className="font-bold text-[8px] tracking-wider text-muted-foreground uppercase">Campos Extraídos para Cópia</span>
            <span className="text-[7.5px] text-[hsl(var(--primary))] font-bold uppercase">Copiar e colar</span>
          </div>

          <div className="flex flex-col gap-2">
            {/* Field 1: Paciente */}
            <div className={`p-2 rounded border transition-all duration-300 flex items-center justify-between ${scanStep >= 2 ? 'border-border bg-background' : 'border-transparent bg-muted/20'
              }`}>
              <div className="flex-1 min-w-0 pr-2">
                <span className="text-[7px] text-muted-foreground uppercase font-bold block leading-none">Paciente</span>
                <span className="font-bold text-foreground text-[9px] mt-0.5 block truncate">
                  {scanStep >= 2 ? "MARIA SILVA DE ALMEIDA" : "•••••••••••••••••••••••••"}
                </span>
              </div>
              {scanStep >= 2 && (
                <button className={`h-6 px-2 rounded flex items-center gap-1 text-[8px] font-bold border transition-colors ${scanStep >= 4
                  ? 'bg-green-500/10 border-green-500/30 text-green-600'
                  : 'bg-muted/50 border-border text-foreground hover:bg-muted'
                  }`}>
                  {scanStep >= 4 ? (
                    <>
                      <Check className="w-2.5 h-2.5" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-2.5 h-2.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Field 2: Carteirinha */}
            <div className={`p-2 rounded border transition-all duration-300 flex items-center justify-between ${scanStep >= 2
              ? scanStep === 3
                ? 'border-[hsl(var(--primary)/0.5)] bg-[hsl(var(--primary)/0.02)] ring-1 ring-[hsl(var(--primary)/0.2)]'
                : 'border-border bg-background'
              : 'border-transparent bg-muted/20'
              }`}>
              <div className="flex-1 min-w-0 pr-2">
                <span className="text-[7px] text-muted-foreground uppercase font-bold block leading-none">Nº da Carteirinha</span>
                <span className="font-bold text-foreground text-[9px] mt-0.5 block truncate">
                  {scanStep >= 2 ? "0021 3491 2948 1009" : "•••••••••••••••••••••••••"}
                </span>
              </div>
              {scanStep >= 2 && (
                <button className={`h-6 px-2 rounded flex items-center gap-1 text-[8px] font-bold border transition-all ${scanStep >= 3
                  ? 'bg-green-500 text-white border-green-600 scale-[1.02]'
                  : 'bg-muted/50 border-border text-foreground hover:bg-muted'
                  }`}>
                  {scanStep >= 3 ? (
                    <>
                      <Check className="w-2.5 h-2.5" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-2.5 h-2.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Field 3: Procedimento TUSS */}
            <div className={`p-2 rounded border transition-all duration-300 flex items-center justify-between ${scanStep >= 2 ? 'border-border bg-background' : 'border-transparent bg-muted/20'
              }`}>
              <div className="flex-1 min-w-0 pr-2">
                <span className="text-[7px] text-muted-foreground uppercase font-bold block leading-none">Procedimento (TUSS)</span>
                <span className="font-bold text-foreground text-[9px] mt-0.5 block truncate">
                  {scanStep >= 2 ? "40101010 - ELETROCARDIOGRAMA" : "•••••••••••••••••••••••••"}
                </span>
              </div>
              {scanStep >= 2 && (
                <button className="h-6 px-2 rounded flex items-center gap-1 text-[8px] font-bold border bg-muted/50 border-border text-foreground hover:bg-muted">
                  <Copy className="w-2.5 h-2.5" />
                  <span>Copiar</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Status bar with toast notification feedback */}
        <div className="relative">
          {scanStep === 3 && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-[90%] bg-emerald-600 text-white font-bold text-[8.5px] px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 mb-2 animate-[slideUp_0.3s_cubic-bezier(0.34,1.56,0.64,1)_forwards] z-30">
              <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
              <span>Número copiado! Cole no seu prontuário.</span>
            </div>
          )}

          <div className="bg-card border border-border rounded-xl p-2.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <RefreshCw className={`w-3.5 h-3.5 text-[hsl(var(--primary))] ${scanStep < 2 ? 'animate-spin' : ''}`} />
              <span className="font-bold text-foreground">
                {scanStep === 0 && "Processando arquivo de imagem..."}
                {scanStep === 1 && "Decifrando campos do convênio..."}
                {scanStep === 2 && "Extraído! Clique para copiar os dados."}
                {scanStep === 3 && "Carteirinha copiada com sucesso!"}
                {scanStep === 4 && "Dados prontos no Tenaz."}
              </span>
            </div>
            <span className={`text-[7.5px] font-extrabold px-2 py-0.5 rounded transition-all uppercase ${scanStep >= 2 ? 'bg-green-500 text-white shadow' : 'bg-muted text-muted-foreground'
              }`}>
              {scanStep >= 2 ? "Finalizado" : "Processando"}
            </span>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scannerLine {
          0%, 100% { top: 12%; opacity: 0.1; }
          50% { top: 88%; opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

// Mockup 5: Soluções de CRM
const CRMMockup = () => {
  const [crmStep, setCrmStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCrmStep(s => (s + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-card border border-border shadow-xl rounded-2xl overflow-hidden text-left flex flex-col relative">
      <div className="bg-muted/40 px-4 py-3 border-b border-border flex items-center justify-between shrink-0">
        <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">CRM de Pacientes (Kanban)</span>
        <span className="text-[9px] font-bold bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] px-2 py-0.5 rounded-full">Funil {CLIENT_NAME}</span>
      </div>

      <div className="flex-1 p-3 bg-background/50 flex gap-2 overflow-hidden text-[9px]">
        {/* Column 1: Entrada */}
        <div className="flex-1 bg-muted/20 border border-border/40 rounded-xl p-2 flex flex-col gap-2 h-full overflow-hidden">
          <span className="font-bold text-muted-foreground uppercase text-[8px] tracking-wider border-b border-border/40 pb-1">Entrada</span>
          <div className="flex-1 flex flex-col gap-2 overflow-hidden">
            {crmStep === 0 ? (
              <div className="bg-card border border-[hsl(var(--primary)/0.4)] shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-lg p-2.5 flex flex-col gap-1 animate-[cardSlide_0.5s_ease-out_forwards] relative">
                <div className="w-2 h-2 bg-blue-500 rounded-full absolute top-2 right-2" />
                <span className="font-bold text-foreground">Roberto Silva</span>
                <span className="text-muted-foreground text-[8px] leading-none">WhatsApp: Particular</span>
                <span className="text-[7.5px] bg-muted px-1.5 py-0.5 rounded self-start mt-0.5 text-foreground/80 font-medium">Novo Lead</span>
              </div>
            ) : null}
            <div className="bg-card border border-border/50 rounded-lg p-2 flex flex-col gap-1 opacity-70">
              <span className="font-bold text-foreground">Carlos A.</span>
              <span className="text-muted-foreground text-[8px]">Particular · Eletro</span>
            </div>
            <div className="bg-card border border-border/50 rounded-lg p-2 flex flex-col gap-1 opacity-70">
              <span className="font-bold text-foreground">Ana Julia S.</span>
              <span className="text-muted-foreground text-[8px]">Unimed · Consulta</span>
            </div>
          </div>
        </div>

        {/* Column 2: Triagem */}
        <div className="flex-1 bg-muted/20 border border-border/40 rounded-xl p-2 flex flex-col gap-2 h-full overflow-hidden">
          <span className="font-bold text-muted-foreground uppercase text-[8px] tracking-wider border-b border-border/40 pb-1">Triagem</span>
          <div className="flex-1 flex flex-col gap-2 overflow-hidden">
            {crmStep === 1 ? (
              <div className="bg-card border border-[hsl(var(--primary)/0.4)] shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-lg p-2.5 flex flex-col gap-1 animate-[cardSlide_0.5s_ease-out_forwards] relative">
                <div className="w-2 h-2 bg-amber-500 rounded-full absolute top-2 right-2 animate-pulse" />
                <span className="font-bold text-foreground">Roberto Silva</span>
                <span className="text-muted-foreground text-[8px] leading-none">Triagem: Unimed</span>
                <span className="text-[7.5px] bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] px-1.5 py-0.5 rounded self-start mt-0.5 font-medium">Enviando Agenda</span>
              </div>
            ) : null}
            <div className="bg-card border border-border/50 rounded-lg p-2 flex flex-col gap-1 opacity-70">
              <span className="font-bold text-foreground">Juliana M.</span>
              <span className="text-muted-foreground text-[8px]">Bradesco · Ergometria</span>
            </div>
            <div className="bg-card border border-border/50 rounded-lg p-2 flex flex-col gap-1 opacity-70">
              <span className="font-bold text-foreground">Pedro F.</span>
              <span className="text-muted-foreground text-[8px]">Amil · Eco</span>
            </div>
          </div>
        </div>

        {/* Column 3: Agendado */}
        <div className="flex-1 bg-muted/20 border border-border/40 rounded-xl p-2 flex flex-col gap-2 h-full overflow-hidden">
          <span className="font-bold text-muted-foreground uppercase text-[8px] tracking-wider border-b border-border/40 pb-1">Agendado</span>
          <div className="flex-1 flex flex-col gap-2 overflow-hidden">
            {crmStep === 2 ? (
              <div className="bg-card border border-green-500/40 shadow-[0_4px_12px_rgba(16,185,129,0.1)] rounded-lg p-2.5 flex flex-col gap-1 animate-[cardSlide_0.5s_ease-out_forwards] relative bg-green-500/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 absolute top-2 right-2 animate-bounce" />
                <span className="font-bold text-foreground">Roberto Silva</span>
                <span className="text-muted-foreground text-[8px] leading-none">Confirmado: IOB</span>
                <span className="text-[7.5px] bg-green-500/20 text-green-700 px-1.5 py-0.5 rounded self-start mt-0.5 font-medium">Concluído</span>
              </div>
            ) : null}
            <div className="bg-card border border-border/50 rounded-lg p-2 flex flex-col gap-1 opacity-70">
              <span className="font-bold text-foreground">Mariana L.</span>
              <span className="text-muted-foreground text-[8px]">Dr. Carlos · 15:30</span>
            </div>
            <div className="bg-card border border-border/50 rounded-lg p-2 flex flex-col gap-1 opacity-70">
              <span className="font-bold text-foreground">Lucas H.</span>
              <span className="text-muted-foreground text-[8px]">Dra. Ana · 17:00</span>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes cardSlide {
          from { transform: translateY(12px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// Mockup 6: Integrações de Sistemas
const IntegracoesMockup = () => {
  const [logIndex, setLogIndex] = useState(0);
  const logs = [
    "[16:01:00] Pedido recebido pelo WhatsApp (Paciente: Maria F.)",
    "[16:01:01] Buscando vagas livres na Agenda da IOB...",
    "[16:01:02] Vaga encontrada: Terça às 14:00. Reservando...",
    "[16:01:03] Agendamento confirmado com sucesso no ERP! ✅",
    "[16:01:05] Status atualizado no CRM: Finalizado.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex(i => (i + 1) % logs.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-card border border-border shadow-xl rounded-2xl overflow-hidden text-left flex flex-col relative">
      <div className="bg-muted/40 px-4 py-3 border-b border-border flex items-center justify-between shrink-0">
        <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">Integração de APIs</span>
        <span className="text-[9px] font-bold bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full">Sincronizado</span>
      </div>

      <div className="flex-1 p-4 bg-background/50 flex flex-col gap-4 justify-between relative overflow-hidden text-[9px]">
        {/* Nodes and Connection */}
        <div className="flex items-center justify-between relative mt-2 shrink-0">
          {/* Connection line */}
          <div className="absolute left-[30px] right-[30px] h-[3px] bg-muted top-1/2 -translate-y-1/2 overflow-hidden rounded-full">
            <div className="h-full w-8 bg-[hsl(var(--primary))] rounded-full animate-[syncLine_1.5s_linear_infinite]" />
          </div>

          {/* Node 1: WhatsApp API */}
          <div className="bg-card border border-border p-2.5 rounded-xl flex flex-col items-center gap-1.5 shadow-sm shrink-0 z-10 w-[80px] text-center">
            <Smartphone className="w-5 h-5 text-emerald-500 animate-[pulseNode_2s_infinite]" />
            <span className="font-extrabold uppercase text-[7px] text-muted-foreground leading-none">WhatsApp API</span>
          </div>

          {/* Node 2: Nosso Integrador */}
          <div className="bg-[hsl(var(--primary))] border border-[hsl(var(--primary)/0.5)] p-2.5 rounded-xl flex flex-col items-center gap-1.5 shadow-md shadow-primary/20 shrink-0 z-10 w-[90px] text-center text-primary-foreground animate-[pulseNode_2s_infinite]">
            <Bot className="w-5 h-5 text-white" />
            <span className="font-extrabold uppercase text-[7px] leading-none">Integrador</span>
          </div>

          {/* Node 3: ERP Clínica */}
          <div className="bg-card border border-border p-2.5 rounded-xl flex flex-col items-center gap-1.5 shadow-sm shrink-0 z-10 w-[80px] text-center">
            <Database className="w-5 h-5 text-blue-500 animate-[pulseNode_2s_infinite]" />
            <span className="font-extrabold uppercase text-[7px] text-muted-foreground leading-none">ERP Médico</span>
          </div>
        </div>

        {/* API Stats */}
        <div className="grid grid-cols-2 gap-2 bg-card border border-border rounded-xl p-2.5 text-[8px] font-bold text-muted-foreground shrink-0">
          <div className="flex flex-col gap-0.5">
            <span>Latência Média:</span>
            <span className="text-[10px] text-foreground font-extrabold">12ms (Super Rápido)</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span>Status Integradores:</span>
            <span className="text-[10px] text-emerald-500 font-extrabold flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> 100% Operacional
            </span>
          </div>
        </div>

        {/* Real-time sync logs terminal */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex-1 flex flex-col justify-start gap-1.5 font-mono text-[8px] text-slate-300 shadow-inner overflow-hidden select-none min-h-[140px]">
          <div className="flex items-center gap-1.5 border-b border-slate-800 pb-1.5 mb-1 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
            <span className="text-[7px] text-slate-500 ml-1">api_sync_stream.log</span>
          </div>
          <div className="flex-1 flex flex-col gap-1.5 overflow-hidden">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className={`transition-all duration-300 ${idx === logIndex ? 'text-green-400 font-extrabold translate-x-1' : 'opacity-40 text-slate-400'}`}
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes syncLine {
          0% { left: 0%; transform: translateX(-100%); }
          100% { left: 100%; transform: translateX(0); }
        }
        @keyframes pulseNode {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
      `}</style>
    </div>
  );
};

// Mockup 7: Plataforma Multi-WhatsApp
const MultiMockup = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(s => (s + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-card border border-border shadow-xl rounded-2xl overflow-hidden text-left flex flex-col relative">
      <div className="bg-muted/40 px-4 py-3 border-b border-border flex items-center justify-between shrink-0">
        <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">Multi-WhatsApp {CLIENT_NAME}</span>
        <span className="text-[9px] font-bold bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full">4 Atendentes</span>
      </div>

      <div className="flex-1 p-4 bg-background/50 flex flex-col gap-3 justify-between relative overflow-hidden text-[9px]">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

        {/* Master phone input node */}
        <div className="bg-card border border-border rounded-xl p-2.5 flex items-center gap-3 shadow-sm shrink-0">
          <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
            <Smartphone className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-foreground">Número Oficial da Clínica</span>
              <span className="text-[8px] bg-emerald-500 text-white font-bold px-1.5 py-0.2 rounded-full animate-pulse">Ativo</span>
            </div>
            <span className="text-muted-foreground text-[8px]">(31) 3223-9000 (API Oficial)</span>
          </div>
        </div>

        {/* Animated flow indicator */}
        <div className="flex justify-center my-1 relative shrink-0">
          <div className="w-[1.5px] h-8 bg-muted relative">
            <div className="absolute top-0 left-[-1.25px] w-[4px] h-[4px] rounded-full bg-[hsl(var(--primary))] animate-[packetFlow_1.5s_linear_infinite]" />
          </div>
        </div>

        {/* Central Router Unit */}
        <div className="bg-[hsl(var(--primary))] border border-[hsl(var(--primary)/0.4)] text-primary-foreground rounded-xl p-2.5 flex items-center gap-2.5 shadow-md shadow-primary/15 shrink-0">
          <Bot className="w-4 h-4 text-white shrink-0 animate-bounce" />
          <div className="flex-1">
            <span className="font-bold text-[9px] block">Roteador de Conversas IA</span>
            <span className="text-[7.5px] opacity-90 font-medium">
              {step === 0 && "Direcionando paciente Pedro para Recepção..."}
              {step === 1 && "Direcionando paciente João para Financeiro..."}
              {step === 2 && "Direcionando paciente Carla para Enfermagem..."}
              {step === 3 && "Direcionando paciente Lucas para Médicos..."}
            </span>
          </div>
        </div>

        {/* Departments grid */}
        <div className="grid grid-cols-2 gap-2 mt-1 flex-1">
          {[
            { label: 'Recepção', code: 0, color: 'border-blue-500/30 bg-blue-500/5 text-blue-600' },
            { label: 'Financeiro', code: 1, color: 'border-purple-500/30 bg-purple-500/5 text-purple-600' },
            { label: 'Enfermagem', code: 2, color: 'border-green-500/30 bg-green-500/5 text-green-600' },
            { label: 'Medicina', code: 3, color: 'border-amber-500/30 bg-amber-500/5 text-amber-600' }
          ].map((dept) => {
            const isActive = step === dept.code;
            return (
              <div
                key={dept.label}
                className={`border rounded-xl p-2.5 flex items-center justify-between transition-all duration-500 ${isActive ? dept.color + ' scale-[1.03] shadow-sm font-bold border-current' : 'border-border/60 bg-card/60 opacity-60 text-muted-foreground'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-5.5 h-5.5 rounded-full flex items-center justify-center ${isActive ? 'bg-muted/10' : 'bg-muted'}`}>
                    <Users className="w-3 h-3" />
                  </div>
                  <span className="text-[9px] uppercase tracking-wide">{dept.label}</span>
                </div>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @keyframes packetFlow {
          0% { top: 0%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// Mockup 8: Dashboards e Métricas
const MetricasMockup = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const barData = [
    { label: 'Jan', v: 42 }, { label: 'Fev', v: 58 }, { label: 'Mar', v: 51 },
    { label: 'Abr', v: 74 }, { label: 'Mai', v: 88 }, { label: 'Jun', v: 100 },
  ];

  const kpis = [
    { label: 'Agendados', values: ['+24%', '+31%', '+42%'], color: 'text-[hsl(var(--primary))]', bg: 'bg-[hsl(var(--primary)/0.05)]', border: 'border-[hsl(var(--primary)/0.15)]' },
    { label: 'No-Show', values: ['-42%', '-55%', '-68%'], color: 'text-green-600', bg: 'bg-green-500/5', border: 'border-green-400/15' },
    { label: 'Tempo Resposta', values: ['4m', '2m', '18s'], color: 'text-blue-600', bg: 'bg-blue-500/5', border: 'border-blue-400/15' },
  ];

  const sparkPoints = [25, 30, 28, 45, 42, 60, 58, 80, 78, 95, 90, 100];
  const sparkPath = sparkPoints.map((y, x) => `${x === 0 ? 'M' : 'L'} ${(x / (sparkPoints.length - 1)) * 100} ${100 - y}`).join(' ');

  return (
    <div className="w-full h-full bg-card border border-border shadow-xl rounded-2xl overflow-hidden text-left flex flex-col relative">
      <div className="bg-muted/40 px-4 py-3 border-b border-border flex items-center justify-between shrink-0">
        <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">Painel Analytics {CLIENT_NAME}</span>
        <span className="text-[9px] font-bold bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full">Atualizado</span>
      </div>

      <div className="flex-1 p-3 bg-background/50 flex flex-col gap-3 justify-between overflow-hidden text-[9px]">
        {/* 3 Columns KPI Header */}
        <div className="grid grid-cols-3 gap-1.5 shrink-0">
          {kpis.map((k, i) => (
            <div key={k.label} className={`${k.bg} border ${k.border} rounded-xl p-2.5 flex flex-col gap-0.5`}>
              <span className="text-[7px] font-black text-muted-foreground uppercase tracking-wider truncate">{k.label}</span>
              <span className={`text-[13px] font-black ${k.color} leading-none mt-0.5`}>
                {k.values[tick % k.values.length]}
              </span>
            </div>
          ))}
        </div>

        {/* Main Chart Card */}
        <div className="bg-card border border-border rounded-xl p-3 flex-1 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between shrink-0 mb-1">
            <span className="text-[8px] font-bold text-foreground uppercase tracking-wide">Agendamentos via Automação</span>
            <span className="text-[7px] font-bold text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.08)] px-1.5 py-0.2 rounded-full">+138% no semestre</span>
          </div>

          {/* Bar Chart Container */}
          <div className="flex items-end gap-2 h-[110px] border-b border-border/40 pb-1 mt-1">
            {barData.map((b, i) => (
              <div key={b.label} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end justify-center h-[90px]">
                  <div
                    className="w-full rounded-t-sm transition-all duration-700 ease-out"
                    style={{
                      height: `${b.v}%`,
                      background: i === 5
                        ? 'hsl(var(--primary))'
                        : `hsl(var(--primary) / ${0.3 + i * 0.1})`,
                    }}
                  />
                </div>
                <span className="text-[7px] text-muted-foreground font-black leading-none">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sparkline and Satisfaction Card */}
        <div className="bg-card border border-border rounded-xl p-2.5 flex items-center justify-between shrink-0">
          <div className="flex flex-col gap-0.5">
            <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-wide">Satisfação (NPS)</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-[hsl(var(--primary))] leading-none">98.2%</span>
              <div className="text-[8px] font-bold text-green-600 bg-green-500/10 px-1.5 py-0.5 rounded-full shrink-0">↑ +2.1%</div>
            </div>
          </div>
          <div className="w-[100px] h-7 relative">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={sparkPath + ' L 100 100 L 0 100 Z'} fill="url(#sparklineGrad)" />
              <path d={sparkPath} fill="none" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// Data for rendering the alternating section details
const detailedData = [
  {
    id: "ia",
    icon: Bot,
    title: "Recepção VIP com IA",
    tagline: "Disponibilidade e triagem profissional a cada segundo.",
    valueCopy: "Nossa IA de atendimento resolve o principal gargalo de comunicação da clínica: o tempo de espera do paciente. Ela responde a 100% dos contatos no WhatsApp em menos de 3 segundos, funciona 24 horas por dia (inclusive finais de semana e feriados) e é capaz de entender mensagens escritas e áudios com perfeição. Ela realiza a triagem de procedimentos e convênios aceitos, consulta horários livres no seu sistema em tempo real e consolida o agendamento completo sem precisar sobrecarregar a recepção física.",
    deliverables: [
      `Agente de IA treinado com as diretrizes específicas, médicos e convênios da ${CLIENT_NAME}.`,
      "Módulo avançado de transcrição e interpretação de mensagens de áudio dos pacientes.",
      "Fluxo de triagem customizado para diferenciar atendimentos de convênio e particular.",
      "Ambiente seguro de atendimento com múltiplos históricos de conversações centralizados."
    ],
    mockup: <RecepcaoMockup />,
  },
  {
    id: "followup",
    icon: RefreshCw,
    title: "Follow-ups Automáticos",
    tagline: "Nenhuma conversa morre no vácuo — a IA insiste até o paciente agendar.",
    valueCopy: "Quando um paciente para de responder no meio da conversa, a IA detecta automaticamente a inatividade e retoma o contato sozinha — no tempo certo e quantas vezes for preciso — sem depender da memória ou disponibilidade da recepção. Ao ser retomada, a conversa é conduzida com cadência inteligente: a IA não insiste de forma invasiva, mas volta com contexto e continuidade, como se lembrasse exatamente onde a conversa parou. Assim que o paciente responde, ele é levado direto de volta ao fluxo de agendamento da Recepção VIP, sem perder o progresso já feito.",
    deliverables: [
      "Detecção automática de conversas paradas, sem necessidade de monitoramento manual.",
      "Cadência inteligente de retomada, sem soar insistente ou robótico.",
      "Retorno direto ao fluxo de agendamento da Recepção VIP quando o paciente responde.",
      "Relatório de conversas recuperadas e agendamentos salvos por follow-up."
    ],
    mockup: <FollowUpMockup />,
  },
  {
    id: "lembretes",
    icon: Gift,
    title: "Lembretes da Agenda",
    tagline: "Redução drástica no número de faltas (No-Show).",
    valueCopy: "Cada falta de paciente é um prejuízo financeiro direto e um horário médico desperdiçado. Esse módulo realiza disparos de confirmação personalizados via WhatsApp com 24h ou 48h de antecedência. O paciente interage diretamente com o bot para confirmar ou solicitar alteração. Se confirmado, o status muda automaticamente no sistema. Se o paciente cancelar, a IA sugere novos horários livres no WhatsApp de forma ativa, preenchendo o novo agendamento e liberando a vaga antiga na agenda.",
    deliverables: [
      "Fluxo conversacional integrado de confirmação, cancelamento e reagendamento via WhatsApp.",
      "Algoritmo de monitoramento contínuo das agendas médicas para envio de lembretes.",
      "Mecanismo de reagendamento ativo sugerindo horários alternativos para pacientes que cancelam.",
      "Painel de controle com dados sobre os agendamentos."
    ],
    mockup: <LembretesMockup />,
  },
  {
    id: "crm",
    icon: Database,
    title: "Solução de CRM",
    tagline: "Controle total da jornada e fechamento de tratamentos.",
    valueCopy: "Não perca nenhuma oportunidade de agendamento por falta de acompanhamento. Nosso CRM médico organiza todas as conversações do WhatsApp e solicitações em colunas de funil visual (estilo Kanban). O time de atendimento sabe exatamente quem acabou de entrar em contato, quem precisa de envio de orçamento, quem está pendente de envio de guias e quem já concluiu o agendamento. Lembretes automáticos alertam a equipe sobre conversas paradas sem resposta, mantendo o processo dinâmico.",
    deliverables: [
      `Funil visual (Kanban) parametrizado de acordo com a jornada comercial da ${CLIENT_NAME}.`,
      "Sistema de acesso com login e senha.",
      "Usuários ilimitados.",
      "Filtros inteligentes e gerenciamento por tags.",
      "Cadastro manual de novos clientes.",
      "Cadastro automatico de clientes que vem do whatasapp"
    ],
    mockup: <CRMMockup />,
  },
  {
    id: "integracao",
    icon: Network,
    title: "Integrações de Sistemas",
    tagline: "Harmonia perfeita entre seu software médico atual e nossa IA.",
    valueCopy: "Nossa tecnologia não veio para substituir seu prontuário ou sistema ERP atual, mas para somar. Desenvolvemos integrações robustas que conectam nosso assistente de WhatsApp diretamente com sua base de dados atual. A IA consulta as vagas de consultas e exames em tempo real e insere os agendamentos aprovados instantaneamente na agenda do médico cadastrado, eliminando o erro de overbooking e evitando a necessidade de redigitação de informações.",
    deliverables: [
      "Conectores de API e Webhooks configurados para comunicação bidirecional de dados.",
      "Rotinas de verificação automática anti-overbooking para proteção das agendas médicas.",
      "Criptografia de dados de ponta a ponta em conformidade com as regras rígidas da LGPD.",
      "Logs de auditoria transparentes de todas as informações inseridas na base da clínica."
    ],
    mockup: <IntegracoesMockup />,
  },
  {
    id: "multi",
    icon: Smartphone,
    title: "Plataforma Multi-WhatsApp",
    tagline: "Vários setores operando com o mesmo número oficial.",
    valueCopy: "Centralize o atendimento da clínica em um único número de telefone, eliminando a bagunça de múltiplos celulares. Com a plataforma de multiatendimento, a recepção, o financeiro, o faturamento e a enfermagem respondem simultaneamente através de seus próprios computadores. O sistema possui um menu digital (URA) que direciona o paciente automaticamente para o setor desejado e permite que os supervisores acompanhem os chats em andamento e analisem o histórico completo.",
    deliverables: [
      "Acesso simultâneo e multiusuário à conta de WhatsApp oficial da clínica.",
      "URA digital interativa para roteamento automático de fila por departamento.",
      "Chat interno privativo integrado para comunicação ágil entre colaboradores da clínica.",
      "Mecanismo de transferência rápida de conversas entre atendentes com histórico preservado."
    ],
    mockup: <MultiMockup />,
  },
  {
    id: "metricas",
    icon: BarChart,
    title: "Dashboards e Métricas",
    tagline: "Gestão baseada em dados reais, sem espaço para achismos.",
    valueCopy: "Monitore a saúde do atendimento e a produtividade da clínica em tempo real. Disponibilizamos painéis gerenciais completos que mostram o tempo médio de resposta (TMA) de cada colaborador, o volume total de mensagens diárias, a taxa de conversão de contatos em consultas marcadas, os motivos frequentes de cancelamentos e o retorno sobre investimento (ROI) gerado pelas automações de ativação de base de pacientes.",
    deliverables: [
      "Dashboard interativo em tempo real com indicadores de atendimento e conversão.",
      "Relatórios periódicos automatizados enviados por e-mail com resumos operacionais.",
      "Filtros avançados por período, médico, especialidade e canal de atendimento.",
      "Exportação simples de dados para planilhas e auditorias internas."
    ],
    mockup: <MetricasMockup />,
  }
];

const getMockupMaxW = (id: string) => {
  switch (id) {
    case "crm":
      return 460;
    case "lembretes":
    case "metricas":
      return 420;
    case "integracao":
    case "multi":
      return 380;
    default:
      return 360;
  }
};

const DetailedSolutions = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-16 w-full">
      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none !important;
        }
        .scrollbar-none {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>
      {/* Header */}
      <div className="mb-20 text-center">
        <div className="section-label-line center mb-4">
          <span className="section-label">Detalhamento Técnico e Operacional</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-light text-[hsl(var(--foreground))] leading-tight">
          O que realmente entregamos <br className="hidden md:block" />
          e o <span className="font-bold text-[hsl(var(--primary))]">impacto prático na clínica</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Explore abaixo o funcionamento operacional de cada tecnologia em sua rotina de trabalho e os respectivos entregáveis da nossa implantação.
        </p>
      </div>

      {/* Solutions list Alternating grid */}
      <div className="space-y-32 md:space-y-48">
        {detailedData.map((item, idx) => {
          const Icon = item.icon;
          const isEven = idx % 2 === 0;

          return (
            <div
              key={item.id}
              id={`detail-${item.id}`}
              className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center scroll-mt-24"
            >
              {/* Text Column */}
              <div
                className={`lg:col-span-7 flex flex-col justify-center order-1 ${isEven ? "lg:order-1" : "lg:order-2"
                  }`}
              >
                {/* Header Icon + Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[hsl(var(--primary)/0.12)] border border-[hsl(var(--primary)/0.25)] flex items-center justify-center text-[hsl(var(--primary))]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[hsl(var(--primary))] uppercase tracking-[0.2em]">
                      Solução {idx + 1} de 8
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-0.5 leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-base font-semibold text-[hsl(var(--primary))] mb-6 leading-relaxed">
                  {item.tagline}
                </p>

                {/* How it works in clinic */}
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                    ⟨ Como funciona na clínica ⟩
                  </h4>
                  <p className="text-foreground/90 text-[15px] leading-relaxed font-light">
                    {item.valueCopy}
                  </p>
                </div>

                {/* What we deliver list */}
                <div className="pt-6 border-t border-border/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                    ⟨ O que entregamos ⟩
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-3.5">
                    {item.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
                        <span className="text-foreground/80 font-medium">{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Visual Mockup Column */}
              <div
                className={`lg:col-span-5 flex items-center justify-center order-2 ${isEven ? "lg:order-2" : "lg:order-1"
                  }`}
              >
                <div className="w-full relative p-4 md:p-8 rounded-3xl border border-border/80 bg-gradient-to-tr from-muted/30 to-muted/10 shadow-[0_12px_40px_rgba(0,0,0,0.03)] flex items-center justify-center">
                  {/* Decorative glowing background */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[hsl(var(--primary)/0.03)] to-transparent rounded-3xl pointer-events-none" />
                  <div className="relative z-10 w-full flex items-center justify-center">
                    <ResponsiveMockupWrapper maxW={getMockupMaxW(item.id)} h={460}>
                      {item.mockup}
                    </ResponsiveMockupWrapper>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailedSolutions;

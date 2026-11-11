import { useState, useEffect } from "react";
import { MessageCircle, Calendar, Users, ArrowDown } from "lucide-react";

const dores = [
  {
    tag: "RECEPÇÃO",
    icon: MessageCircle,
    bigNumber: "70%",
    bigUnit: null,
    headline: "dos pacientes desistem se você demora mais de 10 minutos pra responder",
    accentClass: "bg-[hsl(var(--primary))]",
    numberClass: "text-[hsl(var(--primary))]",
    tagClass: "text-[hsl(var(--primary))]",
    iconBgClass: "bg-[hsl(var(--primary)/0.12)]",
    cardBg: "bg-[hsl(var(--primary)/0.05)]",
    cardBorder: "border-[hsl(var(--primary)/0.18)]",
    delay: 0,
  },
  {
    tag: "NO-SHOW",
    icon: Calendar,
    bigNumber: "R$24k",
    bigUnit: null,
    headline: "saem do caixa por mês com pacientes que simplesmente não aparecem",
    accentClass: "bg-[hsl(var(--primary)/0.6)]",
    numberClass: "text-foreground",
    tagClass: "text-[hsl(var(--primary))]",
    iconBgClass: "bg-[hsl(var(--primary)/0.12)]",
    cardBg: "bg-muted/30",
    cardBorder: "border-border",
    delay: 120,
  },
  {
    tag: "EQUIPE",
    icon: Users,
    bigNumber: "40%",
    bigUnit: null,
    headline: "do tempo da recepção é gasto respondendo as mesmas perguntas, todos os dias",
    accentClass: "bg-[hsl(var(--primary)/0.35)]",
    numberClass: "text-muted-foreground",
    tagClass: "text-[hsl(var(--primary))]",
    iconBgClass: "bg-[hsl(var(--primary)/0.12)]",
    cardBg: "bg-muted/20",
    cardBorder: "border-border/60",
    delay: 240,
  },
];

const StatsSlide = () => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex-1 w-full min-h-[100dvh] flex flex-col justify-center px-6 md:px-16 py-12 md:py-20 relative">
      <div className="max-w-6xl mx-auto w-full relative z-10">

        {/* Header */}
        <div className="mb-14 text-center">
          <div className="section-label-line center mb-4">
            <span className="section-label">A Conta Que Ninguém Faz</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-foreground leading-tight mb-4">
            Sua clínica está{" "}
            <span className="font-bold text-[hsl(var(--primary))]">perdendo agora.</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A maior parte do que se perde numa clínica não aparece no extrato. Aparece nas consultas que nunca foram marcadas, nos pacientes que sumiram e nas faltas que ninguém previu.
          </p>
        </div>

        {/* Pain Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {dores.map((d, i) => {
            const Icon = d.icon;
            return (
              <div
                key={d.tag}
                className={`flex flex-col rounded-2xl border overflow-hidden transition-all duration-700 ${d.cardBorder} ${d.cardBg}`}
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateY(0)" : "translateY(24px)",
                  transitionDelay: `${d.delay}ms`,
                }}
              >
                {/* Card top accent bar */}
                <div className={`h-1 w-full ${d.accentClass}`} />

                <div className="p-7 flex flex-col gap-4 flex-1">
                  {/* Tag */}
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${d.iconBgClass}`}>
                      <Icon className={`w-3.5 h-3.5 ${d.tagClass}`} />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-[0.18em] ${d.tagClass}`}>
                      {d.tag}
                    </span>
                  </div>

                  {/* Big number */}
                  <div className="flex items-end gap-2">
                    <span className={`text-5xl md:text-6xl font-black leading-none ${d.numberClass}`}>
                      {d.bigNumber}
                    </span>
                    {d.bigUnit && (
                      <span className="text-xl font-bold text-muted-foreground mb-1">
                        {d.bigUnit}
                      </span>
                    )}
                  </div>

                  {/* Headline */}
                  <p className="text-sm md:text-[15px] font-semibold text-foreground leading-snug">
                    {d.headline}
                  </p>

                  {/* Body */}
                  <p className="text-sm text-muted-foreground leading-relaxed mt-auto">
                    {d.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA footer */}
        <div
          className="flex flex-col items-center gap-3 transition-all duration-700"
          style={{
            opacity: revealed ? 1 : 0,
            transitionDelay: "400ms",
          }}
        >
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
            TENAZ resolve as três, uma por uma, abaixo
          </p>
          <ArrowDown className="w-5 h-5 text-[hsl(var(--primary))] animate-bounce" />
        </div>

      </div>
    </div>
  );
};

export default StatsSlide;

import { BadgeCheck, MessageCircle, Link, Wallet } from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Parceiros Oficiais da Meta",
    description: (
      <>
        Status de <span className="font-bold text-[hsl(var(--primary))]">Meta</span> Tech Provider. Integrações estáveis, prioridade no suporte e acesso a recursos que plataformas comuns não têm.
      </>
    ),
  },
  {
    icon: MessageCircle,
    title: "Suporte em até 2 horas",
    description: "Grupo de WhatsApp dedicado à sua clínica. Contato direto com o nosso time — sem fila, sem ticket, sem URA.",
  },
  {
    icon: Link,
    title: "Integra com seu sistema",
    description: "A gente conversa com o software que sua clínica já usa. Sem trocar de ferramenta, sem retrabalho na recepção.",
  },
  {
    icon: Wallet,
    title: "Token e Mensageria por nossa conta",
    description: "Você não paga por mensagem enviada nem por consumo de IA. Tudo já está incluso na mensalidade.",
  },
];

const WhyTenazSlide = () => {
  return (
    <div className="flex-1 w-full flex flex-col justify-center px-6 md:px-16 py-12 md:py-20 relative min-h-[100svh]">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="mb-14">
          <div className="section-label-line mb-4">
            <span className="section-label">POR QUE TENAZ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-foreground leading-tight mb-4">
            O que muda quando <br />
            <span className="font-bold text-[hsl(var(--primary))]">você opera com a gente.</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Quatro compromissos operacionais que separam a Tenaz de qualquer outra plataforma de atendimento.
          </p>
        </div>

        {/* Features Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div 
                key={i}
                className="flex flex-col p-8 rounded-2xl border border-border/60 bg-card hover:bg-muted/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-muted/40 flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5 text-foreground/80" />
                </div>
                
                <h3 className="text-[17px] font-bold text-foreground mb-3 leading-snug">
                  {feature.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default WhyTenazSlide;

import { Bot, AlertTriangle, Clock, Shuffle } from "lucide-react";

const bottlenecks = [
  {
    icon: Bot,
    title: "Atendimento Engessado",
    description: "Scripts robóticos que frustram o paciente e geram longas filas de espera no WhatsApp.",
  },
  {
    icon: AlertTriangle,
    title: "Sistemas Desintegrados",
    description: "Informações espalhadas em diferentes plataformas, causando retrabalho para a equipe.",
  },
  {
    icon: Clock,
    title: "Taxa de Faltas (No-Show)",
    description: "Ausência de lembretes inteligentes faz com que consultas sejam esquecidas, gerando prejuízo.",
  },
  {
    icon: Shuffle,
    title: "Atendimento Despadronizado",
    description: "Cada recepcionista responde de um jeito. A qualidade do atendimento depende de quem pega o chat.",
  },
];

const CurrentScenarioSlide = () => {
  return (
    <div className="flex-1 w-full min-h-[100dvh] flex flex-col justify-center px-6 md:px-16 py-12 md:py-20">
      <div className="max-w-6xl mx-auto w-full">

        <div className="mb-14">
          <div className="section-label-line mb-4">
            <span className="section-label">O Desafio Atual</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-[hsl(var(--foreground))] leading-tight">
            Gargalos Operacionais na <br className="hidden md:block"/>
            <span className="font-bold text-[hsl(var(--primary))]">Jornada do Paciente</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {bottlenecks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="clean-card p-8 flex flex-col sm:flex-row gap-6 items-start hover:-translate-y-1 hover:border-[hsl(var(--primary)/0.3)] group"
              >
                <div className="shrink-0 w-14 h-14 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center text-[hsl(var(--muted-foreground))] group-hover:bg-[hsl(var(--primary)/0.1)] group-hover:text-[hsl(var(--primary))] transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-2 group-hover:text-[hsl(var(--primary))] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-base text-[hsl(var(--muted-foreground))] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default CurrentScenarioSlide;

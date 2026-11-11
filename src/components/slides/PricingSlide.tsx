import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { CLIENT_NAME, PRICING } from "../../config";

const modules = [
    { name: CLIENT_NAME, setup: PRICING.setup, monthly: PRICING.monthly, deadline: PRICING.deadline },
];

const formatBRL = (value: number) => {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

const PricingSlide = () => {
    const totalSetup = modules.reduce((acc, mod) => acc + mod.setup, 0);
    const totalMonthly = modules.reduce((acc, mod) => acc + mod.monthly, 0);

    return (
        <div className="flex-1 w-full flex flex-col md:flex-row bg-background">

            {/* Left Column: Image — hidden on mobile, visible on md+ */}
            <div className="hidden md:block relative md:w-1/2 shrink-0">
                <img
                    src="/price-img.png"
                    alt="Pricing Illustration"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            {/* Right Column: Pricing Card */}
            <div className="flex-1 flex items-center justify-center px-4 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16">
                <div className="w-full max-w-md">
                    <Card className="relative transition-all duration-300 hover:shadow-[0_0_50px_-15px_rgba(234,88,12,0.3)] border border-border/60 shadow-2xl bg-card/60 backdrop-blur-xl flex flex-col rounded-3xl overflow-hidden">

                        <CardHeader className="text-center pb-5 pt-8 border-b border-border/40 bg-background/50">
                            <span className="text-primary font-bold text-[10px] tracking-widest uppercase mb-2 block">
                                ⟩ Investimento
                            </span>
                            <CardTitle className="text-2xl md:text-3xl font-bold mb-1">Projeto Completo</CardTitle>
                            <p className="text-sm text-muted-foreground">Licenciamento e Estruturação</p>
                        </CardHeader>

                        <CardContent className="flex-1 p-0">

                            {/* Table */}
                            <div className="px-5 py-5 md:px-7 bg-background/20">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-border/60 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                            <th className="pb-3 pt-2 font-bold">Solução</th>
                                            <th className="pb-3 pt-2 font-bold text-right">Prazo</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/40 text-xs md:text-sm">
                                        {modules.map((mod, idx) => (
                                            <tr key={idx} className="group hover:bg-muted/20 transition-colors">
                                                <td className="py-3 font-bold text-foreground pr-2">{mod.name}</td>
                                                <td className="py-3 text-right text-muted-foreground font-medium">{mod.deadline}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Features List */}
                            <div className="px-5 py-5 md:px-7 bg-background/40 border-t border-border/40">
                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3">O que está incluso:</h4>
                                <ul className="grid grid-cols-2 gap-y-2 gap-x-2 text-xs md:text-sm text-foreground/80 font-medium">
                                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary shrink-0" /> Recepção VIP com IA</li>
                                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary shrink-0" /> Ativação de Base (API)</li>
                                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary shrink-0" /> Lembretes Inteligentes</li>
                                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary shrink-0" /> Plataforma Multi-WhatsApp</li>
                                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary shrink-0" /> Integrações com Sistemas</li>
                                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary shrink-0" /> Solução de CRM</li>
                                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary shrink-0" /> Dashboards e Métricas</li>
                                </ul>

                                {/* Franquias */}
                                <div className="mt-5 pt-4 border-t border-border/40">
                                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3">Franquias mensais:</h4>
                                    <div className="flex flex-col gap-2.5">
                                        <div className="flex justify-between items-center text-xs md:text-sm">
                                            <span className="text-foreground/70">Atendimentos de IA</span>
                                            <span className="font-bold text-foreground">{PRICING.aiQuota}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs md:text-sm">
                                            <span className="text-foreground/70">Disparos de lembretes</span>
                                            <span className="font-bold text-foreground">{PRICING.remindersQuota}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Totals Section */}
                            <div className="bg-primary/5 border-t border-primary/20 px-5 py-5 md:px-7 md:py-6">
                                <div className="flex flex-col gap-4">

                                    {/* Setup */}
                                    <div className="flex justify-between items-center gap-2">
                                        <div>
                                            <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Implementação</span>
                                            <span className="block text-[10px] text-muted-foreground mt-0.5">Pago uma única vez.</span>
                                        </div>
                                        <span className="text-xl md:text-2xl font-bold text-foreground shrink-0">{formatBRL(totalSetup)}</span>
                                    </div>

                                    <div className="w-full border-t border-primary/20 border-dashed" />

                                    {/* Monthly */}
                                    <div className="flex justify-between items-center gap-2">
                                        <div>
                                            <span className="block text-xs font-bold uppercase tracking-wider text-primary">Total Mensalidade</span>
                                            <span className="block text-[10px] text-muted-foreground mt-0.5">Licenças ativas.</span>
                                        </div>
                                        <div className="flex flex-col items-end shrink-0">
                                            <span className="text-3xl md:text-4xl lg:text-5xl font-black text-primary tracking-tighter drop-shadow-sm">
                                                {formatBRL(totalMonthly)}
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PricingSlide;

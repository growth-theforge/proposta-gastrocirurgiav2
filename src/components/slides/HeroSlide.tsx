import { CLIENT_NAME } from "../../config";

const HeroSlide = () => {
    return (
        <div className="flex-1 w-full flex items-center justify-center px-4 md:px-8 relative overflow-hidden bg-zinc-950">
            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 z-[5] opacity-[0.15] pointer-events-none bg-noise mix-blend-overlay contrast-150 brightness-100" />

            {/* Fluid Background Layers */}
            <div className="absolute inset-0 z-0">
                {/* Dark Shadow/Void - Left Side */}
                <div className="absolute -left-[20%] top-[-10%] w-[70%] h-[120%] bg-black rotate-12 blur-[100px] z-10 scale-150" />

                {/* Primary Teal Fluid - Center-ish */}
                <div className="absolute top-[0%] left-[5%] w-[90vw] h-[90vw] md:w-[75vw] md:h-[75vw] bg-[#45dbb4] rounded-full blur-[120px] animate-drift-2 opacity-60 mix-blend-normal z-0" />

                {/* Secondary Grey Mist - Right Side */}
                <div className="absolute top-[-20%] -right-[20%] w-[80vw] h-[80vw] bg-zinc-500 rounded-full blur-[130px] animate-drift-1 opacity-20 mix-blend-normal z-0" />

                {/* Accent - Deep Teal Shadow for Depth */}
                <div className="absolute bottom-[-15%] left-[10%] w-[70vw] h-[70vw] bg-[#1a5f50] rounded-full blur-[100px] animate-drift-3 opacity-40 z-0" />
            </div>

            {/* Vignette Overlay for focus */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/90 via-black/20 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="text-center max-w-4xl mx-auto px-4 relative z-10">
                <div className="mb-4 md:mb-10 flex flex-col items-center justify-center animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                    <span className="text-white/90 text-[10px] md:text-xs font-semibold tracking-[0.4em] uppercase mb-2 drop-shadow-lg">
                        Projeto
                    </span>
                    <div className="relative group mb-1">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-[#45dbb4]/50 to-transparent opacity-50 blur-[2px]"></div>
                        <div className="relative px-6 py-2 bg-black/40 backdrop-blur-xl border-y border-[#45dbb4]/20 flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#45dbb4] animate-pulse shadow-[0_0_8px_rgba(69,219,180,0.8)]"></div>
                            <span className="text-[#45dbb4] text-lg md:text-2xl font-light tracking-[0.25em] uppercase">
                                {CLIENT_NAME.toUpperCase()}
                            </span>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#45dbb4] animate-pulse shadow-[0_0_8px_rgba(69,219,180,0.8)]"></div>
                        </div>
                    </div>
                </div>
                <h1 className="flex items-center justify-center mb-0 md:mb-6 drop-shadow-2xl">
                    <img src="/logo-hero.svg" alt={CLIENT_NAME} className="h-24 md:h-48 w-auto object-contain" />
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-zinc-300/90 max-w-2xl mx-auto mb-8 md:mb-12 px-4 font-light tracking-wide">
                    Elimine processos manuais e
                    <span className="text-[#45dbb4] font-medium drop-shadow-md"> foque 100%</span> na experiência do cliente.
                </p>
            </div>
        </div>
    );
};

export default HeroSlide;

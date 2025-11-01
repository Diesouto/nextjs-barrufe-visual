import { AnimatedText } from "@/components/ui/AnimatedText";

export function AboutSection() {
  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center p-8 bg-black text-white">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold">
            <AnimatedText
              text="Coñécenos"
              className="swanky-and-moo-moo-regular uppercase"
            />
          </h2>
        </div>

        {/* Dos columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Primera columna - Definición (1/3) */}
          <div className="space-y-4 lg:col-span-1">
            <h3 className="text-2xl md:text-3xl font-bold text-[#D71414] swanky-and-moo-moo-regular">
              barrufe:
            </h3>
            <p className="text-sm md:text-base leading-relaxed italic text-[#D71414]">
              dise dunha conversa fluída, delirante e sen ningún tipo de
              sentido. A premisa e o obxetivo: a improvisación
            </p>
          </div>

          {/* Segunda columna - Descripción (2/3) */}
          <div className="space-y-6 lg:col-span-2 paper_bg1 p-8 md:p-10">
            <p className="text-lg md:text-xl leading-relaxed text-black">
              <span className="font-bold">oooola!!</span> somos barrufe visual,
              un proxecto creado x duas amigas que tomando unhas cañas nun
              momento de crise existencial, decidiron sacar a relucir a sua
              creatividade.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-black">
              barrufar para nós é un estilo de vida; sair coas amigas, falar,
              bailar, divertirse... un popurrí sen sentido de cousas chulas. E
              iso mesmo pretendemos facer cos nosos textos e deseños: un pouco
              de todo, ao chou.{" "}
              <span className="font-bold">Barrufamosssss xuntes?</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

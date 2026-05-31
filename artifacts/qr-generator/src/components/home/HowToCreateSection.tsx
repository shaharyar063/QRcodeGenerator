import { howToCreateSteps } from "@/data/how-to-create-steps";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

function StepIllustration({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="how-to-illustration mx-auto w-full max-w-md lg:max-w-none">
      <img
        src={src}
        alt={alt}
        width={1120}
        height={640}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export function HowToCreateSection() {
  return (
    <section className="how-to-section py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-14 md:mb-20 max-w-3xl mx-auto leading-tight">
          How to create a free QR code in 3 simple steps
        </h2>

        <div className="relative">
          <div
            className="pointer-events-none absolute left-1/2 top-6 bottom-6 hidden w-0 -translate-x-1/2 border-l-2 border-dashed border-muted-foreground/25 lg:block"
            aria-hidden
          />

          <div className="space-y-14 md:space-y-20 lg:space-y-0">
            {howToCreateSteps.map((step, index) => {
              const imageOnLeft = index % 2 === 0;

              return (
                <article
                  key={step.number}
                  className="relative lg:grid lg:grid-cols-2 lg:items-center lg:py-14 xl:py-16"
                >
                  <div
                    className="absolute left-1/2 top-8 z-10 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-foreground text-lg font-semibold text-background ring-[6px] ring-how-to-section lg:top-1/2 lg:flex lg:-translate-y-1/2"
                    aria-hidden
                  >
                    {step.number}
                  </div>

                  <div
                    className={cn(
                      "mb-8 lg:mb-0",
                      imageOnLeft
                        ? "lg:pr-10 xl:pr-16"
                        : "lg:order-2 lg:pl-10 xl:pl-16",
                    )}
                  >
                    <div className="mb-4 flex items-center gap-3 lg:hidden">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background"
                        aria-hidden
                      >
                        {step.number}
                      </span>
                      <h3 className="text-lg font-bold text-foreground leading-snug">
                        {step.title}
                      </h3>
                    </div>

                    <StepIllustration src={step.image} alt={step.imageAlt} />
                  </div>

                  <div
                    className={cn(
                      "max-w-md",
                      imageOnLeft
                        ? "lg:pl-10 xl:pl-16"
                        : "lg:order-1 lg:ml-auto lg:pr-10 lg:text-right xl:pr-16",
                    )}
                  >
                    <h3 className="mb-3 hidden text-xl font-bold text-foreground leading-snug md:text-2xl lg:block">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed md:text-base">
                      {step.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-12 text-center md:mt-16">
          <Button size="lg" className="rounded-full px-8" asChild>
            <Link href="/#create-qr">Create a free QR code</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

import { layers } from "@/data/layers";
import { Container } from "@/components/ui/Container";

export function Layers() {
  const total = layers.length;
  return (
    <section data-nav="overview" aria-labelledby="layers-title" className="border-t border-line py-24 md:py-36">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="layers-title" className="text-h1 text-fg">
              One profile.
              <br />
              Multiple layers.
            </h2>
            <p className="mt-6 max-w-[38ch] text-body-lg text-fg-2">
              Ce que l&apos;utilisateur voit m&apos;intéresse autant que l&apos;infrastructure qui permet au produit d&apos;exister.
            </p>
          </div>
        </div>

        <div className="relative lg:col-span-8">
          <div aria-hidden className="absolute bottom-0 left-0 top-0 hidden w-px bg-line md:block" />
          <p aria-hidden className="mb-4 hidden pl-6 font-mono text-tech text-fg-3 md:block">
            Visible par l&apos;utilisateur
          </p>
          <ol className="focus-group">
            {layers.map((layer, i) => (
              <li key={layer.name} className="focus-item">
                <a
                  href={layer.href}
                  className="group relative grid items-baseline gap-x-8 gap-y-1 border-t border-line py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:py-6 md:pl-6"
                >
                  <span aria-hidden className="absolute -left-px top-0 hidden h-full w-px origin-top scale-y-0 bg-brass transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-y-100 group-focus-visible:scale-y-100 md:block" />
                  <span
                    className="text-h2 text-fg transition-transform duration-300 ease-[var(--ease-out)] md:[padding-left:calc(var(--indent)*1%)]"
                    style={{ ["--indent" as string]: `${(total - 1 - i) * 4}` }}
                  >
                    {layer.name}
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="max-w-[44ch] text-body text-fg-2">{layer.text}</span>
                    <span className="font-mono text-tech text-fg-3 transition-colors group-hover:text-brass">{layer.link}</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
          <p aria-hidden className="mt-4 hidden border-t border-line pl-6 pt-4 font-mono text-tech text-fg-3 md:block">
            Ce qui fait tourner le produit
          </p>
        </div>
      </Container>
    </section>
  );
}

import Link from "next/link";
import { projects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { StatusTag } from "@/components/ui/StatusTag";
import { hostname, realValue } from "@/lib/utils";

export function ProductIndex() {
  return (
    <section id="products" data-nav="projects" aria-labelledby="products-title" className="border-t border-line py-24 md:py-36">
      <Container>
        <h2 id="products-title" className="max-w-[16ch] text-h1 text-fg">
          Every product, one index.
        </h2>
        <p className="mt-6 max-w-[54ch] text-body-lg text-fg-2">
          Les SaaS et applications en cours, à l&apos;étude ou à venir. Les fiches se complètent au fil de l&apos;avancement.
        </p>

        <div className="mt-14">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Index des produits</caption>
            <thead className="hidden md:table-header-group">
              <tr className="border-b border-line-strong text-label text-fg-3">
                <th scope="col" className="pb-3 font-normal">Produit</th>
                <th scope="col" className="pb-3 font-normal">Catégorie</th>
                <th scope="col" className="pb-3 font-normal">Stack</th>
                <th scope="col" className="pb-3 text-right font-normal">Statut</th>
              </tr>
            </thead>
            <tbody className="focus-group">
              {projects.map((p) => (
                <tr key={p.slug} className="focus-item group relative grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-b border-line py-5 md:table-row md:py-0">
                  <th scope="row" className="font-normal md:w-[34%] md:py-6">
                    <Link href={`/projects/${p.slug}`} className="flex items-center gap-3 after:absolute after:inset-0 focus-visible:outline-none">
                      <span aria-hidden className="size-2.5 shrink-0 rounded-[2px] transition-transform duration-200 group-hover:scale-125" style={{ background: p.accent }} />
                      <span className="text-h3 text-fg">{p.name}</span>
                    </Link>
                    {p.tagline && <span className="mt-1 block pl-[22px] text-small text-fg-3 md:hidden">{p.tagline}</span>}
                  </th>
                  <td className="col-start-1 row-start-2 pl-[22px] text-small text-fg-2 md:w-[24%] md:py-6 md:pl-0">{p.category ?? <span className="text-fg-3">Présentation à venir</span>}</td>
                  <td className="hidden font-mono text-tech text-fg-3 md:table-cell md:py-6">
                    {p.stack.length ? p.stack.slice(0, 3).join(", ") : "à préciser"}
                    {p.stackNote && <span className="block text-[11px]">{p.stackNote}</span>}
                  </td>
                  <td className="col-start-2 row-span-2 row-start-1 self-center text-right md:py-6">
                    <StatusTag status={p.status} fallback="Statut à préciser" />
                    {realValue(p.url) && <span className="mt-1 block font-mono text-[11px] text-fg-3">{hostname(p.url!)}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}

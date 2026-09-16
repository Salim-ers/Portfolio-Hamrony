import Link from "next/link";
import { currentlyBuilding } from "@/data/building";
import { Container } from "@/components/ui/Container";
import { StatusTag } from "@/components/ui/StatusTag";

export function CurrentlyBuilding() {
  if (!currentlyBuilding.length) return null;
  return (
    <section data-nav="harmony" aria-labelledby="building-title" className="border-t border-line py-20 md:py-28">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <h2 id="building-title" className="text-h2 text-fg lg:col-span-3">
          Currently building
        </h2>
        <ul className="grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-3 lg:col-span-9">
          {currentlyBuilding.map((item) => (
            <li key={item.name} className="bg-ink-0">
              <Link href={item.href} className="group flex h-full flex-col justify-between gap-10 p-6 transition-colors hover:bg-ink-1 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-h3 text-fg">{item.name}</span>
                  <StatusTag status={item.status} />
                </div>
                <span className="text-small text-fg-2">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

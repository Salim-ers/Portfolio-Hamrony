import { skills } from "@/data/skills";
import { Container } from "@/components/ui/Container";

export function Stack() {
  return (
    <section id="stack" data-nav="stack" aria-labelledby="stack-title" className="border-t border-line py-24 md:py-36">
      <Container>
        <h2 id="stack-title" className="text-h1 text-fg">
          The stack.
        </h2>
        <p className="mt-6 max-w-[50ch] text-body-lg text-fg-2">Les outils pratiqués, regroupés par domaine. Pas de note ni de pourcentage : les études de cas montrent le niveau.</p>

        <div className="mt-16 columns-1 gap-10 sm:columns-2 lg:columns-4">
          {skills.map((group) => (
            <section key={group.id} aria-labelledby={`stack-${group.id}`} className="mb-12 break-inside-avoid border-t border-line-strong pt-4">
              <div className="flex items-baseline justify-between gap-3">
                <h3 id={`stack-${group.id}`} className="text-h3 text-fg">
                  {group.name}
                </h3>
                <span className="font-mono text-tech text-fg-3">{String(group.items.length).padStart(2, "0")}</span>
              </div>
              <p className="mt-1 text-small text-fg-3">{group.context}</p>
              <ul className="mt-5 space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="text-body text-fg-2">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Container>
    </section>
  );
}

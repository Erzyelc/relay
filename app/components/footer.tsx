import Image from "next/image";

const columns = [
  {
    heading: "Product",
    links: ["Customer Intelligence", "Feedback Analysis", "Product Insights"],
  },
  {
    heading: "Solutions",
    links: ["Product Teams", "Customer Success", "Founders"],
  },
  {
    heading: "Resources",
    links: ["Blog", "Guides", "Customers", "Integrations"],
  },
  {
    heading: "Company",
    links: ["About", "Pricing", "Log in", "Get started"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-edge" id="resources">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div>
            <Image
              src="/logo.png"
              alt="Relay"
              width={734}
              height={237}
              className="h-6 w-auto"
            />
            <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-slate">
              Customer intelligence for teams that build from signal, not
              noise.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.heading}>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate">
                {column.heading}
              </p>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-paper/70 transition-colors hover:text-paper"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-edge pt-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate">
            &copy; 2026 Relay
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate">
            A self-initiated concept project
          </p>
        </div>
      </div>
    </footer>
  );
}

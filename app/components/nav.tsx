import Link from "next/link";

const links = [
  { label: "Product", href: "#product" },
  { label: "Solutions", href: "#solutions" },
  { label: "Integrations", href: "#integrations" },
  { label: "Resources", href: "#resources" },
  { label: "Pricing", href: "#pricing" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-edge bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-[0.3em] text-paper"
        >
          RELAY
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-slate transition-colors hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <a
            href="#login"
            className="hidden text-sm text-slate transition-colors hover:text-paper sm:block"
          >
            Log in
          </a>
          <a
            href="#get-started"
            className="bg-lime px-4 py-2 font-mono text-xs uppercase tracking-[0.08em] text-ink transition-colors hover:bg-paper"
          >
            Get started
          </a>
        </div>
      </div>
    </header>
  );
}

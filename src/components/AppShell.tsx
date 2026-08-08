"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  LayoutDashboard,
  Menu,
  MessageSquarePlus,
  Route,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import { Wordmark } from "@/components/Logo";

const PRIMARY_NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/timeline", label: "Timeline", icon: Route },
  { href: "/pen-picture", label: "Pen Picture", icon: UserRound },
  { href: "/opportunities", label: "Opportunities", icon: Compass },
] as const;

const SECONDARY_NAV = [
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/contribute", label: "Contribute", icon: MessageSquarePlus },
] as const;

function NavLink({
  href,
  label,
  icon: Icon,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-150 ${
        active
          ? "bg-raised text-paper"
          : "text-muted hover:bg-surface hover:text-paper"
      }`}
    >
      {/* Active marker: a short rule in the gutter, not a filled pill. */}
      <span
        className={`absolute left-0 h-4 w-0.5 rounded-full bg-beacon transition-opacity duration-150 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
      <Icon className="h-[1.05rem] w-[1.05rem] shrink-0" />
      {label}
    </Link>
  );
}

function NavContents({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="px-3 py-5">
        <Link href="/" onClick={onNavigate}>
          <Wordmark />
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {PRIMARY_NAV.map((item) => (
          <NavLink key={item.href} {...item} onNavigate={onNavigate} />
        ))}

        <div className="my-3 border-t border-line" />

        {SECONDARY_NAV.map((item) => (
          <NavLink key={item.href} {...item} onNavigate={onNavigate} />
        ))}
      </nav>

      <div className="border-t border-line px-3 py-4">
        <p className="label-mono">No account needed</p>
        <p className="mt-1.5 text-xs leading-relaxed text-faint">
          Your plans are saved in this browser only.
        </p>
      </div>
    </>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[15rem_1fr]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-line bg-surface/40 lg:flex">
        <NavContents />
      </aside>

      {/* Mobile bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-ink/90 px-4 py-3 backdrop-blur lg:hidden">
        <Link href="/">
          <Wordmark />
        </Link>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation"
          className="rounded-lg p-2 text-muted hover:bg-surface hover:text-paper"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 left-0 flex w-64 flex-col border-r border-line bg-surface">
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close navigation"
              className="absolute top-5 right-3 rounded-lg p-2 text-muted hover:text-paper"
            >
              <X className="h-5 w-5" />
            </button>
            <NavContents onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      <main className="min-w-0">{children}</main>
    </div>
  );
}

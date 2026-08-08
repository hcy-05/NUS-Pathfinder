import { AppShell } from "@/components/AppShell";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-6 py-8 lg:px-10 lg:py-12">
        {children}
      </div>
    </AppShell>
  );
}

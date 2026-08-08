import { PageHeader } from "@/components/PageHeader";
import { DashboardBody } from "@/components/DashboardBody";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Your journey"
        title="Dashboard"
        description="What you are planning, and the five deadlines closest to needing your attention."
      />
      <DashboardBody />
    </div>
  );
}

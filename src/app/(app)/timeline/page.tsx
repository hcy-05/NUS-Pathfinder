import { PageHeader } from "@/components/PageHeader";
import { BattlePass } from "@/components/timeline/BattlePass";

export default function TimelinePage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Pre-university to graduation"
        title="Timeline"
        description="Drag opportunities onto the period you intend to take them — semesters, the breaks between them, and the year before you arrive. Keep several pathways side by side to compare different versions of your degree."
      />
      <BattlePass />
    </div>
  );
}

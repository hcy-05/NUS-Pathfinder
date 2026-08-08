import { PageHeader } from "@/components/PageHeader";
import { SettingsBody } from "@/components/SettingsBody";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="This browser only"
        title="Settings"
        description="Pathfinder works without an account. These settings and your plans are stored on this device."
      />
      <SettingsBody />
    </div>
  );
}

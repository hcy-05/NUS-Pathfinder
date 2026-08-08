import { PageHeader } from "@/components/PageHeader";
import { PenPicture } from "@/components/PenPicture";

export default function PenPicturePage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Where this pathway ends"
        title="Pen Picture"
        description="The profile your current pathway would leave you with at graduation. Change the timeline and this changes with it."
      />
      <PenPicture />
    </div>
  );
}

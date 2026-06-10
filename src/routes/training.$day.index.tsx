import { createFileRoute } from "@tanstack/react-router";
import { DayOverview } from "@/components/TrainingDay";

export const Route = createFileRoute("/training/$day/")({
  head: () => ({ meta: [{ title: "Training — HOET" }] }),
  component: RouteComponent,
});

function RouteComponent() {
  const { day } = Route.useParams();
  return <DayOverview daySlug={day} />;
}

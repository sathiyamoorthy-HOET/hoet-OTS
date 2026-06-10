import { createFileRoute } from "@tanstack/react-router";
import { SessionView } from "@/components/TrainingDay";

export const Route = createFileRoute("/training/$day/$session")({
  head: () => ({ meta: [{ title: "Training — HOET" }] }),
  component: RouteComponent,
});

function RouteComponent() {
  const { day, session } = Route.useParams();
  return <SessionView daySlug={day} sessionSlug={session} />;
}

import { Dashboard } from "../../components/Dashboard";
import { Protected } from "../../components/Auth";

export default function DashboardPage() {
  return (
    <Protected>
      <Dashboard />
    </Protected>
  );
}

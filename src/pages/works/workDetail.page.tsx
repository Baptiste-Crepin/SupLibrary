import WorkDetail from "@components/Work/WorkDetail";
import { useParams } from "react-router";

export default function WorkDetailPage() {
  const { workKey } = useParams<{ workKey: string }>();

  if (!workKey) {
    return <div>Work not found</div>;
  }

  return (
    <WorkDetail workKey={workKey} />
  )
}
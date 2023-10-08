import { useParams } from "react-router-dom";

function Complaint() {
  const { complaintId } = useParams();
  return <div>Complaint {complaintId}</div>;
}

export default Complaint;

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { callApi } from "../utils/apiService";
const EntryCard = ({ entry }) => {
  return (
    <Card border="dark" style={{ width: "18rem" }}>
      <Card.Header>{entry.created_at}</Card.Header>
      <Card.Body>
        <Card.Text>{entry.entry}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{entry.feelingState}</small>
      </Card.Footer>
      <Card.Footer>
        <small className="text-muted">buttons</small>
      </Card.Footer>
    </Card>
  );
};
export default EntryCard;

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Rating } from "react-simple-star-rating";
import { useAuth0 } from "@auth0/auth0-react";
import { MdEditNote, MdOutlineDelete } from "react-icons/md";
import moment from "moment";
import { deleteEntry } from "../utils/apiService";
const EntryCard = ({ entry, tokenGenerator, setEntries, setEditMode }) => {
  const { user } = useAuth0();
  return (
    <Col>
      <Card border="dark" style={{ width: "18rem", height: "100%" }}>
        <Card.Header>
          Created on: {moment(entry.created_at).format("DD-MM-YYYY HH:mm")}
        </Card.Header>
        <Card.Body>
          <Card.Text>{entry.entry}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            <Rating
              ratingValue={entry.feelingState}
              allowHalfIcon={true}
              readonly={true}
            />
          </small>
        </Card.Footer>
        <Card.Footer>
          <small className="text-muted">
            <MdEditNote
              size={"2rem"}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setEditMode(entry);
              }}
            />
            <MdOutlineDelete
              size={"2rem"}
              style={{ cursor: "pointer" }}
              onClick={() => {
                deleteEntry(tokenGenerator, setEntries, {
                  id: entry.id,
                  email: user.email,
                });
              }}
            />
          </small>
        </Card.Footer>
      </Card>
    </Col>
  );
};
export default EntryCard;

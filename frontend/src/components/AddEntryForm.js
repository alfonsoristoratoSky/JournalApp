import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import { Rating } from "react-simple-star-rating";
import { addEntry, editEntry } from "../utils/apiService";
import moment from "moment";
const AddEntryForm = ({
  tokenGenerator,
  setEntries,
  editMode,
  setEditMode,
}) => {
  const { user } = useAuth0();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data.feelingState = rating;
    !editMode && (data.email = user.email);

    editMode
      ? editEntry(
          tokenGenerator,
          setEntries,
          data,
          editMode.id,
          editMode.emailHashed
        )
      : addEntry(tokenGenerator, setEntries, data);
  };
  const [rating, setRating] = useState(20);
  const handleRating = (rate) => {
    setRating(rate);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>
          {editMode ? "Change Journal Entry" : "Create Journal Entry"}
        </Form.Label>
        {editMode && (
          <Form.Label>
            Created on: {moment(editMode.created_at).format("DD-MM-YYYY HH:mm")}
          </Form.Label>
        )}
        <Form.Control
          as="textarea"
          rows={6}
          placeholder="Write your thoughts"
          defaultValue={editMode ? editMode.entry : ""}
          {...register("entry", { required: true })}
        />
        {errors.entry && <span>This field is required</span>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          {editMode ? "How did you feel?" : "How do you feel?"}
        </Form.Label>
        <Rating
          onClick={handleRating}
          ratingValue={editMode ? editMode.feelingState : rating}
          allowHalfIcon={true}
        />
      </Form.Group>

      <Button variant="secondary" type="submit">
        Submit
      </Button>
      {editMode && (
        <Button
          variant="secondary"
          onClick={() => {
            setEditMode(false);
          }}
        >
          Cancel Edit
        </Button>
      )}
    </Form>
  );
};
export default AddEntryForm;

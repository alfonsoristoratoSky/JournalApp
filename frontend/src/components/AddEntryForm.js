import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { addEntry } from "../utils/apiService";
const AddEntryForm = ({ tokenGenerator, setEntries }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data.feelingState = rating;
    data.emailHashed = "ahsahsha";
    addEntry(tokenGenerator, setEntries, data);
  };
  const [rating, setRating] = useState(20);
  const handleRating = (rate) => {
    setRating(rate);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Journal Entry</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          placeholder="Write your thoughts"
          {...register("entry", { required: true })}
        />
        {errors.entry && <span>This field is required</span>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>How do you feel</Form.Label>
        <Rating onClick={handleRating} ratingValue={rating} />
      </Form.Group>

      <Button variant="secondary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
export default AddEntryForm;

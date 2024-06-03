import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ClassSelect from "../ClassSelect/ClassSelect";

const AddForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [classes, setClasses] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(name, email, gender, course, classes);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        gender: gender,
        course: course,
        class: classes,
      }),
    };
    const response = await fetch(
      "http://localhost:3000/students/create",
      requestOptions
    );

    const data = await response.json();
    console.log({ data });
    const subjects = await fetch("http://localhost:3000/subjects");

    const subjectsData = await subjects.json();

    if (subjectsData) {
      await Promise.all(
        subjectsData.map(async (c) => {
          const scoreInit = await fetch(
            `http://localhost:3000/score/student/${data.data.studentId}/subject/${c.sub_id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                score: 0,
              }),
            }
          );

          return scoreInit;
        })
      );
    }

    navigate("/home");
  }

  const handleClassSelectionChange = (classId) => {
    setClasses(classId);
  };

  return (
    <React.Fragment>
      <h2>New Student</h2>
      <form onSubmit={handleSubmit} action={<Link to="/login" />}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            fullWidth
            required
          />
        </Stack>

        <TextField
          type="email"
          variant="outlined"
          color="secondary"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        <TextField
          type="text"
          variant="outlined"
          color="secondary"
          label="gender"
          onChange={(e) => setGender(e.target.value)}
          value={gender}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        <TextField
          type="text"
          variant="outlined"
          color="secondary"
          label="course"
          onChange={(e) => setCourse(e.target.value)}
          value={course}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        <ClassSelect onClassSelectionChange={handleClassSelectionChange} />

        <Button variant="outlined" color="secondary" type="submit">
          Add
        </Button>
      </form>
    </React.Fragment>
  );
};

export default AddForm;

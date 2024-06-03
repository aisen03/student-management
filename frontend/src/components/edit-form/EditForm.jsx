import React, { useState } from "react";
import { TextField, Button, Stack, TableContainer } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AddScoreForm from "../AddScoreForm/AddScoreForm";
import ClassSelect from "../ClassSelect/ClassSelect";

const EditForm = ({ initVal }) => {
  const [name, setName] = useState(initVal.stu_name);
  const [email, setEmail] = useState(initVal.email);
  const [gender, setGender] = useState(initVal.gender);
  const [course, setCourse] = useState(initVal.course);
  const [classes, setClasses] = useState(initVal.class);
  const [selectedClass, setSelectedClass] = useState();
  const [loading, setLoading] = useState(false);
  const [scores, setScore] = useState({});
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const studentId = initVal.stu_id;
    console.log({ classes });
    setLoading(true);

    const updated = await fetch(`http://localhost:3000/students/${studentId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        stu_name: name,
        email: email,
        gender: gender,
        course: course,
        ...(selectedClass && { class: selectedClass }),
      }),
    });

    const keySet = Object.keys(scores);

    if (keySet && keySet.length > 0) {
      const filteredZeroScores = keySet.filter((k) => scores[k] > 0);

      await Promise.all(
        filteredZeroScores.map(async (sid) => {
          const updatedScore = await fetch(
            `http://localhost:3000/score/students/${studentId}/subject/${sid}`,
            {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                score: scores[sid],
              }),
            }
          );

          return updatedScore;
        })
      );
    }

    console.log(await updated.json());
    navigate("/home");
    setLoading(false);
  }

  const handleClassSelectionChange = (classId) => {
    setSelectedClass(classId);
  };

  const handleScoreChange = (scores) => {
    setScore(scores);
  };

  return (
    <React.Fragment>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit} action={<Link to="/login" />}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            defaultValue={initVal.stu_name}
            fullWidth
            required
          />
        </Stack>
        <TextField
          type="email"
          defaultValue={initVal.email}
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
          defaultValue={initVal.gender}
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
          defaultValue={initVal.course}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        <ClassSelect
          defaulValue={initVal.class}
          onClassSelectionChange={handleClassSelectionChange}
        />
        <AddScoreForm
          onScoreChange={handleScoreChange}
          stuId={initVal.stu_id}
        />
        <Button
          disabled={loading}
          variant="outlined"
          color="secondary"
          type="submit"
        >
          Edit
        </Button>
      </form>
    </React.Fragment>
  );
};
export default EditForm;

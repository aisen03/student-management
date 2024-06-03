import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import StuTable from "../../components/stu-table/StuTable";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
  const [course, setCourse] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleChangeCourse = (event) => {
    setCourse(event.target.value);
  };
  const [classes, setClass] = useState(null);

  const handleChangeClass = (event) => {
    setClass(event.target.value);
  };

  const handleAddStudent = () => {
    navigate("/add-student");
  };

  return (
    <Box fullWidth>
      <Stack direction="row" spacing={2}>
        <Button onClick={handleAddStudent} variant="contained">
          Add
        </Button>
      </Stack>
      <StuTable classId={location.state?.classId || null} />
    </Box>
  );
}

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";

const ClassSelect = ({ onClassSelectionChange, defaulValue }) => {
  const [stuClass, setStuClass] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedClass, setSelectedClass] = React.useState("");

  const handleChange = (event) => {
    setSelectedClass(event.target.value);
    onClassSelectionChange(event.target.value);
  };

  useEffect(() => {
    const getClass = async () => {
      setLoading(true);
      const classRes = await fetch("http://localhost:3000/classes");
      const classData = await classRes.json();
      console.log({ defaulValue });
      if (defaulValue) {
        const selected = classData.find((c) => c.class_name === defaulValue);

        if (selected) {
          setSelectedClass(selected.class_id);
        }
      }
      setStuClass(classData);
      setLoading(false);
    };

    getClass();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      <FormControl sx={{ mb: 4 }} fullWidth>
        <InputLabel id="class-select-label">Classes</InputLabel>
        <Select
          labelId="class-select-label"
          id="class-select"
          value={selectedClass}
          label="Age"
          onChange={handleChange}
        >
          {stuClass.map((c) => (
            <MenuItem key={c.class_id} value={c.class_id}>
              {c.class_name} {c.class_teacher}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ClassSelect;

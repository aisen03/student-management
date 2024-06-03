import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";

const AddScoreForm = ({ stuId, onScoreChange }) => {
  const [scores, setScores] = useState([]);
  const [sub, setSub] = useState([]);
  const [scoresList, setScoresList] = useState({});

  useEffect(() => {
    onScoreChange(scoresList);
  }, [scoresList, onScoreChange]);

  useEffect(() => {
    const getScores = async () => {
      const scoreRes = await fetch(`http://localhost:3000/score/${stuId}`);
      const data = await scoreRes.json();

      if (data && data.length > 0) {
        console.log("check");
        setScores(data);
        return;
      }

      const subjectRes = await fetch("http://localhost:3000/subjects");
      const subjectData = await subjectRes.json();

      setSub(subjectData);
    };

    getScores();
  }, [stuId]);

  const handleInputChange = (sub, score) => {
    console.log({ sub, score, scores });
    setScoresList((prev) => ({ ...prev, [sub]: score }));
  };

  return (
    <TableContainer sx={{ mb: 4 }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {scores &&
              scores.length > 0 &&
              scores.map((row, i) => (
                <TableCell key={i} component="th" scope="row">
                  {row.sub_name}
                </TableCell>
              ))}
            {sub &&
              sub.map((row, i) => (
                <TableCell key={i} component="th" scope="row">
                  {row.sub_name}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            {scores &&
              scores.length > 0 &&
              scores.map((row, i) => (
                <TableCell
                  onChange={(e) =>
                    handleInputChange(row.sub_id, e.target.value)
                  }
                  key={i}
                  component="th"
                  scope="row"
                >
                  <input type="text" defaultValue={row.score ?? ""} />
                </TableCell>
              ))}
            {sub &&
              sub.map((row, i) => (
                <TableCell key={i} component="th" scope="row">
                  <input
                    onChange={(e) =>
                      handleInputChange(row.sub_id, e.target.value)
                    }
                    min={0}
                    max={10}
                    type="number"
                    defaultValue={""}
                  />
                </TableCell>
              ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AddScoreForm;

import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { Table } from "reactstrap";

const ScoreTable = ({ scores }) => {
  return (
    <TableContainer component={Paper}>
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
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            {scores &&
              scores.length > 0 &&
              scores.map((row, i) => (
                <TableCell key={i} component="th" scope="row">
                  {row.score}
                </TableCell>
              ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScoreTable;

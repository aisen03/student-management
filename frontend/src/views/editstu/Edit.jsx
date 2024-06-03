import React, { useEffect, useState } from "react";
import EditForm from "../../components/edit-form/EditForm";
import { useLocation } from "react-router-dom";
import ScoreTable from "../../components/ScoreTable/ScoreTable";

const Edit = () => {
  const { state } = useLocation();
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getStu = async () => {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/students/${state.id}`);

      const data = await res.json();

      setStudent(data[0]);
      setLoading(false);
    };

    getStu();
  }, [state.id]);

  return (
    <>
      {!loading && <EditForm initVal={student} />}{" "}
      {loading && <p>Loading...</p>}
    </>
  );
};

export default Edit;

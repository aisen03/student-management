import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, CardTitle, Row, Col } from "reactstrap";
import books from "../../assets/book.png";
import graduate from "../../assets/graduated.png";
import classes from "../../assets/lecture.png";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [totalStu, setTotalStu] = useState(0);
  const [totalClasses, setTotalClasses] = useState(0);
  const [totalSubjects, setTotalSubjects] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      fetch("http://localhost:3000/total/students")
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          setTotalStu(data[0]?.totalStu);
        });

      fetch("http://localhost:3000/classes/total")
        .then((res) => res.json())
        .then((data) => {
          setTotalClasses(data[0].totalClasses);
        });

      fetch("http://localhost:3000/subjects/total")
        .then((res) => res.json())
        .then((data) => {
          setTotalSubjects(data[0].totalSub);
        });
    };
    getData();
  }, []);

  const moreStudent = () => {
    navigate("/home");
  };
  const moreClass = () => {
    navigate("/classes");
  };
  const moreSubject = () => {
    navigate("/subjects");
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col lg="4" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <img
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                      src={graduate}
                      title="student icons"
                    />
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Total students</p>
                      <CardTitle tag="p">{totalStu}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <a
                  style={{ cursor: "pointer" }}
                  className="stats"
                  onClick={moreStudent}
                >
                  More Detail
                </a>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="4" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <img
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                      src={books}
                      title="subject icons"
                    />
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Total subjects</p>
                      <CardTitle tag="p">{totalSubjects}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <a
                  style={{ cursor: "pointer" }}
                  className="stats"
                  onClick={moreSubject}
                >
                  More Detail
                </a>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="4" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <img
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                      src={classes}
                      title="class icons"
                    />
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Total classes</p>
                      <CardTitle tag="p">{totalClasses}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <a
                  style={{ cursor: "pointer" }}
                  className="stats"
                  onClick={moreClass}
                >
                  More Detail
                </a>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;

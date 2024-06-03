const express = require("express");

const app = express();
const port = 3000;
const cors = require("cors");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "080203",
  database: "students",
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting: " + error.stack);
    return;
  }

  console.log("Connected as id " + connection.threadId);
});

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.get("/accounts", (req, res) => {
  //  const result =  SELECT * FROM STUDENTS
  res.json([
    {
      ID: 1,
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      password: "1",
    },
    {
      ID: 2,
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@example.com",
      password: "1",
    },
    {
      ID: 3,
      first_name: "Michael",
      last_name: "Johnson",
      email: "michael.johnson@example.com",
      password: "1",
    },
    {
      ID: 4,
      first_name: "Emily",
      last_name: "Brown",
      email: "emily.brown@example.com",
      password: "1",
    },
    {
      ID: 5,
      first_name: "David",
      last_name: "Lee",
      email: "david.lee@example.com",
      password: "1",
    },
  ]);
});

app.get("/students", (req, res) => {
  // Example query
  connection.query(
    "SELECT * FROM student st INNER JOIN class c WHERE st.class = c.class_id",
    (error, results, fields) => {
      if (error)
        return res.status(400).send({
          error: error.message,
        });

      const re = results.map((r) => ({
        stu_id: r.stu_id,
        stu_name: r.stu_name,
        email: r.email,
        gender: r.gender,
        class: r.class_name,
        course: r.course,
      }));

      return res.status(200).send(re);
    }
  );
});

app.get("/students/:stuId", (req, res) => {
  // Example query
  connection.query(
    `SELECT * FROM student st INNER JOIN class c WHERE st.class = c.class_id AND stu_id = ${req.params.stuId}`,
    (error, results, fields) => {
      if (error)
        return res.status(400).send({
          error: error.message,
        });

      const re = results.map((r) => ({
        stu_id: r.stu_id,
        stu_name: r.stu_name,
        email: r.email,
        gender: r.gender,
        class: r.class_name,
        course: r.course,
      }));

      return res.status(200).send(re);
    }
  );
});

app.post("/students/create", (req, res) => {
  const student = req.body;

  if (!student)
    return res.status(400).send({
      error: "student is required",
    });
  connection.query(
    `INSERT INTO student (stu_name,gender, email, course, class) VALUES ('${student.name}', '${student.gender}', '${student.email}', '${student.course}', '${student.class}')`,
    (error, results, fields) => {
      if (error)
        return res.status(400).send({
          error: error.message,
        });

      return res.status(200).send({
        message: "student created",
        data: {
          studentId: results.insertId,
        },
      });
    }
  );
});

app.post("/login", (req, res) => {
  const users = req.body;
  if (!users)
    return res.status(400).send({
      error: "user is required",
    });
  connection.query(
    `SELECT * FROM users WHERE email = '${users.email}'`,
    (error, results, fields) => {
      if (error)
        return res.status(400).send({
          error: error.message,
        });

      if (results.length === 0) {
        return res.status(400).send({
          message: "wrong email",
        });
      }

      const user = results[0];
      if (user.password === users.password) {
        return res.status(200).send({
          message: "logged in",
        });
      } else {
        return res.status(400).send({
          message: "wrong password",
        });
      }
    }
  );
});

app.post("/register", (req, res) => {
  const users = req.body;
  if (!users)
    return res.status(400).send({
      error: "user is required",
    });
  connection.query(
    `INSERT INTO users (first_name, last_name, email, password) VALUES ('${users.first_name}', '${users.last_name}', '${users.email}', '${users.password}')`,
    (error, results, fields) => {
      if (error)
        return res.status(400).send({
          error: error.message,
        });
      return res.status(200).send({
        message: "user created",
      });
    }
  );
});

app.put("/students/:id", (req, res) => {
  const id = req.params.id;
  if (!id)
    return res.status(400).send({
      error: "ID is required",
    });
  const student = req.body;
  if (!student)
    return res.status(400).send({
      error: "student is required",
    });
  // Initialize an array to store the update clauses
  const updateClauses = [];

  // Check each field and add it to the update clauses if it exists in the request body
  console.log(student.class);
  if (student.stu_name) updateClauses.push(`stu_name = '${student.stu_name}'`);
  if (student.class) updateClauses.push(`class = '${student.class}'`);
  if (student.gender) updateClauses.push(`gender = '${student.gender}'`);
  if (student.email) updateClauses.push(`email = '${student.email}'`);
  if (student.course) updateClauses.push(`course = '${student.course}'`);
  // Construct the SQL query with optional fields
  let query = `UPDATE student SET ${updateClauses.join(
    ","
  )} WHERE stu_id = ${id}`;
  connection.query(query, (error, results, fields) => {
    if (error)
      return res.status(400).send({
        error: error.message,
      });
    return res.status(200).send(results);
  });
});

app.delete("/students/:id", (req, res) => {
  const id = req.params.id;
  if (!id)
    return res.status(400).send({
      error: "ID is required",
    });
  connection.query(
    `DELETE FROM student WHERE stu_id = ${id}`,
    (error, results, fields) => {
      if (error)
        return res.status(400).send({
          error: error.message,
        });
      return res.status(200).send(results);
    }
  );
});

app.get("/classes", (req, res) => {
  // Example query
  connection.query("SELECT * FROM class", (error, results, fields) => {
    if (error)
      return res.status(400).send({
        error: error.message,
      });
    return res.status(200).send(results);
  });
});

app.get("/classes/students", (req, res) => {
  const classId = req.query.classId;
  // Example query
  connection.query(
    `SELECT * FROM student WHERE class = ${classId}`,
    (error, results, fields) => {
      if (error)
        return res.status(400).send({
          error: error.message,
        });
      return res.status(200).send(results);
    }
  );
});

app.post("/classes/create", (req, res) => {
  const stu_class = req.body;
  if (!stu_class)
    return res.status(400).send({
      error: "class is required",
    });
  connection.query(
    `INSERT INTO class (class_name,class_teacher) VALUES ('${stu_class.class_name}', '${stu_class.class_teacher}')`,
    (error, results, fields) => {
      if (error)
        return res.status(400).send({
          error: error.message,
        });
      return res.status(200).send({
        message: "class created",
      });
    }
  );
});

app.delete("/classes/:id", (req, res) => {
  const id = req.params.id;
  if (!id)
    return res.status(400).send({
      error: "ID is required",
    });
  connection.query(
    `DELETE FROM class WHERE class_id = ${id}`,
    (error, results, fields) => {
      if (error)
        return res.status(400).send({
          error: error.message,
        });
      return res.status(200).send(results);
    }
  );
});

app.put("/classes/:id", (req, res) => {
  const id = req.params.id;
  if (!id)
    return res.status(400).send({
      error: "ID is required",
    });
  const stu_class = req.body;
  if (!stu_class)
    return res.status(400).send({
      error: "class is required",
    });
  // Initialize an array to store the update clauses
  const updateClauses = [];

  // Check each field and add it to the update clauses if it exists in the request body
  if (stu_class.class_name)
    updateClauses.push(`class_name = '${stu_class.class_name}'`);
  if (stu_class.class_teacher)
    updateClauses.push(`class_teacher = '${stu_class.class_teacher}'`);

  // Construct the SQL query with optional fields
  let query = `UPDATE class SET ${updateClauses.join(
    ","
  )} WHERE class_id = ${id}`;
  connection.query(query, (error, results, fields) => {
    if (error)
      return res.status(400).send({
        error: error.message,
      });
    return res.status(200).send(results);
  });
});

app.get("/subjects", (req, res) => {
  // Example query
  connection.query("SELECT * FROM class_subject", (error, results, fields) => {
    if (error)
      return res.status(400).send({
        error: error.message,
      });
    return res.status(200).send(results);
  });
});

app.post("/subjects/create", (req, res) => {
  const class_subject = req.body;
  if (!class_subject)
    return res.status(400).send({
      error: "subject is required",
    });
  connection.query(
    `INSERT INTO class_subject (sub_name) VALUES ('${class_subject.sub_name}')`,
    (error, results, fields) => {
      if (error)
        return res.status(400).send({
          error: error.message,
        });
      return res.status(200).send({
        message: "subject created",
      });
    }
  );
});

app.delete("/subjects/:id", (req, res) => {
  const id = req.params.id;
  if (!id)
    return res.status(400).send({
      error: "ID is required",
    });
  connection.query(
    `DELETE FROM class_subject WHERE sub_id = ${id}`,
    (error, results, fields) => {
      if (error)
        return res.status(400).send({
          error: error.message,
        });
      return res.status(200).send(results);
    }
  );
});

app.put("/subjects/:id", (req, res) => {
  const id = req.params.id;
  if (!id)
    return res.status(400).send({
      error: "ID is required",
    });
  const class_subject = req.body;
  if (!class_subject)
    return res.status(400).send({
      error: "subject is required",
    });
  // Initialize an array to store the update clauses
  const updateClauses = [];

  // Check each field and add it to the update clauses if it exists in the request body
  if (class_subject.sub_name)
    updateClauses.push(`sub_name = '${class_subject.sub_name}'`);
  // Construct the SQL query with optional fields
  let query = `UPDATE class_subject SET ${updateClauses.join(
    ","
  )} WHERE sub_id = ${id}`;
  connection.query(query, (error, results, fields) => {
    if (error)
      return res.status(400).send({
        error: error.message,
      });
    return res.status(200).send(results);
  });
});

app.get("/total/students", (req, res) => {
  connection.query(
    "SELECT count(stu_id) as totalStu FROM student",
    (error, results, fields) => {
      if (error)
        return res.status(400).send({
          error: error,
        });

      return res.status(200).send(results);
    }
  );
});

app.get("/classes/total", (req, res) => {
  // Example query
  connection.query(
    "SELECT count(class_id) as totalClasses FROM class",
    (error, results, fields) => {
      if (error)
        return res.status(400).send({
          error: error.message,
        });
      return res.status(200).send(results);
    }
  );
});

app.get("/subjects/total", (req, res) => {
  // Example query
  connection.query(
    "SELECT count(sub_id) as totalSub FROM class_subject",
    (error, results, fields) => {
      if (error)
        return res.status(400).send({
          error: error.message,
        });
      return res.status(200).send(results);
    }
  );
});

app.post("/score/student/:stuId/subject/:subId", (req, res) => {
  // Example query
  connection.query(
    `INSERT INTO stu_score (stu_id, sub_id, score) VALUES (${req.params.stuId}, ${req.params.subId}, ${req.body.score}) `,
    (error, results, fields) => {
      if (error)
        return res.status(400).send({
          error: error.message,
        });
      return res.status(200).send(results);
    }
  );
});

app.put("/score/students/:stuId/subject/:subId", (req, res) => {
  const stuId = req.params.stuId;
  const subId = req.params.subId;

  if (!stuId || !subId)
    return res.status(400).send({
      error: "ID is required",
    });
  const score = req.body.score;
  if (!score)
    return res.status(400).send({
      error: "score is required",
    });
  // Initialize an array to store the update clauses
  const updateClauses = [];

  // Check each field and add it to the update clauses if it exists in the request body
  updateClauses.push(`score = '${score}'`);
  // Construct the SQL query with optional fields
  let query = `UPDATE stu_score SET ${updateClauses.join(
    ","
  )} WHERE stu_id = ${stuId} AND sub_id = ${subId}`;
  connection.query(query, (error, results, fields) => {
    if (error)
      return res.status(400).send({
        error: error.message,
      });
    return res.status(200).send(results);
  });
});

app.get("/score/:stuId", (req, res) => {
  // Example query
  connection.query(
    `SELECT cs.sub_name, s.score, cs.sub_id from stu_score s inner join class_subject cs on s.sub_id = cs.sub_id where s.stu_id = ${req.params.stuId}`,
    (error, results, fields) => {
      if (error)
        return res.status(400).send({
          error: error.message,
        });
      return res.status(200).send(results);
    }
  );
});

app.delete("/score/student/:stuId/subject/:subId", (req, res) => {
  // Example query
  connection.query(
    `DELETE FROM stu_score WHERE stu_id = ${req.params.stuId} and sub_id = ${req.params.subId}`,
    (error, results, fields) => {
      if (error)
        return res.status(400).send({
          error: error.message,
        });
      return res.status(200).send(results);
    }
  );
});

app.get("/score/avg/student/:stuId", (req, res) => {
  // Example query
  connection.query(
    `select avg(score) as avg from stu_score group by stu_id having stu_id = ${req.params.stuId}`,
    (error, results, fields) => {
      if (error)
        return res.status(400).send({
          error: error.message,
        });
      return res.status(200).send(results);
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

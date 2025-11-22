import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getStudents } from '../services/StudentService';
import "../App.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchRegistration, setSearchRegistration] = useState("");
  const [searchCourse, setSearchCourse] = useState("");

  useEffect(() => {
    let mounted = true;
    getStudents().then(data => {
      if (mounted) {
        setStudents(data);
        setFilteredStudents(data);
      }
    });
    return () => (mounted = false);
  }, []);

  const filterStudents = (regQuery, courseQuery) => {
    let filtered = students;

    if (regQuery) {
      filtered = filtered.filter(student =>
        student.RegistrationNo.toLowerCase().includes(regQuery.toLowerCase())
      );
    }

    if (courseQuery) {
      filtered = filtered.filter(student =>
        student.Course.toLowerCase().includes(courseQuery.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
  };

  const handleRegistrationSearch = (e) => {
    const value = e.target.value;
    setSearchRegistration(value);
    filterStudents(value, searchCourse);
  };

  const handleCourseSearch = (e) => {
    const value = e.target.value;
    setSearchCourse(value);
    filterStudents(searchRegistration, value);
  };

  return (
    <div className="container-fluid side-container">
      <div className="row side-row">
        <p id="before-table"></p>

        <div className="d-flex mb-3" style={{ gap: "10px" }}>

          <input
            type="text"
            className="form-control"
            placeholder="Search by Registration No"
            value={searchRegistration}
            onChange={handleRegistrationSearch}
            style={{ flex: 1 }}
          />

          <input
            type="text"
            className="form-control"
            placeholder="Search by Course (ex: BSIT)"
            value={searchCourse}
            onChange={handleCourseSearch}
            style={{ width: "250px" }}
          />
        </div>

        <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Registration No</th>
              <th>Email</th>
              <th>Course</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(stu =>
              <tr key={stu.id}>
                <td>{stu.studentId}</td>
                <td>{stu.FirstName}</td>
                <td>{stu.LastName}</td>
                <td>{stu.RegistrationNo}</td>
                <td>{stu.Email}</td>
                <td>{stu.Course}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Students;

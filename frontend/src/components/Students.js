import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getStudents } from '../services/StudentService';
import "../App.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchIDNo, setSearchIDNo] = useState("");
  const [searchCourse, setSearchCourse] = useState("");

  useEffect(() => {
    let mounted = true;
    getStudents().then(data => {
      if (mounted) {
        const sortedData = data.sort((a, b) => a.LastName.localeCompare(b.LastName));
        setStudents(sortedData);
        setFilteredStudents(sortedData);
      }
    });
    return () => mounted = false;
  }, []);

  const filterStudents = (regQuery, courseQuery) => {
    let filtered = students;

    if (regQuery) {
      const q = regQuery.toLowerCase();
      filtered = filtered.filter(student =>
        student.IDNo.toLowerCase().includes(q) ||
        student.LastName.toLowerCase().includes(q)
      );
    }

    if (courseQuery) {
      filtered = filtered.filter(student =>
        student.Course.toLowerCase().includes(courseQuery.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
  };

  const handleIDNoSearch = (e) => {
    const value = e.target.value;
    setSearchIDNo(value);
    filterStudents(value, searchCourse);
  };

  const handleCourseSearch = (e) => {
    const value = e.target.value;
    setSearchCourse(value);
    filterStudents(searchIDNo, value);
  };

  return (
    <div className="container-fluid side-container">
      <div className="row side-row manage-responsive">
        <div className="d-flex flex-wrap mb-3 search-inputs">
          <input
            type="text"
            className="form-control"
            placeholder="Search by ID No or Last Name"
            value={searchIDNo}
            onChange={handleIDNoSearch}
            style={{ flex: '1 1 150px' }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Search by Course"
            value={searchCourse}
            onChange={handleCourseSearch}
            style={{ flex: '1 1 150px', maxWidth: '200px' }}
          />
        </div>

        <div className="table-responsive">
          <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>ID No</th>
                <th>Email</th>
                <th>Course</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(stu =>
                <tr key={stu.id}>
                  <td>{stu.FirstName}</td>
                  <td>{stu.LastName}</td>
                  <td>{stu.IDNo}</td>
                  <td>{stu.Email}</td>
                  <td>{stu.Course}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Students;

import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getStudents } from '../services/StudentService';
import "../App.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  useEffect(() => {
    let mounted = true;
    getStudents()
      .then(data => {
        if (mounted) {
          setStudents(data);
          setFilteredStudents(data); // Initially display all students
        }
      })
    return () => mounted = false;
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter students based on registration number
    if (query) {
      const filtered = students.filter(student =>
        student.RegistrationNo.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students); // Reset filter when search is cleared
    }
  };

  return (
    <div className="container-fluid side-container">
      <div className="row side-row">
        <p id="before-table"></p>

        {/* Search Bar */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Registration No"
            value={searchQuery}
            onChange={handleSearchChange}
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
            {filteredStudents.map((stu) =>
              <tr key={stu.id}>
                <td>{stu.studentId}</td>
                <td>{stu.FirstName}</td>
                <td>{stu.LastName}</td>
                <td>{stu.RegistrationNo}</td>
                <td>{stu.Email}</td>
                <td>{stu.Course}</td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Students;

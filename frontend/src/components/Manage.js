import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddStudentModal from "./AddStudentModal";
import UpdateStudentModal from "./UpdateStudentModal";
import { getStudents, deleteStudent } from '../services/StudentService';

const Manage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editStudent, setEditStudent] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (students.length && !isUpdated) {
      return;
    }
    getStudents()
      .then(data => {
        if (mounted) {
          setStudents(data);
          setFilteredStudents(data); // Initially display all students
        }
      })
    return () => {
      mounted = false;
      setIsUpdated(false);
    }
  }, [isUpdated, students]);

  const handleUpdate = (e, stu) => {
    e.preventDefault();
    setEditModalShow(true);
    setEditStudent(stu);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setAddModalShow(true);
  };

  const handleDelete = (e, studentId) => {
    if (window.confirm('Are you sure ?')) {
      e.preventDefault();
      deleteStudent(studentId)
        .then((result) => {
          alert(result);
          setIsUpdated(true);
        },
          (error) => {
            alert("Failed to Delete Student");
          })
    }
  };

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

  let AddModelClose = () => setAddModalShow(false);
  let EditModelClose = () => setEditModalShow(false);

  return (
    <div className="container-fluid side-container">
      <div className="row side-row" >
        <p id="manage"></p>

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
              <th >ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Registration No</th>
              <th>Email</th>
              <th>Course</th>
              <th>Action</th>
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
                <td>
                  <Button className="mr-2" variant="danger"
                    onClick={event => handleDelete(event, stu.studentId)}>
                    <RiDeleteBin5Line />
                  </Button>
                  <span>&nbsp;&nbsp;&nbsp;</span>
                  <Button className="mr-2"
                    onClick={event => handleUpdate(event, stu)}>
                    <FaEdit />
                  </Button>
                  <UpdateStudentModal show={editModalShow} student={editStudent} setUpdated={setIsUpdated}
                    onHide={EditModelClose}></UpdateStudentModal>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button variant="primary" onClick={handleAdd}>
            Add Student
          </Button>
          <AddStudentModal show={addModalShow} setUpdated={setIsUpdated}
            onHide={AddModelClose}></AddStudentModal>
        </ButtonToolbar>
      </div>
    </div>
  );
};

export default Manage;

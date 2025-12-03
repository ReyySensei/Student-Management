import React, { useEffect, useState } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddStudentModal from "./AddStudentModal";
import UpdateStudentModal from "./UpdateStudentModal";
import { getStudents, deleteStudent } from '../services/StudentService';
import "../App.css";

const Manage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [courseQuery, setCourseQuery] = useState("");
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editStudent, setEditStudent] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (students.length && !isUpdated) return;

    getStudents().then(data => {
      if (mounted) {
        const sortedData = data.sort((a, b) => a.LastName.localeCompare(b.LastName));
        setStudents(sortedData);
        setFilteredStudents(sortedData);
      }
    });

    return () => {
      mounted = false;
      setIsUpdated(false);
    };
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
    if (window.confirm('Are you sure?')) {
      e.preventDefault();
      deleteStudent(studentId)
        .then(result => {
          alert(result);
          setIsUpdated(true);
        }, error => {
          alert("Failed to Delete Student");
        });
    }
  };

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

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterStudents(query, courseQuery);
  };

  const handleCourseChange = (e) => {
    const query = e.target.value;
    setCourseQuery(query);
    filterStudents(searchQuery, query);
  };

  let AddModelClose = () => setAddModalShow(false);
  let EditModelClose = () => setEditModalShow(false);

  return (
    <div className="container-fluid side-container">
      <div className="row side-row manage-responsive">
        <div className="d-flex flex-wrap mb-3 search-inputs">
          <input
            type="text"
            className="form-control"
            placeholder="Search by ID No or Last Name"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ flex: '1 1 150px' }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Search by Course"
            value={courseQuery}
            onChange={handleCourseChange}
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
                <th>Action</th>
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
                  <td className="d-flex gap-1 flex-wrap">
                    <Button variant="danger" onClick={e => handleDelete(e, stu.studentId)}>
                      <RiDeleteBin5Line />
                    </Button>
                    <Button onClick={e => handleUpdate(e, stu)}>
                      <FaEdit />
                    </Button>
                    <UpdateStudentModal
                      show={editModalShow}
                      student={editStudent}
                      setUpdated={setIsUpdated}
                      onHide={EditModelClose}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        <ButtonToolbar className="flex-wrap mt-3">
          <Button variant="primary" onClick={handleAdd}>
            Add Student
          </Button>
          <AddStudentModal show={addModalShow} setUpdated={setIsUpdated} onHide={AddModelClose} />
        </ButtonToolbar>
      </div>
    </div>
  );
};

export default Manage;

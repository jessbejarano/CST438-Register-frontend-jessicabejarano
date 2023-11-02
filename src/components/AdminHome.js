import React, { useState, useEffect } from 'react';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import {SERVER_URL, SEMESTERS} from '../constants';

const AdminHome = (isAuthenticated)  => {

  const [students, setStudents] = useState([]);  // list of students
  const [message, setMessage] = useState(' ');  // status message

    useEffect(() => {
        // called once after intial render
        const jwtToken = sessionStorage.getItem("jwt");
        if (jwtToken) {
            isAuthenticated(true);
        }
        fetchStudents();
        }, [] )


    // Fetching All Students
    const fetchStudents = () => {
      console.log("fetchStudents");

      fetch(`${SERVER_URL}/students`)
      .then((response) => { return response.json(); } )
        .then((data) => { setStudents(data); })
        .catch((err) =>  { 
            console.log("exception fetchStudents "+err);
            setMessage("Exception. "+err);
         } );
    }


  /*
  *  add student
  */ 
    const addStudent = (name, email, code, status) => {
      setMessage('');
      console.log("start addStudent"); 

      if(!isValidEmail(email)){
        alert("Invalid email format. Please enter a valid email address.");
    } else {
        const requestBody = {
            name: name, // Match the field name with what the server expects
            email: email, // Match the field name with what the server expects
            statusCode: code,
            status: status
          };
          const token = sessionStorage.getItem('jwt');

          fetch(`${SERVER_URL}/students/add`,
          { 
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
                'Authorization' : `${token}`,
              },
              body: JSON.stringify(requestBody),
          })
          .then(res => {
              if (res.ok) {
              console.log("addStudent ok");
    
              setMessage("Student added.");
              fetchStudents();
              } else {
              console.log('error addStudent ' + res.status);
              setMessage("Error. "+res.status);
              }})
          .catch(err => {
              console.error("exception addStudent "+ err);
              setMessage("Exception. "+err);
          })
    }
  }

  function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

 /*
  *  update student
  */ 
  const updateStudent = (id, name, email, code, status) => {
    setMessage('');
    if(!isValidEmail(email)){
        alert("Invalid email format. Please enter a valid email address.");
    } else {
        const requestBody = {
            name: name, // Match the field name with what the server expects
            email: email, // Match the field name with what the server expects
            statusCode: code,
            status: status
          };
        const token = sessionStorage.getItem('jwt');
    
        fetch(`${SERVER_URL}/students/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `${token}`
              },
              body: JSON.stringify(requestBody),
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Student updated successfully");
                    setMessage("Student updated successfully.");
                    fetchStudents();
                } else {
                    console.log("Student update error");
                    setMessage("Error updating student" + response.statusText);
                }
            })
            .catch((error) => {
                console.error("Exception updating student", error);
                setMessage("Exception updating student" + error);
            });
    }
  }


  /* 
   *   delete Student
   */ 
  const deleteStudent = (studentid) => {
    setMessage('');
    // const row_id = event.target.parentNode.parentNode.rowIndex;
    console.log("drop student "+studentid);
    
    if (window.confirm('Are you sure you want to delete the student?')) {
        const token = sessionStorage.getItem('jwt');
    
        fetch(`${SERVER_URL}/students/delete/${studentid}`,
        {
            method: 'DELETE',
        }
        )
    .then(res => {
        if (res.ok) {
            console.log("drop ok");
            setMessage("Student deleted.");
            fetchStudents();
        } else {
            console.log("drop error");
            setMessage("Error deleteStudent, student has enrollments. Status: "+res.status);
        }
        })
    .catch( (err) => {
        console.log("exception deleteStudent "+err);
        setMessage("Exception. "+err);
     } );
    }
} 

    const headers = ['ID', 'Name', 'Email', 'Status Code', 'Status Message', 'Update', 'Delete'];
    if (students.length === 0) {
      return (
          <div>
              <h3>No Enrolled Students</h3>
              <h4>{message}</h4>
              <AddStudent addStudent={addStudent}/>
          </div>
          );
    } else { 
      return( isAuthenticated? (
          <div margin="auto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
              <h3>Student List</h3>
              <h4>{message}</h4>
              <table studentName="Center"> 
                  <thead>
                  <tr>
                      {headers.map((s, idx) => (<th key={idx}>{s}</th>))}
                  </tr>
                  </thead>
                  <tbody>
                  {students.map((row,idx) => (
                          <tr key={idx}>
                          <td>{row.student_id}</td>
                          <td>{row.name}</td>
                          <td>{row.email}</td>
                          <td>{row.statusCode}</td>
                          <td>{row.status}</td>
                          <td>      <EditStudent id="updateStudentButton" updateStudent={updateStudent} /></td>
                          <td><button type="button" id="deleteButton" margin="auto" onClick={() => deleteStudent(row.student_id)}>Delete</button></td>
                          </tr>
                      ))}
                  </tbody>
              </table>
              <AddStudent id="addStudentButton" addStudent={addStudent} />
        
          </div>
      ) : null
      );
  }
}

export default AdminHome;
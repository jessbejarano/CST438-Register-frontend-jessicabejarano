import React, { useState, useEffect } from 'react';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import {SERVER_URL, SEMESTERS} from '../constants';

const AdminHome = ()  => {

  const [students, setStudents] = useState([]);  // list of students
  const [message, setMessage] = useState(' ');  // status message

    useEffect(() => {
        // called once after intial render
        fetchStudents();
        }, [] )


    // Fetching All Students
    const fetchStudents = () => {
		//TODO complete this method to fetch students and display list of students
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
    const addStudent = (email, name, status) => {
      setMessage('');
      console.log("start addStudent"); 

      const requestBody = {
        email: email,
        name: name,
        status: status
      };

      fetch(`${SERVER_URL}/students/add`,
      { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
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

 /*
  *  update student
  */ 
  const updateStudent = (email, code, status) => {
    setMessage('');

    fetch(`${SERVER_URL}/students/update?email=${email}&statusCode=${code}&statusMsg=${status}`, {
        method: 'PUT',
    })
        .then((response) => {
            if (response.ok) {
                console.log("Student updated successfully");
                setMessage("Student updated successfully.");
                fetchStudents();
            } else {
                console.log("Status update error");
                setMessage("Error updating status: " + response.statusText);
            }
        })
        .catch((error) => {
            console.error("Exception updating status:", error);
            setMessage("Exception updating status: " + error);
        });
  }


  /* 
   *   delete Student
   */ 

  const deleteStudent = (event) => {
    setMessage('');
    const row_id = event.target.parentNode.parentNode.rowIndex - 1;
    console.log("drop student "+row_id);
    const studentEmail = students[row_id].email;
    
    if (window.confirm('Are you sure you want to delete the student?')) {
        fetch(`${SERVER_URL}/students/delete/${studentEmail}`,
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
            setMessage("Error deleteStudent. "+res.status);
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
      return(
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
                          <td>      <EditStudent updateStudent={updateStudent} /></td>
                          <td><button type="button" margin="auto" onClick={deleteStudent}>Delete</button></td>
                          </tr>
                      ))}
                  </tbody>
              </table>
              <AddStudent addStudent={addStudent} />
        
          </div>
      );
  }
}

export default AdminHome;
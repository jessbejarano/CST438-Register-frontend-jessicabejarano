import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function EditStudent(props) {

    const [open, setOpen] = useState(false);
    const [studentEmail, setStudent_email] = useState(0);
    const [code, setStudent_code] = useState(0);
    const [status, setStudent_status] = useState(0);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'studentEmail') {
          setStudent_email(value);
        } else if (name === 'code') {
          setStudent_code(value);
        } else if (name === 'status') {
          setStudent_status(value);
        }
      }
    
    // Save course and close modal form
    const handleEdit = () => {
        props.updateStudent(studentEmail, code, status);
        handleClose();
    }

      return (
        <div>
          <Button id="updateStudent" variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
          Edit Student
          </Button>
          <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Edit Student</DialogTitle>
              <DialogContent  style={{paddingTop: 20}} >
                {/* <TextField id="studentEmail" autoFocus fullWidth label="Student Email" name="studentEmail" onChange={handleChange}  />  */}
                <TextField id="email" autoFocus fullWidth label="Student Email" name="studentEmail" onChange={handleChange}/>
              <br></br>
              <br></br>
              <TextField id="code" autoFocus fullWidth label="Student Code" name="code" onChange={handleChange}/> 
              <br></br>
              <br></br>
              <TextField id="status" autoFocus fullWidth label="Student Status Message" name="status" onChange={handleChange}/> 
              </DialogContent>
              <DialogActions>
                <Button color="secondary" onClick={handleClose}>Cancel</Button>
                <Button id="edit" color="primary" onClick={handleEdit}>Edit</Button>
              </DialogActions>
            </Dialog>      
        </div>
    ); 
  }
  
  // required property:  addCourse is a function to call to perform the Add action
  EditStudent.propTypes = {
    updateStudent : PropTypes.func.isRequired
}

export default EditStudent;
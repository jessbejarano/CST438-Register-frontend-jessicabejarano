import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


// properties addCoure is required, function called when Add clicked.
function AddStudent(props) { 

  const [open, setOpen] = useState(false);
  const [name, setStudent_name] = useState(0);
  const [email, setStudent_email] = useState(0);
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
    if (name === 'name') {
      setStudent_name(value);
    }
    else if (name === 'email') {
      setStudent_email(value);
    }
    else if (name === 'code') {
      setStudent_code(value);
    }
    else if (name === 'status') {
      setStudent_status(value);
    }
  }

  const handleAdd = () => {
      props.addStudent(name, email, code, status);
      handleClose();
  }

  return (
      <div>
        <Button id="addStudent" variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
          Add Student
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Student</DialogTitle>
            <DialogContent  style={{paddingTop: 15}} >
              <TextField id="name" autoFocus fullWidth label="Student Name" name="name" onChange={handleChange}/>
              <br></br>
              <br></br>
              <TextField id="email" fullWidth label="Student Email" name="email" onChange={handleChange}/> 
              <br></br>
              <br></br>
              <TextField id="code" fullWidth label="Student Status Code" name="code" onChange={handleChange}/>
              <br></br>
              <br></br>
              <TextField id="status" fullWidth label="Student Status" name="status" onChange={handleChange}/> 
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={handleClose}>Cancel</Button>
              <Button id="add" color="primary" onClick={handleAdd}>Add</Button>
            </DialogActions>
          </Dialog>      
      </div>
  ); 
}

// required property:  addCourse is a function to call to perform the Add action
AddStudent.propTypes = {
    addStudent : PropTypes.func.isRequired
}

export default AddStudent
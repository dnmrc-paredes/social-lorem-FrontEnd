import React from 'react'
import {TextField, Collapse, Button} from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import CancelIcon from '@material-ui/icons/Cancel';

const EditProfileName = ({trigger, open, handleChange, handleSubmit, editError, setOpen, update, setTrigger}) => {
    return trigger ? <form className="editform">

        <div className="editprofileclosebtn">
            <CancelIcon style={{float: 'right'}} onClick={() => {
                setTrigger(false)
            }} />
        </div>

    {editError.errors.length > 0 ?
    <Collapse in={open}>
        <Alert style={{marginBottom: "1rem"}} variant="filled" severity="error" onClose={() => {
            setOpen(false)
        }}> {editError.errors.map(item => {
            return <p key={item.msg}> {item.msg} </p>
        })} </Alert>
    </Collapse> : ""}

    <TextField name="firstName" value={update.firstName} style={{marginBottom: "0.5rem"}} label="First Name" onChange={handleChange}/>
    <TextField name="lastName" value={update.lastName} style={{marginBottom: "0.5rem"}} label="Last Name" onChange={handleChange}/>

    <Button variant="contained" color="primary"style={{marginTop: '1rem'}} onClick={handleSubmit}> Update </Button>
</form> : ""

}

export default EditProfileName
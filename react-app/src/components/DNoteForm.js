import React, {useState, useEffect} from "react";
import { Grid, TextField, withStyles, Button} from "@material-ui/core";
import {connect} from "react-redux";
import useForm from "./useForm";
import * as actions from "../actions/DNote";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            minWidth: 520,
        }
    },
    smMargin: {
        margin: theme.spacing(2),
        minWidth: 150,
    }
})

const initialFieldValues={
    title:"",
    text:""
}



const DNoteForm = ({classes, ...props}) =>{

    //toast msg.
    const { addToast } = useToasts()

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('title' in fieldValues)
            temp.title = fieldValues.title ? "" : "Title field is required."
        if ('text' in fieldValues)
            temp.text = fieldValues.text ? "" : "Text field is required."
        
        
        setErrors({
                ...temp
            })
    
        if (fieldValues == values)
                return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            if (props.currentId == 0)
                props.createDNotes(values, onSuccess)
            else
                props.updateDNotes(props.currentId, values, onSuccess)
        }
   }

  

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.DNoteList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item  xs={6}>
                    <TextField 
                    name="title"
                    variant="outlined"
                    label="Title"
                    value={values.title}
                    onChange={handleInputChange}
                    {...(errors.title && { error: true, helperText: errors.title })}
                    />    
                </Grid>
                <Grid item >
                    <TextField 
                    name="text"
                    variant="outlined"
                    label="Text"
                    value={values.text}
                    onChange={handleInputChange}
                    {...(errors.text && { error: true, helperText: errors.text })}
                    />   
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div> 
                </Grid>
            </Grid>
        </form>
    );
}

const mapStateToProps = state =>({
    DNoteList:state.DNote.list
})

const mapActionToProps ={
    createDNotes : actions.create,
    updateDNotes : actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DNoteForm));
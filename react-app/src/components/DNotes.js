import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import * as actions from "../actions/DNote";
import { Grid, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button} from "@material-ui/core";
import DNoteForm from "./DNoteForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";


const styles =theme =>({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper : {
        margin: theme.spacing(2),
        paddind: theme.spacing(2)
    }
})

const DNotes = ({classes, ...props}) =>{

    //toast msg.
    const { addToast } = useToasts()
    
const [currentId, setCurrentId] = useState(0)

    useEffect(()=>{
        props.fetchAllDNotes()
    }, [])

const onDelete = id => {
    if (window.confirm('Are you sure to delete this record?'))
            props.deleteDNotes(id,()=>addToast("Deleted successfully", { appearance: 'info' }))
}

return(
    <Paper className={classes.paper}>
        <Grid container>
            <Grid item xs={6}>
                <DNoteForm {...({currentId,setCurrentId})}/>
            </Grid>
            <Grid item xs={6}>
                <TableContainer>
                    <Table>
                        <TableHead className={classes.root}>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Text of Note</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.DNoteList.map((record,index)=>{
                                    return (<TableRow key={index} hover>
                                        <TableCell>{record.title}</TableCell>
                                        <TableCell>{record.text}</TableCell>
                                        <TableCell>
                                            <ButtonGroup variant="text">
                                                <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.id) }} /></Button>

                                                <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                </ButtonGroup>
                                        </TableCell>
                                    </TableRow>)
                                }
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    </Paper>
);
}

const mapStateToProps = state =>({
    DNoteList:state.DNote.list
})

const mapActionToProps ={
    fetchAllDNotes : actions.fetchAll,
    deleteDNotes : actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DNotes));
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Divider from "@material-ui/core/Divider";

function ConfirmationDialogRaw(props) {
    const { onClose, open, ...other } = props;
    const [users, setUsers] = React.useState({
        name: "",
        age: "",
        sex: "",
    });

    const radioGroupRef = React.useRef(null);

    const addUsers = async () => {
        await axios.post("/api/user", {
            data: {
                name: users.name,
                age: users.age,
                sex: users.sex,
            },
        });
        handleCancel();
        props.refreshList();
    };

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    //取消按钮
    const handleCancel = () => {
        onClose();
    };
    //更改name值
    const handleGetName = (event) => {
        setUsers({ ...users, name: event.target.value });
    };

    const handleGetAge = (event) => {
        setUsers({ ...users, age: event.target.value });
    };

    const handleGetSex = (event) => {
        setUsers({ ...users, sex: event.target.value });
    };

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="sm"
            onEntering={handleEntering}
            aria-labelledby="confirmation-dialog-title"
            open={open}
            {...other}
        >
            <DialogTitle id="confirmation-dialog-title">
                CREATE USER
            </DialogTitle>
            <DialogContent dividers>
                <TableContainer>
                    <Divider width="100%" />
                    <Table aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    <TextField
                                        id="standard-basic"
                                        label="姓名"
                                        value={users.name}
                                        onChange={handleGetName}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        id="standard-basic2"
                                        label="年龄"
                                        value={users.age}
                                        onChange={handleGetAge}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        id="standard-basic3"
                                        label="性别"
                                        value={users.sex}
                                        onChange={handleGetSex}
                                    />
                                </TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={addUsers} color="primary">
                    SAVE
                </Button>
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ConfirmationDialogRaw.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100px",
        maxWidth: 560,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        width: "100%",
        maxHeight: 635,
    },
}));

export default function ConfirmationDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    // const [disabled,setDisabled] = React.useState({
    //     disabled: false
    // });

    const handleClickListItem = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <List component="div" role="list">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickListItem}
                >
                    增加
                </Button>
                <ConfirmationDialogRaw
                    classes={{
                        paper: classes.paper,
                    }}
                    id="ringtone-menu"
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    history={props.history}
                    data={props.data}
                    refreshList={props.refreshList}
                />
            </List>
        </div>
    );
}

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

const useStyles2 = makeStyles((theme) => ({
    root: {
        marginRight: 8,
    },
}));

function ConfirmationDialogRaw(props) {
    const classes = useStyles2();
    const { onClose, open, ...other } = props;
    const [users, setUsers] = React.useState( {
            id: null,
            name: "",
            age: "",
            sex: "",
        });

    const radioGroupRef = React.useRef(null);

    const updateUsers = async () => {
        await axios.post("/api/user", {
            data: {
                id: props.data.id,
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

    React.useEffect(() => {
        setUsers({
            id: props.data.id,
            name: props.data.name,
            age: props.data.age,
            sex: props.data.sex,
        });
    }, []);

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
            <DialogTitle id="confirmation-dialog-title">UPDATE USER</DialogTitle>
            <DialogContent dividers>
                <TextField className={classes.root}
                    id="standard-basic"
                    label="姓名"
                    value={users.name}
                    onChange={handleGetName}
                />
                <TextField className={classes.root}
                    id="standard-basic2"
                    label="年龄"
                    value={users.age}
                    onChange={handleGetAge}
                />
                <TextField
                    id="standard-basic3"
                    label="性别"
                    value={users.sex}
                    onChange={handleGetSex}
                />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={updateUsers} color="primary">
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
        display: "inline-block",
    },
    paper: {
        width: "100%",
        maxHeight: 635,
    },
}));

export default function ConfirmationDialogEdit(props) {
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
                    编辑
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

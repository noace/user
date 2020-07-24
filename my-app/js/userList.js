import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Divider from "@material-ui/core/Divider";
import AlertDialog from "../src/alertMessage";
import ConfirmationDialog from "../src/add";
import ConfirmationDialogEdit from "../src/edit";

const useStyles = () => ({
    table: {
        minWidth: 650,
    },
    modal: {
        marginTop: "auto",
    },
});

class SimpleTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            open: false,
        };
    }

    componentDidMount() {
        this.handleSelectAll();
    }

    common = async () => {
        const userList = await axios.get("/api/userList");
        this.setState({ users: userList.data.data });
    };

    handleSelectAll = () => {
        this.common();
        this.handleOpen();
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    hanleDelete = async (id) => {
        this.handleOpen();
        console.log(id);
        const users = this.state.users.filter((userList) => id !== userList.id);
        const user = await axios.post("/api/user", {
            data: users,
        });

        this.setState({ users: user.data.data });
    };

    render() {
        const { classes } = this.props;
        return (
            <TableContainer component={Paper}>
                <ConfirmationDialog
                    open={this.open}
                    onClose={this.handleClose}
                    refreshList={this.common}
                />
                <Divider width="100%" />
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>姓名</TableCell>
                            <TableCell align="center">年龄</TableCell>
                            <TableCell align="center">性别</TableCell>
                            <TableCell align="center">操作</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users.map((user) => (
                            <TableRow key={user.name}>
                                <TableCell component="th" scope="row">
                                    {user.name}
                                </TableCell>
                                <TableCell align="center">{user.age}</TableCell>
                                <TableCell align="center">{user.sex}</TableCell>
                                <TableCell align="center">
                                    <ConfirmationDialogEdit
                                        open={this.open}
                                        onClose={this.handleClose}
                                        data={user}
                                        refreshList={this.common}
                                    />

                                    <AlertDialog
                                        hanleDelete={() =>
                                            this.hanleDelete(user.id)
                                        }
                                        users={user}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}
export default withStyles(useStyles)(SimpleTable);

import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

const useStyles = (theme) => ({
    paper: {
        marginTop: theme.spacing(30),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            isLogin: false
        };
    }

    singin = async () => {
        const res = await axios.post('/api/login', {
            name: this.state.username,
            pwd: this.state.password,
        });
        if(res.data.code === 20){
            this.props.callback(true,this.state.username);
        }else{

        }
    };

    hanleUsername = (event) => {
        this.setState({
            username: event.target.value,
        });
    };

    hanlePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            autoFocus
                            onChange={this.hanleUsername}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            onChange={this.hanlePassword}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.singin}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}
export default withStyles(useStyles)(SignIn);
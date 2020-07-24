import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import MainListItems from "./listItems";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Paper from "@material-ui/core/Paper";
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";
import Users from "./userList";
import Welcome from "./welcome";
import { createBrowserHistory } from "history";
import Chart from './echarts';
const customHistory = createBrowserHistory();

const drawerWidth = 150;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    toolbar: {
        paddingRight: 24,
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 10px",
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        // width: `calc(100% - ${drawerWidth}px)`,
        width: '100%',
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 0,
    },
    menuButtonHidden: {
        display: "none",
    },
    title: {
        flexGrow: 1,
        textAlign: "right",
    },
    logIcon: {
        verticalAlign: "center",
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(3),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(0),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    fixedHeight: {
        height: "auto",
    },
}));

export default function UserSystem(props:any) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    className={clsx(
                        classes.appBar,
                        open && classes.appBarShift
                    )}
                >
                    <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" noWrap style={{width: open ?  140 : 0}}>
            LOGO
          </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(
                                classes.menuButton,
                                open 
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.title}
                        >
                            {props.username}
                            <IconButton onClick={() => props.callback(false)}>
                                <ExitToAppIcon className={classes.logIcon} />
                            </IconButton>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(
                            classes.drawerPaper,
                            !open && classes.drawerPaperClose
                        ),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        
                    </div>
                    <Divider />
                    <List>
                        <MainListItems history={customHistory} />
                    </List>
                </Drawer>

                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="xl" className={classes.container}>
                        <Paper className={fixedHeightPaper}>
                            <Switch>
                                <Route exact path="/" component={Welcome} />
                                <Route
                                    exact
                                    path="/charts"
                                    component={Chart}
                                />
                                <Route exact path="/user" component={Users} />
                            </Switch>
                        </Paper>
                    </Container>
                </main>
            </div>
        </Router>
    );
}

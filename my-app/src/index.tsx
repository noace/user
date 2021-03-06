import React from "react";
import ReactDOM from "react-dom";
import SignIn from "./login";
import UserSystem from "./userSystem";

class UserIsLogin extends React.Component{
    state={
            isLogin: false,
            username: ''
        }
    
    callback = (isLogin: boolean,username: string) =>{
        this.setState({isLogin,username});
    }

    render(){
        return(
            this.state.isLogin
              ? <UserSystem username={this.state.username} callback={this.callback} />
            : <SignIn callback={this.callback} />
            )
    }
}

ReactDOM.render(
    <UserIsLogin />,
    document.getElementById("root")
);

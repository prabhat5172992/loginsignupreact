import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const Login = (props)=>{
    const style = {textStyle:{width:"300px"}}
    return (
        <div style={props.errorText ? {textAlign: "center", width: "100%", marginTop: "80px"} : {textAlign: "center", width: "100%", marginTop: "60px"}}>
            <div style={{display: "inline-block", boxSizing: "border-box", border: "2px solid #C8CACA", padding: "10px", height: `${props.errorText ? '340px ': '320px'}`}}>
                <div style={{textAlign: "center", fontSize: "1.2rem", backgroundColor: "#12C4F3", color: "#FBFCFC", padding: "10px"}}>LOGIN</div>
                <MuiThemeProvider>
                    <div style={{marginTop: "10px"}}>
                        <TextField
                            floatingLabelFixed
                            floatingLabelText="Email"
                            style = {style.textStyle}
                            onChange = {(_, ID) => props.getLoginData("id", ID)}
                            value={props.id}
                        />
                        <br/>
                        <TextField
                            floatingLabelFixed
                            type = "password"
                            floatingLabelText="Password"
                            style = {style.textStyle}
                            onChange = {(_, Password) => props.getLoginData("password", Password)}
                            value = {props.password}
                            errorText= {props.errorText ? props.errorText : ""}
                            errorStyle = {{marginLeft:"-135px"}}
                        />
                        <br/>
                        <RaisedButton label="Submit" style = {props.errorText ? {marginTop: "30px"} : {marginTop: "40px"} } primary={true} onClick={() => props.loginSubmit()}/>
                    </div>
                </MuiThemeProvider>
            </div>
        </div>
    );
};

export default Login;
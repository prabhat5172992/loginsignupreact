import React, { Component } from 'react';
import Register from './register';
import Login from './login';
import Success from './successPage';
import If from './conditional';
import update from 'immutability-helper';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      login: true,
      loginSuccess: false,
      errorText: "",
      form: {}
    }
    this.handleToggle = this.handleToggle.bind(this);
    this.setRegisterData = this.setRegisterData.bind(this);
    this.registerSubmit = this.registerSubmit.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.getLoginData = this.getLoginData.bind(this);
  }

  handleToggle(display){
    this.setState({
      login: display,
      id: "",
      password: "",
      errorText: "",
      loginSuccess: false,
      form: {}
    })
  }
  
  setRegisterData(key, value){
    let form = update(this.state.form, {$merge: {[key]: value}});
    this.setState({
      form
    })
  }

  registerSubmit(){
    if(Object.keys(this.state.form).length){
      Object.keys(this.state.form).forEach(item=> {
        if (typeof(Storage) !== "undefined"){
          localStorage.setItem(item, this.state.form[item]);
        }
        else{
          document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }
      })
    }
    this.setState({
      login: true
    });
  }

  getLoginData(key, val){
    this.setState({
      [key]: val
    })
  }

  loginSubmit(){
    if(!localStorage.getItem("email") && !localStorage.getItem("password")){
      this.setState({errorText:"Please Register First!!"})
    }
    else if(localStorage.getItem("email") === this.state.id && localStorage.getItem("password") === this.state.password){
      this.setState({errorText:"", loginSuccess: true, login: false});
    }
    else{
      this.setState({errorText:"Id and password did not match"})
    }
  }
  
  render() {
    return (
      <div>
        <ul> 
          {/* eslint-disable-next-line */}
          <li> <a href="javascript:void(0)" onClick= {()=>this.handleToggle(true)}> Login </a> </li>
          {/* eslint-disable-next-line */}
          <li> <a href="javascript:void(0)" onClick= {()=>this.handleToggle(false)}> Sign Up </a> </li>
        </ul>
        <div>
          <div id="result"></div>
          <If condition = {this.state.loginSuccess && !this.state.login}>
            <Success />
          </If>
          <If condition={this.state.login}> 
            <Login 
              getLoginData = {this.getLoginData}
              id = {this.state.id}
              password = {this.state.password}
              errorText = {this.state.errorText}
              loginSubmit = {this.loginSubmit}
            /> 
          </If>
          <If condition={!this.state.login && !this.state.loginSuccess}>  
            <Register 
              setData = {this.setRegisterData}
              registerSubmit = {this.registerSubmit}
              form = {this.state.form}
            />
          </If>
        </div>
      </div>
    );
  }
}
export default App;
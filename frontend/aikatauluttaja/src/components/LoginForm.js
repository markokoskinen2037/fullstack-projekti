import React from "react"
import loginService from "../services/login"
import courseService from "../services/courses"
import { withRouter } from "react-router-dom";

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }

    handleFormChange(event){
        console.log(event.target.value)
        const name = event.target.name
        this.setState({
            [name] : event.target.value
        })
    }

      login = async (event) => {
        event.preventDefault()
        try {
          const user = await loginService.login({
            username: this.state.username,
            password: this.state.password
          })
      
          this.setState({ username: '', password: ''})
          courseService.setToken(user.token)
          this.props.setLoggedInUser(user) //Reactin stateen tallennettava user
          window.localStorage.setItem('user', JSON.stringify(user)) //local storageen tallennettava user
        } catch(exception) {
            alert("virheellinen käyttäjätunnus tai salasana!")
        }
      }

      handleLogOut = (event) => {
        event.preventDefault()

        console.log("deleting all user info from local cache")
        window.localStorage.clear()
        this.props.clearState()
        this.props.history.push("/");
        
      }


    render() {


        if(this.props.user === null){
            return (
                <div>
                    <form onSubmit={(e) => this.login(e)}>
                    käyttäjätunnus:
                    <input type="text" name="username" value={this.state.username} onChange={(event) => this.handleFormChange(event)}/>
                    salasana:
                    <input type="password" name="password" value={this.state.password} onChange={(event) => this.handleFormChange(event)}/>
                    <button type="submit">Kirjaudu sisään</button>
                    </form>
                </div>
            )
        } else {
            return(
                <div>
                    <p>Logged in as: {this.props.user.username} <button onClick={(e) => this.handleLogOut(e)}>Log out</button></p>
                </div>
            )
            
        }




}

}

export default withRouter(LoginForm);
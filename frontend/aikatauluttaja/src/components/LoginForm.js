import React from "react"
import loginService from "../services/login"

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
         try{
           const user = await loginService.login({
             username: this.state.username,
             password: this.state.password
           })
           alert("Logged in as" + this.state.username)
      
           this.setState({ username: '', password: ''})
           this.props.setLoggedInUser(user)
         } catch(exception) {
             alert("virheellinen käyttäjätunnus tai salasana!")
         }
      }


    render() {
    return (
        <div>
            <form onSubmit={(e) => this.login(e)}>
            käyttäjätunnus:
            <input type="text" name="username" value={this.state.username} onChange={(event) => this.handleFormChange(event)}/>
            salasana:
            <input type="text" name="password" value={this.state.password} onChange={(event) => this.handleFormChange(event)}/>
            <button type="submit">Kirjaudu sisään</button>
            </form>
        </div>
    )
}

}

export default LoginForm
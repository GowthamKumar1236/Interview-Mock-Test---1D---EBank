import {Component} from 'react'
import './index.css'

import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class LoginRoute extends Component {
  state = {userId: '', pin: '', errorMsg: '', showSubmitError: false}

  onChangeUserName = event => {
    this.setState({userId: event.target.value})
  }

  onChangePassword = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSumbitForm = async event => {
    event.preventDefault()

    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}

    const loginApiUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginApiUrl, options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {pin, userId, errorMsg, showSubmitError} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="login-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="website-image"
          />
          <div className="login-container">
            <h1 className="welcome-heading">Welcome Back!</h1>
            <form className="login-form-container" onSubmit={this.onSumbitForm}>
              <div className="input-container">
                <label className="label" htmlFor="userId">
                  User ID
                </label>
                <input
                  className="input"
                  placeholder="Enter User ID"
                  type="text"
                  id="userId"
                  onChange={this.onChangeUserName}
                  value={userId}
                />
              </div>
              <div className="input-container">
                <label className="label" htmlFor="pin">
                  PIN
                </label>
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Pin"
                  id="pin"
                  value={pin}
                  onChange={this.onChangePassword}
                />
              </div>
              <button className="login-btn" type="submit">
                Login
              </button>
              {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginRoute

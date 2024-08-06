import React, { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isCredential, setIsCredential] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()
  const token = Cookies.get('jwt_token')

  const onSubmitForm = async event => {
    event.preventDefault()

    const userDetails = { username, password }
    const loginApi = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginApi, options)
    const data = await response.json()

    if (response.ok) {
      loginSuccess(data.jwt_token)
    } else {
      loginFailure(data.error_msg)
    }
  }

  const loginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, { expires: 30, path: '/' })
    navigate('/')
  }

  const loginFailure = error => {
    setIsCredential(true)
    setErrorMsg(error)
  }

  if (token !== undefined) {
    return <Navigate to="/" />
  }

  return (
    <div className="login-container">
      <img
        className="logo"
        alt="website login"
        src="https://res.cloudinary.com/dxjowybhg/image/upload/v1663949409/logo_ip0o9f.png"
      />
      <div className="login-details-container">
        <img
          className="website-logo"
          alt="website logo"
          src="https://res.cloudinary.com/dxjowybhg/image/upload/v1663949395/website-logo_gsc5ig.png"
        />
        <h1 className="website-heading">Insta Share</h1>
        <form className="form-container" onSubmit={onSubmitForm}>
          <div className="input-container">
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="input"
              value={username}
              id="username"
              placeholder="Username"
              type="text"
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="input"
              value={password}
              id="password"
              placeholder="Password"
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {isCredential && <p className="error">{errorMsg}</p>}
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage

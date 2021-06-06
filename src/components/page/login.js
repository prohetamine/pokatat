import React, { Component }   from 'react'
import { connect }            from 'react-redux';
import API                    from '../../api/server'
import { Redirect, Link }     from 'react-router-dom'


class Login extends Component {
  auth () {
    this.props.getAuthToken({
      login: this.props.login.username,
      password: this.props.login.password
    })
  }

  render () {
    if (this.props.token !== null) {
      return (
        <Redirect to='/' />
      )
    }

    return (
      <div>
        <input type="text" onChange={({ target: { value } }) => this.props.onLogin(value)} value={this.props.login.username} placeholder='login'/>
        <input type="text" onChange={({ target: { value } }) => this.props.onPassword(value)} value={this.props.login.password} placeholder='password'/>
        <button onClick={() => this.auth()}>Auth</button>
        <Link to='/#prev'>close</Link>
        <Link to='/registration/1-13/lang#next'>register</Link>
        { this.props.incorrect_login_or_password && <div>Не верный логин или пароль</div> }
      </div>
    )
  }
}

export default connect(
  state => ({
    ...state,
    ...state.auth
  }),
  dispatch => ({
    onLogin: value =>
      dispatch({ type: 'LOGIN_USERNAME_VALUE', payload: value }),
    onPassword: value =>
      dispatch({ type: 'LOGIN_PASSWORD_VALUE', payload: value }),
    getAuthToken: ({ login, password }) =>
      dispatch(
        async (dispatch) => {
          const { data } = await API.getAuthToken({
            login,
            password
          })

          data.token
            ? dispatch({ type: 'SET_AUTH_TOKEN', payload: data.token })
            : dispatch({ type: 'INCORRECT_LOGIN_OR_PASSWORD', payload: true })
        }
      )
  })
)(Login)

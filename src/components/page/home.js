import React, { Component }   from 'react'
import { connect }            from 'react-redux';
import { Redirect, Link }     from 'react-router-dom'
import styled                 from 'styled-components'

const Body = styled.div`
  width: 100%;
  height: 100vh;
  background: #d9e;
`

class Home extends Component {
  render () {
    return (
      <Body>
        <Link to='/login#next'>login</Link>
        <br />
        <Link to='/registration/1-12/lang#next'>registration</Link>
      </Body>
    )
  }
}

export default Home

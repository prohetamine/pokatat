import React, { Component }   from 'react'
import { connect }            from 'react-redux'
import BottomNavigation       from './../organism/navigation/head'
import { Link }     from 'react-router-dom'

class Tests extends Component {
  render () {
    return (
      <>
        Test
        <Link to='/login'>login</Link>
        <BottomNavigation active='users' />
      </>
    )
  }
}

export default connect(
  state => ({
    ...state,
    lang: state.lang[state.lang.selected]
  })
)(Tests)

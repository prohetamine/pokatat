import React, { Component }   from 'react'
import { connect }            from 'react-redux';
import BottomNavigation       from './../organism/navigation/head'

class Profile extends Component {
  
  render () {
    return (
      <>
        <select value={this.props.lang.selected} onChange={({ target: { value } }) => this.props.setLang(value)}>
          {
              this.props.lang.items_langs.map(
                ({ label, value }, key) => (
                    <option key={key} value={value}>{label}</option>
                  )
              )
          }
        </select>

        <BottomNavigation active={'profile'} />
      </>
    )
  }
}

export default connect(
  state => {
    return state
  },
  dispath => {
    return {
      setLang: (lang) => {
        dispath({ type: 'SET_LANG', payload: lang })
      }
    }
  }
)(Profile)

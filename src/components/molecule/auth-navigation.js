import React                     from 'react'
import { connect }               from 'react-redux';
import { Link }                  from 'react-router-dom'

import arrow_to_left_icon        from '../../style/icons/arrow-to-left.svg'
import arrow_to_right_icon       from '../../style/icons/arrow-to-right.svg'
import cross_icon                from '../../style/icons/cross.svg'
import Navigation                from '../atom/auth/navigation'
import Button                    from '../atom/auth/button'
import Label                     from '../atom/auth/label'
import Icon                      from '../atom/auth/icon'

const _Navigation = props => (
  <Navigation>
    <Link to={props.prev}>
      <Button style={{ width: '47px' }}>
        <Icon src={arrow_to_left_icon} />
      </Button>
    </Link>
    <Link to={props.isNext ? props.next : '#'}>
      <Button style={{ marginLeft: '15.5px', padding: '0px 13px 0px 18px' }}>
        <Label>{props.lang.auth.registration.registration_button}</Label>
        <Icon src={props.isNext ? arrow_to_right_icon : cross_icon} />
      </Button>
    </Link>
  </Navigation>
)


export default connect(
  state => ({
    ...state,
    lang_selected: state.lang.selected,
    lang: state.lang[state.lang.selected]
  })
)(_Navigation)

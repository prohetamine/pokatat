import React          from 'react'
import styled         from 'styled-components'
import { connect }    from 'react-redux'
import Sections       from './../../style/sections'

const Button = styled.div`
  display: inline-flex;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  height: 47px;
  background: #FC8763;
  box-shadow: 0px 0px 4px rgba(68, 68, 68, 0.27);
  border-radius: 114px;
  padding: 0px 20px 0px 20px;
  margin-left: 7px;
  cursor: pointer;
  border: none;
  outline: none;
  user-select: none;

  @media (max-width: 375px) {
    padding: 0px 6px 0px 6px;
  }
`

const Image = styled.img`
  width: 24px;
  background-size: cover;
  @media (max-width: 320px) {
    padding: 0px 8px 0px 8px;
  }
`

function _Button ({ section, style, icon, subtype, children, onClick }) {
  const _icon = Sections[section].icons[icon+'-'+subtype.join('-')]

  return (
    <Button onClick={onClick} style={style}>
      <Image src={_icon}></Image>
    </Button>
  )
}

export default connect(
  state => state.profile
)(_Button)

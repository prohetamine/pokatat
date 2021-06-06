import React          from 'react'
import { connect }    from 'react-redux'
import { Link }       from 'react-router-dom'
import styled         from 'styled-components'
import Sections       from './../../style/sections'

const LinkWrapper = styled(Link)`
  display: inline-flex;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  height: 59px;
  user-select: none;
`

const Image = styled.img`
  height: 30px;
  width: 44px;
  max-width: 44px;
  min-width: 44px;
  background-size: cover;
`

const Label = styled.div`
  color: #fff;
  font-family: Circe-Bold;
  font-style: normal;
  font-weight: 800;
  font-size: 15px;
  line-height: 22px;
  margin-right: 8px;

  @media (max-width: 790px) {
    display: none
  }
`

function Link2 ({ section, icon, subtype, children, to }) {
  const _icon = Sections[section].icons[icon+'-'+subtype.join('-')]

  return (
    <LinkWrapper to={to}>
      <Label>{children}</Label>
      <Image src={_icon}></Image>
    </LinkWrapper>
  )
}

export default connect(
  state => state.profile
)(Link2)

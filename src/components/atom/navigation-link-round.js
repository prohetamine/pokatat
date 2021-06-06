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
  user-select: none;
  height: 47px;
  background: #FC8763;
  box-shadow: 0px 0px 4px rgba(68, 68, 68, 0.27);
  border-radius: 114px;
  padding: 0px 20px 0px 20px;
  margin-left: 7px;

  @media (max-width: 480px) {
    padding: 0px calc(4% - 2px) 0px calc(4% - 2px);
  }

  @media (max-width: 375px) {
    padding: 0px 6px 0px 6px;
  }
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

  ${props => props.hideLabel ? 'display: none;' : ''}

  @media (max-width: 790px) {
    display: none
  }
`

function _Link ({ hideLabel, section, style, icon, subtype, children, to }) {

  // иконки
  const _icon =
  /* секции */ Sections[
                    section /* мотокросс или тому подобное, попадает в функцию из redux см. reducers/global */
               ].icons[ /* тут у нас или инконки или конфиги */
                 icon+'-'+subtype.join('-') /* обращаемся к иконке по ключу, называние и субтип */
               ]

  return (
    <LinkWrapper to={to} style={style}>
      <Label hideLabel={hideLabel}>{children}</Label>
      <Image src={_icon}></Image>
    </LinkWrapper>
  )
}

export default connect(
  state => state.profile
)(_Link)

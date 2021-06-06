import React            from 'react'
import { connect }      from 'react-redux'
import styled           from 'styled-components'
import ContentLoader    from 'react-content-loader'
import Sections         from './../../../style/sections'


const FakeButton = styled.div`
  border-radius: 100px;
  overflow: hidden;
  height: 47px;
  width: 120px;
  margin: 5px;
`


const Button = styled.button`
  background-image: url(${props => props.bgIcon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
  border-radius: 100%;
  border: 0;
  outline: none;
  width: 53px;
  height: 53px;
  cursor: pointer;
  background-color: #FC6363;
  box-shadow: 0px 0px 4px rgba(68, 68, 68, 0.27);
  transition-duration: 0.3s;
  height: 47px;
  width: 150px;
  border-radius: 100px;
  margin: 5px;

  &&:hover{
    background-image: url(${props => props.bgIconHover});
  }
`

function CardControl ({ section, icon, onClick, loaderProps, style }) {
  const icon_fill = Sections[section].icons[icon+'-fill']
  const icon_clean = Sections[section].icons[icon+'-clean']

  return (
    loaderProps.isLoad
      ? <FakeButton style={style}>
          <ContentLoader speed={loaderProps.speed} secondaryColor={loaderProps.secondaryColor} primaryColor={loaderProps.primaryColor} height='100' width='100' style={{ minWidth: '100%', minHeight: '100%', maxWidth: '100%', maxHeight: '100%' }}>
            <rect x="0" y="0"  width="100%" height="100%" />
          </ContentLoader>
        </FakeButton>
      : <Button
          style={style}
          icon={[icon_fill, icon_clean]}
          onClick={onClick}
        />
  )
}


export default connect(
  state => ({
    ...state,
    section: state.profile.section
  })
)(CardControl)

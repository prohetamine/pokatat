import React            from 'react'
import { connect }      from 'react-redux'
import styled           from 'styled-components'
import ContentLoader    from 'react-content-loader'
import Sections         from './../../../style/sections'

const Wrapper = styled.div`
  min-width: 78px;
  width: 78px;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 500px) {
    align-self: center;
    width: auto;
  }
`

const Button = styled.button`
  background-image: url(${props => props.icon[1]});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 55%;
  border-radius: 100%;
  border: 0;
  outline: none;
  width: 53px;
  height: 53px;
  cursor: pointer;
  background-color: #FC6363;
  box-shadow: 0px 0px 4px rgba(252, 99, 99, 0.44);
  transition-duration: 0.3s;
  &:hover{
    background-image: url(${props => props.icon[0]});
  }
`

function CardControl ({ section, icon, onClick, loaderProps }) {
  const icon_fill = Sections[section].icons[icon+'-fill']
  const icon_clean = Sections[section].icons[icon+'-clean']

  return (
    <Wrapper>
      {
        loaderProps.isLoad
          ? <ContentLoader
              speed={loaderProps.speed}
              secondaryColor={loaderProps.secondaryColor}
              primaryColor={loaderProps.primaryColor}
              height={8}
              width={78}
              style={{ minWidth: '78px', minHeight: '8px', maxWidth: '78px', maxHeight: '8px' }}
            >
              <circle cx="20" cy="4" r="4" />
              <circle cx="39" cy="4" r="4" />
              <circle cx="58" cy="4" r="4" />
            </ContentLoader>
          : <Button
              icon={[icon_fill, icon_clean]}
              onClick={onClick}
            />
      }
    </Wrapper>
  )
}


export default connect(
  state => ({
    ...state,
    section: state.profile.section
  })
)(CardControl)

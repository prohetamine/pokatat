import React        from 'react'
import Sections     from './../../style/sections'
import { connect }  from 'react-redux'
import styled       from 'styled-components'

const Wrapper = styled.div`
  width: calc(100% - 14px);
  margin: 7px 0px 0px 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
`

const Body = styled.div`
  width: 100%;
  max-width: 450px;
  display: flex;
  margin-bottom: 83px;
`

const Text = styled.div``

const Title = styled.div`
  font-family: Circe-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 28px;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  color: #444444;
`

const Description = styled.div`
  font-family: CRC35;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;

  color: #828282;
`

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 7px;
  width: 125px;
  min-width: 125px;
  height: 125px;
  min-height: 125px;
  border-radius: 100%;
  background: #FC8763;

  @media (max-width: 374px) {
    width: 25vw;
    min-width: 25vw;
    height: 25vw;
    min-height: 25vw;
  }
`

const Image = styled.img`
  height: 70%;
`

function CardsError ({ section }) {
  return (
    <Wrapper>
      <Body>
        <Text>
          <Title>Упс.. Где ваши друзья ?</Title>
          <Description>У вас еще нет друзей, но не беспокойтесь для участия в заездах не обязательно иметь друзей, но вы всегда можете их найти в разделе «пользователи»</Description>
        </Text>
        <Circle>
          <Image src={section.icons['geo-error']} />
        </Circle>
      </Body>
    </Wrapper>
  )
}

export default connect(
  state => ({
    ...state,
    section: Sections[state.profile.section],
    lang: state.lang[state.lang.selected]
  }),
  dispath => ({

  })
)(CardsError)

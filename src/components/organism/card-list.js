import React, { Component }   from 'react'
import { connect }            from 'react-redux'
import Sections               from './../../style/sections'
import Card                   from './../molecule/card'
import VirtualList            from 'react-virtual-list'
import styled                 from 'styled-components'

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
  max-width: 740px;
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-family: Circe-Bold;
  font-style: normal;
  font-size: 16px;
  line-height: 24px;
  color: #444444;
  margin-bottom: 6px;
`

const List = styled.div`
  width: 100%;
  margin-bottom: ${props => props.margin ? '71px' : '-12px'};
`

const Text = styled.div`
  color: #AAA9A9;
  cursor: pointer;
  border: none;
  outline: none;
  user-select: none;
  font-family: CRC35;
  font-style: normal;
  font-size: 16px;
`

const Pivoter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 6px;
  height: 0px;
`

const Image = styled.img`
  margin-left: 7px;
`

const Cards = VirtualList()(({
  virtual: { style, items },
  itemHeight,
  years,
  section,
  activeTags,
}) => (
  <div style={style}>
    {
      items.map((user, index) => {
        return (
          <Card
            key             ={index}
            card            ={user}
            activeTags      ={activeTags}
            tagsConfig      ={section.configs.tag_users.all}
          />
        )
      })
    }
  </div>
))

class CardList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowed: false
    }
  }

  handleShowed () {
    this.setState(() => ({
      isShowed: true
    }))
  }

  render () {
    const { items: _items, activeTags, title, lang, showed, bottomMargin, section } = this.props
          , items = showed ? _items.filter((_, i) => this.state.isShowed || i === 0) : _items

    if (items.length === 0) return <></>

    return (
      <Wrapper>
        <Body>
          <Title>{title}</Title>
          <List margin={bottomMargin}>
            <Cards
              items={items}
              section={section}
              activeTags={activeTags}
              itemHeight={108}
              itemBuffer={3}
            />
            {
              _items.length > 1 && showed && !this.state.isShowed &&
              <Pivoter
                onClick={() => this.handleShowed()}
                onTouchEnd={() => this.handleShowed()}
              >
                <Text>{lang.global.show_all} {_items.length}</Text>
                <Image src={section.icons['eye']}/>
              </Pivoter>
            }
          </List>
        </Body>
      </Wrapper>
    )
  }
}

export default connect(
  state => ({
    ...state,
    section: Sections[state.profile.section],
    lang: state.lang[state.lang.selected]
  })
)(CardList)

import React          from 'react'
import { connect }    from 'react-redux'
import styled         from 'styled-components'
import Sections       from './../../style/sections'
import ContentLoader    from 'react-content-loader'

const Button = styled.div`
  border: none;
  padding: 0px;
  outline: none;
  cursor: ${props => props.isFilter ? 'pointer': 'auto'};
  user-select: ${props => props.isFilter ? 'none': 'text'};
  background: ${props => props.isActive ? '#FC8763' : '#F0F0F0'};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.23);
  border-radius: 100px;
  height: 25px;
  margin-right: 9px;
  margin-bottom: 9px;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
`

const Label = styled.div`
  font-family: CRC35, sans-serif;
  font-style: normal;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  margin-left: 8px;
  margin-right: 7px;
  box-sizing: border-box;

  white-space: nowrap;
  color: ${props => props.isActive ? '#FFFFFF' : '#757575'};
`

const TagTxtBadge = styled.span`
  font-family: 'CRC55', sans-serif;
  background-color: ${props => props.isActive === true ? '#D97556' : '#E3E3E3'};
  color: ${props => props.isActive === true ? '#FFF' : '#9C9C9C'};
  font-size: 12px;
  font-weight: bold;
  border-radius: 999px;
  padding: 0 7px;
  line-height: 25px;
  min-width: 25px;
  user-select: none;
  box-sizing: border-box;
  text-align: center;
`
const TagIcoBadge = styled.span`
  background-color: ${props => props.isActive === true ? '#D97556' : props.bgColor};
  background-image: url(${props => props.bgIcon});
  background-repeat: no-repeat;
  background-position: 50%;
  border-radius: 999px;
  line-height: 25px;
  height: 25px;
  min-width: 25px;
  width: 25px;
  box-sizing: border-box;
`

function Tag ({
  section,
  lang,
  tagConfig,
  tagContent = {},
  isFilter,
  isActive,
  onClick,
  isLoad = false,
  speed = 1,
  primaryColor,
  secondaryColor,
  fakeWidth = 3
}) {
  const icons = Sections[section].icons

  return (
    isLoad
    ? (
      <Button className='tag' isFilter={false} isActive={false} style={{overflow: 'hidden'}}>
        <ContentLoader speed={speed} primaryColor={primaryColor} secondaryColor={secondaryColor} width={100} height={100} style={{ width: tagContent.fakeWidth + 'px', height: '25px'}}>
          <rect x="0" y="0" width="100" height="100"/>
        </ContentLoader>
      </Button>
      )
    : <Button className='tag' isFilter={isFilter} onClick={onClick} isActive={isActive}>
        <Label isActive={isActive}>
          {
            isFilter
              ? tagConfig.label[lang]
              : tagContent.label ||
                tagConfig.label[lang]
          }
        </Label>
        {
          isFilter
            ? <TagIcoBadge
                isActive={isActive}
                bgIcon={
                  isActive
                    ? icons[tagConfig.icon + '-first']
                    : icons[tagConfig.icon + '-last']
                }
                bgColor={'#DEDEDE'}>
              </TagIcoBadge>
            : tagContent.value !== undefined
                ? <TagTxtBadge isActive={isActive}>{tagContent.value}</TagTxtBadge>
                : <TagIcoBadge isActive={isActive} bgIcon={icons[tagConfig.icon + '-first']} bgColor={tagConfig.bgcolor}></TagIcoBadge>
        }
      </Button>
  )
}

export default connect(
  state => ({
    ...state,
    section: state.profile.section,
    lang: state.lang.selected
  })
)(Tag)

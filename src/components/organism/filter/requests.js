import React          from 'react'
import { connect }    from 'react-redux'
import styled         from 'styled-components'
import Tag            from './../../atom/tag'
import Radius         from './../../atom/filter-radius'
import Location       from './../../atom/filter-location'
import Sections       from './../../../style/sections'

const Wrapper = styled.div`
  width: calc(100% - 14px);
  margin: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
`

const Body = styled.div`
  width: 100%;
  max-width: calc(740px - 30px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #FCFCFC;
  box-shadow: 0px 0px 4px rgba(68, 68, 68, 0.27);
  border-radius: 23px;
  padding: 18px 15px 18px 15px;
`

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: rgb(225, 225, 225);
  margin: 5px 0px 14px 0px;
`

const TagWrapper = styled.div`
  width: 100%;
`

const GeoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 480px) {
    flex-direction: column
  }
`

function Filter (props) {
  const filter = props.lang.filter
  const tags = Sections[props.profile.section].configs.tag_requests.filter

  if (!props.requests.filter.show) {
    return (<></>)
  }

  return (
    <Wrapper>
      <Body>
        <TagWrapper>
          {
              tags.map((tag, key) => {
                const active = props.requests.filter.tagIds.find(tagId => tagId === tag.id) !== undefined
                return (
                  <Tag
                    key={key}
                    tagConfig={tag}
                    isFilter={true}
                    isActive={active}
                    onClick={
                      () => active
                              ? props.onDesabledTag(tag.id)
                              : props.onActivatedTag(tag.id)
                    }
                  />
                )
              })
          }
        </TagWrapper>
        <Line />
        <GeoWrapper>
          <Radius
            label={[filter.radius, filter.km]}
            min='1'
            max='120'
            onChange={km => props.onRadiusLocation(km)}
            value={props.requests.filter.location.radius}
          />
          <Location
            label={filter.city}
            onSuccess={location => props.onAutoLocation(location)}>
            {
              props.requests.filter.location.city
                ? props.requests.filter.location.city
                : filter.city_not_defined
            }
          </Location>
        </GeoWrapper>
      </Body>
    </Wrapper>
  )
}

export default connect(
  state => ({
    ...state,
    lang: state.lang[state.lang.selected]
  }),
  dispath => {
    return {
      onRadiusLocation: km =>
        dispath({ type: 'REQUESTS_RADIUS_LOCATION', payload: km }),
      onAutoLocation: location =>
        dispath({ type: 'FILTER_LOCATION', payload: location }),
      onActivatedTag: id =>
        dispath({ type: 'REQUESTS_ACTIVATED_FILTER_TAG', payload: id }),
      onDesabledTag: id =>
        dispath({ type: 'REQUESTS_DISABLED_FILTER_TAG', payload: id })
    }
  }
)(Filter)

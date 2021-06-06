import React          from 'react'
import { connect }    from 'react-redux'
import styled         from 'styled-components'
import Tag            from './../../atom/tag'
import Radius         from './../../atom/filter-radius'
import Location       from './../../atom/filter-location'
import Sections       from './../../../style/sections'
import API            from '../../../api/server'

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
  const tags = Sections[props.profile.section].configs.tag_users.filter

  if (!props.users.filter.show) {
    return (<></>)
  }

  return (
    <Wrapper>
      <Body>
        <TagWrapper>
          {
              tags.map((tag, key) => {
                const active = props.users.filter.tagIds.find(tagId => tagId === tag.id) !== undefined
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
            unlimitRadius={props.unlimitRadius}
            onChange={props.onRadiusLocation}
            value={props.users.filter.radius}
          />
        <Location
            label={filter.city}
            onChange={props.onAutoLocation}>
            {
              props.global.filter.geo.city
                ? props.global.filter.geo.city
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
  dispatch => {
    return {
      onRadiusLocation: km =>
        dispatch({ type: 'USERS_RADIUS_LOCATION', payload: km }),
      onAutoLocation: (latitude, longitude) =>
        dispatch(
            async (dispatch) => {
              if (latitude === null && longitude === null) {
                return dispatch({type: 'FILTER_LOCATION_ERROR' }) && dispatch({type: 'USERS_FILTER_SHOW' })
              }
              const {data, status} = await API.getCity(latitude, longitude)
              if (status === 200) {
                dispatch({ type: 'FILTER_LOCATION', payload: { ...data, latitude, longitude } })
              }
            }
        ),
      onActivatedTag: id =>
        dispatch({ type: 'USERS_ACTIVATED_FILTER_TAG', payload: id }),
      onDesabledTag: id =>
        dispatch({ type: 'USERS_DISABLED_FILTER_TAG', payload: id })
    }
  }
)(Filter)

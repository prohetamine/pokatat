import React, { Component }                 from 'react'
import { Route, Switch }                    from 'react-router-dom'
import { Transition, animated }             from 'react-spring'
import styled                               from 'styled-components'

import Home                                 from './components/page/home'
import Login                                from './components/page/login'
import Lang                                 from './components/page/registration/lang'
import Username                             from './components/page/registration/username'
import Date                                 from './components/page/registration/date'
import Geo                                  from './components/page/registration/geo'
import Map                                  from './components/page/registration/map'
import Photo                                from './components/page/registration/photo'
import Section                              from './components/page/registration/section'
import Phone                                from './components/page/registration/phone'
import Profile                              from './components/page/profile'
import Users                                from './components/page/users'
import Friends                              from './components/page/friends'
import Subscribes                           from './components/page/subscribes'
import Requests                             from './components/page/requests'
import Tests                                from './components/page/tests'


const Container = styled(animated.div)`
  position: absolute;
  width: 100%;
`

const AnimatedRoute = ({ children }) => (
  <Route
    render={({ location }) => {

      const animation = location.hash === '#next'
        ? {
            from: { transform: 'translate(100%, 0)' },
            enter: { transform: 'translate(0%, 0)' },
            leave: { transform: 'translate(-100%, 0)' }
          }
        : location.hash === '#prev'
            ? {
                from: { transform: 'translate(-100%, 0)' },
                enter: { transform: 'translate(0%, 0)' },
                leave: { transform: 'translate(100%, 0)' }
              }
            : {
                from: { opacity: '0', transform: 'translate(0%, 0)' },
                enter: { opacity: '1', transform: 'translate(0%, 0)' },
                leave: { opacity: '0', transform: 'translate(-100%, 0)'}
              }

      return (
        <Transition
          native
          items={[location]}
          keys={location => location.pathname}
          {...animation}
          >
          {
            location =>
              style =>
                <Container style={style}>{children(location)}</Container>
          }
        </Transition>
      )
    }}
  />
)


class App extends Component {
  render () {
    return (
        <div className="App">
          <AnimatedRoute>
            {location => (
              <Switch location={location}>
                <Route exact path='/' component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/registration/1-12/lang' component={Lang} />
                <Route path='/registration/2-12/username' component={Username} />
                <Route path='/registration/3-12/date' component={Date} />
                <Route path='/registration/4-12/geo' component={Geo} />
                <Route path='/registration/4-12/map' component={Map} />
                <Route path='/registration/5-12/photo' component={Photo} />
                <Route path='/registration/6-12/section' component={Section} />
                <Route path='/registration/7-12/phone' component={Phone} />
              </Switch>
            )}
          </AnimatedRoute>

          <Route path='/tests' component={Tests} />
          <Route path='/profile' component={Profile} />
          <Route path='/users' component={Users} />
          <Route path='/friends' component={Friends} />
          <Route path='/subscribes' component={Subscribes} />
          <Route path='(/requests|/active|/search|/history)' component={Requests} />
        </div>
    )
  }
}

export default App;

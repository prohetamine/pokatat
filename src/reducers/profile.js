let profileState = {
  section: 'motocross'
}

//profileState = localStorage.profileState ? JSON.parse(localStorage.profileState) : profileState

function profile (state = profileState, action) {
  return state
}

export default profile

let notifyState = {
  requests: {
    added_history: false,
    added_request: false
  },
  users: {
    added_friend: false,
    request_friend: false
  }
}

// notifyState = localStorage.notifyState ? JSON.parse(localStorage.notifyState) : notifyState

function notify (state = notifyState, action) {
  if (action.type === 'NOTIFY_ADDED_HISTORY') {
    return {
      ...state,
      requests: {
        ...state.notify,
        added_history: true
      }
    }
  }

  if (action.type === 'NOTIFY_HISTORY_SKIP') {
    return {
      ...state,
      requests: {
        ...state.notify,
        added_history: false
      }
    }
  }

  if (action.type === 'NOTIFY_ADDED_FRIEND') {
    return {
      ...state,
      users: {
        ...state.notify,
        added_friend: true
      }
    }
  }

  if (action.type === 'NOTIFY_ADDED_FRIEND_SKIP') {
    return {
      ...state,
      users: {
        ...state.notify,
        added_friend: false
      }
    }
  }

  return state
}

export default notify

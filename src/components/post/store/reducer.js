import produce from "immer"

const defaultState = {
  post: {},
  comments: []
}



const mutations = {
  getPostINfo (state, action) {
    return produce(state, state => {
      state.post = action.val.post
      state.comments = action.val.comments
    })
  },

  addComments (state, action) {
    return produce(state, state => {
      state.comments.push(action.val)
    })
  },
  deleteComment (state, action) {
    return produce(state,  state => {
      var index = state.comments.findIndex(it => it.id === action.val)
      if (index >= 0) {
        state.comments.splice(index, 1)
      }
    })
  }
}


export default (state = defaultState, action) => {
  if (mutations[action.type]) {
    return mutations[action.type](state, action)
  }
  return state
}

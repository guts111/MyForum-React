import produce from "immer"

const defaultState = {
  user: {},
  posts:[],
  comments: [],
  picked: true
}



const mutations = {
  getUserInfo (state, action) {
    return produce(state, state => {
      state.user = action.val.user
      state.posts = action.val.posts
      state.comments = action.val.comments
    })
  },
  changePick (state, action) {
    return produce(state, state => {
      state.picked = !state.picked
    })
  },
  deleteComment (state, action) {
    return produce(state, state => {
      var index = state.comments.findIndex(it => it.id === action.val)
      if (index >= 0) {
        state.comments.splice(index, 1)
      }
    })
  },
  deletePost (state, action) {
    return produce(state, state => {
      var index = state.posts.findIndex(it => it.id === action.val)
      if (index >= 0) {
        state.comments = state.comments.filter(it => it.pid !== action.val)
        state.posts.splice(index, 1)
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

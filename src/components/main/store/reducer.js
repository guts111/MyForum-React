import produce from "immer"

const defaultState = {
  posts: [],
  uid: null,
  uname: null,
  cate: '全部',
  selectedList: [],
  forward: false,
  order: '0'
}



const mutations = {
  getMainInfo (state, action) {
    var list = action.posts.sort((it, wt) => {
      if (it.updatedAt < wt.updatedAt) {
        return 1
      } else if (it.updatedAt > wt.updatedAt) {
        return -1
      } else {
        return 0
      }
    })
    return produce(state,  draftState => {
      draftState.uname = action.uname
      draftState.uid = action.uid
      draftState.posts = list
      draftState.selectedList = list.slice()
    })
  },

  changeCate (state, action) {
    return produce(state,  draftState => {
      draftState.cate = action.val
      draftState.selectedList = draftState.posts.filter(it => draftState.cate === '全部' || it.cate === action.val)
      draftState.forward = false
      draftState.order = 0
    })
  },

  changeForward (state, action) {
    return produce(state,  draftState => {
      draftState.forward = !draftState.forward
      draftState.selectedList = draftState.selectedList.reverse()

    })
  },

  changeOrder (state, action) {
    return produce(state,  draftState => {
      draftState.order = action.val
      if (draftState.order === '0') {
        draftState.selectedList = draftState.selectedList.sort((it, wt) => {
          if (it.updatedAt < wt.updatedAt) {
            return 1
          } else if (it.updatedAt > wt.updatedAt) {
            return -1
          } else {
            return 0
          }
        })
      } else if (draftState.order === '1') {
        draftState.selectedList = draftState.selectedList.sort((it, wt) => {
          if (it.createdAt < wt.createdAt) {
            return 1
          } else if (it.createdAt > wt.createdAt) {
            return -1
          } else {
            return 0
          }
        })
      } else if (draftState.order === '2') {
        draftState.selectedList = draftState.selectedList.sort((it, wt) => wt.applyC - it.applyC)
      }
      if (draftState.forward) {
        draftState.selectedList = draftState.selectedList.reverse()
      }
    })
  },
  addPost (state, action) {
    return produce(state,  state => {
      state.selectedList.unshift(action.val)
    })
  },
  addComments (state, action) {
    return produce(state,  state => {
      var index = state.selectedList.findIndex(it => it.id === action.pid)
      if (index >= 0) {
        state.selectedList[index].applyC++
        state.selectedList[index].updatedAt = action.val.updatedAt
        var obj = state.selectedList.splice(index ,1)
        state.selectedList.unshift(obj[0])
        //应该重新排序没做
      }
    })
  },

  deletePost (state, action) {
    return produce(state,  state => {
      var index = state.selectedList.findIndex(it => it.id === action.val)
      if (index >= 0) {
        state.selectedList.splice(index, 1)
      }
    })
  },
  resetPosts (state, action) {
    return produce(state, state => {
      state.selectedList = []
    })
  }
}


export default (state = defaultState, action) => {
  if (mutations[action.type]) {
    return mutations[action.type](state, action)
  }
  return state
}

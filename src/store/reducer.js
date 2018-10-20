import produce from "immer"
import { combineReducers } from 'redux'
import { reducer as main } from '../components/main/store'
import { reducer as post } from '../components/post/store'
import { reducer as user } from '../components/user/store'

const defaultState = {
  uname: null,
  uid: null,
  sideBar: false,
  blurStyle: {},
  L: true,
  LR: false,
  cover: false,
  info: '',
  needRecaptcha: false,
  base64: '',
  waitFor: '',
  Top: false,
  loading: true
}


const mutations = {
  setLoading (state, action) {
    return produce(state, (state) => {
      state.loading = action.val
    })
  },

  changeTop (state, action) {
    return produce(state, (state) => {
      state.Top = action.val
    })
  },
  setWaitFor (state, action) {
    return produce(state, (state) => {
      state.waitFor = action.val
    })
  },
  showSide (state, action) {
    return produce(state, (state) => {
      state.sideBar = true
      state.cover = true
      state.blurStyle = {transform: 'translateX(15rem)', filter: 'blur(3px)'}
    })
  },
  hideSide (state, action) {
    return produce(state, (state) => {
      if (state.LR) {
        state.LR = false
      } else {
        state.sideBar = false
      }
      state.cover = false
      state.blurStyle = {}
    })
  },
  showLR (state, action) {
    return produce(state,  state => {
      state.blurStyle = {filter: 'blur(3px)'}
      state.L = action.val
      state.LR = true
      state.cover = true
    })
  },

  changeL (state, action) {
    return produce(state,  state => {
      state.L = !state.L
    })
  },

  sendInfo (state, action) {
    return produce(state,  state => {
      state.info = action.val
      state.waitFor = ''
    })
  },

  hideInfo (state, action) {
    return produce(state,  state => {
      state.info = ''
    })
  },

  setUnameID (state, action) {
    return produce(state,  state => {
      if (action.val == null) {
        localStorage.uname = ''
        localStorage.uid = ''
        state.uname = null
        state.uid = null
        document.cookie = 'uid=;Expires=' + new Date() +';path=/'
      } else {
        if (action.val.uname == null) {
          return state
        }
        localStorage.uname = action.val.uname
        localStorage.uid = action.val.uid
        state.uname = action.val.uname
        state.uid =  action.val.uid
      }
    })
  },

  changeNeedRecaptcha (state, action) {
    return produce(state,  state => {
      state.needRecaptcha = !state.needRecaptcha
    })
  },
  reload (state, action) {
    return produce(state,  state => {
      state.base64 = action.val
    })
  }


}




const store = (state = defaultState, action) => {
  if (mutations[action.type]) {
    return mutations[action.type](state, action)
  }
  return state
}

export default combineReducers({
  store,
  main,
  post,
  user
})

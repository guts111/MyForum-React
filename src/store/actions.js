import axios from 'axios'

export const showSide = () => ({
  type: 'showSide'
})

export const hideSide = () => ({
  type: 'hideSide'
})

export const changeL = () => ({
  type: 'changeL'
})

export const showLR = (val) =>({
  type: 'showLR',
  val
})

export const sendInfo = (val) => ({
  type: 'sendInfo',
  val
})

export const hideInfo = () => ({
  type: 'hideInfo',
})

export const setUnameID = (val) =>({
  type: 'setUnameID',
  val
})

export const changeNeedRecaptcha = () => ({
  type: 'changeNeedRecaptcha',
})

export const reload = () => {
  return function (dispatch) {
    axios.get('/recaptcha').then(val => {
      dispatch({type:'reload', val: val.data})
    })
  }
}

export const setWaitFor = (val) => ({
  type: 'setWaitFor',
  val
})

export const changeTop = (val) => ({
  type: 'changeTop',
  val
})
export const setLoading = (val) => ({
  type: 'setLoading',
  val
})

export const deletePost = (val) => ({
  type: 'deletePost',
  val
})

export const deleteComment = (val) => ({
  type: 'deleteComment',
  val
})

export const resetPosts = () => ({
  type: 'resetPosts'
})

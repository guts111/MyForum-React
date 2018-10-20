import axios from 'axios'
import { setUnameID, setLoading } from '../../../store/actions';

const dispatchMainInfo = (posts, uname, uid) => ({
  type: 'getMainInfo',
  posts,
  uname,
  uid
})

export const getMainInfo = () => {
  return (dispatch) => {
    axios.get('/api/home.json').then(val => {
      val = JSON.parse(val.data)
      dispatch(dispatchMainInfo(val.posts, val.uname, val.uid))
      dispatch(setUnameID({uid: val.uid, uname: val.uname}))
      dispatch(setLoading(false))
    },err =>{

    })
  }

}

export const changeCate = (val) => ({
  type: 'changeCate',
  val
})

export const changeForward = () => ({
  type: 'changeForward',
})

export const changeOrder = (val) => ({
  type: 'changeOrder',
  val
})

export const showLR = (val) =>({
  type: 'showLR',
  val
})

export const addPost = (val) => ({
  type: 'addPost',
  val
})


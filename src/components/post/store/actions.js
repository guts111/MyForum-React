import axios from 'axios'
import { setUnameID, setLoading } from '../../../store/actions'

const getPostINfoA = (val) => ({
  type: 'getPostINfo',
  val
})

export const getPostINfo = (id) => {
  return (dispatch) => {
    axios.get('/api/post.json?id='+ id).then( val => {
      val = JSON.parse(val.data)
      dispatch(getPostINfoA(val))
      dispatch(setUnameID({uid: val.uid, uname: val.uname}))
      dispatch(setLoading(false))
    }
    ).catch()
  }
}

export const addComments = (val,pid) => ({
  type: 'addComments',
  val,
  pid
})

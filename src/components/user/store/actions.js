import axios from 'axios'
import { setUnameID, setLoading } from '../../../store/actions'

const getUserInfoA = (val) => ({
  type: 'getUserInfo',
  val
})

export const getUserInfo = (id) => {
  return (dispatch) => {
    axios.get('/api/user.json?id='+ id).then(val => {
      val = JSON.parse(val.data)
      dispatch(getUserInfoA(val))
      dispatch(setUnameID({uid: val.uid, uname: val.uname}))
      dispatch(setLoading(false))
    })

  }
}

export const changePick = () => ({
    type: 'changePick'
})



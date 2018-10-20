import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../../store'
import { actions as actionsP } from './store'
import axios from 'axios'

const render = (props) => {
  var content
  return (
    <div className="comment-new">
      <div className="form-group post-edit">
        <textarea ref={it => content = it} className="form-control" placeholder="Type here to input content ..."></textarea>
        </div>
      <div className="post-submmit">
        <button className="btn btn-infoo" onClick={()=>props.submmit({content: content , pid: props.pid})}>提交</button>
      </div>

      <style jsx>{`
        .comment-new
          padding .5rem
          .post-submmit
            margin-top -.3rem
            padding-left .5rem
      `}</style>
    </div>
  )
}



const mapState = (state) =>{
  return {

  }
}

const mapDispatch = (dispatch) => {
  return {
    submmit (obj) {
      if (obj.content.value.trim() === '') {
        dispatch(actions.sendInfo('你忘记写内容啦'))
      } else {
        var params = new URLSearchParams()
        params.append('pid', obj.pid)
        params.append('content', obj.content.value.trim())
        dispatch(actions.sendInfo('正在提交不要方'))
        axios.post('/comment', params).then(val => {
          dispatch(actions.sendInfo('发布成功'))
          obj.content.value = ''
          dispatch(actionsP.addComments(JSON.parse(val.data), obj.pid))
          setTimeout(() => dispatch(actions.hideInfo(), 700))
        }, () => {
          dispatch(actions.sendInfo('提交失败,请重试'))
        })
      }
    }

  }
}


export default connect(mapState, mapDispatch)(render)

import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../store'
import axios from 'axios'
import { withRouter } from 'react-router-dom'


const render = (props) => {
  return (
    <div className="info-cover">
      <div className="info-warpper" >
        <div className="header">
          {props.info}
        </div>
        <div className="footer">
          { props.waitFor &&
          <button className="btn btn-secondary confirm" onClick={()=>props.confirmAction(props.info, props.waitFor, props)}>确定</button>}
          <button className="btn btn-light ok" onClick={props.hideInfo}>关闭</button>
        </div>
      </div>
      <div className="cover" onClick={props.hideInfo}></div>
      <style jsx>{`
      .info-cover
        position fixed
        top 0
        right 0
        bottom 0
        left 0
        z-index 30
        .info-warpper
          z-index 30
          position absolute
          bottom 35%
          left 3%
          right 3%
          max-width 500px
          margin 0 auto
          background-color #fff
          border-radius .8rem
          .header
            text-align center
            height 3rem
            line-height 3rem
          .footer
            border-radius 0 0 .5rem .5rem
            background-color #999
            text-align right
            .confirm
              margin-right .3rem
            button
              padding .2rem .7rem
              margin .5rem 1.2rem
        .cover
          position absolute
          top 0
          left 0
          right 0
          bottom 0
          z-index 25
          background-color #0008
      `}</style>

    </div>


  )
}



const mapState = (state) =>{
  return {
    info: state.store.info,
    waitFor: state.store.waitFor
  }
}

const mapDispatch = (dispatch) => {
  return {
    hideInfo () {
      dispatch(actions.hideInfo())
    },
    confirmAction (info, waitFor, props) {
      var params = new URLSearchParams()
       if (info === '\uD83D\uDE1C 其实也能恢复,确认删除?') {
        dispatch(actions.setWaitFor(null))
        dispatch(actions.sendInfo('正在提交,请稍后...'))
        params.append('del', true)
        axios.post('/tosettings', params).then(val => {
          dispatch(actions.sendInfo('删除账户成功'))
          dispatch(actions.setUnameID(null))
          document.cookie = 'uid=;Expires=' + new Date() + ';path=/'
          // 省事直接强制刷新页面了
          dispatch(actions.resetPosts())
          props.history.push('/')
          setTimeout(() => dispatch(actions.hideInfo()), 700)
        }, () => {
          dispatch(actions.sendInfo('删除账户失败'))
        })
      } else if (info === '点击确认会给您发送密钥邮件') {
        var temp = waitFor
        dispatch(actions.setWaitFor(null))
        dispatch(actions.sendInfo('正在发送请求请稍后'))
        axios.get('/forgot/' + temp).then(val => {
          dispatch(actions.hideInfo())
          dispatch(actions.hideInfo())
          dispatch(actions.sendInfo('邮件已发送,请查看邮箱'))
        }, err => {
          if (err.response.data === 'not found') {
            dispatch(actions.sendInfo('账户不存在'))
          } else if (err.response.data === 'not found email') {
            dispatch(actions.sendInfo('邮箱未绑定'))
          }
        })

      } else {
        var id = waitFor
        var flag, withFloor
        if (info === '确认删除此回复?') {
          flag = 'cid'
        } else if (info === '确认删除此主题?') {
          flag = 'pid'
          withFloor = false
        } else if (info === '确认删除此主楼?') {
          flag = 'pid'
          withFloor = true
        }
        console.log(flag, withFloor, props)
        params.append(flag, waitFor)
        dispatch(actions.setWaitFor(null))
        dispatch(actions.sendInfo('正在拼命提交'))
        axios.post('/delete', params).then(val => {
          dispatch(actions.sendInfo('成功删除'))
          if (flag === 'cid') {
            dispatch(actions.deleteComment(id))
          } else if (flag === 'pid') {
            dispatch(actions.deletePost(id))
            if (withFloor) {
              props.history.push("/")
            }
          }
          setTimeout(() => dispatch(actions.hideInfo()), 700)
        }, () => {
          dispatch(actions.sendInfo('删除失败'))
        })
      }

    }
  }
}


export default connect(mapState, mapDispatch)(withRouter(render))

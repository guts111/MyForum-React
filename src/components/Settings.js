import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { actions }from '../store'



const render = (props) => {
  let email, intro, oldPw, password, confirmPw
  return (
    <div className="settings">
      <div className="settings-header"> 设置 </div>
      <div className="settings-body">

        <div className="one">
          <div className="title">
            关于我
          </div>
          <div className="hint">
            <span className="del">介绍一下自己吧</span> <span className="del">内容将显示在你的个人页面</span>
          </div>
          <div className="content">
            <div className="form-group">
              <textarea ref={it=>intro=it} className="form-control" placeholder="About me description" rows="3"></textarea>
            </div>
          </div>
          <div><button className="btn btn-infoo" onClick={()=>props.save(intro)}>保存描述</button></div>
        </div>

        <div className="one-two">
          <div className="title">
            设置邮箱
          </div>
          <div className="hint">
            没绑定过邮箱可以在这里绑定,也可以修改邮箱
          </div>
          <div className="content">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">邮箱</span>
              </div>
              <input ref={it=>email=it} type="text" className="form-control" placeholder="Email" />
            </div>
            <button className="btn btn-infoo" onClick={()=>props.changeEmail(email)}>确认设置</button>
          </div>
        </div>

        <div className="two">
          <div className="title">
            修改密码
          </div>
          <div className="hint">
            为了安全请先输入您当前的密码
          </div>
          <div className="content">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">当前密码</span>
              </div>
              <input ref={it=>oldPw=it} type="password" className="form-control" placeholder="Current password" />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" >新的密码</span>
              </div>
              <input ref={it=>password=it} type="password" className="form-control" placeholder="New password" />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">确认密码</span>
              </div>
              <input ref={it=>confirmPw=it} type="password" className="form-control" placeholder="Confirm password" />
            </div>
            <div><button className="btn btn-infoo" onClick={()=>props.change({oldPw,password,confirmPw})}>确认修改</button></div>
          </div>
        </div>

        <div className="three">
          <div className="title">
            删除账户
          </div>
          <div className="hint">
            <span className="del">请仔细确认,删除账户后不可恢复</span>
            <span className="del">将删除账号所有发过的帖子与回复</span>
          </div>
          <div className="content"><button className="btn btn-danger" onClick={props.dele}>确认删除</button></div>
        </div>
      </div>
      <style jsx>{`
        .settings
          padding .5rem 4% 0
          .settings-header
            text-align center
            font-weight 500
            font-size 1.5rem
            height 3.5rem
            line-height 3.5rem
            margin-bottom .5rem
          .settings-body
            padding 0 1rem
            border 1px solid #ddd
            border-radius .5rem
            background-color #fff
            color #000
            input::-webkit-input-placeholder, textarea::-webkit-input-placeholder
              color #ccc
            .one, .two, .three, .one-two
              padding 1.5rem 0
              border-bottom 1px solid #ddd
            .title
              font-size 1.1rem
              padding-bottom .3rem
            .hint
              font-size .95rem
              color #999
              padding .4rem 0 .6rem
            .content
              margin-bottom 1rem
            .del
              display inline-block
            button
              margin-left .5rem
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
    changeEmail (email) {
      if (email.value.includes(' ')) {
        dispatch(actions.sendInfo('Email不能有空格'))
        return null
      }
      var index = email.value.trim().indexOf('@')
      if (index <= 0 || index === email.value.trim().length - 1) {
        dispatch(actions.sendInfo('Email格式不合法'))
        return null
      }
      var params = new URLSearchParams()
      params.append('email', email.value.trim())
      dispatch(actions.sendInfo('正在拼命提交...请稍后'))
      axios.post('/tosettings', params).then(val => {
        dispatch(actions.sendInfo('绑定成功'))
        email.value = ''
        setTimeout(() => dispatch(actions.hideInfo()), 700)
      }, () => {
        dispatch(actions.sendInfo('绑定失败'))
      })
    },
    save (intro) {
      if (intro.value.trim() === '') {
        dispatch(actions.sendInfo('内容不能为空'))
        return null
      }
      var params = new URLSearchParams()
      params.append('intro', intro.value.trim())
      dispatch(actions.sendInfo('正在拼命提交...请稍后'))
      axios.post('/tosettings', params).then(val => {
        dispatch(actions.sendInfo('修改成功'))
        intro.value = ''
        setTimeout(() => dispatch(actions.hideInfo()), 700)
      }, () => {
        dispatch(actions.sendInfo('修改失败'))
      })
    },
    change (obj) {
      if (obj.oldPw.value === '' || obj.password.value === '' || obj.confirmPw.value === '') {
        dispatch(actions.sendInfo('您还有未填密码项'))
        return null
      } else if (obj.oldPw.value.includes(' ') || obj.password.value.includes(' ') || obj.confirmPw.value.includes(' ')) {
        dispatch(actions.sendInfo('密码不能含有空格'))
        return null
      } else if (obj.confirmPw.value !== obj.password.value) {
        dispatch(actions.sendInfo('新密码和确认密码不一致,请重新输入'))
      } else {
        var params = new URLSearchParams()
        params.append('oldPw', obj.oldPw.value)
        params.append('password', obj.password.value)
        params.append('confirmPw', obj.confirmPw.value)
        dispatch(actions.sendInfo('正在拼命提交...请稍后'))
        axios.post('/tosettings', params).then(val => {
          dispatch(actions.sendInfo('修改成功,下次需要用新密码登录'))
          setTimeout(() => dispatch(actions.hideInfo()), 1000)
        }, () => {
          dispatch(actions.sendInfo('原密码不正确'))
        })
      }
      obj.oldPw.value = ''
      obj.confirmPw.value = ''
      obj.password.value = ''
    },
    dele () {
      dispatch(actions.sendInfo('\uD83D\uDE1C 其实也能恢复,确认删除?'))
      dispatch(actions.setWaitFor(1))
    }
  }
}


export default connect(mapState, mapDispatch)(render)

import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../store'
import axios from 'axios'

let name, password, confirmPw, email, recaptcha


const renderL = (props) => {
  return(
    <div className="login">
      <div className="head">登录您的账户</div>
      <div className="inner">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">账号</span>
          </div>
          <input ref={it => name = it} type="text" className="form-control" placeholder="Username" />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" >密码</span>
          </div>
          <input ref={it => password = it} type="password" className="form-control" placeholder="Password" />
        </div>
        { props.needRecaptcha &&
        <div className="input-group mb-3" v-show="showRecaptcha">
          <div className="input-group-prepend">
            <span className="input-group-text">验证</span>
          </div>
          <input ref={it => recaptcha = it} type="text" className="form-control" placeholder="Recaptcha" />
        </div> }
        <div className="check-forgot">
          <button className="btn btn-light" onClick={props.changeNeedRecaptcha} >
              { props.needRecaptcha ? <span>关闭验证</span> : <span>开启验证</span> }
          </button>
          { props.needRecaptcha &&
          <span className="checkbox"  onClick={props.reload}>
            <img src={'data:image/bmp;base64,'+ props.base64} alt="recaptcha" />
          </span> }
          <button className="forgot btn btn-light" onClick={()=>props.forgot(name)}>忘记密码?</button>
        </div>
      </div>
      <div className="footer">
        <button className="btn btn-infoo" onClick={()=>props.handleLR(true, props.needRecaptcha)}>确认</button>
        <button className="btn btn-light" onClick={props.changeL}>注册您的账户</button>
      </div>

      <style jsx>{`
        .head
          font-size 1.3rem
          font-weight 600
          line-height 1.5rem
          border-bottom 1px solid #ccc
          padding-bottom .5rem
        .inner
          padding 2rem 5% 1.5rem
          border-bottom 1px solid #ccc
          .email
            margin-bottom .3rem !important
          .check-forgot
            vertical-align middle
            img
              margin-left .4rem
            .forgot
              float right
        .footer
          padding 1rem 5% .5rem 5%
          button
            margin-right .6rem

      `}</style>
    </div>
  )

}



const renderR = (props) => {
  return (
    <div className="reg">
      <div className="head">创建新的账户</div>
      <div className="inner">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">账号</span>
          </div>
          <input ref={it => name = it} type="text" className="form-control" placeholder="Username" />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" >密码</span>
          </div>
          <input ref={it => password = it}  type="password" className="form-control" placeholder="Password" />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">密码</span>
          </div>
          <input ref={it => confirmPw = it}  type="password" className="form-control" placeholder="Confirm password" />
        </div>
        <div className="input-group mb-3 email">
          <div className="input-group-prepend">
            <span className="input-group-text">邮箱</span>
          </div>
          <input ref={it => email = it}  type="text" className="form-control" placeholder="可不填写 则无法找回密码" />
        </div>
      </div>
      <div className="footer">
        <button className="btn btn-infoo"  onClick={()=>props.handleLR(false)}>确认</button>
        <button className="btn btn-light" onClick={props.changeL}>登录您的账户</button>
      </div>
      <style jsx>{`
        .head
          font-size 1.3rem
          font-weight 600
          line-height 1.5rem
          border-bottom 1px solid #ccc
          padding-bottom .5rem
        .inner
          padding 2rem 5% 1.5rem
          border-bottom 1px solid #ccc
          .email
            margin-bottom .3rem !important
        .footer
          padding 1rem 5% .5rem 5%
          button
            margin-right .6rem
      `}</style>
    </div>
  )
}



const render = (props) => {
  return (
    <div className="main-login">
      { props.L ? renderL(props) : renderR(props) }
      <style jsx>{`
        .main-login
          position fixed
          z-index 22
          bottom 24%
          left 7%
          right 7%
          max-width 600px
          margin 0 auto
          background-color #fff
          border-radius .5rem
          padding 1rem
          box-shadow 0px 2px 20px #0003
      `}</style>
    </div>
  )
}



const mapState = (state) =>{
  return {
    L: state.store.L,
    needRecaptcha: state.store.needRecaptcha,
    base64: state.store.base64
  }
}

const mapDispatch = (dispatch) => {
  return {
    forgot (name) {
      if (name.value.trim() === '') {
        dispatch(actions.sendInfo('请在账号区填写你要找回的账号'))
      } else {
        dispatch(actions.sendInfo('点击确认会给您发送密钥邮件'))
        dispatch(actions.setWaitFor(name.value))
      }

    },
    changeNeedRecaptcha(){
      dispatch(actions.changeNeedRecaptcha())
    },
    reload () {
      dispatch(actions.reload())
    },
    changeL () {
      dispatch(actions.changeL())
    },
    checkEmail () {
      var e = email.value.trim()
      if (e === '') return true
      var index = e.indexOf('@')
      return index > 0 && index < e.length - 1
    },
    handleLR (L, needRecaptcha) {
      if (password.value.includes(' ') || (confirmPw && confirmPw.value.includes(' ')) || name.value.includes(' ')) {
        dispatch(actions.sendInfo('账号密码不能含有空格'))
      } else if (password.value === '' || name.value === '') {
        dispatch(actions.sendInfo('还有未填项'))
      } else if (password.value.length > 20) {
        dispatch(actions.sendInfo('密码设置过长'))
      } else if (name.value.length > 10) {
        dispatch(actions.sendInfo('用户名设置过长'))
      } else if (!L && password.value !== confirmPw.value) {
        dispatch(actions.sendInfo('二次密码输入不一致'))
      } else if (!L && !this.checkEmail()) {
        dispatch(actions.sendInfo('Email格式不正确'))
      } else {
        var params = new URLSearchParams()
        params.append('name', name && name.value)
        params.append('password', password && password.value)
        params.append('email', email && email.value)
        dispatch(actions.sendInfo(L ? '正在登录...请稍后' : '正在注册...请稍后'))
        if (L) {
            params.append('needRecaptcha', needRecaptcha)
            params.append('recaptcha', recaptcha && recaptcha.value.toUpperCase())
          axios.post('/login', params)
            .then((val) => {
              dispatch(actions.hideSide())
              dispatch(actions.sendInfo('登录成功'))
              dispatch(actions.setUnameID({uname: val.data.uname, uid: val.data.uid}))
              dispatch(actions.reload())
              setTimeout(() => dispatch(actions.hideInfo()), 700)
            }, err =>{
                if (err.response.data === 'errorRecaptcha') {
                  dispatch(actions.reload())
                  dispatch(actions.sendInfo('验证码不正确'))
                } else {
                  dispatch(actions.reload())
                  dispatch(actions.sendInfo('登录失败,用户名或密码不正确或账户已注销'))
                }
            })
        } else {
          axios.post('/reg', params).then((val) => {
            dispatch(actions.hideSide())
            dispatch(actions.sendInfo('注册成功'))
            dispatch(actions.setUnameID({uname: val.data.uname,uid: val.data.uid}))
            dispatch(actions.reload())
            setTimeout(() => dispatch(actions.hideInfo()), 700)
            },err => dispatch(actions.sendInfo('注册失败,用户名已存在')))
        }
      }
    },

  }
}

export default connect(mapState, mapDispatch)(render)

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { actions } from '../store'

const render = (props) => {
  return (
    <div>
      <div className="site-bar">
        { !props.uname ?
        <div>
          <div className="site-btn-wrapper">
            <button type="button" className="btn btn-infoo" onClick={()=>props.showLR(true)}>登录</button>
          </div>
          <div className="site-btn-wrapper">
            <button type="button" className="btn btn-light" onClick={()=>props.showLR(false)}>注册</button>
          </div>
        </div>
        :
        <div>
          <div className="site-btn-wrapper">
            <Link to="/settings">
              <button onClick={props.hideSide} type="button" className="btn btn-infoo">设置</button>
            </Link>
          </div>
          <div className="site-btn-wrapper">
            <button type="button" className="btn btn-light" onClick={props.setUnameID}>退出</button>
          </div>
        </div>
        }
        <div className="site-btn-wrapper">
          <Link to="/post/13">
            <button type="button" className="btn btn-light" onClick={props.hideSide}>关于</button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .site-bar
          position fixed
          top 0
          bottom 0
          left 0
          width 15rem
          background-color #fff
          padding-top 2rem
          box-shadow 0px 2px 20px #0003
          .site-btn-wrapper
            height 4.5rem
            line-height 4.5rem
            text-align center
            button
              font-size 1.2rem
              padding 0.5rem 3rem
            .btn-infoo
              color #fff
              background-color #02b3e4
      `}</style>
    </div>
  )
}



const mapState = (state) =>{
  return {
    uname: state.store.uname
  }
}

const mapDispatch = (dispatch) => {
  return {
    showLR (val) {
      dispatch(actions.showLR(val))
    },
    setUnameID () {
      dispatch(actions.setUnameID())
      dispatch(actions.hideSide())
    },
    hideSide () {
      dispatch(actions.hideSide())
    }
  }
}


export default connect(mapState, mapDispatch)(render)

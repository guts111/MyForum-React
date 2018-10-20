import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { actions } from '../store'


const render = (props) => {
  return (
    <div className="site-header">
      <span className="site-button" onClick={props.showSide}>
        三
      </span>
      <Link to='/'>
        <span className="site-title">My Forum</span>
      </Link>
      { props.uid &&
      <div className="btn-wrapper" v-show="uname">
        <Link  to={'/user/' + props.uid}>
          <span>欢迎</span><span>{props.uname}</span>
        </Link>
        <button className="btn btn-light" onClick={props.setUnameID}>退出</button>
      </div> }
      <style jsx>{`
        .site-header
          position fixed
          top 0
          right 0
          left 0
          z-index 5
          background-color #fff
          box-shadow 0 3px 15px 0px #0001
          vertical-align middle
          color #02b3e4
          .site-button
            height 4rem
            line-height 4rem
            display inline-block
            padding 0 1rem
            text-align center
            font-weight 800
            font-size 1.2rem
          .site-title
            font-size 1.4rem
            margin-left 1.5%
            height 3rem
            line-height 3rem
          .btn-wrapper
            float right
            height 4rem
            line-height 4rem
            vertical-align center
            margin-right: 2%
            span
              color #555
              padding-right: .3rem
      `}</style>
    </div>
  )
}


const mapState = (state) =>{
  return {
    uid: state.store.uid,
    uname: state.store.uname
  }
}

const mapDispatch = (dispatch) => {
  return {
    showSide() {
      dispatch(actions.showSide())
    },
    setUnameID () {
      dispatch(actions.setUnameID())
    }
  }
}


export default connect(mapState, mapDispatch)(render)

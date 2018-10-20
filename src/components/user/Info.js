import React from 'react'
import { connect } from 'react-redux'



const render = (props) => {
  return (
    <div>
      <div className="user-title">用户信息</div>
      <div className="user-info">
        <div className="img-wrapper">
          <div className="img-border">
            <img src={'/static/72/p'+ (97 * props.user.id % 61 + 1) +'.png'} alt="pic" />
          </div>
        </div>
        <div className="info">
          <div className="user">{props.user.name}</div>
          <div className="time">注册时间 : {new Date(props.user.createdAt).toLocaleString()}</div>
          <div className="content">{props.user.sign == null ? '还没有设置签名': props.user.sign }</div>
        </div>
      </div>
      <style jsx>{`
        .user-title
          text-align center
          font-weight 500
          font-size 1.5rem
          height 3.5rem
          line-height 3.5rem
          margin-bottom .5rem
          color #444
        .user-info
          background-color #fff
          border 1px solid #ddd
          box-shadow 0 3px 10px 0px #0001
          border-radius .5rem
          padding .5rem
          transition  .3s
          display flex
          margin-bottom 1.5rem
          .img-wrapper
            width 4rem
            height 4rem
            padding .6rem .3rem 0rem .3rem
            overflow hidden
            .img-border
              border-radius .5rem
              overflow hidden
              img
                width 100%
          .info
            padding .5rem .5rem .5rem 1.5rem
            .user
              font-size: 1.25rem
              font-weight 700
              color #666
            .time
              color #777
              font-size: 1.1rem
            .content
              margin-top .5rem
              color #777
              font-size: 0.95rem
      `}</style>
    </div>
  )
}



const mapState = (state) =>{
  return {
    user: state.user.user
  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}


export default connect(mapState, mapDispatch)(render)

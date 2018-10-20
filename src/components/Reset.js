import React from 'react'
import { connect } from 'react-redux'



const render = () => {
  return (
    <div className="change-wrapper">
      <div className="body">
        <div className="header">重置密码</div>
        <div className="content">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" >新的密码</span>
            </div>
            <input type="password" className="form-control" placeholder="New password" v-model="password" />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">确认密码</span>
            </div>
            <input type="password" className="form-control" placeholder="Confirm password" v-model="confirmPw" />
          </div>
        </div>
        <div className="footer"><button className="btn btn-success" onClick="confirm">确认重置</button></div>
      </div>
      <style jsx>{`
        .change-wrapper
          padding 2rem 4% 0
          .header
            text-align center
            font-weight 500
            font-size 1.5rem
            height 3.5rem
            line-height 3.5rem
            margin-bottom .5rem
          .body
            padding 0 1rem
            border 1px solid #ddd
            border-radius .5rem
            background-color #fff
            color #000
            input::-webkit-input-placeholder, textarea::-webkit-input-placeholder
              color #ccc
            .header
              font-size 1.1rem
              padding-bottom .3rem
            .content
              padding 2rem 1rem 1rem
              border-top 1px solid #ccc
              border-bottom 1px solid #ccc
            .footer
              padding 1rem
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

  }
}


export default connect(mapState, mapDispatch)(render)

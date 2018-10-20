import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../../store'



const render = (props) => {
  return (
    <div className="post-sbuject">
      <h4>{props.subject.title}</h4>
      { !props.uname
      ? <button className="post-action btn btn-light" onClick={()=>props.showLR(true)}>登录回帖</button>
      : <button className="post-action btn btn-light" onClick={props.goBottom}>回复帖子</button>}
      <style jsx>{`
        .post-sbuject
          padding .8rem
          h4
            line-height 2.5rem
          .post-action
            border 1px solid #ddd
            margin-left 1rem
            padding .5rem
            color #777
      `}</style>
    </div>
  )
}



const mapState = (state) =>{
  return {
    subject: state.post.post,
    uname: state.store.uname
  }
}

const mapDispatch = (dispatch) => {
  return {
    showLR (val) {
      dispatch(actions.showLR(val))
    },
    goBottom () {
      var start = document.documentElement.scrollTop || document.body.scrollTop
      var height = document.documentElement.offsetHeight || document.body.Height
      var inner = document.documentElement.clientHeight
      var distance = height - start - inner
      var step = distance / 100
      var sum = 0
      ;(function jump () {
        if (distance > 0) {
          distance -= step
          sum += step
          // document.documentElement.scrollTop = sum + start
          // document.body.scrollTop = sum + start
          window.scrollTo(0, sum + start)
          setTimeout(jump, 5)
        }
      })()
    }
  }
}


export default connect(mapState, mapDispatch)(render)

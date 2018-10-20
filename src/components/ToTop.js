import React from 'react'
import { connect } from 'react-redux'



const render = (props) => {
  return (
    <div className="top" onClick={props.toTop}>
      <style jsx>{`
        .top
          position fixed
          z-index 2
          width 1.5rem
          height 2.5rem
          bottom 4rem
          right .6rem
          background url('/static/totop.png') center center no-repeat

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
    toTop () {
      var distance = document.documentElement.scrollTop || document.body.scrollTop
      var step = distance / 100
      ;(function jump () {
        if (distance > 0) {
          distance -= step
          // document.documentElement.scrollTop = distance
          // document.body.scrollTop = distance
          window.scrollTo(0, distance)
          setTimeout(jump, 5)
        }
      })()
    }
  }
}


export default connect(mapState, mapDispatch)(render)

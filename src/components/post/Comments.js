import React from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'



const render = (props) => {
  return (
    <ul>
      <Comment  comment={props.subject}  floor={1}></Comment>
      { props.comments.map((it,i) =>
        <Comment  comment={it}  floor={i+2} key={it.id}></Comment>
      )}
      <style jsx>{`

      `}</style>
    </ul>
  )
}



const mapState = (state) =>{
  return {
    subject: state.post.post,
    comments: state.post.comments
  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}


export default connect(mapState, mapDispatch)(render)

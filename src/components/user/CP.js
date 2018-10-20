import React from 'react'
import { connect } from 'react-redux'
import Posts from '../main/PostList'
import Comment from '../post/Comment'
import { actions } from './store'

const render = (props) => {
  return (
    <div className="main">
      <div className="header">
        <input type="radio" name="pc" id="post" value={true} onChange={props.changePick} checked={props.picked} />
        <input type="radio" name="pc" id="comment" value={false}  onChange={props.changePick} checked={!props.picked}  />
        <label htmlFor="post">主题</label>
        <label htmlFor="comment">回复</label>
      </div>
      <div className="platform">
        {props.posts.length === 0
          ? props.picked &&  <div className="no-subject">该用户未发表过主题</div>
          : props.picked && <Posts list={props.posts}></Posts>}
        {props.comments.length === 0
          ? !props.picked &&  <div className="no-subject">该用户未发表过回复</div>
          : !props.picked && <ul className="comments">
          {props.comments.map(it =><Comment comment={it} key={it.id}></Comment>)}
        </ul>}
      </div>

      <style jsx>{`
        .no-subject
          color: #ddd
          font-size 2rem
          padding-top 5rem
          text-align center
        .header
          input
            display none
            &:checked + * + label
              color #666
            &:checked + * + label:after
              content ""
              margin-top .3rem
              display block
              background-color #bbb
              width 100%
              height 2px
          label
            font-size 1.4rem
            padding-right 1rem
            transition .3s
            color #ccc
            &:hover
              color #000 !important
            &:after
              content ""
              background-color #fff0
              transition .4s
      `}</style>
    </div>
  )
}



const mapState = (state) =>{
  return {
    posts: state.user.posts,
    comments: state.user.comments,
    picked: state.user.picked
  }
}

const mapDispatch = (dispatch) => {
  return {
    changePick () {
      dispatch(actions.changePick())
    }
  }
}


export default connect(mapState, mapDispatch)(render)

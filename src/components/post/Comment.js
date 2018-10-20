import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { actions } from '../../store'

const render = (props) => {
  const content = () => {
    if (props.comment.content) {
      return props.comment.content.split('\n')
    } else {
      return []
    }
  }
  return (
    <Link to={'/post/' + (props.comment.pid || props.comment.id) }>
      <li className="comment">
        <div className="img-info">
          <Link to={'/user/' + props.comment.uid}>
            <div tag="div" className="img-wrapper">
              <div className="img-border">
                <img src={'/static/72/p'+ (97 * props.comment.uid % 61 + 1) +'.png'} alt="pic"/>
              </div>
            </div>
          </Link>
          <div className="info">
            <div className="user">{props.comment.uname}</div>
            <div className="time">{new Date(props.comment.createdAt).toLocaleString()}</div>
          </div>
        </div>
        <div className="content">
          {content().map((it,i) => <div key={i}>{it}</div>)}
        </div>
        <div className="footer">
          <span className="share"  onClick={(e) => props.share(props.comment.pid || props.comment.id, e)}>share</span>
          {(props.uname === props.comment.uname || props.uname === '云生') &&
          <span className="dele"  onClick={(e)=>props.confirmDeleC(props.comment, e)}>delete</span>}
        </div>
        <div className="floor">{props.floor}</div>

        <style jsx>{`
          .comment
            padding .8rem
            border-top 1px solid #ddd
            border-bottom 1px solid #ddd
            box-shadow 0 1px 1px 0px #0001
            transition .3s
            position relative
            background-color #fff
            &:hover
              transform translateY(-1px)
              box-shadow 0 2px 10px 2px #0002
            .img-info
              display flex
              .img-wrapper
                width 4rem
                height 4rem
                padding .5rem
                .img-border
                  border-radius .5rem
                  overflow hidden
                  img
                    width 100%
              .info
                padding .5rem
                .user
                  font-weight 700
                  color #666
                .time
                  padding-top .2rem
                  color #555
                  font-size .9rem
          .content
            color #555
            padding 0 .5rem
          .footer
            color #999
            padding-top .5rem
            &:after
              content ''
              height 0
              display block
              clear both
            .share, .dele
              padding-right 3%
              float right
          .floor
            position absolute
            right .8rem
            top .5rem
            color #777
        `}</style>
      </li>
    </Link>
  )
}



const mapState = (state) =>{
  return {
    uname: state.store.uname
  }
}

const mapDispatch = (dispatch) => {
  return {
    share (val, e) {
      e.preventDefault()
      dispatch(actions.sendInfo('https://vps.hnh.me:888/post/'+ val))
    },
    confirmDeleC (val, e) {
      e.preventDefault()
      if (val.pid) {
        dispatch(actions.sendInfo('确认删除此回复?'))
        dispatch(actions.setWaitFor(val.id))
      } else {
        dispatch(actions.sendInfo('确认删除此主楼?'))
        dispatch(actions.setWaitFor(val.id))
      }
    }
  }
}


export default connect(mapState, mapDispatch)(render)

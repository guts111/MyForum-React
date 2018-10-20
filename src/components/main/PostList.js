import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { actions } from '../../store'


const render = (props) => {
  return (
    <ul className="post">
      {props.list.map(it =>
      <Link to={'/post/' + it.id} key={it.id}>
      <li className="post-item">
        <span className="apply">{it.applyC}</span>
        <div className="first-line">
          <div className="first-left">
            <Link to={'/user/' + it.uid}>
              <div className="img-border">
                <img src={'/static/72/p'+ (97 * it.uid % 61 + 1) +'.png'} alt="img"/>
              </div>
            </Link>
          </div>
          <div className="first-right">
            <div className="first-right-title">{it.title}</div>
            <div className="cate-time-wrapper">
              <div className="first-right-cate">
                <i>category</i>
                {" " + it.cate}
              </div>
              <div className="first-right-time">
                {props.order === '1'
                  ? <span className="post-time"><i>Created</i> {new Date(it.createdAt).toLocaleDateString()}</span>
                  : <span className="post-time"><i>Updated</i> {new Date(it.updatedAt).toLocaleDateString()}</span>}
              </div>
            </div>
          </div>
        </div>
        <div className="content">{it.content}</div>
        <div className="footer">
          <Link to={'/user/' + it.uid}>
            <span className="post-user">By {it.uname}</span>
          </Link>
          { (props.uname === it.uname || props.uname === '云生') &&
            <span className="dele" onClick={(e)=>props.confirmDele(it.id, e)}>delete</span>}
        </div>
      </li>
      </Link>
      )}
      <style jsx>{`
        .post
          .post-item
            background-color #fff
            border 1px solid #ddd
            box-shadow 0 1px 1px 0px #0001
            border-radius .5rem
            padding 1.5rem .5rem .5rem
            margin-bottom .8rem
            transition  .3s
            position relative
            &:hover
              transform translateY(-1px)
              box-shadow 0 2px 10px 2px #0002
            .apply
              position absolute
              right .8rem
              top .5rem
              color #777
            .first-line
              display flex
              font-size .95rem
              .first-left
                width 4rem
                height 4rem
                padding .2rem .6rem .3rem .2rem
                .img-border
                  border-radius .5rem
                  overflow hidden
                  img
                    width 100%
              .first-right
                flex-grow 1
                padding-left .2rem
                .first-right-title
                  font-size 20px
                  font-weight 400
                  margin-top .3rem
                  overflow: hidden
                  white-space: nowrap
                  text-overflow: ellipsis
                .cate-time-wrapper
                  display flex
                  .first-right-cate
                    i
                      color #ccc
                  .first-right-time
                    margin-left 3%
                    flex-grow 1
                    .post-user
                      i
                        color: #ccc
                    .post-time
                      margin-left: 3%
                      i
                        color: #ccc
            .content
              padding 0 1rem
              overflow: hidden
              white-space: nowrap
              text-overflow: ellipsis
            .footer
              color #999
              padding 0 0 .5rem 0
              &:after
                content ''
                height 0
                display block
                clear both
              .dele , .post-user
                padding-right 3%
                float right
                i
                  margin-right .2rem
              .post-user
                font-size .9rem
                margin-top .1rem
      `}</style>
    </ul>
  )
}



const mapState = (state) =>{

  return {
    order: state.main.order,
    uname: state.store.uname
  }
}

const mapDispatch = (dispatch) => {
  return {
    confirmDele (val, e) {
      e.preventDefault()
      dispatch(actions.sendInfo('确认删除此主题?'))
      dispatch(actions.setWaitFor(val))
    }
  }
}


export default connect(mapState, mapDispatch)(render)

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const render = (props) => {
  return (
    <div className="recommend">
      <div className="recommend-head">查看更多本板块主题</div>
      <div className="title">
        <span className="left">标题</span>
        <span>创建日期</span>
      </div>
      { props.list.slice(0,4).map( it =>
        <Link to={'/post/' + it.id} key={it.id}>
          <div className="item"  >
            <span className="left">{it.title}</span>
            <span>{new Date(it.createdAt).toLocaleDateString()}</span>
          </div>
        </Link>
      )}

      <style jsx>{`
        .recommend
          padding 1.2rem 1.5rem 2.5rem
          margin-top 1.5rem
          border-top 1px solid #ddd
          background-color #fff
          .recommend-head
            text-align center
            font-size 1.2rem
            font-weight 500
            margin-bottom 1rem
          .title, .item
            display flex
            padding .7rem 0
            border-bottom 1px solid #ddd
            span
              padding 0 .4rem
            .left
              flex-grow 1
              overflow: hidden
              white-space: nowrap
              text-overflow: ellipsis
          .title
            border-bottom 2px solid #ddd
            font-size 1.05rem
            font-weight 500

      `}</style>
    </div>
  )
}



const mapState = (state) =>{
  return {
    list: state.main.selectedList
  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}


export default connect(mapState, mapDispatch)(render)

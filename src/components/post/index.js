import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from './store'
import Subject from './Subject'
import Comments from './Comments'
import Reply from './Reply'
import Recommend from './Recommend'
import { actions as actionsS } from '../../store'

class Post extends Component{
  componentDidMount () {
    this.props.getPostINfo(this.props.match.params.id)
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.location.pathname != this.props.location.pathname) {
  //     this.props.getPostINfo(this.props.match.params.id)
  //   }
  // }

   render () {
    return (
      <div v-show="!loading">
        <Subject></Subject>
        <Comments></Comments>
        { this.props.uname &&
        <Reply pid={this.props.pid}></Reply>}
        <Recommend></Recommend>
        <style jsx>{`

        `}</style>
      </div>
    )
  }
}


const mapState = (state) =>{
  return {
    uname: state.store.uname,
    pid: state.post.post.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    getPostINfo (id) {
      dispatch(actions.getPostINfo(id))
      dispatch(actionsS.setLoading(true))
    }
  }
}


export default connect(mapState, mapDispatch)((props)=><Post {...props} key={props.location.pathname} />)

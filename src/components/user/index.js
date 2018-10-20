import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { actions } from './store'
import Info from './Info'
import CP from './CP'
import { actions as actionsS } from '../../store'

class User extends Component {
  render () {
    return (
      <div className="user" v-show="!loading">
        <Info></Info>
        <CP posts="Uposts" comments="Ucomments"></CP>
        <style jsx>{`
          .user
            padding 1rem 4%
        `}</style>
      </div>
    )
  }
  componentWillMount () {
    this.props.getUserInfo(this.props.match.params.id)
  }
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.location.pathname != this.props.location.pathname) {
  //     this.props.getUserInfo(this.props.match.params.id)
  //   }
  // }
}


const mapState = (state) =>{
  return {

  }
}

const mapDispatch = (dispatch) => {
  return {
    getUserInfo (id) {
      dispatch(actions.getUserInfo(id))
      dispatch(actionsS.setLoading(true))
    }
  }
}


export default connect(mapState, mapDispatch)((props)=><User {...props} key={props.location.pathname} />)

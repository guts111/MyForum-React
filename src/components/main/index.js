import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { actions }from './store'
import PostList from './PostList'
import { actions as actionsS }from '../../store'

class Main extends Component {
  componentDidMount () {
    if (this.props.list.length === 0) {
      this.props.getMainInfo()
    }
  }
  render = () => {
    return (
      <div>
        <div className="home" v-show="!loading">
          <div className="home-header">
            <div className="category">
              <select className="form-control form-control-sm select" onChange={this.props.changeCate} value={this.props.cate}>
                <option value="全部">全部</option>
                <option value="灌水">灌水</option>
                <option value="Bugs">Bugs</option>
                <option value="Help">Help</option>
              </select>
            </div>
            <div className="orderB">
              <input type="checkbox" id="check" onChange={this.props.changeForward} checked={this.props.forward} />
              {this.props.forward
                ? <label v-show="orderB" htmlFor="check" className="btn button">正序</label>
                : <label v-show="!orderB" htmlFor="check" className="btn button">倒序</label>}
            </div>
            <div className="loginreg">
              { !this.props.uname &&
              <button className="loginreg-item btn btn-infoo" onClick={() => this.props.showLR(true)} v-show="!uname">登录发帖</button>}
              { !this.props.uname &&
              <button className="loginreg-item btn" onClick={() => this.props.showLR(false)}  v-show="!uname">注册</button> }
              { this.props.uname &&
              <Link to="/addpost">
                <button className="loginreg-item btn btn-infoo" v-show="uname" >发表新帖</button>
              </Link> }
            </div>
          </div>
          <div className="order">
            <input type="radio" onChange={this.props.changeOrder} name="order" id="order-1" checked={this.props.order==='0'} value="0" v-model="order" />
            <input type="radio" onChange={this.props.changeOrder} name="order" id="order-2" checked={this.props.order==='1'} value="1" v-model="order" />
            <input type="radio" onChange={this.props.changeOrder} name="order" id="order-3" checked={this.props.order==='2'} value="2" v-model="order" />
            <label htmlFor="order-1" className="btn button">按回复时间</label>
            <label htmlFor="order-2" className="btn button">按发布时间</label>
            <label htmlFor="order-3" className="btn button">回帖数</label>
          </div>
          <PostList order="order" list={this.props.list}></PostList>
        </div>
        <style jsx>{`
          .home
            padding 1rem 4% 0
            .home-header
              display flex
              align-items flex-end
              padding-bottom 1.2rem
              .select
                height 2.4rem
                font-size 1rem
              .orderB
                input
                  display none
                .button
                  border 1px solid #ccc
                  background-color #fff
                  margin-left .4rem
                  margin-bottom 0
              .loginreg
                flex-grow 1
                .loginreg-item
                  float right
                  margin-left .5rem
            .order
              margin-bottom .8rem
              input
                display none
                &:checked + * + * + label
                  background-color #e9e9e9
                  border 1px solid #9aa
              .button
                border 1px solid #ccc
                background-color #fff
                margin-right .4rem

        `}</style>
      </div>
    )
  }
}



const mapState = (state) =>{
  return {
    list: state.main.selectedList,
    cate: state.main.cate,
    forward : state.main.forward,
    order: state.main.order,
    LR: state.main.LR,
    uname: state.store.uname
  }
}

const mapDispatch = (dispatch) => {
  return {
    getMainInfo() {
      dispatch(actions.getMainInfo())
      dispatch(actionsS.setLoading(true))
    },
    changeCate (e) {
      dispatch(actions.changeCate(e.target.value))
    },
    changeForward () {
      dispatch(actions.changeForward())
    },
    changeOrder (e) {
      dispatch(actions.changeOrder(e.target.value))
    },
    showLR (val) {
      dispatch(actions.showLR(val))
    }
  }
}


export default connect(mapState, mapDispatch)(Main)

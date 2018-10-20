import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route }  from 'react-router-dom'
import { actions } from './store'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import SideBar from './components/SideBar'
import Settings from './components/Settings'
import Main from './components/main'
import AddPost from './components/main/AddPost'
import Post from './components/post'
import User from './components/user'
import Reset from './components/Reset'
import Login from './components/Login'
import Info from './components/Info'
import ToTop from './components/ToTop'
import Loading from './components/Loading'
import { CSSTransition } from 'react-transition-group'

class App extends Component {
  componentDidMount () {
    this.props.setUnameID()
    this.props.reload()
    window.addEventListener('scroll', ()=>this.props.handleScroll(this))
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <div className="blur" style={this.props.blurStyle}>
            {this.props.cover &&
            <div className="cover" onClick={this.props.hideSide}></div>}
            <div className="router">
              <SiteHeader></SiteHeader>
              <Route path='/' exact component={Main}></Route>
              <Route path='/post/:id' exact component={Post}></Route>
              <Route path='/user/:id' exact component={User}></Route>
              <Route path='/settings' exact component={Settings}></Route>
              <Route path='/addpost' exact component={AddPost}></Route>
              <Route path='/reset/:id' exact component={Reset}></Route>
            </div>
            <SiteFooter></SiteFooter>
          </div>
          <div>
            <CSSTransition in={this.props.sideBar} timeout={300} classNames="fade" unmountOnExit>
              <SideBar />
            </CSSTransition>
            <CSSTransition in={this.props.LR} timeout={300} classNames="fadezoomOut" unmountOnExit>
              <Login />
            </CSSTransition>
            <CSSTransition in={Boolean(this.props.info)} timeout={300} classNames="fadezoomIn" unmountOnExit>
              <Info />
            </CSSTransition>
            {this.props.Top  && <ToTop />}
            <CSSTransition in={this.props.loading} timeout={300} classNames="fadezoomIn" unmountOnExit>
              <Loading />
            </CSSTransition>
          </div>
          <style jsx>{`
            .app
              overflow hidden
              .blur
                transition 0.3s
                background-color #efefef
                position relative
                z-index 1
                .cover
                  position absolute
                  top 0
                  left 0
                  bottom 0
                  right 0
                  z-index 10
                .router
                  padding-top 4rem
                  max-width 800px
                  margin 0 auto
                  min-height calc(100vh - 5rem)
          `}</style>
        </div>
      </BrowserRouter>
    )
  }
}


const mapState = (state) =>{
  return {
    blurStyle: state.store.blurStyle,
    sideBar: state.store.sideBar,
    LR: state.store.LR,
    cover: state.store.cover,
    info: state.store.info,
    Top: state.store.Top,
    loading: state.store.loading
  }
}

const mapDispatch = (dispatch) => {
  return {
    hideSide () {
      dispatch(actions.hideSide())
    },
    setUnameID () {
      dispatch(actions.setUnameID({uid: localStorage.uid , uname:localStorage.uname}))
    },
    reload () {
      dispatch(actions.reload())
    },
    handleScroll (that) {
      var dis = document.documentElement.scrollTop || document.body.scrollTop
      if (dis > 600) {
        clearTimeout(that.clearId)
        dispatch(actions.changeTop(true))
        that.clearId = setTimeout(() => dispatch(actions.changeTop(false)), 1500)
      } else {
        dispatch(actions.changeTop(false))
      }
    }
  }
}
export default connect(mapState, mapDispatch)(App)

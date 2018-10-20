import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { actions } from '../../store'
import { actions as actionsM } from './store'

const render = (props)  =>{
  var content,cate,title
  return (
    <div className="post-new">
      <div className="post-header">发布新主题</div>
      <div className="post-body">
        <div className="body-hint">
          <label for="post-title">请填写主题内容并选择一个分类</label>
        </div>
        <div className="cate-wrapper">
          <select ref={it=>cate=it} className="cate form-control form-control-sm">
            <option>灌水</option>
            <option>Bugs</option>
            <option>Help</option>
          </select>
        </div>
        <div className="input-group mb-3 boder-title">
          <div className="input-group-prepend">
            <span className="input-group-text">主题</span>
          </div>
          <input ref={it => title = it} type="text" className="form-control" placeholder="Thread title" id="post-title" />
        </div>
        <div className="form-group post-edit">
          <label for="edit-cotent">请输入内容</label>
          <textarea  ref={it=> content = it} className="form-control" placeholder="Type here to input content ..." id="edit-cotent" rows="3"></textarea>
          </div>
        <div className="post-submmit">
          <button className="btn btn-infoo" onClick={()=>props.submmit({title:title.value,content:content.value,cate:cate.value},props)}>提交</button>
        </div>
      </div>
      <style jsx>{`
        .post-new
          padding .5rem 4% 0
          .post-header
            text-align center
            font-weight 500
            font-size 1.5rem
            height 3.5rem
            line-height 3.5rem
            margin-bottom .5rem
          .post-body
            padding 1rem
            border 1px solid #ddd
            border-radius .5rem
            background-color #fff
            color #000
            .body-hint
              padding .5rem 0
            .cate-wrapper
              padding .5rem 0
              .cate
                width auto
                padding .2rem 1.5rem
            .boder-title
              padding .5rem 0
          .post-edit
            margin-top 0rem

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
    submmit (obj, props) {
      if (obj.title.trim() === '') {
        dispatch(actions.sendInfo('你忘记写标题啦'))
      } else if (obj.content.trim() === '') {
        dispatch(actions.sendInfo('你忘记写内容啦'))
      } else {
        var params = new URLSearchParams()
        params.append('title', obj.title)
        params.append('content', obj.content)
        params.append('cate', obj.cate)
        dispatch(actions.sendInfo('在提交不要方'))
        axios.post('/topost', params).then(val => {
          // 没重新排序有一点bug先放放
          dispatch(actionsM.addPost(JSON.parse(val.data)))
          dispatch(actions.sendInfo('提交成功'))
          setTimeout(() => dispatch(actions.hideInfo()), 700)
          props.history.push("/")
        }, () => {
          dispatch(actions.sendInfo('提交失败,请重试'))
        })
      }
    }
  }
}


export default connect(mapState, mapDispatch)(render)

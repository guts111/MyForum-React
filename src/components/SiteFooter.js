import React from 'react'
import { connect } from 'react-redux'



const SiteFooter = () => {
  return (
    <div className="footer">
      Server running @vps.hnh.me Written by GuiBin
      <style jsx>{`
        .footer
          color #777
          margin-top 1rem
          height 4rem
          line-height 4rem
          text-align center
          background-color #efefef
      `}</style>
    </div>
  )
}

export default connect(null, null)(SiteFooter)

//app.js
var config=require('config.js')
App({

  onLaunch: function() {
    //定时清除缓存，10分钟后清除缓存，重新登录
    // setInterval(function () {
    //   console.error(">>>>AC_TOKEN_ID_KEY>>>>" + config.AC_TOKEN_ID_KEY)
    //   try {
    //     wx.removeStorageSync(config.AC_TOKEN_ID_KEY)
    //     wx.navigateTo({
    //       url: '../login/login',
    //     })
    //   } catch (e) {
    //     console.error(">>>>>>>>e>>>>"+e)
    //     wx.navigateTo({
    //       url: '../login/login',
    //     })
    //   }
    
    // }, 600000)

    console.log("<<<<<App<<<<<<" + wx.getStorageSync(config.USER_IS_LOGIN))

  },

  onHide: function() {
    // wx.setStorageSync(config.USER_IS_LOGIN, false)
    // wx.removeStorageSync(config.AC_TOKEN_ID_KEY)
  }


})
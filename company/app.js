//app.js
var config=require('config.js')
App({

  onLaunch: function() {
    console.log("<<<<<App<<<<<<" + wx.getStorageSync(config.USER_IS_LOGIN))

  },

  onHide: function() {
  }


})
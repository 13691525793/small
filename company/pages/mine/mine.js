// pages/mine/mine.js
var config = require('../../config.js')
var api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    protrait: "../../images/logo.png",
    nickName: "点击登录"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: "我的",
    })
  },

  onShow: function() {
    var that = this
    // 判断是否登录，登录设置头像，账号
    var isLogin = wx.getStorageSync(config.USER_IS_LOGIN);
    if (isLogin) {
      var protraitUrl = wx.getStorageSync(config.USER_PROTRAIT_URL_KEY);
      if (protraitUrl) {
        that.setData({
          protrait: protraitUrl
        })
      }
      that.setData({
        nickName: wx.getStorageSync(config.USER_EMAIL_KEY)
      })
    }
  },
  toLogin: function() {
    var isLogin = wx.getStorageSync(config.USER_IS_LOGIN);
    var that = this
    if (isLogin) {
      wx.showModal({
        title: '提示',
        content: '退出当前用户?',
        success(res) {
          if (res.confirm) {
            api.logOut(function(opt) {
              if (opt.statusCode == 200) {
                if (opt.data.status == 200) {
                  wx.removeStorageSync(config.USER_IS_LOGIN)
                  wx.removeStorageSync(config.AC_TOKEN_ID_KEY)
                  wx.removeStorageSync(config.USER_EMAIL_KEY)
                  wx.removeStorageSync(config.USER_PROTRAIT_URL_KEY)
                  that.setData({
                    protrait: "../../images/logo.png",
                    nickName: "点击登录"
                  })
                }
              } else if (opt.statusCode == 401) {
                wx.removeStorageSync(config.USER_IS_LOGIN)
                wx.removeStorageSync(config.AC_TOKEN_ID_KEY)
                wx.removeStorageSync(config.USER_EMAIL_KEY)
                wx.removeStorageSync(config.USER_PROTRAIT_URL_KEY)
                that.setData({
                  protrait: "../../images/logo.png",
                  nickName: "点击登录"
                })
              } else {
                wx.showToast({
                  title: '退出失败',
                  duration: 3000
                })
              }

            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '../login/login?param=mine',
      })
    }
  },
  toHistroy: function() {
    wx.navigateTo({
      url: '../histroy/histroy',
    })
  },
  toLinkUs: function() {
    wx.navigateTo({
      url: '../linkUs/link',
    })
  },
  toMore: function() {
    wx.navigateTo({
      url: '../more/more',
    })
  }


})
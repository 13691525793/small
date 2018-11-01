// pages/more/more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: "更多",
    })
  },
  /**
   * 跳转到服务协议
   */
  toService: function() {
    wx.navigateTo({
      url: '../service/service',
    })
  },
  /**
   * 跳转到隐私政策
   */
  toPrivacy: function() {
    wx.navigateTo({
      url: '../privacy/privacy',
    })
  },
  /**
   * 跳转到关于我们
   */
  toAboutUs: function() {
    wx.navigateTo({
      url: '../aboutus/aboutus',
    })
  }


})
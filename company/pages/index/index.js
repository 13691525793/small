// pages/index.js
var config=require('../../config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    email: "",
    images: [{
        "picUrl": "../../images/slider_one.png",
        "linkUrl": "http://www.sinoac.org/"
      },
      {
        "picUrl": "../../images/slider_two.png",
        "linkUrl": "http://ac.sinoac.org/about#"
      },
      {
        "picUrl": "../../images/slider_three.png",
        "linkUrl": "http://ac.sinoac.org/about#"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: "中国防伪-企业版",
    })
  },
  /**
   * 跳转到关联单个产品
   */
  toSingle: function() {
    var isLogin = wx.getStorageSync(config.USER_IS_LOGIN);
  // var acTokenId=  wx.getStorageSync(config.AC_TOKEN_ID_KEY);
    console.log(">>>>>>>>toSingle>>>>>>>" + isLogin)
    if (isLogin){
      wx.navigateTo({
        url: '../tiedsingle/single?title=关联单个产品',
      })
    }else{
      wx.navigateTo({
        url: '../login/login?param=single',
      })
    }
  
  },

  /**
   * 跳转到关联批量产品
   */
  toMutil: function() {
    var isLogin = wx.getStorageSync(config.USER_IS_LOGIN);
    console.log(">>>>>>>> toMutil>>>>>>>" + isLogin)
    // var acTokenId = wx.getStorageSync(config.AC_TOKEN_ID_KEY);
    if (isLogin) {
      wx.navigateTo({
        url: '../tiedmutil/mutil?title=关联批量产品',
      })

    } else {
      wx.navigateTo({
        url: '../login/login?param=mutil',
      })
    }
  },

  /**
   * 解除关联产品
   */
  toDelete: function() {

    var isLogin = wx.getStorageSync(config.USER_IS_LOGIN);
    console.log(">>>>>>>> toDelete>>>>>>>" + isLogin)
    // var acTokenId = wx.getStorageSync(config.AC_TOKEN_ID_KEY);
    if (isLogin) {
      wx.navigateTo({
        url: '../tieddelete/delete?title=解除批量产品',
      })
    } else {
      wx.navigateTo({
        url: '../login/login?param=delete',
      })
    }
  }
})
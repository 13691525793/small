// pages/tieddelete/delete.js
var api = require("../../utils/api.js");
var timeUtils = require("../../utils/util.js");
var config = require('../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcode: "选择已关联码",
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.title,
    })
  },

  /**
   * 选择已关联码
   */
  choose_delete: function() {
    // 只允许从相机扫码
    var that = this
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        that.setData({
          qrcode: res.result
        })
      }
    })
  },
  /**
   * 提交解除关联信息，只能单个解除关联
   */
  delete: function() {
    if (this.data.qrcode === "选择已关联码") {
      wx.showToast({
        title: '选择已关联码',
        image: '../../images/warm.png',
        duration: 3000
      })
      return;
    }

    if (this.data.qrcode.indexOf(config.CODE_PREFIX) == -1) {
      wx.showToast({
        title: '非平台生码',
        image: '../../images/warm.png',
        duration: 3000
      })
      return;
    }


    var that = this;
    var obj = {
      startUrl: that.data.qrcode
    }

    that.setData({
      loading: true
    })
    api.deleteRelevence(obj, function(res) {
      that.setData({
        loading: false
      })
      if (res.statusCode == 200) {
        switch (res.data.status) {
          case 200:
            var obj = {
              user: wx.getStorageSync(config.USER_EMAIL_KEY),
              time: timeUtils.formatTime(new Date()),
              count: "1",
              mode: "解除关联产品",
              goodsName: null,
              startUrl: that.data.qrcode,
              endUrl: null,
              area: null
            }
            config.histroy.push(obj)
            wx.showToast({
              title: '删除关联成功',
              image: '../../images/success.png',
              duration: 3000
            })
            setTimeout(function() {
              wx.navigateBack({
                delta: 2
              })
            }, 1000)

            break;
          case 201:
            wx.showToast({
              title: '删除关联失败',
              image: '../../images/fail.png',
              duration: 3000
            })
            break;
          case 400:
            wx.showToast({
              title: '参数错误',
              image: '../../images/fail.png',
              duration: 3000
            })
            break;
          case 402:
            wx.showToast({
              title: '次码不存在',
              image: '../../images/warm.png',
              duration: 3000
            })
            break;
          case 501:
            wx.showToast({
              title: '未关联产品信息',
              image: '../../images/warm.png',
              duration: 3000
            })
            break;
        }
      } else if (res.statusCode == 401) {
        wx.removeStorageSync(config.USER_IS_LOGIN)
        wx.removeStorageSync(config.AC_TOKEN_ID_KEY)
        wx.removeStorageSync(config.USER_EMAIL_KEY)
        wx.removeStorageSync(config.USER_PROTRAIT_URL_KEY)
        wx.showToast({
          title: '登录超时',
          image: '../../images/warm.png',
          duration: 3000
        })
        setTimeout(function() {
          wx.navigateTo({
            url: '../login/login?param=delete',
          })
        }, 2000)

      } else if (res.statusCode == 500) {
        wx.showToast({
          title: '服务器维护中...',
          image: '../../images/fail.png',
          duration: 3000,
        })
      }

    })
  },
})
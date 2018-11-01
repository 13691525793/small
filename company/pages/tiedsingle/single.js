// pages/tiedsingle/single.js
var api = require("../../utils/api.js");
var timeUtils = require("../../utils/util.js");
var config = require('../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcode: "选择关联码",
    goodsName: [],
    goods: [],
    region: "",
    index: 0,
    goodsId: "",
    address: "选择销售区域",
    loading: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.title,
    })
    var that = this;
    var email = wx.getStorageSync(config.USER_EMAIL_KEY);
    if (email) {
      api.queryProduct(email, function(res) {
        that.setData({
          goods: res.data,
          goodsId: res.data[0].id,
          goodsName: res.data[0].name
        })

      })
    } else {
      wx.navigateTo({
        url: '../login/login?param=single',
      })
    }

  },
  /**
   * 选择要绑定的产品信息
   */

  bindGoodsChange: function(e) {
    this.setData({
      index: e.detail.value,
      goodsId: this.data.goods[e.detail.value].id
    })

  },

  /**
   * 选择销售区域
   */
  bindPickerChange: function(e) {
    this.setData({
      address: e.detail.value + ""
    })

  },

  /**
   * 选择要绑定的码
   */
  choose_qrcode: function() {
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
   * 提交关联信息
   */
  submit: function() {
    if (this.data.goodsId === null) {
      wx.showToast({
        title: '请选择产品信息',
        image: '../../images/warm.png',
        duration: 3000
      })
      return;
    }
    if (this.data.address === "选择销售区域") {
      wx.showToast({
        title: '请选择销售区域',
        image: '../../images/warm.png',
        duration: 3000
      })
      return;
    }

    if (this.data.qrcode === "选择关联码") {
      wx.showToast({
        title: '请选择关联码',
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
      this.setData({
        qrcode: "选择关联码"
      })
      return;
    }

    var that = this;
    var obj = {
      email: wx.getStorageSync(config.USER_EMAIL_KEY),
      productId: this.data.goodsId,
      startUrl: this.data.qrcode,
      endUrl: null,
      salesPlace: that.data.address,
      associatTime: timeUtils.formatTime(new Date()),
      relevanceStatus: "1"
    }
    that.setData({
      loading: true
    })
    api.createRelevenceLater(obj, "single", function(res) {
      that.setData({
        loading: false
      })
      if (res.statusCode == 200) {
        switch (res.data.status) {
          case 200:
            var obj = {
              user: wx.getStorageSync(config.USER_EMAIL_KEY),
              time: timeUtils.formatTime(new Date()),
              count: res.data.data.count,
              mode: "关联单个产品",
              goodsName: that.data.goodsName,
              startUrl: that.data.qrcode,
              endUrl: null,
              area: that.data.address
            }

            config.histroy.push(obj)
            wx.showToast({
              title: '绑码成功',
              image: '../../images/success.png',
              duration: 3000
            })
            setTimeout(function() {
              wx.navigateBack({
                delta: 2
              })
            }, 1000)
            break;
          case 400:
            wx.showToast({
              title: '请求参数错误',
              image: '../../images/fail.png',
              duration: 3000
            })
            break;
          case 501:
            wx.showToast({
              title: '已关联产品信息',
              image: '../../images/warm.png',
              duration: 3000
            })
            break;
          case 201:
            wx.showToast({
              title: '关联失败',
              image: '../../images/fail.png',
              duration: 3000
            })
            break;
          case 402:
            wx.showToast({
              title: '关联码不存在',
              image: '../../images/warm.png',
              duration: 3000
            })
            break;
          case 403:
            wx.showToast({
              title: '截止码不存在',
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
            url: '../login/login?param=single',
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
  }

})
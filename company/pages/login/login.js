var api = require('../../utils/api.js');
var config = require('../../config.js')
Page({
  data: {
    remind: '加载中',
    toWhere: "",
    email: "",
    password: "",
    loading: false
  },
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: ' ',
    })
    this.setData({
      toWhere: options.param
    })
    wx.showModal({
      title: '提示',
      content: '请使用企业账号登录!',
      showCancel: false,
      success(res) {
        if (res.confirm) {

        }
      }
    })

  },

  onReady: function() {
    var that = this;
    setTimeout(function() {
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });

  },
  // 获取输入账号
  emailInput: function(e) {
    this.setData({
      email: e.detail.value
    })
  },

  // 获取输入密码
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录
  login: function() {
    if (this.data.email.length == 0) {
      wx.showToast({
        title: '请输入用户名',
        image: '../../images/warm.png',
        duration: 2000
      })
      return;
    }
    if (this.data.password.length == 0) {
      wx.showToast({
        title: '请输入密码',
        image: '../../images/warm.png',
        duration: 2000
      })
      return;
    }

    var userName = this.data.email;
    var password = this.data.password;
    var that = this;
    that.setData({
      loading: true
    })
    api.login(userName, password, function(res) {
      that.setData({
        loading: false
      })
      if (res.statusCode == 200) {
        if (res.data.status === 200) {
          /**
           * 登录成功，缓存登录状态、actokenid、头像、邮箱
           */
          wx.setStorageSync(config.USER_IS_LOGIN, true)
          wx.setStorageSync(config.AC_TOKEN_ID_KEY, res.data.data.acTokenId)
          wx.setStorageSync(config.USER_PROTRAIT_URL_KEY, res.data.data.user.userImageUrl)
          wx.setStorageSync(config.USER_EMAIL_KEY, res.data.data.user.email)
          switch (that.data.toWhere) {
            case "single":
              wx.redirectTo({
                url: '../tiedsingle/single?title=关联单个产品',
              })
              break;
            case "mutil":
              wx.redirectTo({
                url: '../tiedmutil/mutil?title=关联批量产品',
              })
              break;
            case "delete":
              wx.redirectTo({
                url: '../tieddelete/delete?title=解除关联信息',
              })
              break;
            case "mine":
              wx.switchTab({
                url: '../mine/mine',
              })
              break;
            default:
              wx.switchTab({
                url: '../index/index'
              })
              break;
          }

        } else {
          wx.setStorageSync(config.USER_IS_LOGIN, false)
          wx.showToast({
            title: '账号或密码错误',
            image: '../../images/fail.png',
            duration:2000
          })
        }
      } else if (res.statusCode == 401){
        wx.showToast({
          title: '账号或密码错误',
          image: '../../images/warm.png',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: '网络请求错误',
          image: '../../images/fail.png',
          duration: 2000
        })
      }

    });


  }
})
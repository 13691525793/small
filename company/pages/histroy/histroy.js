// pages/histroy/histroy.js
var config = require('../../config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) { 
    var that = this;
    var list = config.histroy;

    for (var i = 0; i < list.length; i++) {
      that.data.list.push(list[i]);
    }

    that.setData({
      list: list
    })
  },

})
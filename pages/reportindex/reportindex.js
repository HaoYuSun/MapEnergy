// pages/record/record.js
// var base64 = require("../../images");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    record_id: '',

  },

  cellTap: function(e){
    var that = this;
    var type = e.currentTarget.dataset.type;
    console.log(type)
    var record_id = that.data.record_id;
    // record_id = 1325
    wx.navigateTo({
      url: '../reportlist/reportlist?record_id='+record_id+'&type='+type,
    })
    
  },

  editpro: function(e) {
    var that = this;
    console.log(app.globalData.openid);
    console.log(that.data.record_id);
    wx.navigateTo({
      url: '../detail/detail?recordid='+that.data.record_id+'&openid='+app.globalData.openid,
    })
  },
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    that.setData({
      record_id: options.record_id
    });

  },

  



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
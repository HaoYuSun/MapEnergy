// pages/setgroup/setgroup.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: function (r) {
        console.log(r);
        var code = r.code;//登录凭证
        let setGroupUrl = app.globalData.setGroupUrl;
        wx.request({
          url: setGroupUrl,
          data:{
            js_code: code,
            group_id: options.group_id
          },
          method:"GET",
          success(res){
            wx.showToast({
              title: '设定成功',
              icon: 'success',
              duration: 1000
            });
            let timer = setTimeout(() => {
              clearTimeout(timer)
              that.direct()
            }, 3000);
            
          }
        });
      }
    })
  },
  direct: function () {
    wx.redirectTo({
      url: '../launch/launch'
    })
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
const app = getApp()
// pages/nav/nav.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  gohome: function(e){
    var that = this;
    if(app.globalData.userInfo){
      wx.navigateTo({
        url: '../index/index',
      })
    }else{
      that.authset();
    }
  },
  goproject: function(e){
    var that = this;
    if(app.globalData.userInfo){
      wx.navigateTo({
        url: '../self/self',
      })
    }else{
      that.authset();
    }
  },
  /**
   * 授权提醒
  */
  authset: function(e){
    var that = this;
    wx.getUserProfile({
      desc: '获取你的昵称、头像、地区及性别',
      success: res => {
        console.log(res.userInfo);
        app.globalData.userInfo = res.userInfo;
        wx.request({
          url: app.globalData.upUserinfoUrl,
          data:{
            openid: app.globalData.openid,
            userInfo: app.globalData.userInfo
          },
          method:"GET",
          success(res){
            console.log(res)
          }
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideHomeButton();
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
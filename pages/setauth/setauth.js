// pages/setauth/setauth.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  bindGetUserInfo: function(res) {
    wx.showModal({
      title: '提示',
      content: '获取您的昵称、头像、地区及性别',
      showCancel: false,
      confirmText: '授权',
      success: function(res) {
        // 用户没有授权成功，不需要改变 isHide 的值
        if (res.confirm) {
          wx.getUserProfile({
            desc: '获取您的昵称、头像、地区及性别',
            success: (res) => {
              app.globalData.userInfo = res.userInfo;
              wx.request({
                url: app.globalData.upUserinfoUrl,
                data:{
                  openid: app.globalData.openid,
                  userInfo: app.globalData.userInfo
                },
                method:"GET",
                success(resp){
                  wx.redirectTo({
                    url: '../launch/launch'
                  })
                }
              });
            }
          })
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
// pages/launch/launch.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'logoimg': '',
    'group_id': 2
  },

  getGroupInfo: function() {
    var that = this;
    console.log('launch'+app.globalData.openid)
    wx.request({
      url: app.globalData.getGroupInfoUrl,
      data:{
        openid: app.globalData.openid
      },
      method:"GET",
      success(res){
        app.globalData.logopath=res.data.logopath;
        app.globalData.group_id=res.data.group_id;
        that.setData({
          'logoimg': res.data.logopath,
          'group_id': res.data.group_id
        })
        let timer = setTimeout(() => {
          clearTimeout(timer)
          that.direct()
        }, 3000);
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(app.globalData.userInfo){
      that.getGroupInfo();
    }else{
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.login({
              success: function (r) {
                var code = r.code;//登录凭证
                let getOpenidUrl = app.globalData.getOpenidUrl;
                wx.request({
                  url: getOpenidUrl,
                  data:{
                    js_code: code,
                  },
                  method:"GET",
                  success(res){
                    if(res.data.code == '0'){
                      
                      app.globalData.openid=res.data.openid;
                      app.globalData.userInfo=res.data.userInfo;
                    }
                    that.getGroupInfo();
                  }
                });
              },
              fail: function () {
                wx.showModal({
                  title: '提示！',
                  confirmText: '系统错误',
                  showCancel: false,
                  content: e,
                  success: function(res) {
                    if (res.confirm) {
                    }
                  }
                })
                console.log('系统错误')
              }
            })
            
            // wx.getUserInfo({
            //   success(res) {
            //     app.globalData.userInfo=res.userInfo
            //     wx.request({
            //       url: app.globalData.upUserinfoUrl,
            //       data:{
            //         openid: app.globalData.openid,
            //         userInfo: app.globalData.userInfo
            //       },
            //       method:"GET",
            //       success(res){
            //         that.getGroupInfo();
            //       }
            //     });
            //   },
            //   fail(res) {
            //     console.log("获取用户信息失败", res)
            //   }
            // })
          } else {
            wx.navigateTo({
              url: 'pages/setauth/setauth',
            })
          }
        },
        fail(res){
          wx.navigateTo({
            url: 'pages/setauth/setauth',
          })
        }
      })
    }

  },

  direct: function () {
    wx.redirectTo({
      url: '../nav/nav',
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
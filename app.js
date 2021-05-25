// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    
    // 登录
    this.login();
    
  },
  login: function () {//1、调用微信登录接口，获取code
    var that = this;
    console.log('login')
    wx.login({
      success: function (r) {
        var code = r.code;//登录凭证
        let getOpenidUrl = that.globalData.getOpenidUrl;
        wx.request({
          url: getOpenidUrl,
          data:{
            js_code: code,
          },
          method:"GET",
          success(res){
            if(res.data.code == '0'){
              console.log(res)
              that.globalData.openid=res.data.openid
            }
            console.log(that.globalData.openid)
            that.getUserInfo();
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
  },

  getUserInfo: function(e) {
    let that = this;
    // console.log(e)
    // 获取用户信息
    wx.getSetting({
      success(res) {
        console.log("res", res)
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权=====")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              that.globalData.userInfo=res.userInfo
              wx.request({
                url: that.globalData.upUserinfoUrl,
                data:{
                  openid: that.globalData.openid,
                  userInfo: that.globalData.userInfo
                },
                method:"GET",
                success(res){
                  console.log(res)
                  if(res.data.code == '0'){
                    that.globalData.openid=res.data.openid
                  }
                  if (this.getOpenidCallback){
                    // https://blog.csdn.net/weixin_30695195/article/details/97652048
                    this.getOpenidCallback(res.data.openid);
                  }
                  // that.getUserInfo();
                }
              });
            },
            fail(res) {
              console.log("获取用户信息失败", res)
            }
          })
        } else {
          console.log("未授权=====")
          wx.navigateTo({
            url: 'pages/setauth/setauth',
          })
        }
      }
    })
  },

  // 打开权限设置页提示框
  showSettingToast: function(e) {
    wx.showModal({
      title: '提示！',
      confirmText: '去设置',
      showCancel: false,
      content: e,
      success: function(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../setting/setting',
          })
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    map_key: 'QYEBZ-VCMED-DD44G-H4QVE-U7OHS-PAFAA',
    openid: null,
    getOpenidUrl: 'http://127.0.0.1:8000/getopenid',
    upUserinfoUrl: 'http://127.0.0.1:8000/upuserinfo',
    upAreaUrl: 'http://127.0.0.1:8000/test',
  }
})

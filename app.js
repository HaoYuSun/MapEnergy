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
  onShow: function(){
    
  },
  login: function () {//1、调用微信登录接口，获取code
    var that = this;
    console.log('login')
    wx.login({
      success: function (r) {
        console.log(r);
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
              that.globalData.openid=res.data.openid;
              that.globalData.userInfo=res.data.userInfo;
            }
            console.log(that.globalData.openid)
            // that.getUserInfo();
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
              console.log(res.userInfo)
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
      },
      fail(res){
        console.log("未授权=====")
        wx.navigateTo({
          url: 'pages/setauth/setauth',
        })
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
    baseUrl: 'https://sgo.en.com.cn/',
    getOpenidUrl: 'https://sgo.en.com.cn/getopenid',
    upUserinfoUrl: 'https://sgo.en.com.cn/upuserinfo',
    upAreaUrl: 'https://sgo.en.com.cn/uparea',
    getRecordsUrl: 'https://sgo.en.com.cn/getrecords',
    getRecordDetailUrl: 'https://sgo.en.com.cn/getrecorddetail',
    upFromopenidUrl: 'https://sgo.en.com.cn/upfromopenid',
    upRecordDetailUrl: 'https://sgo.en.com.cn/uprecorddetail',
    delRecordUrl: 'https://sgo.en.com.cn/delrecord',
    shortReportUrl: 'https://sgo.en.com.cn/createbriefnessreport',
    longReportUrl: 'https://sgo.en.com.cn/createdetailreport',
    getReportsUrl: 'https://sgo.en.com.cn/getreports',
    delReportUrl: 'https://sgo.en.com.cn/delreport',
    upReportInfoUrl: 'https://sgo.en.com.cn/upreportinfo',
    getReportInfoUrl: 'https://sgo.en.com.cn/getreportinfo',
    getProjectsUrl: 'https://sgo.en.com.cn/getprojects',
    delProjectsUrl: 'https://sgo.en.com.cn/delprojects',
    gelProjectsListUrl: 'https://sgo.en.com.cn/getprojectslist',
    uploadFileUrl: 'https://sgo.en.com.cn/uploadfile',
    getSgoFileUrl: 'https://sgo.en.com.cn/getsgofile',
    delFileUrl: 'https://sgo.en.com.cn/delsgofile',
  }
})

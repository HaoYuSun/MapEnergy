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
  login: function() {
    var that = this;
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
              that.globalData.openid=res.data.openid;
              that.globalData.userInfo=res.data.userInfo;
            }
          }
        });
      }
    })
  },
  onShow: function(){
    
  },

  globalData: {
    userInfo: null,
    map_key: 'QYEBZ-VCMED-DD44G-H4QVE-U7OHS-PAFAA',
    openid: null,
    logopath: '',
    group_id: 2,
    baseUrl: 'https://api.sgosgo.com/',
    getOpenidUrl: 'https://api.sgosgo.com/getopenid',
    upUserinfoUrl: 'https://api.sgosgo.com/upuserinfo',
    upAreaUrl: 'https://api.sgosgo.com/uparea',
    getRecordsUrl: 'https://api.sgosgo.com/getrecords',
    getRecordDetailUrl: 'https://api.sgosgo.com/getrecorddetail',
    getgooglerecorddetail: 'https://api.sgosgo.com/getgooglerecorddetail',
    upFromopenidUrl: 'https://api.sgosgo.com/upfromopenid',
    upRecordDetailUrl: 'https://api.sgosgo.com/uprecorddetail',
    delRecordUrl: 'https://api.sgosgo.com/delrecord',
    shortReportUrl: 'https://api.sgosgo.com/createbriefnessreport',
    longReportUrl: 'https://api.sgosgo.com/createdetailreport',
    getReportsUrl: 'https://api.sgosgo.com/getreports',
    delReportUrl: 'https://api.sgosgo.com/delreport',
    upReportInfoUrl: 'https://api.sgosgo.com/upreportinfo',
    getReportInfoUrl: 'https://api.sgosgo.com/getreportinfo',
    getProjectsUrl: 'https://api.sgosgo.com/getprojects',
    delProjectsUrl: 'https://api.sgosgo.com/delprojects',
    gelProjectsListUrl: 'https://api.sgosgo.com/getprojectslist',
    uploadFileUrl: 'https://api.sgosgo.com/uploadfile',
    getSgoFileUrl: 'https://api.sgosgo.com/getsgofile',
    upSgoFileStateUrl: 'https://api.sgosgo.com/sgofilestate',
    delFileUrl: 'https://api.sgosgo.com/delsgofile',
    getGroupInfoUrl: 'https://api.sgosgo.com/getgroupinfo',
    getOpenProUrl: 'https://api.sgosgo.com/openpro',
    setGroupUrl: 'https://api.sgosgo.com/setgroup',
    setProstateUrl: 'https://api.sgosgo.com/setprostate',
    getWxPhoneUrl: 'https://api.sgosgo.com/getwxuserphone',
    upproserverUrl: 'https://api.sgosgo.com/upproserver',
  }
})

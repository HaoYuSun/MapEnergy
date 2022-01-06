// pages/record/record.js
// var base64 = require("../../images");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    record_id: '',
    proState: ["普通", "私有", "公开"],
    proStateIndex: 0,

    server_list: [
      {name: '踏勘/设计', value: '踏勘/设计'},
      {name: '对接投资人', value: '对接投资人'},
      {name: '设备询价', value: '设备询价'},
      {name: '其他', value: '其他'}
    ],
    server:[],
    server_show: 'none',
    server_phone: ''
  },

  cellTap: function(e){
    var that = this;
    var type = e.currentTarget.dataset.type;
    var record_id = that.data.record_id;
    // record_id = 1325
    wx.navigateTo({
      url: '../reportlist/reportlist?record_id='+record_id+'&type='+type+'&group_id='+app.globalData.group_id,
    })
    
  },
  statepro: function(e) {
    
  },
  serverpro: function(e) {
    var that = this;
    that.setData({
      server_show: ''
    })
  },
  serverCancel: function() {
    var that = this;
    that.setData({
      server_show: 'none'
    })
  },
  server_phone_inp_blur: function(e) {
    this.data.server_phone = e.detail.value;
  },
  serverSubmit: function() {
    var that = this;
    console.log()
    if(that.data.server_phone == '' || that.data.server.length == 0){
      return
    }
    wx.request({
      url: app.globalData.upproserverUrl,
      data:{
        'phone':that.data.server_phone,
        'openid': app.globalData.openid,
        'recordid': that.data.record_id,
        'server': that.data.server
      },
      method:"GET",
      success(res){
        console.log(res)
        if(res.data.code == '0'){
          wx.showModal({
            title: '提示',
            content: '您好,我们已经收到您的服务需求,我们的商务人员将尽快给您电话回复,请注意接听。',
            showCancel: false,
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.setData({
                  server_show: 'none'
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      },
      complete(){
        wx.hideLoading();
      }
    });
  },
  getPhoneNumber (e) {
    console.log(e.detail.code)
    var that = this;
    wx.request({
      url: app.globalData.getWxPhoneUrl,
      data:{
        'code': e.detail.code,
      },
      method:"GET",
      success(res){
        console.log(res)
        if(res.data.code == '0'){
          
          that.setData({
            server_phone: res.data.phone
          })
        }
      },
      complete(){
        wx.hideLoading();
      }
    });


    
  },
  checkboxChange: function (e) {
    var that = this;
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.server_list, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
            if(checkboxItems[i].value == values[j]){
              checkboxItems[i].checked = true;
                break;
            }
        }
    }

    this.setData({
      server_list: checkboxItems,
      server: e.detail.value
    });
  },
  editpro: function(e) {
    var that = this;
    wx.navigateTo({
      url: '../detail/detail?recordid='+that.data.record_id+'&openid='+app.globalData.openid,
    })
  },
  cmtpro: function(e) {
    var that = this;
    wx.request({
      url: app.globalData.getOpenProUrl,
      data:{
        'group_id': app.globalData.group_id,
        'openid': app.globalData.openid,
        'recordid': that.data.record_id
      },
      method:"GET",
      success(res){
        if(res.data.code == '200'){
          wx.showModal({
            title: '提示',
            content: '项目已提交!',
            confirmText: '完成',
            success (res) {
              
            }
          })
          
        }
      },
      complete(){
        wx.hideLoading();
      }
    });
  },
  bindProStateChange: function(e) {
    var that = this;
    console.log('项目状态', e.detail.value);
    if(that.data.proStateIndex == e.detail.value){
      return
    }
    this.setData({
      proStateIndex: e.detail.value
    })

    let setProstateUrl = app.globalData.setProstateUrl;
    wx.request({
      url: setProstateUrl,
      data:{
        recordid: that.data.record_id,
        type: e.detail.value
      },
      method:"GET",
      success(res){
        if(res.data.code == '0'){
          console.log(res)
          
        }
      }
    });

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    that.setData({
      record_id: options.record_id,
      proStateIndex: options.state
    });
    if(app.globalData.group_id == 3){
      that.setData({
        server_list: [
          {name: '踏勘/设计', value: '踏勘/设计'},
          {name: '设备询价', value: '设备询价'},
          {name: '其他', value: '其他'}
        ],
      })
    }
    // that.data.record_id = 2565;
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
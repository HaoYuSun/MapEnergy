// pages/report_info/reportinfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordid: 0,
    openid:'',

    report_title: "",
    dianyadengji: ["10KV", "380v"],
    dianyadengjiIndex: 0,

    hezuomoshi: ["合同能源管理(EMC)", "屋顶租赁"],
    hezuomoshiIndex: 0,

    wudingleixing: ["彩钢瓦", "混凝土"],
    wudingleixingIndex: 0,

    nianzongyongdian: '',
    pingjundianjia: '',
    dianzhekou: '',
  },


  /**
   * 进线等级
  */
  bindDianyadengjiChange: function(e) {
    console.log('picker dianyadengji 发生选择改变，携带值为', e.detail.value);

    this.setData({
      dianyadengjiIndex: e.detail.value
    })
  },

  /**
   * 合作模式
  */
  bindHezuomoshiChange: function(e) {
    console.log('picker hezuomoshi 发生选择改变，携带值为', e.detail.value);

    this.setData({
      hezuomoshiIndex: e.detail.value
    })
  },
  /**
   * 屋顶类型
  */
  bindWudingleixingChange: function(e) {
    console.log('picker wudingleixing 发生选择改变，携带值为', e.detail.value);

    this.setData({
      wudingleixingIndex: e.detail.value
    })
  },

  submitForm() {
    var that = this;
    wx.request({
      url: app.globalData.upReportInfoUrl,
      data:{
        'openid': that.data.openid,
        'recordid': that.data.recordid,
        'report_title': that.data.report_title,
        'dianyadengji': that.data.dianyadengji[that.data.dianyadengjiIndex],
        'hezuomoshi': that.data.hezuomoshi[that.data.hezuomoshiIndex],
        'wudingleixing': that.data.wudingleixing[that.data.wudingleixingIndex],
        'nianzongyongdian': that.data.nianzongyongdian,
        'pingjundianjia': that.data.pingjundianjia,
        'dianzhekou': that.data.dianzhekou,
      },
      method:"GET",
      success(res){
        console.log(res)
        if(res.data.code == '0'){
          
          
        }
      },
      complete(){
        wx.hideLoading();
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 分享来的
    if(options.openid){
      that.setData({
        openid: options.openid
      })
    }

    if(options.recordid){
      that.setData({
        recordid: options.recordid
      })
    }
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
// pages/record/record.js
// var base64 = require("../../images");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: '../../images/right.png',
    list:[
      {
        address: '前进路',
        area: 66,  // 面积
        install_area: 222,  //安装容量
        sum_price: 333,  // 总投资金额
        generating_year: 444,  // 年发电量
      },
      {
        address: '俱进路',
        area: 44,  // 面积
        install_area: 111,  //安装容量
        sum_price: 222,  // 总投资金额
        generating_year: 333,  // 年发电量
      }
    ]
  },

  cellTap: function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var para = JSON.stringify(that.data.list[index]);
    wx.navigateTo({
      url: '../detail/detail?para=' + para,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  slideButtonTap(e) {
    console.log('slide button tap', e.detail)
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
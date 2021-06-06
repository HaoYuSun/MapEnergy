// pages/record/record.js
// var base64 = require("../../images");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLeftSel: true,
    activeTab: 0,
    openid: '',
    pageid: 1,
    pagesize: 12,
    isall: false,
    icon: '../../images/right.png',
    list:[],
    proType: 0,
  },

  cellTap: function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var recordid = that.data.list[index].pk;

    wx.navigateTo({
      url: '../detail/detail?recordid=' +recordid+'&openid='+that.data.openid,
    })
  },

  selchange: function (e) {
    var that = this;
    var type = e.currentTarget.dataset.type;
    if ((type == "0" && that.data.isLeftSel == true) || (type == "1" && that.data.isLeftSel == false)) {
      return;
    }

    if (type == 0) {
      that.setData({
        isLeftSel: true,
        pageId: 1,
        list: [],
        isall: false,
        proType: 0
      })
    } else {
      that.setData({
        isLeftSel: false,
        pageId: 1,
        list: [],
        isall: false,
        proType: 1
      })
    }

    this.getRecordsList();

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    that.setData({
      openid: options.openid
    });

    that.getRecordsList();
  },

  getRecordsList:function(e){
    var that = this;
    if(that.data.isall){
      return;
    }
    console.log('getrecord:'+that.data.openid)
    console.log('getrecord:'+that.data.proType)
    wx.request({
      url: app.globalData.getRecordsUrl,
      data:{
        openid: that.data.openid,
        pageid: that.data.pageid,
        pagesize: that.data.pagesize,
        proType: that.data.proType
      },
      method:"GET",
      success(resp){
        if(resp.data.code == '0'){
          console.log(resp)
          var size = resp.data.pagesize;
          var pageid = resp.data.pageid;
          var cpageid = pageid;
          var len = resp.data.list.length;
          if(len == size){
            var list = resp.data.list;
            var old_list = that.data.list;
            var new_list = old_list.concat(list);
            if(pageid == 1){
              new_list = list;
            }
            console.log(JSON.stringify(new_list))
            pageid += 1;

            that.setData({
              list: new_list,
              pageid: pageid,
              current_page: cpageid
            });
          }else{
            that.setData({
              isall: true
            })
          }
        }
      }
    });
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
    var that = this;
    that.setData({
      pageid: 1,
      isall: false
    })
    that.getRecordsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if(that.data.isall){
      return;
    }
    that.getRecordsList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
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
    checkboxlist:[],
    deleteall: 0
  },

  cellTap: function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var recordid = that.data.list[index].pk;

    wx.navigateTo({
      url: '../detail/detail?recordid=' +recordid+'&openid='+that.data.openid,
    })
  },
  del:function(e){
    var that = this;
    var id_list = '';
    for (var ii = 0; that.data.checkboxlist.length > ii; ii++) {
      if(that.data.checkboxlist[ii] == 1){
        // 添加记录id
        id_list += that.data.list[ii].pk + ','
      }
    }
    if(id_list.length > 0){
      id_list = id_list.substring(0, id_list.length-1);
      console.log(id_list);
      wx.request({
        url: app.globalData.delRecordUrl,
        data:{
          openid: that.data.openid,
          id_list: id_list,
          proType: that.data.proType
        },
        method:"GET",
        success(resp){
          if(resp.data.code == '0'){
            that.setData({
              pageid: 1,
              list: [],
              deleteall: 0,
              checkboxlist:[]
            })
            that.getRecordsList();  
          }
        }
      });
    }
  },

  allbox: function(e){
    var that = this;
    var curr_statu = that.data.deleteall;
    var curr_box_list = that.data.checkboxlist;
    if(curr_statu == 0){
      for (var ii = 0; curr_box_list.length > ii; ii++) {
        curr_box_list[ii] = 1
      }
    }else{
      for (var ii = 0; curr_box_list.length > ii; ii++) {
        curr_box_list[ii] = 0
      }
    }
    that.data.deleteall = curr_statu == 1 ? 0 : 1;
    that.setData({
      deleteall: that.data.deleteall,
      checkboxlist: curr_box_list
    })

  },
  checkboxTap: function(e){
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    that.data.checkboxlist[index] = that.data.checkboxlist[index] == 1 ? 0 : 1;
    that.data.deleteall = that.data.checkboxlist[index] == 0 ? 0 : that.data.deleteall;
    that.setData({
      checkboxlist: that.data.checkboxlist,
      deleteall: that.data.deleteall
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
        pageid: 1,
        list: [],
        isall: false,
        proType: 0,
        checkboxlist:[]
      })
    } else {
      that.setData({
        isLeftSel: false,
        pageid: 1,
        list: [],
        isall: false,
        proType: 1,
        checkboxlist:[]
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
          if(len > 0){
            var list = resp.data.list;
            var old_list = that.data.list;
            var new_list = [...old_list,...list];
            var old_box_list = that.data.checkboxlist;
            var box_list = [];
            for (var ii = 0; len > ii; ii++) {
              box_list[ii] = 0
            }
            var new_box_list = [...old_box_list,...box_list];
            if(pageid == 1){
              new_list = list;
              new_box_list = box_list;
            }

            if(len == size){
              pageid += 1;
            }else{
              that.setData({
                isall: true
              })
            }
            
            that.setData({
              list: new_list,
              pageid: pageid,
              current_page: cpageid,
              checkboxlist: new_box_list
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
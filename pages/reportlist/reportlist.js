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
    list:[{'address':'123123'}],
    proType: 0,
    checkboxlist:[],
    deleteall: 0,
    reocrd_id:0
  },

  cellTap: function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var file_path = that.data.list[index]['file_path'];
    console.log(file_path)
    var URL = 'https://sgo.en.com.cn/' + file_path;
    var file_name = that.data.list[index].file_name;
    var file_title = that.data.list[index].address;
    wx.showModal({
      title: '提示',
      content: '是否转发文件',
      confirmText: '转发',
      success (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '下载中...',
            mask: true
          });
          wx.downloadFile({
            url: URL, // 下载url
            success (res) {
              // 下载完成后转发
              wx.shareFileMessage({
                filePath: res.tempFilePath,
                fileName: file_title+file_name,
                success() {},
                fail: console.error,
              })
            },
            fail: console.error,
            complete (res){
              wx.hideLoading();
            },
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  down:function(e){
    var that = this;
    var file_path = that.data.list[0]['file_path'];
    console.log(file_path)
    var URL = 'https://sgo.en.com.cn/' + file_path;
    var file_name = that.data.list[0].file_name;
    var file_title = that.data.list[0].address;
    wx.showLoading({
      title: '下载中...',
      mask: true
    });
    wx.downloadFile({
      url: URL, // 下载url
      success (res) {
        // 下载完成后转发
        wx.shareFileMessage({
          filePath: res.tempFilePath,
          fileName: file_title+file_name,
          success() {
            var file_path = that.data.list[1]['file_path'];
            console.log(file_path)
            var URL = 'https://sgo.en.com.cn/' + file_path;
            var file_name = that.data.list[1].file_name;
            var file_title = that.data.list[1].address;
            wx.showLoading({
              title: '下载中...',
              mask: true
            });
            wx.downloadFile({
              url: URL, // 下载url
              success (res) {
                // 下载完成后转发
                wx.shareFileMessage({
                  filePath: res.tempFilePath,
                  fileName: file_title+file_name,
                  success() {
                    var file_path = that.data.list[2]['file_path'];
                    console.log(file_path)
                    var URL = 'https://sgo.en.com.cn/' + file_path;
                    var file_name = that.data.list[2].file_name;
                    var file_title = that.data.list[2].address;
                    wx.showLoading({
                      title: '下载中...',
                      mask: true
                    });
                    wx.downloadFile({
                      url: URL, // 下载url
                      success (res) {
                        // 下载完成后转发
                        wx.shareFileMessage({
                          filePath: res.tempFilePath,
                          fileName: file_title+file_name,
                          success() {},
                          fail: console.error,
                        })
                      },
                      fail: console.error,
                      complete (res){
                        wx.hideLoading();
                      },
                    })
                  },
                  fail: console.error,
                })
              },
              fail: console.error,
              complete (res){
                wx.hideLoading();
              },
            })
          },
          fail: console.error,
        })
      },
      fail: console.error,
      complete (res){
        wx.hideLoading();
      },
    })
  },

  allbox: function(e){
    var that = this;
    
  },
  checkboxTap: function(e){
    var that = this;
    
  },

  selchange: function (e) {
    var that = this;
    
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    that.setData({
      record_id: options.record_id
    });

    that.getReportsList();
  },

  getReportsList:function(e){
    var that = this;
    console.log(that.data.record_id);
    wx.request({
      
      url: app.globalData.gelProjectsListUrl,
      data:{
        recordid: that.data.record_id
      },
      method:"GET",
      success(resp){
        if(resp.data.code == '0'){
          console.log(resp)
          that.setData({
            list:  resp.data.list
          });
          
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
    that.getReportsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if(that.data.isall){
      return;
    }
    that.getReportsList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
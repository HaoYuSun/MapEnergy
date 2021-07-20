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
    dianzhekou: '1',
  },

  /**
   * 电折扣改变时
   */
  dianzhekou_inp_blur: function(e){
    var that = this;
    if(that.data.dianzhekou == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          dianzhekou: 1
        });
      }else{
        return;
      }
    }else{
      if(e.detail.value == ''){
        that.setData({
          dianzhekou: 1
        });
      }else{
        that.setData({
          dianzhekou: Number(e.detail.value)
        });
      }
    }
  },
  dianzhekou_inp_focus: function(e){
    var that = this;
    that.setData({
      dianzhekou: ''
    });
  },

  /**
   * 平均电价改变时
   */
  pingjundianjia_inp_blur: function(e){
    var that = this;
    if(that.data.pingjundianjia == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          pingjundianjia: 0
        });
      }else{
        return;
      }
    }else{
      if(e.detail.value == ''){
        that.setData({
          pingjundianjia: 0
        });
      }else{
        that.setData({
          pingjundianjia: Number(e.detail.value)
        });
      }
    }
  },
  pingjundianjia_inp_focus: function(e){
    var that = this;
    that.setData({
      pingjundianjia: ''
    });
  },

  /**
   * 年总用电量改变时
   */
  nianzongyongdian_inp_blur: function(e){
    var that = this;
    if(that.data.nianzongyongdian == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          nianzongyongdian: 0
        });
      }else{
        return;
      }
    }else{
      if(e.detail.value == ''){
        that.setData({
          nianzongyongdian: 0
        });
      }else{
        that.setData({
          nianzongyongdian: Number(e.detail.value)
        });
      }
    }
  },
  nianzongyongdian_inp_focus: function(e){
    var that = this;
    that.setData({
      nianzongyongdian: ''
    });
  },

  /**
   * 项目地点改变时
   */
  reoirt_title_inp_blur: function(e){
    var that = this;
    if(that.data.report_title == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          report_title: ''
        });
      }else{
        return;
      }
    }else{
      if(e.detail.value == ''){
        that.setData({
          report_title: ''
        });
      }else{
        that.setData({
          report_title: e.detail.value
        });
      }
    }
  },
  reoirt_title_inp_focus: function(e){
    var that = this;
    that.setData({
      report_title: ''
    });
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
    console.log('title:', that.data.report_title)
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
          wx.showModal({
            title: '提示',
            content: '是否生成详细报告',
            confirmText: '生成',
            success (res) {
              if (res.confirm) {
                var createReportUrl = app.globalData.longReportUrl;
                wx.showLoading({
                  title: '生成中...',
                });
                wx.request({
                  url: createReportUrl,
                  data:{
                    'openid': that.data.openid,
                    'recordid': that.data.recordid
                  },
                  method:"GET",
                  success(res){
                    console.log(res)
                    if(res.data.code == '0'){
                      wx.showModal({
                        title: '提示',
                        content: '文件已生成。前往个人中心查看',
                        confirmText: '前往',
                        success (res) {
                          if (res.confirm) {
                            wx.redirectTo({
                              url: '../self/self',
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
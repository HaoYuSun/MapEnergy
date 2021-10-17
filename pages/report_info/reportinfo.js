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
    
    caigangleixing: ["角驰彩钢", "梯形彩钢"],
    caigangleixingIndex: 0,

    nianzongyongdian: '20',
    pingjundianjia: '1',
    dianzhekou: '0.85',
    bianyaqirongliang: '200',
    bianyaqimiaoshu: '',
    ziyouzijin:'100',
    tuoliumeidianjia: '0.40',
    wudingzujin: '0',

    yushedianlijierushijian: ["已完成", "1个月", "3个月内完成"],
    yushedianlijierushijianIndex: 0,

    fangwushiyongnianxian: ["3年内", "3-10年", "10年以上"],
    fangwushiyongnianxianIndex: 0,

    qiyegongzuoshijian: ["单休", "双休", "全年"],
    qiyegongzuoshijianIndex: 0,

    changfanggaodu: ["低", "中", "高"],
    changfanggaoduIndex: 0,

    report_address:'',

    yezhuxingzhi: ["普通", "地方龙头企业", "上市公司", "国企", "外企", "500强"],
    yezhuxingzhiIndex: 0,
    
    zaiheshuoming: ["不确定", "载荷满足", "加固后满足"],
    zaiheshuomingIndex: 0,

    changfangshuoming: [
      {name: '屋顶漏水', value: '屋顶漏水'},
      {name: '空管', value: '空管'},
      {name: '消防', value: '消防'},
      {name: '高空作业', value: '高空作业'}
    ],
    changfangshuoming_v:[]
  },
  checkboxChange: function (e) {
    var that = this;
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.changfangshuoming, values = e.detail.value;
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
      changfangshuoming: checkboxItems,
      changfangshuoming_v: e.detail.value
    });
},

  /**
   * 项目地址改变时
   */
  reoirt_addr_inp_blur: function(e){
    var that = this;
    if(that.data.report_address == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          report_address: ''
        });
      }else{
        return;
      }
    }else{
      if(e.detail.value == ''){
        that.setData({
          report_address: ''
        });
      }else{
        that.setData({
          report_address: e.detail.value
        });
      }
    }
  },
  reoirt_addr_inp_focus: function(e){
    var that = this;
    that.setData({
      report_address: ''
    });
  },

      /**
   * 载荷说明改变时
  */
 bindZaiheshuomingChange: function(e) {
  console.log('载荷说明，携带值为', e.detail.value);

  this.setData({
    zaiheshuomingIndex: e.detail.value
  })
},
    /**
   * 业主性质改变时
  */
 bindYezhuxingzhiChange: function(e) {
  console.log('业主性质，携带值为', e.detail.value);

  this.setData({
    yezhuxingzhiIndex: e.detail.value
  })
},

  /**
   * 厂房高度改变时
  */
 bindChangfanggaoduChange: function(e) {
  console.log('厂房高度，携带值为', e.detail.value);

  this.setData({
    changfanggaoduIndex: e.detail.value
  })
},

  /**
   * 企业工作时间改变时
  */
 bindQiyegongzuoshijianChange: function(e) {
  console.log('企业工作时间，携带值为', e.detail.value);

  this.setData({
    qiyegongzuoshijianIndex: e.detail.value
  })
},

 /**
   * 预计电力接入时间改变时
  */
 bindDianlijierushijianChange: function(e) {
  console.log('预计电力接入时间改变时，携带值为', e.detail.value);

  this.setData({
    fangwushiyongnianxianIndex: e.detail.value
  })
},
  /**
   * 房屋使用时间改变时
  */
 bindFangwushiyongnianxianChange: function(e) {
    console.log('picker hezuomoshi 发生选择改变，携带值为', e.detail.value);

    this.setData({
      fangwushiyongnianxianIndex: e.detail.value
    })
  },

  /**
   * 屋顶租金改变时
   */
  wudingzujin_inp_blur: function(e){
    var that = this;
    if(that.data.wudingzujin == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          wudingzujin: '0'
        });
      }else{
        return;
      }
    }else{
      if(e.detail.value == ''){
        that.setData({
          wudingzujin: '0'
        });
      }else{
        that.setData({
          wudingzujin: Number(e.detail.value)
        });
      }
    }
  },
  wudingzujin_inp_focus: function(e){
    var that = this;
    that.setData({
      wudingzujin: ''
    });
  },

/**
   * 脱硫煤电价改变时
   */
  tuoliumeidianjia_inp_blur: function(e){
    var that = this;
    if(that.data.tuoliumeidianjia == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          tuoliumeidianjia: '0'
        });
      }else{
        return;
      }
    }else{
      if(e.detail.value == ''){
        that.setData({
          tuoliumeidianjia: '0'
        });
      }else{
        that.setData({
          tuoliumeidianjia: e.detail.value
        });
      }
    }
  },
  tuoliumeidianjia_inp_focus: function(e){
    var that = this;
    that.setData({
      tuoliumeidianjia: ''
    });
  },

  /**
   * 自有资金改变时
   */
  ziyouzijin_inp_blur: function(e){
    var that = this;
    if(that.data.ziyouzijin == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          ziyouzijin: '100'
        });
      }else{
        return;
      }
    }else{
      if(e.detail.value == ''){
        that.setData({
          ziyouzijin: '100'
        });
      }else{
        that.setData({
          ziyouzijin: e.detail.value
        });
      }
    }
  },
  ziyouzijin_inp_focus: function(e){
    var that = this;
    that.setData({
      ziyouzijin: ''
    });
  },

  /**
   * 变压器容量描述改变时
   */
  bianyaqimiaoshu_inp_blur: function(e){
    var that = this;
    if(that.data.bianyaqimiaoshu == e.detail.value){
      return;
    }else{
      that.setData({
        bianyaqimiaoshu: e.detail.value
      });
    }
  },

  /**
   * 变压器容量改变时
   */
  bianyaqirongliang_inp_blur: function(e){
    var that = this;
    if(that.data.bianyaqirongliang == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          bianyaqirongliang: '200'
        });
      }else{
        return;
      }
    }else{
      if(e.detail.value == ''){
        that.setData({
          bianyaqirongliang: '200'
        });
      }else{
        that.setData({
          bianyaqirongliang: e.detail.value
        });
      }
    }
  },
  bianyaqirongliang_inp_focus: function(e){
    var that = this;
    that.setData({
      bianyaqirongliang: ''
    });
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
  /**
   * 彩钢类型
  */
 bindCaigangleixingChange: function(e) {
  console.log('picker caigangleixing 发生选择改变，携带值为', e.detail.value);

  this.setData({
    caigangleixingIndex: e.detail.value
  })
},

  submitForm() {
    var that = this;
    console.log('title:', that.data.report_title)
    console.log('ziyouzijin:', that.data.ziyouzijin)
    wx.request({
      url: app.globalData.upReportInfoUrl,
      data:{
        'openid': that.data.openid,
        'recordid': that.data.recordid,
        'report_title': that.data.report_title,
        'dianyadengji': that.data.dianyadengji[that.data.dianyadengjiIndex],
        'hezuomoshi': that.data.hezuomoshi[that.data.hezuomoshiIndex],
        'wudingleixing': that.data.wudingleixing[that.data.wudingleixingIndex],
        'caigangleixing': that.data.caigangleixing[that.data.caigangleixingIndex],
        'nianzongyongdian': that.data.nianzongyongdian,
        'pingjundianjia': that.data.pingjundianjia,
        'dianzhekou': that.data.dianzhekou,
        'wudingzujin': that.data.wudingzujin,
        'bianyaqirongliang': that.data.bianyaqirongliang,
        'bianyaqimiaoshu': that.data.bianyaqimiaoshu,
        'ziyouzijin': that.data.ziyouzijin,
        'tuoliumeidianjia': that.data.tuoliumeidianjia,

        'yushedianlijierushijian': that.data.yushedianlijierushijian[that.data.yushedianlijierushijianIndex],
        'fangwushiyongnianxian': that.data.fangwushiyongnianxian[that.data.fangwushiyongnianxianIndex],
        'qiyegongzuoshijian': that.data.qiyegongzuoshijian[that.data.qiyegongzuoshijianIndex],
        'changfanggaodu': that.data.changfanggaodu[that.data.changfanggaoduIndex],
        'yezhuxingzhi': that.data.yezhuxingzhi[that.data.yezhuxingzhiIndex],
        'zaiheshuoming': that.data.zaiheshuoming[that.data.zaiheshuomingIndex],
        'report_address': that.data.report_address,
        'changfangshuoming': that.data.changfangshuoming_v
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
                  mask: true
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

    var getReportInfoUrl = app.globalData.getReportInfoUrl;
    wx.showLoading({
      title: '生成中...',
      mask: true
    });
    wx.request({
      url: getReportInfoUrl,
      data:{
        'openid': that.data.openid,
        'recordid': that.data.recordid
      },
      // data:{
      //   'openid': 'oi3_x4o3V5dAlMi1-IF1BHy6WXBY',
      //   'recordid': 813
      // },
      method:"GET",
      success(res){
        console.log(res)
        if(res.data.code == '0'){
          
          that.setData({
            bianyaqimiaoshu: res.data.info.bianyaqimiaoshu,
            bianyaqirongliang: res.data.info.bianyaqirongliang,
            dianzhekou: res.data.info.dianzhekou,
            wudingzujin: res.data.info.wudingzujin,
            nianzongyongdian: res.data.info.nianzongyongdian,
            pingjundianjia: res.data.info.pingjundianjia,
            report_title: res.data.info.report_title,
            ziyouzijin: res.data.info.ziyouzijin,
            dianyadengjiIndex: that.data.dianyadengji.indexOf(res.data.info.dianyadengji) >= 0 ? that.data.dianyadengji.indexOf(res.data.info.dianyadengji) : 0,
            hezuomoshiIndex: that.data.hezuomoshi.indexOf(res.data.info.hezuomoshi) >= 0 ? that.data.hezuomoshi.indexOf(res.data.info.hezuomoshi) : 0,
            wudingleixingIndex: that.data.wudingleixing.indexOf(res.data.info.wudingleixing) >= 0 ? that.data.wudingleixing.indexOf(res.data.info.wudingleixing) : 0,
            caigangleixingIndex: that.data.caigangleixing.indexOf(res.data.info.caigangleixing) >= 0 ? that.data.caigangleixing.indexOf(res.data.info.caigangleixing) : 0,
            tuoliumeidianjia: res.data.info.tuoliumeidianjia,
            report_address : res.data.info.report_address,

            yushedianlijierushijianIndex: that.data.yushedianlijierushijian.indexOf(res.data.info.yushedianlijierushijian) >= 0 ? that.data.yushedianlijierushijian.indexOf(res.data.info.yushedianlijierushijian) : 0,
            fangwushiyongnianxianIndex: that.data.fangwushiyongnianxian.indexOf(res.data.info.fangwushiyongnianxian) >= 0 ? that.data.fangwushiyongnianxian.indexOf(res.data.info.fangwushiyongnianxian) : 0,
            qiyegongzuoshijianIndex: that.data.qiyegongzuoshijian.indexOf(res.data.info.qiyegongzuoshijian) >= 0 ? that.data.qiyegongzuoshijian.indexOf(res.data.info.qiyegongzuoshijian) : 0,
            changfanggaoduIndex: that.data.changfanggaodu.indexOf(res.data.info.changfanggaodu) >= 0 ? that.data.changfanggaodu.indexOf(res.data.info.changfanggaodu) : 0,
            yezhuxingzhiIndex: that.data.yezhuxingzhi.indexOf(res.data.info.yezhuxingzhi) >= 0 ? that.data.yezhuxingzhi.indexOf(res.data.info.yezhuxingzhi) : 0,
            zaiheshuomingIndex: that.data.zaiheshuoming.indexOf(res.data.info.zaiheshuoming) >= 0 ? that.data.zaiheshuoming.indexOf(res.data.info.zaiheshuoming) : 0,
            changfangshuoming : res.data.info.changfangshuoming
          })
        }
      },
      complete(){
        wx.hideLoading();
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
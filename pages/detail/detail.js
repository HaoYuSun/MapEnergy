// pages/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromopenid: '',
    recordid: 0,
    openid:'',
    area: 0,  // 面积
    area_rate: 0.8,
    install_area: 0,  //安装容量
    sum_price: 0,  // 总投资金额
    generating_year: 0,  // 年发电量

    year_light: 1200,

    w_cost:4,  // 每瓦成本
    country_subsidy: 0,  // 国家补贴
    local_subsidy: 0,  // 本地补贴
    init_subsidy: 0,  // 初装补贴
    yield: 0.65,  // 度电收益

    rent: 0,  // 租金
    operational_cost: 0.05,  // 运维成本
    yield_year: 0,  // 年收益
    pre_tax_yield_year: 0,  // 税前年收益
    back_period: 0,  // 回本周期

    cost: 0,

    latitude: 0,//纬度
    longitude: 0,//经度
    //标记点
    polygons: [],
    polygons_points: [],
    markers:[],
    customCalloutInfo:{
      id: 999,
      install_edcapacity: 0,  // 装机量
      sum_price: 0,
      area: 0,
      year_generating_capacity: 0,
      year_light: 1200
    },
  },

  /**
   * 生成简单报告
   */
  createshortreport: function(e){
    var that = this;
    var shortReportUrl = app.globalData.shortReportUrl;
    wx.showLoading({
      title: '生成中...',
      mask: true
    });
    wx.request({
      url: shortReportUrl,
      data:{
        'openid': that.data.openid,
        'recordid': that.data.recordid
      },
      method:"GET",
      success(res){
        console.log(res)
        if(res.data.code == '0'){
          var URL = 'https://sgo.en.com.cn/' + res.data.file_path;
          var file_name = res.data.file_name;
          wx.showModal({
            title: '提示',
            content: '文件已生成',
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
                      fileName: file_name,
                      success() {},
                      fail: console.error,
                    })
                  },
                  fail: console.error,
                  complete (res){
                    wx.hideLoading();
                  }
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
  /**
   * 生成详细报告
   */
  createlongreport: function(e){
    var that = this;
    wx.navigateTo({
      url: '../report_info/reportinfo?recordid=' +that.data.recordid+'&openid='+that.data.openid,
    })
    
  },
  /**
   * 更新页面数据
   */
  updatePageData: function(e){
      var that = this;
      // * Number(that.data.area_rate)
      console.log('area:',that.data.area)
      console.log('area_rate:',that.data.area_rate)
      console.log('area_rate:',parseFloat(that.data.area) * parseFloat(that.data.area_rate) * 100 * 1.2 / 10000.0)
      var zhuangjirongliang = Math.floor(parseFloat(that.data.area) * parseFloat(that.data.area_rate) * 100 * 1.2 / 10000.0) / 100.0;
      var sumprice = Math.ceil(zhuangjirongliang * that.data.w_cost * 100);
      var year_generating_capacity = Math.ceil(zhuangjirongliang * that.data.year_light / 10);
      that.setData({
        install_area: zhuangjirongliang,
        sum_price: sumprice,
        generating_year: year_generating_capacity
      })
      //投资成本
      var cost = 0;
      that.data.sum_price = Number(that.data.w_cost) * Number(that.data.install_area) * 100;
      cost = Math.floor((Number(that.data.sum_price) -  Number(that.data.init_subsidy) * Number(that.data.install_area)*100) * 100) / 100;
      if(cost < 0){
        cost = 0;
      }
      
      // 年收益 = 年发电量*(国家补贴+地方补贴+度电收益) - 面积*租金/10000 - 运维成本*安装容积*100
      console.log(Number(that.data.area) * Number(that.data.area_rate) * Number(that.data.rent) / 10000.0)
      var yield_year = Number(that.data.generating_year) * (Number(that.data.country_subsidy) + Number(that.data.local_subsidy) + Number(that.data.yield)) - Number(that.data.area) * Number(that.data.rent) / 10000.0 - Number(that.data.operational_cost) * Number(that.data.install_area) * 100;
      yield_year = Math.floor(yield_year * 100) / 100;
      // if(yield_year < 0){
      //   yield_year = 0;
      // }

      // 税前年收益 = 年收益 / 总投资金额
      var pre_tax_yield_year = 0;
      if(that.data.sum_price > 0){
        if(cost > 0){
          pre_tax_yield_year = Math.floor(yield_year * 10000.0 / cost) / 100;
        }else{
          pre_tax_yield_year = 0
        }
      }
 
      // 回本周期 = 总投资金额 / 年收益
      var back_period = 0;
      if(yield_year > 0){
        back_period = Math.floor(cost * 100.0 / yield_year) / 100;
      }

      console.log(cost);
      that.setData({
        yield_year: yield_year,
        pre_tax_yield_year: pre_tax_yield_year,
        back_period: back_period,
        cost: cost
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 分享来的
    if(options.fromopenid){
      that.setData({
        fromopenid: options.fromopenid
      })
    }

    if(options.recordid){
      that.setData({
        recordid: options.recordid
      })
    }

    if(options.openid){
      that.setData({
        openid: options.openid
      })
      //有openid后再取详情
      that.getDetail();
    }else{
      // 获取openid
      wx.login({
        success: function (r) {
          var code = r.code;//登录凭证
          let getOpenidUrl = app.globalData.getOpenidUrl;
          wx.request({
            url: getOpenidUrl,
            data:{
              js_code: code,
            },
            method:"GET",
            success(res){
              if(res.data.code == '0'){
                console.log(res)
                app.globalData.openid=res.data.openid;
                that.setData({
                  openid: res.data.openid
                })
                //有openid后再取详情
                that.getDetail();
              }
              // console.log(that.globalData.openid)
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
    }
  },

  updetail: function(e){
    var that = this;
    wx.request({
      url: app.globalData.upRecordDetailUrl,
      data:{
        openid: that.data.openid,
        recordid: that.data.recordid,
        w_cost: that.data.w_cost,  // 每瓦成本
        country_subsidy: that.data.country_subsidy,  // 国家补贴
        local_subsidy: that.data.local_subsidy,  // 本地补贴
        init_subsidy: that.data.init_subsidy,  // 初装补贴
        w_yield: that.data.yield,  // 度电收益
        rent: that.data.rent,  // 租金
        operational_cost: that.data.operational_cost,  // 运维成本
        area_rate: that.data.area_rate,
        install_area: that.data.install_area,
        sum_price: that.data.sum_price,
        generating_year: that.data.generating_year
      },
      method:"GET",
      success(resp){
        if(resp.data.code == '0'){
          wx.showModal({
            title: '提示',
            confirmText: '确定',
            showCancel: false,
            content: '保存成功',
          })
        }
      }
    });
  },

  getDetail: function(e){
    var that = this;
    wx.request({
      url: app.globalData.getRecordDetailUrl,
      data:{
        openid: that.data.openid,
        recordid: that.data.recordid,
        fromopenid: that.data.fromopenid
      },
      method:"GET",
      success(resp){
        if(resp.data.code == '0'){
          console.log(resp)
          that.setData({
            latitude: resp.data.detail.latitude,
            longitude: resp.data.detail.longitude,
            polygons: JSON.parse(resp.data.detail.polygons),
            area: resp.data.detail.area,  // 面积
            area_rate: resp.data.detail.area_rate,
            install_area: resp.data.detail.install_area,  //安装容量
            sum_price: resp.data.detail.sum_price,  // 总投资金额
            generating_year: resp.data.detail.generating_year,  // 年发电量
            year_light: resp.data.detail.year_light,
            w_cost: resp.data.detail.w_cost,  // 每瓦成本
            country_subsidy: resp.data.detail.country_subsidy,  // 国家补贴
            local_subsidy: resp.data.detail.local_subsidy,  // 本地补贴
            init_subsidy: resp.data.detail.init_subsidy,  // 初装补贴
            yield: resp.data.detail.w_yield,  // 度电收益

            rent: resp.data.detail.rent,  // 租金
            operational_cost: resp.data.detail.operational_cost,  // 运维成本
            cost: Number(resp.data.detail.sum_price) - Math.floor(Number(resp.data.detail.init_subsidy) * Number(resp.data.detail.install_area)*100 * 100) / 100
          });

          that.updatePageData();
        }
      }
    });
  },

  /**
   * 房屋利用率改变时
   */
  area_rate_inp_blur: function(e){
    var that = this;
    if(that.data.area_rate == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          area_rate: 0
        });
        this.updatePageData();
      }else{
        return;
      }
    }else{
      if(e.detail.value == ''){
        that.setData({
          area_rate: 0
        });
      }else{
        that.setData({
          area_rate: Number(e.detail.value)
        });
      }
      this.updatePageData();
    }
  },
  area_rate_inp_focus: function(e){
    var that = this;
    that.setData({
      area_rate: ''
    });
  },

  /**
   * 每瓦成本改变时
   */
  w_cost_inp_blur: function(e){
    var that = this;
    console.log(e)
    if(that.data.w_cost == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          w_cost: 0
        });
        this.updatePageData();
      }else{
        return;
      }
      
    }else{
      console.log('===='+e.detail.value)
      if(e.detail.value == ''){
        that.setData({
          w_cost: 0
        });
      }else{
        that.setData({
          w_cost: Number(e.detail.value)
        });
      }
      
      this.updatePageData();
    }
  },
  w_cost_inp_focus: function(e){
    var that = this;
    that.setData({
      w_cost: ''
    });
  },

  /**
   * 国家补贴改变时
   */
  country_subsidy_inp_blur: function(e){
    var that = this;
    if(that.data.country_subsidy == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          country_subsidy: 0
        });
        this.updatePageData();
      }else{
        return;
      }
    }else{
      that.setData({
        country_subsidy: Number(e.detail.value)
      });
      this.updatePageData();
    }
  },
  country_subsidy_inp_focus: function(e){
    var that = this;
    that.setData({
      country_subsidy: ''
    });
  },

   /**
   * 地方补贴改变时
   */
  local_subsidy_inp_blur: function(e){
    var that = this;
    if(that.data.local_subsidy == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          local_subsidy: 0
        });
        this.updatePageData();
      }else{
        return;
      }
    }else{
      that.setData({
        local_subsidy: Number(e.detail.value)
      });
      this.updatePageData();
    }
  },
  local_subsidy_inp_focus: function(e){
    var that = this;
    that.setData({
      local_subsidy: ''
    });
  },

  /**
   * 初装补贴改变时
   */
  init_subsidy_inp_blur: function(e){
    var that = this;
    if(that.data.init_subsidy == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          init_subsidy: 0
        });
        this.updatePageData();
      }else{
        return;
      }
    }else{
      that.setData({
        init_subsidy: Number(e.detail.value)
      });
      this.updatePageData();
    }
  },
  init_subsidy_inp_focus: function(e){
    var that = this;
    that.setData({
      init_subsidy: ''
    });
  },

  /**
   * 度电收益改变时
   */
  yield_inp_blur: function(e){
    var that = this;
    if(that.data.yield == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          yield: 0
        });
        this.updatePageData();
      }else{
        return;
      }
    }else{
      that.setData({
        yield: Number(e.detail.value)
      });
      this.updatePageData();
    }
  },
  yield_inp_focus: function(e){
    var that = this;
    that.setData({
      yield: ''
    });
  },

  /**
   * 租金改变时
   */
  rent_inp_blur: function(e){
    var that = this;
    if(that.data.rent == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          rent: 0
        });
        this.updatePageData();
      }else{
        return;
      }
    }else{
      that.setData({
        rent: Number(e.detail.value)
      });
      this.updatePageData();
    }
  },
  rent_inp_focus: function(e){
    var that = this;
    that.setData({
      rent: ''
    });
  },

  /**
   * 运维成本改变时
   */
  operational_cost_inp_blur: function(e){
    var that = this;
    if(that.data.operational_cost == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          operational_cost: 0
        });
        this.updatePageData();
      }else{
        return;
      }
    }else{
      that.setData({
        operational_cost: Number(e.detail.value)
      });
      this.updatePageData();
    }
  },
  operational_cost_inp_focus: function(e){
    var that = this;
    that.setData({
      operational_cost: ''
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
  onShareAppMessage(res) {
    var that = this;
    console.log('share:'+that.data.openid)
    let sendurl = encodeURIComponent('/pages/detail/detail?recordid=' +that.data.recordid+'&fromopenid='+that.data.openid);
    return {
      title: '能源预算',
      path: `/pages/index/index?fromopenid=${that.data.openid}&url=${sendurl}` // 分享后打开的页面
    }
  },
})
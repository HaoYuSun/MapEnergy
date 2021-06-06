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
   * 更新页面数据
   */
  updatePageData: function(e){
      var that = this;

      // 年收益
      var yield_year = that.data.generating_year * (that.data.country_subsidy + that.data.local_subsidy + that.data.init_subsidy + that.data.yield - that.data.rent / 10000.0) - that.data.operational_cost * that.data.install_area * 100;
      yield_year = Math.floor(yield_year * 100) / 100;

      // 税前年收益
      var pre_tax_yield_year = 0;
      if(that.data.sum_price > 0){
        pre_tax_yield_year = Math.floor(yield_year * 10000.0 / that.data.sum_price) / 100;
      }
 
      // 回本周期
      var back_period = 0;
      if(yield_year > 0){
        back_period = Math.floor(that.data.sum_price * 100.0 / yield_year) / 100;
      }

      that.setData({
        yield_year: yield_year,
        pre_tax_yield_year: pre_tax_yield_year,
        back_period: back_period
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(Object.keys(options).length)
    console.log(options.recordid)

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
              console.log(that.globalData.openid)
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
          });

          that.updatePageData();
        }
      }
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
  onShareAppMessage: function () {

  }
})
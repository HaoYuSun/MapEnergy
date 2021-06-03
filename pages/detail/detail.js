// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    console.log(options)
    if(Object.keys(options).length > 0){
      var obj = JSON.parse(options.para);
      that.setData({
        area: obj.area,  // 面积
        install_area: obj.install_edcapacity,  //安装容量
        sum_price: obj.sum_price,  // 总投资金额
        generating_year: obj.year_generating_capacity,  // 年发电量
        openid: obj.openid,
        year_light: obj.year_light
      });
    }
    this.updatePageData();
  },

  /**
   * 每瓦成本改变时
   */
  w_cost_inp_blur: function(e){
    var that = this;
    if(that.data.w_cost == e.detail.value){
      return;
    }else{
      that.setData({
        w_cost: Number(e.detail.value)
      });
      this.updatePageData();
    }
  },

  /**
   * 国家补贴改变时
   */
  country_subsidy_inp_blur: function(e){
    var that = this;
    if(that.data.country_subsidy == e.detail.value){
      return;
    }else{
      that.setData({
        country_subsidy: Number(e.detail.value)
      });
      this.updatePageData();
    }
  },

   /**
   * 地方补贴改变时
   */
  local_subsidy_inp_blur: function(e){
    var that = this;
    if(that.data.local_subsidy == e.detail.value){
      return;
    }else{
      that.setData({
        local_subsidy: Number(e.detail.value)
      });
      this.updatePageData();
    }
  },

  /**
   * 初装补贴改变时
   */
  init_subsidy_inp_blur: function(e){
    var that = this;
    if(that.data.init_subsidy == e.detail.value){
      return;
    }else{
      that.setData({
        init_subsidy: Number(e.detail.value)
      });
      this.updatePageData();
    }
  },

  /**
   * 度电收益改变时
   */
  yield_inp_blur: function(e){
    var that = this;
    if(that.data.yield == e.detail.value){
      return;
    }else{
      that.setData({
        yield: Number(e.detail.value)
      });
      this.updatePageData();
    }
  },

  /**
   * 租金改变时
   */
  rent_inp_blur: function(e){
    var that = this;
    if(that.data.rent == e.detail.value){
      return;
    }else{
      that.setData({
        rent: Number(e.detail.value)
      });
      this.updatePageData();
    }
  },

  /**
   * 运维成本改变时
   */
  operational_cost_inp_blur: function(e){
    var that = this;
    if(that.data.operational_cost == e.detail.value){
      return;
    }else{
      that.setData({
        operational_cost: Number(e.detail.value)
      });
      this.updatePageData();
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
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    openid: '',


    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    userName: '',
    userImg: '',
    sOpenId: app.globalData.sOpenId,
    isLeftSel: true,
    HomeUserProList: {},
    pageId: 1,
    pageSize: 8,
    isLoaded: false,
    proType: 0,
    money: 0.00
  },

  goyue: function(e){
    wx.navigateTo({
      url: '../balance/balance?sOpenId=' + app.globalData.sOpenId,
    })
  },

  celltap: function(e){
    var that = this;

    var pmid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../prodetail/prodetail?pmId=' + pmid+'&sOpenId='+ app.globalData.sOpenId+'&forSelf=1&projectId=0',
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
        HomeUserProList: {},
        isLoaded: false,
        proType: 0
      })
    } else {
      that.setData({
        isLeftSel: false,
        pageId: 1,
        HomeUserProList: {},
        isLoaded: false,
        proType: 1
      })
    }

    this.getsellist();

  },

  

  
  getsellist: function () {
    var that = this;
    if (that.data.isLoaded == true) {
      return;
    }
    var url1 = "https://ai.en.com.cn/user/getSelfProList";
    wx.request({
      url: url1,
      data: {
        sOpenId: app.globalData.sOpenId,
        type: that.data.proType,
        pageId: that.data.pageId,
        pageSize: that.data.pageSize
      },
      method: 'GET',
      success: function (res) {
        if(res.data.ErrCode == 0){
          var isover = false;
          if (res.data.HomeUserProList == null || res.data.HomeUserProList.length < 8) {
            isover = true;
          } else {
            this.data.pageId += 1;
          }

          that.setData({
            HomeUserProList: res.data.HomeUserProList,
          })
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (app.globalData.userInfo) {
      console.log('获取个人信222息')
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log('获取个人信息')
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    if (app.globalData.openid && app.globalData.openid != '') {
      this.setData({
        openid: app.globalData.openid
      });
    } else {
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
                that.setData({
                  openid: res.data.openid
                });
              }
            }
          });
        },
        fail: function () {
          console.log('系统错误')
        }
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
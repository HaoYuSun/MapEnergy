const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
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

  getUserInfo: function (e) {
    console.log(e)
    var that = this;
    app.globalData.userInfo = e.detail.userInfo
    var encryptedData = e.detail.encryptedData
    var iv = e.detail.iv
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var getUnionIdUrl = "https://ai.en.com.cn/miniapp/login";
        wx.request({
          url: getUnionIdUrl,
          data: {
            code: res.code
          },
          method: 'GET',
          success: function (res) {
            app.globalData.sOpenId = res.data.OpenId;
            that.setData({
              sOpenId: res.data.OpenId
            });


            var getUnionId = "https://ai.en.com.cn/miniapp/getUnionId";
            wx.request({
              url: getUnionId,
              data: {
                session_key: res.data.Session_Key,
                iv: iv,
                encryptedData: encryptedData,
                sOpenId: res.data.OpenId
              },
              method: 'GET',
              success: function (res) {
                if (res.data.ErrCode == 0) {
                  that.setData({
                    unionId: res.data.Msg
                  })
                  app.globalData.unionId = res.data.Msg;
                  that.getselinfo();
                }


              }
            })
          }
        })
      }
    })
  },

  getselinfo: function () {
    var that = this;
    if (app.globalData.sOpenId == ''){
      return;
    }
    
    var url1 = "https://ai.en.com.cn/user/getUserInfo";
    wx.request({
      url: url1,
      data: {
        sOpenId: app.globalData.sOpenId
      },
      method: 'GET',
      success: function (res) {
        if(res.data.ErrCode == 0){
          that.setData({
            userName: res.data.UserName,
            userImg: res.data.UserHeadImg,
            money: res.data.Money
          })
          that.getsellist();
        }
        
      }
    })
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
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        sOpenId: app.globalData.sOpenId
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    this.getselinfo();
    
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
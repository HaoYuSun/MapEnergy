// pages/webview/webview.js
var config = require("../../config.js");
var util = require("../../utils/api.js").TendxunAPI;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: 'https://api.sgosgo.com/test',
    webUrl: 'https://api.sgosgo.com/test',
    showNav: false,
    address: '',
    latitude: '',
    longitude: '',
    cityPath: '',
    citySelected: ''
  },

  /**
   * 地图查找
  */
  search: function(e){
      var that = this;
      wx.chooseLocation({
        latitude: that.data.latitude,
        longitude: that.data.longitude,
        success: res => {
          // that.getValueMap(res)
          that.setData({
            /*赋值*/
            latitude: res.latitude,
            longitude: res.longitude,
            address: res.name,
          })
  
  
          var param = {
            location: res.latitude + ',' + res.longitude,
            key: app.globalData.map_key,
            get_poi: 1
          }
          //下面是get去请求数据
          var url = config.qqMapApi
          util.postrequest(url, param).then(res => {
            var d = res.data.result
            console.log(d)
            that.setData({
              citySelected: d.address_component.city,
              cityPath: d.address_component.province+'-'+d.address_component.city+'-'+d.address_component.district
            })
            that.setData({
              webUrl : that.data.baseUrl + '?openid=' + that.data.openid + '&lat=' + that.data.latitude + '&lng=' + that.data.longitude+ '&citySelected='+that.data.citySelected + '&cityPath='+that.data.cityPath+'&address='+ that.data.address
            })
          })
        },
        fail: res => {
          console.log('打开地图选择位置取消', res)
        }
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    setTimeout(() => {
      that.setData({
        showNav: true
      })
    }, 300);

    

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


    wx.getLocation({
      type: 'wgs84',
      success (res) {
         var latitude = Math.floor(parseFloat(res.latitude) * 1000000) / 1000000;
         var longitude = Math.floor(parseFloat(res.longitude) * 1000000) / 1000000;
         var param = {
            location: res.latitude + ',' + res.longitude,
            key: app.globalData.map_key,
            get_poi: 1
          }
          //下面是get去请求数据
          var url = config.qqMapApi
          util.postrequest(url, param).then(res => {
            var d = res.data.result;
            console.log('333333333')
            console.log(d)
            that.setData({
              citySelected: d.address_component.city,
              cityPath: d.address_component.province+'-'+d.address_component.city+'-'+d.address_component.district,
              latitude: latitude,
              longitude: longitude,
              address:d.address,
              webUrl : that.data.baseUrl + '?openid=' + that.data.openid + '&lat=' + latitude + '&lng=' + longitude+ '&citySelected='+d.address_component.city + '&cityPath='+d.address_component.province+'-'+d.address_component.city+'-'+d.address_component.district+'&address='+ d.address
            })
            console.log(that.data.webUrl)
          })
      }
    });

    
  },
/**
   * 移动到当前位置
  */
  moveToLocation: function () {
      var that = this;
  wx.getLocation({
    type: 'wgs84',
    success (res) {
       var latitude = Math.floor(parseFloat(res.latitude) * 1000000) / 1000000;
       var longitude = Math.floor(parseFloat(res.longitude) * 1000000) / 1000000;
       var param = {
          location: res.latitude + ',' + res.longitude,
          key: app.globalData.map_key,
          get_poi: 1
        }
        //下面是get去请求数据
        var url = config.qqMapApi
        util.postrequest(url, param).then(res => {
          var d = res.data.result;
          var r = Math.round(Math.random(10000)*10000);
          that.setData({
            citySelected: d.address_component.city,
            cityPath: d.address_component.province+'-'+d.address_component.city+'-'+d.address_component.district,
            latitude: latitude,
            longitude: longitude,
            address:d.address,
            webUrl : that.data.baseUrl + '?openid=' + that.data.openid + '&lat=' + latitude + '&lng=' + longitude+ '&citySelected='+d.address_component.city + '&cityPath='+d.address_component.province+'-'+d.address_component.city+'-'+d.address_component.district+'&address='+ d.address+'&r='+ r
          })
          console.log(that.data.webUrl)
        })
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
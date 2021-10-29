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

  moveToNav: function(e) {
    var that = this;
    wx.navigateBack({
      delta: 0,
    })
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

        var latitude = parseFloat(res.latitude);
        var longitude = parseFloat(res.longitude);
        let pi = 3.1415926535897932384626;
        let a = 6378245.0;
        let ee = 0.00669342162296594323;
        let dLat = that.transformLat(longitude - 105.0, latitude - 35.0);
        let dLon = that.transformLon(longitude - 105.0, latitude - 35.0);
        let radLat = latitude / 180.0 * pi;
        let magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        let sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
        let mgLat = latitude + dLat;
        let mgLon = longitude + dLon;
        let lontitude1 = longitude * 2 - mgLon;
        let latitude1 = latitude * 2 -mgLat;
        console.log(latitude1, lontitude1);


          that.setData({
            /*赋值*/
            latitude: latitude1,
            longitude: lontitude1,
            address: res.name,
          })
  
  
          var param = {
            location:  latitude1 + ',' + lontitude1,
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
              webUrl : that.data.baseUrl + '?openid=' + that.data.openid + '&lat=' +   latitude1  + '&lng=' +  lontitude1+ '&citySelected='+that.data.citySelected + '&cityPath='+that.data.cityPath+'&address='+ that.data.address
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
        //  var latitude = Math.floor(parseFloat(res.latitude) * 1000000) / 1000000;
        //  var longitude = Math.floor(parseFloat(res.longitude) * 1000000) / 1000000;

        console.log(res.latitude, res.longitude);
        var latitude = parseFloat(res.latitude);
        var longitude = parseFloat(res.longitude);

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

  transformLat: function(x, y) {
    let pi = 3.1415926535897932384626;
    let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y
            + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
    return ret;
  },
  transformLon( x,  y) {
    let pi = 3.1415926535897932384626;
    let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1
            * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0
            * pi)) * 2.0 / 3.0;
    return ret;
  },
  transform: function( lat,  lon) {
    let pi = 3.1415926535897932384626;
    let a = 6378245.0;
    let ee = 0.00669342162296594323;
    if (outOfChina(lat, lon)) {
        return mgLat,mgLon;
    }
    let dLat = transformLat(lon - 105.0, lat - 35.0);
    let dLon = transformLon(lon - 105.0, lat - 35.0);
    let radLat = lat / 180.0 * pi;
    let magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    let sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
    dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
    let mgLat = lat + dLat;
    let mgLon = lon + dLon;
    return mgLat,mgLon;
  },
  outOfChina: function( lat,  lon) {
    if (lon < 72.004 || lon > 137.8347)
        return true;
    if (lat < 0.8293 || lat > 55.8271)
        return true;
    return false;
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
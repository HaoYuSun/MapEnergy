// index.js
// https://developers.weixin.qq.com/miniprogram/dev/extended/component-plus/index-list.html
// 获取应用实例
var config = require("../../config.js");
var util = require("../../utils/api.js").TendxunAPI;
var area_api = require("../../utils/area.js").AreaAPI;
const app = getApp()

// 引入SDK核心类
var QQMapWX = require('../../qqmap-wx-jssdk.js');
const area = require("../../utils/area.js");

Page({
  data: {
    openid: '',
    address: '',
    inputModel: '',
    inputFocus: '',
    latitude: 0,//纬度
    longitude: 0,//经度
    //标记点
    polygons: [],
    polygons_points: [],
    markers:[],
    customCalloutInfo:{
      id: 999,
      install_edcapacity: 0,  // 装机量
      sum_price: 0,
      area: 0,
      year_generating_capacity: 0
    },
    isShow: false,
    inputShowed: true,
    inputVal: "12312"
  },
  /**
   * 初始化地图时
  */
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('map')
    this.mapCtx.moveToLocation()
  },
  /**
   * 移动到当前位置
  */
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  /**
   * 刷新圈图
  */
  refreshTap: function(e){
    var that = this;
    that.setData({
      polygons: [],
      polygons_points: [],
      markers:[],
      customCalloutInfo:{
        id: 999,
        install_edcapacity: 0,
        sum_price: 0,
        area: 0,
        year_generating_capacity: 0
      }
    });
  },

  /**
   * 跳转详情
  */
 detailTap: function(e){
    var that = this;
    var dict = that.data.customCalloutInfo;
    dict['openid'] = that.data.openid;
    var para = JSON.stringify(dict);
    wx.navigateTo({
      url: '../detail/detail?para=' + para,
    })
  },

  /**
   * 跳转个人页面
  */
  selfTap: function(e){
    var that = this;
    wx.navigateTo({
      url: '../self/self',
    })
  },
  /**
   * 回撤构图
  */
  backTap: function(e){
    var that = this;
    console.log(that.data.markers);
    if(that.data.polygons_points.length > 0){
      that.data.polygons_points.pop();
      that.data.polygons.pop();
      that.data.markers.pop();
      console.log(that.data.markers);

      if(that.data.markers.length > that.data.polygons_points.length){
        that.data.markers.pop();
        let customCalloutInfo = {
          id: 999,
          install_edcapacity: 0,
          sum_price: 0,
          area: 0,
          year_generating_capacity: 0
        }
        that.setData({
          polygons: that.data.polygons,
          polygons_points: that.data.polygons_points,
          markers: that.data.markers,
          customCalloutInfo: customCalloutInfo
        });
      }else{
        that.setData({
          polygons: that.data.polygons,
          polygons_points: that.data.polygons_points,
          markers: that.data.markers
        });
      }
    }
  },
  /**
   * 添加当前坐标
  */
  addCenterLocation: function () {
    var that = this;
    if(that.data.isShow == false){
      that.setData({
        isShow: true
      });
    }else{
      this.mapCtx.getCenterLocation({
        success: function(res){
          let old_markers = that.data.markers;
          let new_id = old_markers.length;
          let  marker_point = {
            id: new_id,
            longitude: res.longitude,
            latitude: res.latitude,
            iconPath: "../../images/redpoint.png",
            width: 3,
            height: 3,
            customCallout:{//自定义气泡
              display:"ALWAYS",//显示方式，可选值BYCLICK
              anchorX:0,//横向偏移
              anchorY:0,
            },
          }
          old_markers.push(marker_point);
          that.setData({
            markers: old_markers
          })
   
          let old_polygons_points =  that.data.polygons_points;
          let polygons_point = {
            longitude: res.longitude,
            latitude: res.latitude,
          }
          old_polygons_points.push(polygons_point);
          console.log(old_polygons_points.length);
          if(old_polygons_points.length > 2){
            that.setData({
              polygons_points : old_polygons_points,
              polygons : [{
                points: old_polygons_points,
                fillColor: "#ffff0033",
                strokeColor: "#ff0000",
                strokeWidth: 2,
                zIndex: 1
              }]
            });
          }else{
            that.setData({
              polygons_points : old_polygons_points
            });
          }
        }
      });
    }
    
  },

  /**
   * 计算区域面积 墨卡托投影
   * https://www.cnblogs.com/grimm/p/5097383.html
  */
  getAreaTap: function(e){
    var that = this;
    if(that.data.polygons_points.length > 2){
      area_api.getArea(that.data.polygons_points).then(res => {
        // console.log(JSON.stringify(res));
        let min_longitude = 0;
        let max_longitude = 0;
        let min_latitude = 0;
        let max_latitude = 0;
        for (var i = 0; i < that.data.markers.length; i++) {
          if(i == 0){
            min_longitude = Number(that.data.markers[i]['longitude']);
            max_longitude = Number(that.data.markers[i]['longitude']);
            min_latitude = Number(that.data.markers[i]['latitude']);
            max_latitude = Number(that.data.markers[i]['latitude']);
          }else{
            if (min_longitude > Number(that.data.markers[i]['longitude'])){
              min_longitude = Number(that.data.markers[i]['longitude']);
            }
            if (max_longitude < Number(that.data.markers[i]['longitude'])){
              max_longitude = Number(that.data.markers[i]['longitude']);
            }
            if (min_latitude > Number(that.data.markers[i]['latitude'])){
              min_latitude = Number(that.data.markers[i]['latitude']);
            }
            if (max_latitude < Number(that.data.markers[i]['latitude'])){
              max_latitude = Number(that.data.markers[i]['latitude']);
            }
          }
          
        }
   
        let c_longitude = (min_longitude + max_longitude) / 2;
        let c_latitude = max_latitude;
        let t_latitude = (min_latitude + max_latitude) / 2;
        
        let old_markers = that.data.markers;
        let new_id = old_markers.length;
        
        var area = Math.ceil(Number(res) * 100) / 100.0;
        wx.request({
          url: app.globalData.upAreaUrl,
          data:{
            openid: that.data.openid,
            area: area,
            longitude: c_longitude,
            latitude: t_latitude,
            address: that.data.address
          },
          method:"GET",
          success(resp){
            if(resp.data.code == '0'){
              console.log(resp)
              let install_edcapacity = resp.data.data.install_edcapacity;
              let sum_price = resp.data.data.sum_price;
              let year_generating_capacity = resp.data.data.year_generating_capacity;

              let calloutinfo = {
                id: new_id,
                install_edcapacity: install_edcapacity,
                sum_price: sum_price,
                area: area,
                year_generating_capacity: year_generating_capacity
              }
              that.setData({
                customCalloutInfo: calloutinfo
              })

              let  marker_point = {
                id: new_id,
                longitude: c_longitude,
                latitude: c_latitude,
                iconPath: "../../images/redpoint.png",
                width: 2,
                height: 2,
                customCallout:{//自定义气泡
                  display:"ALWAYS",//显示方式，可选值BYCLICK
                  anchorX:0,//横向偏移
                  anchorY:0,
                },
              }
              old_markers.push(marker_point);
              that.setData({
                markers: old_markers
              })
            }
            // that.getUserInfo();
          }
        });
      });
    }else{
      // 提示点数不够
      wx.showModal({
        title: '提示！',
        confirmText: '最少需要三个点',
        showCancel: false,
        content: e,
        success: function(res) {
          if (res.confirm) {
          }
        }
      })
    }
    
  },
  search: function(e){
    var that = this;
    wx.chooseLocation({
      success: res => {
        // that.getValueMap(res)
        that.setData({
          /*赋值*/
          latitude: res.latitude,
          longitude: res.longitude,
          address: res.name
        })
      },
      fail: res => {
        console.log('打开地图选择位置取消', res)
      }
    })
  },
//  https://blog.csdn.net/weixin_42460570/article/details/103800766
// https://jingyan.baidu.com/article/642c9d34a36283254b46f736.html
// https://blog.csdn.net/hql1024/article/details/105971096
// https://www.freesion.com/article/6660601183/
  onLoad: function (options) {  
    var that = this;
    this.mpCtx = wx.createMapContext("map", this);
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userLocation'] == false) { // 如果已拒绝授权，则打开设置页面
          wx.openSetting({
            success(res) {
              console.log(res)
            }
          })
        } else { // 第一次授权，或者已授权，直接调用相关api
          //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标
          wx.getLocation({
            type: 'gcj02',
            success(res) {
              that.setData({
                /*赋值*/
                latitude: res.latitude,
                longitude: res.longitude
              })
              var param = {
                location: res.latitude + ',' + res.longitude,
                key: app.globalData.map_key,
                get_poi: 1
              }
              //下面是get去请求数据
              var url = config.qqMapApi
              util.postrequest(url, param).then(res => {
                var d = res.data.result
                console.log(d.address)
                console.log(d.address_component.city)
                that.setData({
                  address: d.address,
                  citySelected: d.address_component.city,
                })
              })
            }
          })
        }
      }
    });
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

  selectResult: function (e) {
      console.log('select result', e.detail)
  },
  /**
     * 将焦点给到 input（在真机上不能获取input焦点）
     */
    tapInput() {
      this.setData({
          //在真机上将焦点给input
          inputFocus:true,
          //初始占位清空
          inputInfo: ''
      });
  },

  /**
   * input 失去焦点后将 input 的输入内容给到cover-view
   */
  blurInput(e) {
      this.setData({
          inputInfo: e.detail.value || '输入'
      });
  },

  hometap:function(e){
    console.log('123123');
  },
  righttap:function(e) {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res);
        that.mpCtx.moveToLocation();
      }
    })
  },
  _locationChangeFn(res) {
    console.log('location change', res)
   },
  //视野发生变化时触发 移动
  regionchange(e) {
    // this.touchEnd();
//     var that = this;
//     if(e.type == 'end'){
//       console.log("dsfs"+ JSON.stringify(e))
//       this.mapCtx.getCenterLocation({
//         success: function(res){ 
//           console.log(res.longitude)
//           console.log(res.latitude)
//         }
//       })
//       this.mapCtx.getCenterLocation({
//           success: function (res) {
//             console.log("getCenterLocation=" + JSON.stringify(res))
//             }
//         })
      
    // }
  },

})

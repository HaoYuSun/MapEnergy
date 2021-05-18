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
      info1: 0,
      info2: 0,
      info3: 0,
      info4: 0
    }
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
   * 获取当前坐标
  */
  getCenterLocation: function () {
    var that = this;
    this.mapCtx.getCenterLocation({
      success: function(res){

        let old_markers = that.data.markers;
        let new_id = old_markers.length;

        let  marker_point = {
          id: new_id,
          longitude: res.longitude,
          latitude: res.latitude,
          iconPath: "../../images/redpoint.png",
          width: 4,
          height: 4,
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
              strokeWidth: 4,
              zIndex: 1
            }]
          });
        }else{
          that.setData({
            polygons_points : old_polygons_points
          });
        }
      }
    })
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
        // console.log("min_longitude"+JSON.stringify(min_longitude));
        // console.log("max_longitude"+JSON.stringify(max_longitude));
        // console.log("min_latitude"+JSON.stringify(min_latitude));
        // console.log("max_latitude"+JSON.stringify(max_latitude));
        let c_longitude = (min_longitude + max_longitude) / 2;
        let c_latitude = max_latitude;
        
        let old_markers = that.data.markers;
        let new_id = old_markers.length;
        // console.log(JSON.stringify(c_longitude));
        // console.log(JSON.stringify(c_latitude));
        let calloutinfo = {
          id: new_id,
          info1: 0,
          info2: 0,
          info3: res,
          info4: 0
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

      });
    }else{
      // 提示点数不够
    }
    
  },
  // touchEnd: function () {
  //   var that = this;
  //   console.log("dsfs")
  //   this.mapCtx.getCenterLocation({
  //     success: function(res){ 
  //       console.log(res.latitude)
  //     }
  //   })
  // },

//  https://blog.csdn.net/weixin_42460570/article/details/103800766
// https://jingyan.baidu.com/article/642c9d34a36283254b46f736.html
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
              console.log('url'+JSON.stringify(url));
              util.postrequest(url, param).then(res => {
                console.log(JSON.stringify(res))
                var d = res.data.result
                console.log(d)
                console.log(d.address_component.city)
                that.setData({
                  citySelected: d.address_component.city,
                })
              })
            }
          })
        }
      }
    });
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

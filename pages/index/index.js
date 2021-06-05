// index.js
// https://developers.weixin.qq.com/miniprogram/dev/extended/component-plus/index-list.html
// 获取应用实例
var config = require("../../config.js");
var util = require("../../utils/api.js").TendxunAPI;
var area_api = require("../../utils/area.js").AreaAPI;
const app = getApp()

// 引入SDK核心类
var QQMapWX = require('../../qqmap-wx-jssdk.js');
const area = require("../../utils/area.js");

Page({
  data: {
    recordid: 0,
    openid: '',
    address: '',
    inputModel: '',
    inputFocus: '',
    latitude: 0,//纬度
    longitude: 0,//经度
    //标记点
    polygons: [],
    polygons_points: [],
    polyline: [],
    polyline_points: [],
    markers:[],
    customCalloutInfo:{
      id: 999,
      install_edcapacity: 0,  // 装机量
      sum_price: 0,
      area: 0,
      year_generating_capacity: 0,
      year_light: 1200
    },
    isShow: false,
    inputShowed: true,
    inputVal: "12312",
    isUpOver: false
  },
  /**
   * 初始化地图时
  */
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('map')
    this.mapCtx.moveToLocation()
  },
  /**
   * 移动到当前位置
  */
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  /**
   * 刷新圈图
  */
  refreshTap: function(e){
    var that = this;
    that.setData({
      isUpOver: false,
      polygons: [],
      polygons_points: [],
      markers:[],
      polyline: [],
      polyline_points: [],
      customCalloutInfo:{
        id: 999,
        install_edcapacity: 0,
        sum_price: 0,
        area: 0,
        year_generating_capacity: 0,
        year_light: 1200
      }
    });
  },

  /**
   * 跳转详情
  */
 detailTap: function(e){
    var that = this;
//     var dict = that.data.customCalloutInfo;
//     var dict = that.data;
//     dict['openid'] = that.data.openid;
//     var para = JSON.stringify(dict);
    wx.navigateTo({
      url: '../detail/detail?recordid=' +that.data.recordid+'&openid='+that.data.openid,
    })
  },

  /**
   * 跳转个人页面
  */
  selfTap: function(e){
    var that = this;
    if(app.globalData.userInfo){
      wx.navigateTo({
        url: '../self/self',
      })
    }else{
      that.authset();
    }
  },
  /**
   * 回撤构图
  */
  backTap: function(e){
    var that = this;
    that.setData({
      isUpOver: false
    })
    if(that.data.polygons_points.length > 0){
      console.log(that.data.polygons)
      that.data.polygons_points.pop();
      that.data.markers.pop();
      console.log(that.data.polygons)

      if(that.data.markers.length > that.data.polygons_points.length){
        that.data.markers.pop();
        let customCalloutInfo = {
          id: 999,
          install_edcapacity: 0,
          sum_price: 0,
          area: 0,
          year_generating_capacity: 0,
          year_light: 1200
        }
        that.setData({
          polygons_points: that.data.polygons_points,
          markers: that.data.markers,
          customCalloutInfo: customCalloutInfo
        });
      }else{
        that.setData({
          polygons_points: that.data.polygons_points,
          markers: that.data.markers
        });
      }
      if(that.data.polygons_points.length > 2){
        that.setData({
          polygons : [{
            points: that.data.polygons_points,
            fillColor: "#ffff0033",
            strokeColor: "#ffCC33",
            strokeWidth: 2,
            zIndex: 1
          }]
        });
      }else{
        that.setData({
          polygons : []
        });
      }

      //处理polyline
      if(that.data.polygons_points.length < 2){
        that.data.polyline_points.pop();
        that.setData({
          polyline:[]
        })
      }
    }
  },
  /**
   * 添加当前坐标
  */
  addCenterLocation: function () {
    var that = this;
    if(that.data.isShow == false){
      that.setData({
        isShow: true,
        markers: []
      });
    }else{
      this.mapCtx.getCenterLocation({
        success: function(res){
          that.addPoint(res.longitude, res.latitude)
        }
      });
    }
    
  },
  /**
   * 添加坐标共通
  */
  addPoint: function(longi, lati){
    var that = this;

    //手动添加 可能是在提交后，所以判断是否是冒泡状态
    if(that.data.markers.length > that.data.polygons_points.length){
      that.data.markers.pop();
      let customCalloutInfo = {
        id: 999,
        install_edcapacity: 0,
        sum_price: 0,
        area: 0,
        year_generating_capacity: 0,
        year_light: 1200
      }
      that.setData({
        markers: that.data.markers,
        customCalloutInfo: customCalloutInfo
      });
    }

    let old_markers = that.data.markers;
    let new_id = old_markers.length;
    let marker_point = {
      id: new_id,
      longitude: longi,
      latitude: lati,
      iconPath: "../../images/point.png",
      width: 3,
      height: 3,
    }
    old_markers.push(marker_point);
    that.setData({
       markers: old_markers
    })     
    let old_polygons_points =  that.data.polygons_points;
    let polygons_point = {
      longitude: longi,
      latitude: lati,
      iconPath: "../../images/point.png",
      width: 1,
      height: 1,
    }                            
    old_polygons_points.push(polygons_point);
    console.log(old_polygons_points.length);
    if(old_polygons_points.length > 2){
      that.setData({
        polygons_points : old_polygons_points,
        polygons : [{
          points: old_polygons_points,
          fillColor: "#ffff0033",
          strokeColor: "#ffCC33",
          strokeWidth: 2,
          zIndex: 1
        }]
      });
    }else{
      that.setData({
        polygons_points : old_polygons_points
      });
    }
    console.log('old_markers.length:'+old_markers.length)
    if(that.data.polyline_points.length < 2){
      that.data.polyline_points.push({
        longitude: longi,
        latitude: lati,
      })
    }
    if(old_markers.length == 2){
      that.setData({
        polyline: [{
          points: that.data.polyline_points,
          color: "#ffCC33",
          width: 2
        }]
      })
    }else{
      // that.setData({
      //   polyline: []
      // })
    }


    // 此时肯定未弹面积信息框
    that.setData({
      isUpOver: false
    })
                
  },
  /**
   * 授权提醒
  */
  authset: function(e){
    var that = this;
    wx.getUserProfile({
      desc: '获取你的昵称、头像、地区及性别',
      success: res => {
        console.log(res.userInfo);
        app.globalData.userInfo = res.userInfo;
        wx.request({
          url: app.globalData.upUserinfoUrl,
          data:{
            openid: app.globalData.openid,
            userInfo: app.globalData.userInfo
          },
          method:"GET",
          success(res){
            console.log(res)
          }
        });
      }
    })
  },

  /**
   * 计算区域面积 墨卡托投影
   * https://www.cnblogs.com/grimm/p/5097383.html
  */
  getAreaTap: function(e){
    var that = this;
    //防止多次执行
    if(that.data.isUpOver){
      console.log('状态未改变');
      return;
    }
    if(that.data.polygons_points.length > 2){
      // 防止多次提交
      that.setData({
        isUpOver: true
      })
      area_api.getArea(that.data.polygons_points).then(res => {
        console.log(JSON.stringify(res));
        let min_longitude = 0;
        let max_longitude = 0;
        let min_latitude = 0;
        let max_latitude = 0;
        for (var i = 0; i < that.data.markers.length; i++) {
          if(i == 0){
            min_longitude = Number(that.data.markers[i]['longitude']);
            max_longitude = Number(that.data.markers[i]['longitude']);
            min_latitude = Number(that.data.markers[i]['latitude']);
            max_latitude = Number(that.data.markers[i]['latitude']);
          }else{
            if (min_longitude > Number(that.data.markers[i]['longitude'])){
              min_longitude = Number(that.data.markers[i]['longitude']);
            }
            if (max_longitude < Number(that.data.markers[i]['longitude'])){
              max_longitude = Number(that.data.markers[i]['longitude']);
            }
            if (min_latitude > Number(that.data.markers[i]['latitude'])){
              min_latitude = Number(that.data.markers[i]['latitude']);
            }
            if (max_latitude < Number(that.data.markers[i]['latitude'])){
              max_latitude = Number(that.data.markers[i]['latitude']);
            }
          }
          
        }
   
        let c_longitude = (min_longitude + max_longitude) / 2;
        let c_latitude = max_latitude;
        let t_latitude = (min_latitude + max_latitude) / 2;
        
        let old_markers = that.data.markers;
        let new_id = old_markers.length;
        
        var area = Math.ceil(Number(res) * 100) / 100.0;
        //提交面积 获取后续数据 此处添加所属城市 以匹配对应城市的光照数据
        wx.request({
          url: app.globalData.upAreaUrl,
          data:{
            openid: that.data.openid,
            area: area,
            longitude: c_longitude,
            latitude: t_latitude,
            address: that.data.address,
            city: that.data.citySelected,
            polygons: that.data.polygons
          },
          method:"GET",
          success(resp){
            if(resp.data.code == '0'){
              console.log(resp)
              let install_edcapacity = resp.data.data.install_edcapacity;
              let sum_price = resp.data.data.sum_price;
              let year_generating_capacity = resp.data.data.year_generating_capacity;
              let year_light = parseFloat(resp.data.data.year_light);
              console.log(year_light)
              let calloutinfo = {
                id: new_id,
                install_edcapacity: install_edcapacity,
                sum_price: sum_price,
                area: area,
                year_generating_capacity: year_generating_capacity,
                year_light: year_light
              }
              that.setData({
                customCalloutInfo: calloutinfo
              })

              let  marker_point = {
                id: new_id,
                longitude: c_longitude,
                latitude: c_latitude,
                iconPath: "../../images/point.png",
                width: 2,
                height: 2,
                customCallout:{//自定义气泡
                  display:"ALWAYS",//显示方式，可选值BYCLICK
                  anchorX:0,//横向偏移
                  anchorY:0,
                },
              }
              old_markers.push(marker_point);
              that.setData({
                markers: old_markers,
                recordid: resp.data.data.recordid
              })
            }
            // that.getUserInfo();
          },
          fail(resp){
            console.log(resp);
            // 此时肯定未弹面积信息框
            that.setData({
              isUpOver: false
            })
          }
        });
      });
    }else{
      console.log(12121)
      // 提示点数不够
      wx.showModal({
        title: '提示',
        confirmText: '确定',
        showCancel: false,
        content: '最少需要标记三个坐标',
      })
    }
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
          isShow: false,
          markers: [{
            id: 100,
            longitude: res.longitude,
            latitude: res.latitude,
            iconPath: "../../images/point.png",
            width: 10,
            height: 10,
          }]
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
          that.setData({
            citySelected: d.address_component.city,
          })
        })
      },
      fail: res => {
        console.log('打开地图选择位置取消', res)
      }
    })
  },
  /**
   *  onLoad
  */
  onLoad: function (options) {  
    var that = this;
    var fromopenid = '';

    if(options.fromopenid){
      fromopenid = options.fromopenid;
    }
    this.mpCtx = wx.createMapContext("map", this);
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userLocation'] == false) { // 如果已拒绝授权，则打开设置页面
          wx.openSetting({
            success(res) {
              console.log(res)
            }
          })
        } else { // 第一次授权，或者已授权，直接调用相关api
          //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标
          wx.getLocation({
            type: 'gcj02',
            success(res) {
              that.setData({
                /*赋值*/
                latitude: res.latitude,
                longitude: res.longitude
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
                console.log(d.address_component.city)
                that.setData({
                  address: d.address,
                  citySelected: d.address_component.city,
                })
              })
            }
          })
        }
      }
    });
    if (app.globalData.openid && app.globalData.openid != '') {
      this.setData({
        openid: app.globalData.openid
      });
      if(fromopenid != ''){
        that.upfromopenid(fromopenid);
      }
    } else {
      wx.login({
        success: function (r) {
          var code = r.code;//登录凭证
          let getOpenidUrl = app.globalData.getOpenidUrl;
          wx.request({
            url: getOpenidUrl,
            data:{
              js_code: code,
            },
            method:"GET",
            success(res){
              if(res.data.code == '0'){
                console.log(res)
                that.setData({
                  openid: res.data.openid
                });
                if(fromopenid != ''){
                  that.upfromopenid(fromopenid);
                }
              }
            }
          });
        },
        fail: function () {
          console.log('系统错误')
        }
      })
    }
    
    if(options.url){
      let url = decodeURIComponent(options.url);
      wx.navigateTo({
        url
      })
    }
  },
  /**
   * 更新分享从属关系
  */
  upfromopenid: function(e){
    var that = this;
    if(e == '' || e == that.data.openid){
      return;
    }
    wx.request({
      url: app.globalData.upFromopenidUrl,
      data:{
        openid: that.data.openid,
        fromopenid: e
      },
      method:"GET",
      success(resp){
        console.log(resp);
      },
      fail(resp){
        console.log(resp);
      }
    });

  },

  selectResult: function (e) {
      console.log('select result', e.detail)
  },

  righttap:function(e) {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res);
        that.mpCtx.moveToLocation();
      }
    })
  },
  /**
   * 点击地图获取坐标
  */
  mapclick(res){
    var that = this;
    if(that.data.isShow){
      that.addPoint(res.detail.longitude, res.detail.latitude);
    }
  },

  //视野发生变化时触发 移动
  regionchange(e) {
  },

  onShareAppMessage(res) {
    var that = this;
    if(that.data.customCalloutInfo.area > 0){
        var oepnid = that.data.openid;
  //       var dict = that.data.customCalloutInfo;
  //       var dict = {
  //         'recordid': 
  //       };
  //       dict['openid'] = that.data.openid;
  //       var para = JSON.stringify(dict);
        let sendurl = encodeURIComponent('/pages/detail/detail?recordid=' +that.data.recordid+'&fromopenid='+oepnid);
        return {
          title: '能源预算',
          path: `/pages/index/index?fromopenid=${oepnid}&url=${sendurl}` // 分享后打开的页面
        }
      }else{
        return {
          title: "能源预算",
          path:`/pages/index/index?fromopenid=${oepnid}` 
        }
      }
  },

})

// index.js
// 获取应用实例
const app = getApp()

// 引入SDK核心类
var QQMapWX = require('../../qqmap-wx-jssdk.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'QYEBZ-VCMED-DD44G-H4QVE-U7OHS-PAFAA' // 必填
});
Page({
  data: {
    ployline: [],//路线渲染
    latitude: 22.7340784793,//纬度
    longitude: 113.504708375,//经度
    //标记点
    markers: [{
      // iconPath: "../images/123.png",
      id: 0,
      longitude: 113.504508375,
      latitude: 22.7344784793,
      width: 20,
      height: 20,
    }],

  },
  onLoad: function (options) {  
    var _this = this;
    //调用距离计算接口
    qqmapsdk.direction({
      mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
      //from参数不填默认当前地址
      from:'22.7344784793,113.504708375',
      to: '22.7342920943,108.594824432',
      success: function (res) {
        console.log(res);
        var ret = res;
        var coors = ret.result.routes[0].polyline, pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({ latitude: coors[i], longitude: coors[i + 1] })
        }
        console.log(pl)
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        _this.setData({
          latitude: pl[0].latitude,
          longitude: pl[0].longitude,
          polyline: [{
            points: pl,
            color: "#20B2AA", width: 4, dottedLine: false
          
          }]
        })
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  //视野发生变化时触发
  regionchange(e) {
    console.log(e.type)
  },
  //单击标记点时触发
  markertap(e) {
    console.log(e.markerId)
  },
  //单击空间上时触发
  controltap(e) {
    console.log(e.controlId)
  }
})

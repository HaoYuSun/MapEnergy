// index.js
// https://developers.weixin.qq.com/miniprogram/dev/extended/component-plus/index-list.html
// 获取应用实例
const app = getApp()

// 引入SDK核心类
var QQMapWX = require('../../qqmap-wx-jssdk.js');

Page({
  data: {
    mpCtx: null,
    inputModel: '',
    inputFocus: '',
    ployline: [],//路线渲染
    latitude: 22.7340784793,//纬度
    longitude: 113.504708375,//经度
    //标记点
    markers: [{
      iconPath: "../../images/addtag.png",
      id: 0,
      longitude: 23.265348,
      latitude: 115.907694,
      width: 20,
      height: 20,
    },{
      iconPath: "../../images/addtag.png",
      id: 1,
      longitude: 26.265348,
      latitude: 120.907694,
      width: 20,
      height: 20,
    }],
    polygons:[],
    // polygons: [{
    //   points: [{}],
    //   fillColor: "#ffff0033",
    //   strokeColor: "#FFF",
    //   strokeWidth: 2,
    //   zIndex: 1
    // }]

  },
  moveToLocation: function () {
    var that = this;
    wx.chooseLocation({
       success: function (res) {
         console.log(res)
          let mobileLocation = {
             longitude: res.longitude,
             latitude: res.latitude,
            //  address: res.address,
          };
          // that.setData({
          //    mobileLocation: mobileLocation,
          // });
       },
       fail: function (err) {
          console.log(err)
       }
    });
 },
//  https://blog.csdn.net/weixin_42460570/article/details/103800766
// https://jingyan.baidu.com/article/642c9d34a36283254b46f736.html
  onLoad: function (options) {  
    var that = this;
    that.mpCtx = wx.createMapContext("map", this);
    wx.getLocation({//默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标
      type: 'gcj02',
      success: function (res) {
        that.setData({
        /*赋值*/
          latitude: res.latitude,
          longitude: res.longitude,
          markers:[{
            iconPath: "../../images/addtag.png",
            id: 0,
            longitude: 23.265348,
            latitude: 115.907694,
            width: 20,
            height: 20,
          },{
            iconPath: "../../images/addtag.png",
            id: 1,
            longitude: 26.265348,
            latitude: 120.907694,
            width: 20,
            height: 20,
          }]
        })
      }
    });
    // // 实例化API核心类
    let qqmapsdk = new QQMapWX({
      key: 'QYEBZ-VCMED-DD44G-H4QVE-U7OHS-PAFAA' // 必填
    });
    qqmapsdk.getLocation({
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
          console.log(res);
      },
      complete: function (res) {
          console.log(res);
      }
    });
    // this.mapCtx = wx.createMapContext("map", this);
    // this.mapCtx.getCenterLocation({
    //   success: function (res) {
    //       console.log(res)
    //       that.setData({
    //           longitude: res.longitude,
    //           latitude: res.latitude,
    //       })
    //   }, 
    //   fail: function (res) {
    //         console.log(res)
    //   }
    // })
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
    console.log(1)
    console.log(e.type)
    // wx.chooseLocation({
    //   success: function (res) {
    //     console.log(res)
    //      let mobileLocation = {
    //         longitude: res.longitude,
    //         latitude: res.latitude,
    //        //  address: res.address,
    //      };
    //      // that.setData({
    //      //    mobileLocation: mobileLocation,
    //      // });
    //   },
    //   fail: function (err) {
    //      console.log(err)
    //   }
  //  });
  },
  //单击标记点时触发
  markertap(e) {
    console.log(2)
    console.log(e.markerId)
  },
  //单击空间上时触发
  controltap(e) {
    console.log(3)
    console.log(e.controlId)
  }
})

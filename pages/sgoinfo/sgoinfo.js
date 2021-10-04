// pages/report_info/reportinfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  // mixins: [require('../../mixin/themeChanged')],
    data: {
      recordid: 0,
      openid:'',
      files: [],
      wumianjiegou: [],
      dianfeidan: [],
      tuzhi: [],
      zhaopianku: [],
      yezhuxinxi: [],
      beianzheng: [],
      jierufangan: [],
      num : 0,
      rate : 0
    },
    chooseImage: function (e) {
        var type_id = e.currentTarget.id
        var that = this;
        var uploadFileUrl = app.globalData.uploadFileUrl;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                
                

                for (var i=0; i< res.tempFilePaths.length; i++){
                  var imgpath = res.tempFilePaths[i];
                  wx.uploadFile({
                    filePath: imgpath,
                    name: 'file',
                    url: uploadFileUrl,
                    header:{
                      'content-type': 'application/x-wwww-form-urlencoded'
                    },
                    formData:{
                      'openid': 'oi3_x4o3V5dAlMi1-IF1BHy6WXBY',
                      'recordid': '823',
                      'type': type_id
                    },
                    success: function(res){
                      console.log(res.data)
                      var result = JSON.parse(res.data)
                      if(type_id == 1){
                        that.setData({
                          wumianjiegou: that.data.wumianjiegou.concat(result.data.tempFilePaths)
                        });
                      }else if(type_id == 2){
                        that.setData({
                          dianfeidan: that.data.dianfeidan.concat(result.data.tempFilePaths)
                        });
                      }else if(type_id == 3){
                        that.setData({
                          tuzhi: that.data.tuzhi.concat(result.data.tempFilePaths)
                        });
                      }else if(type_id == 4){
                        that.setData({
                          zhaopianku: that.data.zhaopianku.concat(result.data.tempFilePaths)
                        });
                      }else if(type_id == 5){
                        that.setData({
                          yezhuxinxi: that.data.yezhuxinxi.concat(result.data.tempFilePaths)
                        });
                      }else if(type_id == 6){
                        that.setData({
                          beianzheng: that.data.beianzheng.concat(result.data.tempFilePaths)
                        });
                      }else if(type_id == 7){
                        that.setData({
                          jierufangan: that.data.jierufangan.concat(result.data.tempFilePaths)
                        });
                      }
                    },
                    fail: function(res) {
                      console.log('fail')
                    }
                  })
                }
            }
        })
    },
    previewImage: function(e){
        var that = this;
        console.log(e.currentTarget)
        var type_id = e.currentTarget.dataset.type
        console.log(type_id)
        var urls = []
        if(type_id == 1){
          urls = that.data.wumianjiegou
        }else if(type_id == 2){
          urls = that.data.dianfeidan
        }else if(type_id == 3){
          urls = that.data.tuzhi
        }else if(type_id == 4){
          urls = that.data.zhaopianku
        }else if(type_id == 5){
          urls = that.data.yezhuxinxi
        }else if(type_id == 6){
          urls = that.data.beianzheng
        }else if(type_id == 7){
          urls = that.data.jierufangan
        }
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: urls // 需要预览的图片http链接列表
        })
    },

  

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 分享来的
    if(options.openid){
      that.setData({
        openid: options.openid
      })
    }

    if(options.recordid){
      that.setData({
        recordid: options.recordid
      })
    }
    console.log('123123')
    var getSgoFileUrl = app.globalData.getSgoFileUrl;
    wx.request({
      url: getSgoFileUrl,
      data:{
        // 'openid': that.data.openid,
        // 'recordid': that.data.recordid
        'openid': 'oi3_x4o3V5dAlMi1-IF1BHy6WXBY',
        'recordid': '823',
      },
      method:"GET",
      success(res){
        console.log(res)
        if(res.data.code == '0'){
          
          that.setData({
            wumianjiegou: res.data.data.wumianjiegou,
            dianfeidan: res.data.data.dianfeidan,
            tuzhi: res.data.data.tuzhi,
            zhaopianku: res.data.data.zhaopianku,
            yezhuxinxi: res.data.data.yezhuxinxi,
            beianzheng: res.data.data.beianzheng,
            jierufangan: res.data.data.jierufangan,
            num : res.data.data.num,
            rate : res.data.data.rate
          })
        }
      },
      complete(){
        
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
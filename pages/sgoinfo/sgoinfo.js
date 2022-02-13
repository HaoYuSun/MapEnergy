// pages/reportinfo/reportinfo.js
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

      // 开玄业务
      yingyezhizhao: [],
      fangchan_tudizheng: [],
      chanquan_xinxi: [],
      jindiao_baogao: [],
      emc: [],
      takanbaogao: [],
      dianqi_pingtaitu: [],
      zaihe_baogao: [],
      chushe_fangan: [],
      zujian_paibutu: [],

      num : 0,
      rate : 0,
      sum_type: 0,
      group_id: app.globalData.group_id,
      file_state_list: ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"]
    },
    switchChange: function(e){
      var that = this;
      var index = parseInt(e.currentTarget.dataset.type)

      if(e.detail.value == true){
        that.data.file_state_list[index] = '1'
      }else{
        that.data.file_state_list[index] = '0'
      }
      that.setData({
        file_state_list: that.data.file_state_list
      })

      console.log(that.data.file_state_list.toString())
    wx.request({
      url: app.globalData.upSgoFileStateUrl,
      data:{
        'openid': that.data.openid,
        'recordid': that.data.recordid,
        'file_state': that.data.file_state_list.toString()
      },
      method:"GET",
      success(res){
        if(res.data.code == '0'){
          that.setData({
            num : res.data.data.num,
            rate : res.data.data.rate,
            sum_type: res.data.data.sum_type
          })
        }
      },
      complete(){
        
      }
    });
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
                      'openid': that.data.openid,
                      'recordid': that.data.recordid,
                      'type': type_id
                    },
                    success: function(res){
                      console.log(res.data)
                      var result = JSON.parse(res.data)
                      if(type_id == 1){
                        that.setData({
                          wumianjiegou: that.data.wumianjiegou.concat(result.data.tempFilePaths),
                          num: result.data.num,
                          rate: result.data.rate
                        });
                      }else if(type_id == 2){
                        that.setData({
                          dianfeidan: that.data.dianfeidan.concat(result.data.tempFilePaths),
                          num: result.data.num,
                          rate: result.data.rate
                        });
                      }else if(type_id == 3){
                        that.setData({
                          tuzhi: that.data.tuzhi.concat(result.data.tempFilePaths),
                          num: result.data.num,
                          rate: result.data.rate
                        });
                      }else if(type_id == 4){
                        that.setData({
                          zhaopianku: that.data.zhaopianku.concat(result.data.tempFilePaths),
                          num: result.data.num,
                          rate: result.data.rate
                        });
                      }else if(type_id == 5){
                        that.setData({
                          yezhuxinxi: that.data.yezhuxinxi.concat(result.data.tempFilePaths),
                          num: result.data.num,
                          rate: result.data.rate
                        });
                      }else if(type_id == 6){
                        that.setData({
                          beianzheng: that.data.beianzheng.concat(result.data.tempFilePaths),
                          num: result.data.num,
                          rate: result.data.rate
                        });
                      }else if(type_id == 7){
                        that.setData({
                          jierufangan: that.data.jierufangan.concat(result.data.tempFilePaths),
                          num: result.data.num,
                          rate: result.data.rate
                        });
                      }else if(type_id == 8){
                        that.setData({
                          yingyezhizhao: that.data.jierufangan.concat(result.data.tempFilePaths),
                          num: result.data.num,
                          rate: result.data.rate
                        })
                      }else if(type_id == 9){
                        that.setData({
                          fangchan_tudizheng: that.data.jierufangan.concat(result.data.tempFilePaths),
                          num: result.data.num,
                          rate: result.data.rate
                        })
                      }else if(type_id == 10){
                        that.setData({
                          chanquan_xinxi: that.data.jierufangan.concat(result.data.tempFilePaths),
                          num: result.data.num,
                          rate: result.data.rate
                        })
                      }else if(type_id == 11){
                        that.setData({
                          jindiao_baogao: that.data.jierufangan.concat(result.data.tempFilePaths),
                          num: result.data.num,
                          rate: result.data.rate
                        })
                      }else if(type_id == 12){
                        that.setData({
                          emc: that.data.jierufangan.concat(result.data.tempFilePaths),
                          num: result.data.num,
                          rate: result.data.rate
                        })
                      }else if(type_id == 13){
                        that.setData({
                          takanbaogao: that.data.jierufangan.concat(result.data.tempFilePaths),
                          num: result.data.num,
                          rate: result.data.rate
                        })
                      }else if(type_id == 14){
                        that.setData({
                          dianqi_pingtaitu: that.data.jierufangan.concat(result.data.tempFilePaths),
                          num: result.data.num,
                          rate: result.data.rate
                        })
                      }else if(type_id == 15){
                        that.setData({
                          zaihe_baogao: that.data.jierufangan.concat(result.data.tempFilePaths),
                          num: result.data.num,
                          rate: result.data.rate
                        })
                      }else if(type_id == 16){
                        that.setData({
                          chushe_fangan: that.data.jierufangan.concat(result.data.tempFilePaths),
                          num: result.data.num,
                          rate: result.data.rate
                        })
                      }else if(type_id == 17){
                        that.setData({
                          zujian_paibutu: that.data.jierufangan.concat(result.data.tempFilePaths),
                          num: result.data.num,
                          rate: result.data.rate
                        })
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
    cancelTap: function (e) {
      var that = this;
      var type_id = e.currentTarget.dataset.type
      var url =  e.currentTarget.id
      var delFileUrl = app.globalData.delFileUrl;
      wx.request({
        url: delFileUrl,
        data:{
          'openid': that.data.openid,
          'recordid': that.data.recordid,
          'type': type_id,
          'url': url
        },
        method:"GET",
        success(res){
          if(res.data.code == '0'){
            if(type_id == 1){
              that.setData({
                wumianjiegou: res.data.data.record,
                num: res.data.data.num,
                rate: res.data.data.rate
              })
            }else if(type_id == 2){
              that.setData({
                dianfeidan: res.data.data.record,
                num: res.data.data.num,
                rate: res.data.data.rate
              })
            }else if(type_id == 3){
              that.setData({
                tuzhi: res.data.data.record,
                num: res.data.data.num,
                rate: res.data.data.rate
              })
            }else if(type_id == 4){
              that.setData({
                zhaopianku: res.data.data.record,
                num: res.data.data.num,
                rate: res.data.data.rate
              })
            }else if(type_id == 5){
              that.setData({
                yezhuxinxi: res.data.data.record,
                num: res.data.data.num,
                rate: res.data.data.rate
              })
            }else if(type_id == 6){
              that.setData({
                beianzheng: res.data.data.record,
                num: res.data.data.num,
                rate: res.data.data.rate
              })
            }else if(type_id == 7){
              that.setData({
                jierufangan: res.data.data.record,
                num: res.data.data.num,
                rate: res.data.data.rate
              })
            }else if(type_id == 8){
              that.setData({
                yingyezhizhao: res.data.data.record,
                num: res.data.data.num,
                rate: res.data.data.rate
              })
            }else if(type_id == 9){
              that.setData({
                fangchan_tudizheng: res.data.data.record,
                num: res.data.data.num,
                rate: res.data.data.rate
              })
            }else if(type_id == 10){
              that.setData({
                chanquan_xinxi: res.data.data.record,
                num: res.data.data.num,
                rate: res.data.data.rate
              })
            }else if(type_id == 11){
              that.setData({
                jindiao_baogao: res.data.data.record,
                num: res.data.data.num,
                rate: res.data.data.rate
              })
            }else if(type_id == 12){
              that.setData({
                emc: res.data.data.record,
                num: res.data.data.num,
                rate: res.data.data.rate
              })
            }else if(type_id == 13){
              that.setData({
                takanbaogao: res.data.data.record,
                num: res.data.data.num,
                rate: res.data.data.rate
              })
            }else if(type_id == 14){
              that.setData({
                dianqi_pingtaitu: res.data.data.record,
                num: res.data.data.num,
                rate: res.data.data.rate
              })
            }else if(type_id == 15){
              that.setData({
                zaihe_baogao: res.data.data.record,
                num: res.data.data.num,
                rate: res.data.data.rate
              })
            }else if(type_id == 16){
              that.setData({
                chushe_fangan: res.data.data.record,
                num: res.data.data.num,
                rate: res.data.data.rate
              })
            }else if(type_id == 17){
              that.setData({
                zujian_paibutu: res.data.data.record,
                num: res.data.data.num,
                rate: res.data.data.rate
              })
            }
          }
        },
        complete(){
          
        }
      });
    },
    previewImage: function(e){
        var that = this;
        var type_id = e.currentTarget.dataset.type
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
        }else if(type_id == 8){
          urls = that.data.yingyezhizhao
        }else if(type_id == 9){
          urls = that.data.fangchan_tudizheng
        }else if(type_id == 10){
          urls = that.data.chanquan_xinxi
        }else if(type_id == 11){
          urls = that.data.jindiao_baogao
        }else if(type_id == 12){
          urls = that.data.emc
        }else if(type_id == 13){
          urls = that.data.takanbaogao
        }else if(type_id == 14){
          urls = that.data.dianqi_pingtaitu
        }else if(type_id == 15){
          urls = that.data.zaihe_baogao
        }else if(type_id == 16){
          urls = that.data.chushe_fangan
        }else if(type_id == 17){
          urls = that.data.zujian_paibutu
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
    that.setData({
      group_id: app.globalData.group_id
    })
    var getSgoFileUrl = app.globalData.getSgoFileUrl;
    wx.request({
      url: getSgoFileUrl,
      data:{
        'openid': that.data.openid,
        'recordid': that.data.recordid
      },
      method:"GET",
      success(res){
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
            rate : res.data.data.rate,
            sum_type: res.data.data.sum_type,

            yingyezhizhao: res.data.data.yingyezhizhao,
            fangchan_tudizheng: res.data.data.fangchan_tudizheng,
            chanquan_xinxi: res.data.data.chanquan_xinxi,
            jindiao_baogao: res.data.data.jindiao_baogao,
            emc: res.data.data.emc,
            takanbaogao: res.data.data.takanbaogao,
            dianqi_pingtaitu: res.data.data.dianqi_pingtaitu,
            zaihe_baogao: res.data.data.zaihe_baogao,
            chushe_fangan: res.data.data.chushe_fangan,
            zujian_paibutu: res.data.data.zujian_paibutu,
            
          });
          if(res.data.data.file_state != null && res.data.data.file_state.length > 0){
            that.setData({
              file_state_list: res.data.data.file_state.split(',')
            })
          }
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
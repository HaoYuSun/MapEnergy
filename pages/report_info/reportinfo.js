// pages/report_info/reportinfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordid: 0,
    openid:'',
    
    report_title: "",


    dianyadengji: ["10KV", "35KV", "110KV", "380v"],
    dianyadengjiIndex: 0,

    hezuomoshi: ["合同能源管理(EMC)", "屋顶租赁"],
    hezuomoshiIndex: 0,

    wudingleixing: ["彩钢瓦", "混凝土", "均衡"],
    wudingleixingIndex: 0,
    
    caigangleixing: ["角驰彩钢", "梯形彩钢"],
    caigangleixingIndex: 0,

    nianzongyongdian: '1',
    pingjundianjia: '1',        //平均电价
    xiangxi_fenshi_dianjia: 0,     //输入详细分时电价
    xiangxi_fenshi_dianjia_radioItems: [
      {name: '否', value: '0', checked: true},
      {name: '是', value: '1'}
    ],
    jianshi_dianjia: '1',       //业主用电尖时电网电价（含税）
    jianshi_shichang: '0',
    fengshi_dianjia: '1',       //业主用电峰时电网电价（含税）
    fengshi_shichang: '0',
    pingshi_dianjia: '1',       //业主用电平时电网电价（含税）
    pingshi_shichang: '0',
    gushi_dianjia: '1',         //业主用电谷时电网电价（含税）
    gushi_shichang: '0', 
    ri_pingjundianjia: '1',    //日间电网加权平均电价（含税）


    dianzhekou: '0.85',
    bianyaqirongliang: '200',
    bianyaqimiaoshu: '',
    ziyouzijin:'100',
    tuoliumeidianjia: '0.40',
    wudingzujin: '0',

    yushedianlijierushijian: ["已完成", "1个月", "3个月内完成"],
    yushedianlijierushijianIndex: 0,

    fangwushiyongnianxian: ["3年内", "3-10年", "10年以上"],
    fangwushiyongnianxianIndex: 0,

    qiyegongzuoshijian: ["单休", "双休", "全年无休"],
    qiyegongzuoshijianIndex: 0,

    qiyegongzuoshijian_shuoming: ["单班", "双班", "三班"],
    qiyegongzuoshijian_shuoming_Index: 0,

    changfanggaodu: ["低", "中", "高"],
    changfanggaoduIndex: 0,

    report_address:'',

    
    
    zaiheshuoming: ["不确定", "载荷满足", "加固后满足"],
    zaiheshuomingIndex: 0,

    changfangshuoming: [
      {name: '屋顶漏水', value: '屋顶漏水'},
      {name: '空管', value: '空管'},
      {name: '消防', value: '消防'},
      {name: '高空作业', value: '高空作业'}
    ],
    changfangshuoming_v:[],

    // yezhuxingzhi: ["普通", "地方龙头企业", "上市公司", "国企", "外企", "500强"],
    yezhuxingzhi: ["民营企业", "民营地方龙头", "民营上市公司", "国有企业", "外资企业", "世界500强", "其他"],
    yezhuxingzhiIndex: 0,

    group_id: 2,
    // 开玄DIY
    yezhu_zhuyingyewu_f: ['A农、林、牧、渔业', 'B采矿业', 'C制造业', 'D电力、热力、燃气及水生产和供应业', 'E建筑业', 'F批发和零售业', 'G交通运输、仓储和邮政业', 'H住宿和餐饮业', 'I信息传输、软件和信息技术服务业', 'J金融业', 'K房地产业', 'L租赁和商务服务业', 'M科学研究和技术服务业', 'N水利、环境和公共设施管理业', 'O居民服务、修理和其他服务业', 'P教育', 'Q卫生和社会工作', 'R文化、体育和娱乐业', 'S公共管理、社会保障和社会组织', 'T国际组织'],
    yezhu_zhuyingyewu_f_index: 0,
    yezhu_zhuyingyewu_t_dict: {
      'A农、林、牧、渔业': ['A1农业', 'A2林业', 'A3畜牧业', 'A4渔业', 'A5农、林、牧、渔服务业'],
      'B采矿业': ['B6煤炭开采和洗选业', 'B7石油和天然气开采业', 'B8黑色金属矿采选业', 'B9有色金属矿采选业', 'B10非金属矿采选业', 'B11开采辅助活动', 'B12其他采矿业'],
      'C制造业': ['C13农副食品加工业', 'C14食品制造业', 'C15酒、饮料和精制茶制造业', 'C16烟草制品业', 'C17纺织业', 'C18纺织服装、服饰业', 'C19皮革、毛皮、羽毛及其制品和制鞋业', 'C20木材加工和木、竹、藤、棕、草制品业', 'C21家具制造业', 'C22造纸和纸制品业', 'C23印刷和记录媒介复制业', 'C24文教、工美、体育和娱乐用品制造业', 'C25石油加工、炼焦和核燃料加工业', 'C26化学原料和化学制品制造业', 'C27医药制造业', 'C28化学纤维制造业', 'C29橡胶和塑料制品业', 'C30非金属矿物制品业', 'C31黑色金属冶炼和压延加工业', 'C32有色金属冶炼和压延加工业', 'C33金属制品业', 'C34通用设备制造业', 'C35专用设备制造业', 'C36汽车制造业', 'C37铁路、船舶、航空航天和其他运输设备制造业', 'C38电气机械和器材制造业', 'C39计算机、通信和其他电子设备制造业', 'C40仪器仪表制造业', 'C41其他制造业', 'C42废弃资源综合利用业', 'C43金属制品、机械和设备修理业'],
      'D电力、热力、燃气及水生产和供应业': ['D44电力、热力生产和供应业', 'D45燃气生产和供应业', 'D46水的生产和供应业'],
      'E建筑业': ['E47房屋建筑业', 'E48土木工程建筑业', 'E49建筑安装业', 'E50建筑装饰和其他建筑业'],
      'F批发和零售业': ['F51批发业', 'F52零售业'],
      'G交通运输、仓储和邮政业': ['G53铁路运输业', 'G54道路运输业', 'G55水上运输业', 'G56航空运输业', 'G57管道运输业', 'G58装卸搬运和运输代理业', 'G59仓储业', 'G60邮政业'],
      'H住宿和餐饮业': ['H61住宿业', 'H62餐饮业'],
      'I信息传输、软件和信息技术服务业': ['I63电信、广播电视和卫星传输服务', 'I64互联网和相关服务', 'I65软件和信息技术服务业'],
      'J金融业': ['J66货币金融服务', 'J67资本市场服务', 'J68保险业', 'J69其他金融业'],
      'K房地产业': ['K70房地产业'],
      'L租赁和商务服务业': ['L71租赁业', 'L72商务服务业'],
      'M科学研究和技术服务业': ['M73研究和试验发展', 'M74专业技术服务业', 'M75科技推广和应用服务业'],
      'N水利、环境和公共设施管理业': ['N76水利管理业', 'N77生态保护和环境治理业', 'N78公共设施管理业'],
      'O居民服务、修理和其他服务业': ['O79居民服务业', 'O80机动车、电子产品和日用产品修理业', 'O81其他服务业'],
      'P教育': ['P82教育'],
      'Q卫生和社会工作': ['Q83卫生', 'Q84社会工作'],
      'R文化、体育和娱乐业': ['R85新闻和出版业', 'R86广播、电视、电影和影视录音制作业', 'R87文化艺术业', 'R88体育', 'R89娱乐业'],
      'S公共管理、社会保障和社会组织': ['S90中国共产党机关', 'S91国家机构', 'S92人民政协、民主党派', 'S93社会保障', 'S94群众团体、社会团体和其他成员组织', 'S95基层群众自治组织'],
      'T国际组织': ['T96国际组织']
    },
    yezhu_zhuyingyewu_t: ['A1农业', 'A2林业', 'A3畜牧业', 'A4渔业', 'A5农、林、牧、渔服务业'],
    yezhu_zhuyingyewu_t_index: 0,
    yezhu_zhuyingyewu_shuoming: '',


    yezhu_zhuyingyewu: 'A1农业-A农、林、牧、渔业',              //业主主营业务
    yezhu_caiwuqingkuang: 0,            //业主财务情况(财务报表/审计报告）
    yezhu_caiwuqingkuang_radioItems: [
      {name: '无', value: '0', checked: true},
      {name: '有', value: '1'}
    ],

    yezhu_zhiyaqingkuang: 0,            //业主企业股权和房屋有无被质押
    yezhu_zhiyaqingkuang_radioItems: [
      {name: '无', value: '0', checked: true},
      {name: '有', value: '1'}
    ],
    yezhu_chanzheng: 0,                 //土地及房屋产证齐全情况
    yezhu_chanzheng_radioItems: [
      {name: '无', value: '0', checked: true},
      {name: '有', value: '1'}
    ],
    yezhu_shixin: 0,                    //业主是否有严重失信问题
    yezhu_shixin_radioItems: [
      {name: '无', value: '0', checked: true},
      {name: '有', value: '1'}
    ],
    yezhu_fumian: 0,                    //业主所属行业是否为负面清单
    yezhu_fumian_radioItems: [
      {name: '无', value: '0', checked: true},
      {name: '有', value: '1'}
    ],
    yezhu_fumian_shuoming: '',
    yezhu_qiankuan: 0,                  //业主是否有欠款发生的应诉案（天眼查）
    yezhu_qiankuan_radioItems: [
      {name: '无', value: '0', checked: true},
      {name: '有', value: '1'}
    ],
    yezhu_jingyingfengxian: 0,          //业主有无重大经营风险
    yezhu_jingyingfengxian_radioItems: [
      {name: '无', value: '0', checked: true},
      {name: '有', value: '1'}
    ],
    yezhu_jingyinganli: '',             //列示业主重大经营风险（如有）

    is_yongdianhu: 0,                   //如用电方为业主方
    is_yongdianhu_radioItems: [
      {name: '否', value: '0', checked: true},
      {name: '是', value: '1'}
    ],

    // yongdianhu_xingzhi: ["民营企业", "民营地方龙头", "民营上市公司", "国有企业", "外资企业", "世界500强", "其他"],
    yongdianhu_xingzhiIndex: 0,         //用电户性质
    yongdianhu_zhuyingyewu: 'A1农业-A农、林、牧、渔业',         //用电户主营业务
    yongdianhu_zhuyingyewu_f_index: 0,
    yongdianhu_zhuyingyewu_t: ['A1农业', 'A2林业', 'A3畜牧业', 'A4渔业', 'A5农、林、牧、渔服务业'],
    yongdianhu_zhuyingyewu_t_index: 0,
    yongdianhu_zhuyingyewu_shuoming: '',


    yongdianhu_zhouqihangye: 0,         //用电户是否为周期性行业
    yongdianhu_zhouqihangye_radioItems: [
      {name: '否', value: '0', checked: true},
      {name: '是', value: '1'}
    ],

    yongdianhu_caiwuqingkuang: 0,       //用电户财务情况(财务报表/审计报告
    yongdianhu_caiwuqingkuang_radioItems: [
      {name: '无', value: '0', checked: true},
      {name: '有', value: '1'}
    ],
    yongdianhu_zhiyaqingkuang: 0,       //用电户股权和房屋有无被质押
    yongdianhu_zhiyaqingkuang_radioItems: [
      {name: '无', value: '0', checked: true},
      {name: '有', value: '1'}
    ],
    yongdianhu_shixin: 0,               //用电户法人是否有严重失信问题
    yongdianhu_shixin_radioItems: [
      {name: '无', value: '0', checked: true},
      {name: '有', value: '1'}
    ],
    yongdianhu_fumian: 0,               //用电户属行业是否为负面清单
    yongdianhu_fumian_radioItems: [
      {name: '无', value: '0', checked: true},
      {name: '有', value: '1'}
    ],
    yongdianhu_fumian_shuoming: '',
    yongdianhu_qiankuan: 0,             //用电户是否有欠款发生的应诉案（天眼查）
    yongdianhu_qiankuan_radioItems: [
      {name: '无', value: '0', checked: true},
      {name: '有', value: '1'}
    ],
    yongdianhu_jingyingfengxian: 0,      //用电户有无重大经营风险
    yongdianhu_jingyingfengxian_radioItems: [
      {name: '无', value: '0', checked: true},
      {name: '有', value: '1'}
    ],
    yongdianhu_jingyinganli: '',        //列示用电户重大经营风险（如有）


    jiben_yunying_nianxian: '25',       //基本运营年限
    jianshe_zhouqi: '3',                //建设周期
    jianzhuwu_geshu: '1',               //建筑物个数
    bingwangdian_geshu: '1',            //并网点个数
    zhedang_shuoming: 0,                //遮挡说明
    zhedang_shuoming_radioItems: [
      {name: '无', value: '0', checked: true},
      {name: '有', value: '1'}
    ],
    wuding_chaoxiang: ['东', '南', '西', '北'], 
    wuding_chaoxiang_index: 1,            //屋顶朝向

    quannian_yongdianliang: '0', //全年用电量
    quannian_ri_yongdianliang: '0', //全年日用电量
    quannian_ri_yongdian_zhanbi: '0', //日用电占比


    xiangxi_epc_baojia: 0,      //详细EPC报价
    xiangxi_epc_baojia_radioItems: [
      {name: '否', value: '0', checked: true},
      {name: '是', value: '1'}
    ],
    epc_shejifei: '0',    //EPC-设计费
    epc_zujian: '0',      //EPC-组件
    epc_nibianqi: '0',    //EPC-逆变器
    epc_ercishebei: '0',  //EPC-二次设备
    epc_xiaopc: '0',      //EPC-小成本
    epc_jiagu: '0',       //EPC-屋顶加固
    epc_jianli: '0',      //EPC-监理
    xiangmu_zonghe_baojia: '0',   //项目综合报价
  },

  /**
   * 开玄_业主性质改变时
  */
  yezhu_zhuyingyewu_f_change: function(e) {
    var that = this;
    that.setData({
      yezhu_zhuyingyewu_f_index: e.detail.value,
      yezhu_zhuyingyewu_t: that.data.yezhu_zhuyingyewu_t_dict[that.data.yezhu_zhuyingyewu_f[e.detail.value]],
      yezhu_zhuyingyewu_t_index: 0
    });
    this.yezhu_zhuyingyewu();
  },
  yezhu_zhuyingyewu_t_change: function(e) {
    this.setData({
      yezhu_zhuyingyewu_t_index: e.detail.value
    });
    this.yezhu_zhuyingyewu();
  },
  yezhu_zhuyingyewu_shuoming_inp_focus: function(e){
    var that = this;
    that.setData({
      yezhu_zhuyingyewu_shuoming: ''
    });
  },
  yezhu_zhuyingyewu_shuoming_inp_blur: function(e){
    var that = this;
    if(that.data.yezhu_zhuyingyewu_shuoming == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          yezhu_zhuyingyewu_shuoming: ''
        });
      }else{
        return;
      }
    }else{
      if(e.detail.value == ''){
        that.setData({
          yezhu_zhuyingyewu_shuoming: ''
        });
      }else{
        that.setData({
          yezhu_zhuyingyewu_shuoming: e.detail.value
        });
      }
    }
    this.yezhu_zhuyingyewu();
  },
  yezhu_zhuyingyewu: function() {
    this.data.yezhu_zhuyingyewu = this.data.yezhu_zhuyingyewu_f[this.data.yezhu_zhuyingyewu_f_index]+'-'+this.data.yezhu_zhuyingyewu_t[this.data.yezhu_zhuyingyewu_t_index]+'-'+this.data.yezhu_zhuyingyewu_shuoming;
    console.log(this.data.yezhu_zhuyingyewu)
  },
  /**
   * 开玄_业主财务情况(财务报表/审计报告）
   */
  yezhu_caiwuqingkuang_radioChange: function (e) {
    var that = this;
    that.setData({
      yezhu_caiwuqingkuang: e.detail.value
    });

    var radioItems = this.data.yezhu_caiwuqingkuang_radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
  },
  /**
   * 开玄_业主企业股权和房屋有无被质押
   */
  yezhu_zhiyaqingkuang_radioChange: function (e) {
    var that = this;
    that.setData({
      yezhu_zhiyaqingkuang: e.detail.value
    });
    var radioItems = this.data.yezhu_zhiyaqingkuang_radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
  },
  /**
   * 开玄_土地及房屋产证齐全情况
   */
  yezhu_chanzheng_radioChange: function (e) {
    var that = this;
    that.setData({
      yezhu_chanzheng: e.detail.value
    });
    var radioItems = this.data.yezhu_chanzheng_radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
  },
  /**
   * 开玄_业主是否有严重失信问题
   */
  yezhu_shixin_radioChange: function (e) {
    var that = this;
    that.setData({
      yezhu_shixin: e.detail.value
    });
    var radioItems = this.data.yezhu_shixin_radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
  },
  /**
   * 开玄_业主所属行业是否为负面清单
   */
  yezhu_fumian_radioChange: function (e) {
    var that = this;
    var radioItems = this.data.yezhu_fumian_radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    that.setData({
      yezhu_fumian: e.detail.value
    })
  },
  /**
   * 开玄_业主所属行业负面清单说明
   */
  yezhu_fumian_shuoming_inp_blur: function(e){
    var that = this;
    if(that.data.yezhu_fumian_shuoming == e.detail.value){
      return;
    }else{
      that.setData({
        yezhu_fumian_shuoming: e.detail.value
      });
    }
  },
  yezhu_fumian_shuoming_inp_focus: function(e){
    var that = this;
    that.setData({
      yezhu_fumian_shuoming: ''
    });
  },
  /**
   * 开玄_业主是否有欠款发生的应诉案（天眼查）
   */
  yezhu_qiankuan_radioChange: function (e) {
    var that = this;
    that.setData({
      yezhu_qiankuan: e.detail.value
    })
    var radioItems = this.data.yezhu_qiankuan_radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
  },
  /**
   * 开玄_列示业主重大经营风险
   */
  yezhu_jingyingfengxian_radioChange: function (e) {
    var that = this;
    that.setData({
      yezhu_jingyingfengxian: e.detail.value
    })
    var radioItems = this.data.yezhu_jingyingfengxian_radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
  },
  /**
   * 开玄_列示业主重大经营风险（如有）
   */
  yezhu_jingyinganli_inp_blur: function(e){
    var that = this;
    if(that.data.yezhu_jingyinganli == e.detail.value){
      return;
    }else{
      that.setData({
        yezhu_jingyinganli: e.detail.value
      });
    }
  },
  yezhu_jingyinganli_inp_focus: function(e){
    var that = this;
    that.setData({
      yezhu_jingyinganli: ''
    });
  },
  /**
   * 开玄_如用电方为业主方
   */
  is_yongdianhu_radioChange: function (e) {
    var that = this;
    that.setData({
      is_yongdianhu: e.detail.value
    })
    var radioItems = this.data.is_yongdianhu_radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
  },
  /**
   * 开玄_用电户性质改变时
  */
  bindYongdianhuxingzhiChange: function(e) {
    this.setData({
      yongdianhu_xingzhiIndex: e.detail.value
    })
  },
  /**
   * 开玄_业主性质改变时
  */
  yongdianhu_zhuyingyewu_f_change: function(e) {
    var that = this;
    that.setData({
      yongdianhu_zhuyingyewu_f_index: e.detail.value,
      yongdianhu_zhuyingyewu_t: that.data.yezhu_zhuyingyewu_t_dict[that.data.yezhu_zhuyingyewu_f[e.detail.value]],
      yongdianhu_zhuyingyewu_t_index: 0
    })
    this.yongdianhu_zhuyingyewu();
  },
  yongdianhu_zhuyingyewu_t_change: function(e) {
    this.setData({
      yongdianhu_zhuyingyewu_t_index: e.detail.value
    })
    this.yongdianhu_zhuyingyewu();
  },
  yongdianhu_zhuyingyewu_shuoming_inp_focus: function(e){
    var that = this;
    that.setData({
      yongdianhu_zhuyingyewu_shuoming: ''
    });
  },
  yongdianhu_zhuyingyewu_shuoming_inp_blur: function(e){
    var that = this;
    if(that.data.yongdianhu_zhuyingyewu_shuoming == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          yongdianhu_zhuyingyewu_shuoming: ''
        });
      }else{
        return;
      }
    }else{
      if(e.detail.value == ''){
        that.setData({
          yongdianhu_zhuyingyewu_shuoming: ''
        });
      }else{
        that.setData({
          yongdianhu_zhuyingyewu_shuoming: e.detail.value
        });
      }
    }
    this.yongdianhu_zhuyingyewu();
  },
  yongdianhu_zhuyingyewu: function() {
    this.data.yongdianhu_zhuyingyewu = this.data.yezhu_zhuyingyewu_f[this.data.yongdianhu_zhuyingyewu_f_index]+'-'+this.data.yongdianhu_zhuyingyewu_t[this.data.yongdianhu_zhuyingyewu_t_index]+'-'+this.data.yongdianhu_zhuyingyewu_shuoming;
    console.log(this.data.yongdianhu_zhuyingyewu)
  },
  /**
   * 开玄_用电户周期性行业
   */
  yongdianhu_zhouqihangye_radioChange: function (e) {
    var that = this;
    that.setData({
      yongdianhu_zhouqihangye: e.detail.value
    });

    var radioItems = this.data.yongdianhu_zhouqihangye_radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
  },
  /**
   * 开玄_用电户财务情况(财务报表/审计报告）
   */
  yongdianhu_caiwuqingkuang_radioChange: function (e) {
    var that = this;
    that.setData({
      yongdianhu_caiwuqingkuang: e.detail.value
    });

    var radioItems = this.data.yongdianhu_caiwuqingkuang_radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
  },
  /**
   * 开玄_用电户股权和房屋有无被质押
   */
  yongdianhu_zhiyaqingkuang_radioChange: function (e) {
    var that = this;
    that.setData({
      yongdianhu_zhiyaqingkuang: e.detail.value
    });
    var radioItems = this.data.yongdianhu_zhiyaqingkuang_radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
  },
  /**
   * 开玄_用电户是否有严重失信问题
   */
  yongdianhu_shixin_radioChange: function (e) {
    var that = this;
    that.setData({
      yongdianhu_shixin: e.detail.value
    });
    var radioItems = this.data.yongdianhu_shixin_radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
  },
  /**
   * 开玄_用电户所属行业是否为负面清单
   */
  yongdianhu_fumian_radioChange: function (e) {
    var that = this;
    var radioItems = this.data.yongdianhu_fumian_radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    that.setData({
      yezhu_fumian: e.detail.value
    })
  },
  /**
   * 开玄_用电户所属行业负面清单说明
   */
  yongdianhu_fumian_shuoming_inp_blur: function(e){
    var that = this;
    if(that.data.yongdianhu_fumian_shuoming == e.detail.value){
      return;
    }else{
      that.setData({
        yongdianhu_fumian_shuoming: e.detail.value
      });
    }
  },
  yongdianhu_fumian_shuoming_inp_focus: function(e){
    var that = this;
    that.setData({
      yongdianhu_fumian_shuoming: e.detail.value
    });
  },
  /**
   * 开玄_用电户是否有欠款发生的应诉案（天眼查）
   */
  yongdianhu_qiankuan_radioChange: function (e) {
    var that = this;
    that.setData({
      yongdianhu_qiankuan: e.detail.value
    })
    var radioItems = this.data.yongdianhu_qiankuan_radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
  },
  /**
   * 开玄_用电户重大经营风险
   */
  yongdianhu_jingyingfengxian_radioChange: function (e) {
    var that = this;
    that.setData({
      yongdianhu_jingyingfengxian: e.detail.value
    })
    var radioItems = this.data.yongdianhu_jingyingfengxian_radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
  },
  /**
   * 开玄_用电户重大经营风险（如有）
   */
  yongdianhu_jingyinganli_inp_blur: function(e){
    var that = this;
    if(that.data.yongdianhu_jingyinganli == e.detail.value){
      return;
    }else{
      that.setData({
        yongdianhu_jingyinganli: e.detail.value
      });
    }
  },
  yongdianhu_jingyinganli_inp_focus: function(e){
    var that = this;
    that.setData({
      yongdianhu_jingyinganli: ''
    });
  },
  /**
   * 开玄_基本运营年限
  */
  jiben_yunying_nianxian_inp_focus: function(e){
    var that = this;
    that.setData({
      jiben_yunying_nianxian: ''
    });
  },
  jiben_yunying_nianxian_inp_blur: function(e){
    var that = this;
    if(e.detail.value == '' || e.detail.value == '0'){
      that.setData({
        jiben_yunying_nianxian: '25'
      });
    }else{
      that.setData({
        jiben_yunying_nianxian: e.detail.value
      });
    }
  },
  /**
   * 开玄_建设周期
  */
  jianshe_zhouqi_inp_focus: function(e){
    var that = this;
    that.setData({
      jianshe_zhouqi: ''
    });
  },
  jianshe_zhouqi_inp_blur: function(e){
    var that = this;
    if(e.detail.value == '' || e.detail.value == '0'){
      that.setData({
        jianshe_zhouqi: '3'
      });
    }else{
      that.setData({
        jianshe_zhouqi: e.detail.value
      });
    }
  },
  /**
   * 开玄_建筑物个数
  */
  jianzhuwu_geshu_inp_focus: function(e){
    var that = this;
    that.setData({
      jianzhuwu_geshu: ''
    });
  },
  jianzhuwu_geshu_inp_focus: function(e){
    var that = this;
    if(e.detail.value == '' || e.detail.value == '0'){
      that.setData({
        jianzhuwu_geshu: '1'
      });
    }else{
      that.setData({
        jianzhuwu_geshu: e.detail.value
      });
    }
  },
  /**
   * 开玄_并网点个数
  */
  bingwangdian_geshu_inp_focus: function(e){
    var that = this;
    that.setData({
      bingwangdian_geshu: ''
    });
  },
  bingwangdian_geshu_inp_blur: function(e){
    var that = this;
    if(e.detail.value == '' || e.detail.value == '0'){
      that.setData({
        bingwangdian_geshu: '1'
      });
    }else{
      that.setData({
        bingwangdian_geshu: e.detail.value
      });
    }
  },
  /**
   * 开玄_遮挡说明
   */
  zhedang_shuoming_radioChange: function (e) {
    var that = this;
    that.setData({
      zhedang_shuoming: e.detail.value
    });

    var radioItems = this.data.yezhu_caiwuqingkuang_radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
  },
  /**
   * 开玄_业主性质改变时
  */
  wuding_chaoxiang_change: function(e) {
    this.setData({
      wuding_chaoxiang_index: e.detail.value
    })
  },
  /**
   * 开玄_全年用电量
  */
  quannian_yongdianliang_inp_blur: function(e){
    var that = this;
    console.log(e.detail.value)
    if(e.detail.value == ''){
      that.setData({
        quannian_yongdianliang: '0'
      });
    }else{
      that.setData({
        quannian_yongdianliang: e.detail.value
      });
    }

    if(that.data.quannian_yongdianliang != '0'){
      console.log(that.data.quannian_ri_yongdianliang)
      console.log(that.data.quannian_ri_yongdianliang)
      var rate = parseInt(that.data.quannian_ri_yongdianliang) * 100 / parseInt(that.data.quannian_yongdianliang)
      console.log(rate)
      that.setData({
        quannian_ri_yongdian_zhanbi: rate
      });
    }else{
      that.setData({
        quannian_ri_yongdian_zhanbi: '0'
      });
    }

  },
  quannian_yongdianliang_inp_blur: function(e){
    var that = this;
    that.setData({
      quannian_ri_yongdian_zhanbi: ''
    });
  },
  /**
   * 开玄_全年日用电量
  */
  quannian_ri_yongdianliang_inp_blur: function(e){
    var that = this;
    if(e.detail.value == ''){
      that.setData({
        quannian_ri_yongdianliang: '0'
      });
    }else{
      that.setData({
        quannian_ri_yongdianliang: e.detail.value
      });
    }

    if(that.data.quannian_yongdianliang != '0'){
      var rate = parseInt(that.data.quannian_ri_yongdianliang) * 100 / parseInt(that.data.quannian_yongdianliang)
      that.setData({
        quannian_ri_yongdian_zhanbi: rate
      });
    }else{
      that.setData({
        quannian_ri_yongdian_zhanbi: '0'
      });
    }
  },
  quannian_ri_yongdianliang_inp_focus: function(e){
    var that = this;
    that.setData({
      quannian_ri_yongdian_zhanbi: ''
    });
  },
  /**
   * 是否详细EPC报价
   */
  xiangxi_epc_baojia_radioChange: function (e) {
    var that = this;
    that.setData({
      xiangxi_epc_baojia: e.detail.value
    });

    var radioItems = this.data.xiangxi_epc_baojia_radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
  },
  epc_shejifei_inp_blur: function(e){
    if(e.detail.value == ''){
      this.data.epc_shejifei = '0';
    }else{
      this.data.epc_shejifei = e.detail.value;
    }
    this.get_xiangmu_zonghe_baojia();
  },
  epc_zujian_inp_blur: function(e){
    if(e.detail.value == ''){
      this.data.epc_zujian = '0';
    }else{
      this.data.epc_zujian = e.detail.value;
    }
    this.get_xiangmu_zonghe_baojia();
  },
  epc_nibianqi_inp_blur: function(e){
    if(e.detail.value == ''){
      this.data.epc_nibianqi = '0';
    }else{
      this.data.epc_nibianqi = e.detail.value;
    }
    this.get_xiangmu_zonghe_baojia();
  },
  epc_ercishebei_inp_blur: function(e){
    if(e.detail.value == ''){
      this.data.epc_ercishebei = '0';
    }else{
      this.data.epc_ercishebei = e.detail.value;
    }
    this.get_xiangmu_zonghe_baojia();
  },
  epc_xiaopc_inp_blur: function(e){
    if(e.detail.value == ''){
      this.data.epc_xiaopc = '0';
    }else{
      this.data.epc_xiaopc = e.detail.value;
    }
    this.get_xiangmu_zonghe_baojia();
  },
  epc_jiagu_inp_blur: function(e){
    if(e.detail.value == ''){
      this.data.epc_jiagu = '0';
    }else{
      this.data.epc_jiagu = e.detail.value;
    }
    this.get_xiangmu_zonghe_baojia();
  },
  epc_jianli_inp_blur: function(e){
    if(e.detail.value == ''){
      this.data.epc_jianli = '0';
    }else{
      this.data.epc_jianli = e.detail.value;
    }
    this.get_xiangmu_zonghe_baojia();
  },
  get_xiangmu_zonghe_baojia: function () {
    console.log('get_xiangmu_zonghe_baojia')
    var sum_price = parseFloat(this.data.epc_shejifei) + parseFloat(this.data.epc_zujian) + parseFloat(this.data.epc_nibianqi) + parseFloat(this.data.epc_ercishebei) + parseFloat(this.data.epc_xiaopc) + parseFloat(this.data.epc_jiagu) + parseFloat(this.data.epc_jianli);
    this.setData({
      xiangmu_zonghe_baojia: sum_price.toString()
    })
  },


  /**
   * 厂房说明
   */
  checkboxChange: function (e) {
    var that = this;
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.changfangshuoming, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
            if(checkboxItems[i].value == values[j]){
              checkboxItems[i].checked = true;
                break;
            }
        }
    }

    this.setData({
      changfangshuoming: checkboxItems,
      changfangshuoming_v: e.detail.value
    });
  },
  /**
   * 项目地址改变时
   */
  reoirt_addr_inp_focus: function(e){
    var that = this;
    that.setData({
      report_address: ''
    });
  },
  reoirt_addr_inp_blur: function(e){
    var that = this;
    if(that.data.report_address == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          report_address: ''
        });
      }else{
        return;
      }
    }else{
      if(e.detail.value == ''){
        that.setData({
          report_address: ''
        });
      }else{
        that.setData({
          report_address: e.detail.value
        });
      }
    }
  },
  /**
   * 载荷说明改变时
  */
  bindZaiheshuomingChange: function(e) {
    this.setData({
      zaiheshuomingIndex: e.detail.value
    })
  },
  /**
   * 业主性质改变时
  */
  bindYezhuxingzhiChange: function(e) {
    this.setData({
      yezhuxingzhiIndex: e.detail.value
    })
  },
  /**
   * 厂房高度改变时
  */
  bindChangfanggaoduChange: function(e) {
    this.setData({
      changfanggaoduIndex: e.detail.value
    })
  },
  /**
   * 企业工作时间改变时
  */
  bindQiyegongzuoshijianChange: function(e) {
    this.setData({
      qiyegongzuoshijianIndex: e.detail.value
    })
  },
  bindQiyegongzuoshijianshuomingChange: function(e) {  
    this.setData({
      qiyegongzuoshijian_shuoming_Index: e.detail.value
    })
  },
  /**
   * 预计电力接入时间改变时
  */
  bindDianlijierushijianChange: function(e) {
    this.setData({
      fangwushiyongnianxianIndex: e.detail.value
    })
  },
  /**
   * 房屋使用时间改变时
  */
  bindFangwushiyongnianxianChange: function(e) {
    this.setData({
      fangwushiyongnianxianIndex: e.detail.value
    })
  },

  /**
   * 屋顶租金改变时
   */
  wudingzujin_inp_blur: function(e){
    var that = this;
    if(that.data.wudingzujin == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          wudingzujin: '0'
        });
      }else{
        return;
      }
    }else{
      if(e.detail.value == ''){
        that.setData({
          wudingzujin: '0'
        });
      }else{
        that.setData({
          wudingzujin: Number(e.detail.value)
        });
      }
    }
  },
  wudingzujin_inp_focus: function(e){
    var that = this;
    that.setData({
      wudingzujin: ''
    });
  },

  /**
   * 脱硫煤电价改变时
   */
  tuoliumeidianjia_inp_blur: function(e){
    var that = this;
    if(that.data.tuoliumeidianjia == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          tuoliumeidianjia: '0'
        });
      }else{
        return;
      }
    }else{
      if(e.detail.value == ''){
        that.setData({
          tuoliumeidianjia: '0'
        });
      }else{
        that.setData({
          tuoliumeidianjia: e.detail.value
        });
      }
    }
  },
  tuoliumeidianjia_inp_focus: function(e){
    var that = this;
    that.setData({
      tuoliumeidianjia: ''
    });
  },

  /**
   * 自有资金改变时
   */
  ziyouzijin_inp_blur: function(e){
    var that = this;
    if(that.data.ziyouzijin == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          ziyouzijin: '100'
        });
      }else{
        return;
      }
    }else{
      if(e.detail.value == ''){
        that.setData({
          ziyouzijin: '100'
        });
      }else{
        that.setData({
          ziyouzijin: e.detail.value
        });
      }
    }
  },
  ziyouzijin_inp_focus: function(e){
    var that = this;
    that.setData({
      ziyouzijin: ''
    });
  },

  /**
   * 变压器容量描述改变时
   */
  bianyaqimiaoshu_inp_blur: function(e){
    var that = this;
    if(that.data.bianyaqimiaoshu == e.detail.value){
      return;
    }else{
      that.setData({
        bianyaqimiaoshu: e.detail.value
      });
    }
  },

  /**
   * 变压器容量改变时
   */
  bianyaqirongliang_inp_blur: function(e){
    var that = this;
    if(that.data.bianyaqirongliang == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          bianyaqirongliang: '200'
        });
      }else{
        return;
      }
    }else{
      if(e.detail.value == ''){
        that.setData({
          bianyaqirongliang: '200'
        });
      }else{
        that.setData({
          bianyaqirongliang: e.detail.value
        });
      }
    }
  },
  bianyaqirongliang_inp_focus: function(e){
    var that = this;
    that.setData({
      bianyaqirongliang: ''
    });
  },

  /**
   * 电折扣改变时
   */
  dianzhekou_inp_blur: function(e){
    var that = this;
    if(that.data.dianzhekou == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          dianzhekou: 1
        });
      }else{
        return;
      }
    }else{
      if(e.detail.value == ''){
        that.setData({
          dianzhekou: 1
        });
      }else{
        that.setData({
          dianzhekou: Number(e.detail.value)
        });
      }
    }
  },
  dianzhekou_inp_focus: function(e){
    var that = this;
    that.setData({
      dianzhekou: ''
    });
  },

  /**
   * 平均电价改变时
   */
  pingjundianjia_inp_blur: function(e){
    var that = this;
    if(that.data.pingjundianjia == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          pingjundianjia: 0
        });
      }else{
        return;
      }
    }else{
      if(e.detail.value == ''){
        that.setData({
          pingjundianjia: 0
        });
      }else{
        that.setData({
          pingjundianjia: Number(e.detail.value)
        });
      }
    }
  },
  pingjundianjia_inp_focus: function(e){
    var that = this;
    that.setData({
      pingjundianjia: ''
    });
  },

  /**
   * 详细分时电价
   */
  xiangxi_fenshi_dianjia_radioChange: function (e) {
    var that = this;
    that.setData({
      xiangxi_fenshi_dianjia: e.detail.value
    });

    var radioItems = this.data.xiangxi_fenshi_dianjia_radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
  },
  jianshi_dianjia_inp_blur: function (e) {
    if(e.detail.value == ''){
      this.data.jianshi_dianjia = '0'
    }else{
      this.data.jianshi_dianjia = e.detail.value
    }
    this.get_ri_pingjundianjia();
  },
  jianshi_dianjia_inp_focus: function (e) {
    this.data.jianshi_dianjia = ''
  },
  jianshi_shichang_inp_blur: function (e) {
    if(e.detail.value == ''){
      this.data.jianshi_shichang = '0'
    }else{
      this.data.jianshi_shichang = e.detail.value
    }
    this.get_ri_pingjundianjia();
  },
  jianshi_shichang_inp_focus: function (e) {
    this.data.jianshi_shichang = ''
  },
  fengshi_dianjia_inp_blur: function (e) {
    if(e.detail.value == ''){
      this.data.fengshi_dianjia = '0'
    }else{
      this.data.fengshi_dianjia = e.detail.value
    }
    this.get_ri_pingjundianjia();
  },
  fengshi_dianjia_inp_focus: function (e) {
    this.data.fengshi_dianjia = ''
  },
  fengshi_shichang_inp_blur: function (e) {
    if(e.detail.value == ''){
      this.data.fengshi_shichang = '0'
    }else{
      this.data.fengshi_shichang = e.detail.value
    }
    this.get_ri_pingjundianjia();
  },
  fengshi_shichang_inp_focus: function (e) {
    this.data.fengshi_shichang = ''
  },
  pingshi_dianjia_inp_blur: function (e) {
    if(e.detail.value == ''){
      this.data.pingshi_dianjia = '0'
    }else{
      this.data.pingshi_dianjia = e.detail.value
    }
    this.get_ri_pingjundianjia();
  },
  pingshi_dianjia_inp_focus: function (e) {
    this.data.pingshi_dianjia = ''
  },
  pingshi_shichang_inp_blur: function (e) {
    if(e.detail.value == ''){
      this.data.pingshi_shichang = '0'
    }else{
      this.data.pingshi_shichang = e.detail.value
    }
    this.get_ri_pingjundianjia();
  },
  pingshi_shichang_inp_focus: function (e) {
    this.data.pingshi_shichang = ''
  },
  gushi_dianjia_inp_blur: function (e) {
    if(e.detail.value == ''){
      this.data.gushi_dianjia = '0'
    }else{
      this.data.gushi_dianjia = e.detail.value
    }
    this.get_ri_pingjundianjia();
  },
  gushi_dianjia_inp_focus: function (e) {
    this.data.gushi_dianjia = ''
  },
  gushi_shichang_inp_blur: function (e) {
    if(e.detail.value == ''){
      this.data.gushi_shichang = '0'
    }else{
      this.data.gushi_shichang = e.detail.value
    }
    this.get_ri_pingjundianjia();
  },
  gushi_shichang_inp_focus: function (e) {
    this.data.gushi_shichang = ''
  },
  get_ri_pingjundianjia: function () {
    console.log('计算日间加权电价')
    var sum_price = parseFloat(this.data.jianshi_dianjia) * parseFloat(this.data.jianshi_shichang) + parseFloat(this.data.fengshi_dianjia) * parseFloat(this.data.fengshi_shichang) + parseFloat(this.data.pingshi_dianjia) * parseFloat(this.data.pingshi_shichang) + parseFloat(this.data.gushi_dianjia) * parseFloat(this.data.gushi_shichang);
    var sum_time = parseFloat(this.data.jianshi_shichang) + parseFloat(this.data.fengshi_shichang) + parseFloat(this.data.pingshi_shichang) + parseFloat(this.data.gushi_shichang);
    console.log(sum_price)
    console.log(sum_time)
    if(sum_time > 0){
      // this.data.ri_pingjundianjia = Math.floor(sum_price * 100 / sum_time) / 100
      this.setData({
        ri_pingjundianjia: Math.floor(sum_price * 100 / sum_time) / 100
      })
    }
  },

  /**
   * 年总用电量改变时
   */
  nianzongyongdian_inp_blur: function(e){
    var that = this;
    if(that.data.nianzongyongdian == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          nianzongyongdian: 0
        });
      }else{
        return;
      }
    }else{
      if(e.detail.value == ''){
        that.setData({
          nianzongyongdian: 0
        });
      }else{
        that.setData({
          nianzongyongdian: Number(e.detail.value)
        });
      }
    }
  },
  nianzongyongdian_inp_focus: function(e){
    var that = this;
    that.setData({
      nianzongyongdian: ''
    });
  },

  /**
   * 项目地点改变时
   */
  reoirt_title_inp_blur: function(e){
    var that = this;
    if(that.data.report_title == e.detail.value){
      if(e.detail.value == ''){
        that.setData({
          report_title: ''
        });
      }else{
        return;
      }
    }else{
      if(e.detail.value == ''){
        that.setData({
          report_title: ''
        });
      }else{
        that.setData({
          report_title: e.detail.value
        });
      }
    }
  },
  reoirt_title_inp_focus: function(e){
    var that = this;
    that.setData({
      report_title: ''
    });
  },

  /**
   * 进线等级
  */
  bindDianyadengjiChange: function(e) {
    console.log('picker dianyadengji 发生选择改变，携带值为', e.detail.value);

    this.setData({
      dianyadengjiIndex: e.detail.value
    })
  },

  /**
   * 合作模式
  */
  bindHezuomoshiChange: function(e) {
    console.log('picker hezuomoshi 发生选择改变，携带值为', e.detail.value);

    this.setData({
      zaiheshuomingIndex: e.detail.value
    })
  },
  /**
   * 屋顶类型
  */
  bindWudingleixingChange: function(e) {
    console.log('picker wudingleixing 发生选择改变，携带值为', e.detail.value);

    this.setData({
      wudingleixingIndex: e.detail.value
    })
  },
  /**
   * 彩钢类型
  */
  bindCaigangleixingChange: function(e) {
    this.setData({
      caigangleixingIndex: e.detail.value
    })
  },

  submitForm() {
    var that = this;

    wx.request({
      url: app.globalData.upReportInfoUrl,
      data:{
        'group_id': that.data.group_id,
        'openid': that.data.openid,
        'recordid': that.data.recordid,
        'report_title': that.data.report_title,
        'dianyadengji': that.data.dianyadengji[that.data.dianyadengjiIndex],
        'hezuomoshi': that.data.hezuomoshi[that.data.hezuomoshiIndex],
        'wudingleixing': that.data.wudingleixing[that.data.wudingleixingIndex],
        'caigangleixing': that.data.caigangleixing[that.data.caigangleixingIndex],
        'nianzongyongdian': that.data.nianzongyongdian,
        'pingjundianjia': that.data.pingjundianjia,
        'dianzhekou': that.data.dianzhekou,
        'wudingzujin': that.data.wudingzujin,
        'bianyaqirongliang': that.data.bianyaqirongliang,
        'bianyaqimiaoshu': that.data.bianyaqimiaoshu,
        'ziyouzijin': that.data.ziyouzijin,
        'tuoliumeidianjia': that.data.tuoliumeidianjia,

        'yushedianlijierushijian': that.data.yushedianlijierushijian[that.data.yushedianlijierushijianIndex],
        'fangwushiyongnianxian': that.data.fangwushiyongnianxian[that.data.fangwushiyongnianxianIndex],
        'qiyegongzuoshijian': that.data.qiyegongzuoshijian[that.data.qiyegongzuoshijianIndex],
        'changfanggaodu': that.data.changfanggaodu[that.data.changfanggaoduIndex],
        'yezhuxingzhi': that.data.yezhuxingzhi[that.data.yezhuxingzhiIndex],
        'zaiheshuoming': that.data.zaiheshuoming[that.data.zaiheshuomingIndex],
        'report_address': that.data.report_address,
        'changfangshuoming': that.data.changfangshuoming_v,

        
        'kx_yezhu_zhuyingyewu': that.data.yezhu_zhuyingyewu,
        'kx_yezhu_caiwuqingkuang': that.data.yezhu_caiwuqingkuang,
        'kx_yezhu_zhiyaqingkuang': that.data.yezhu_zhiyaqingkuang,
        'kx_yezhu_chanzheng': that.data.yezhu_chanzheng,
        'kx_yezhu_shixin': that.data.yezhu_shixin,
        'kx_yezhu_fumian': that.data.yezhu_fumian,
        'kx_yezhu_fumian_shuoming': that.data.yezhu_fumian_shuoming,
        'kx_yezhu_qiankuan': that.data.yezhu_qiankuan,
        'kx_yezhu_jingyingfengxian': that.data.yezhu_jingyingfengxian,
        'kx_yezhu_jingyinganli': that.data.yezhu_jingyinganli,
        'kx_is_yongdianhu': that.data.is_yongdianhu,
        'kx_yongdianhu_xingzhi': that.data.yezhuxingzhi[that.data.yongdianhu_xingzhiIndex],
        'kx_yongdianhu_zhuyingyewu': that.data.yongdianhu_zhuyingyewu,
        'kx_yongdianhu_zhouqihangye': that.data.yongdianhu_zhouqihangye,
        'kx_yongdianhu_caiwuqingkuang': that.data.yongdianhu_caiwuqingkuang,
        'kx_yongdianhu_zhiyaqingkuang': that.data.yongdianhu_zhiyaqingkuang,
        'kx_yongdianhu_shixin': that.data.yongdianhu_shixin,
        'kx_yongdianhu_fumian': that.data.yongdianhu_fumian,
        'kx_yongdianhu_fumian_shuoming': that.data.yongdianhu_fumian_shuoming,
        'kx_yongdianhu_qiankuan': that.data.yongdianhu_qiankuan,
        'kx_yongdianhu_jingyingfengxian': that.data.yongdianhu_jingyingfengxian,
        'kx_yongdianhu_jingyinganli': that.data.yongdianhu_jingyinganli,
        'kx_yongdianhu_gongzuomoshi': that.data.qiyegongzuoshijian_shuoming[that.data.qiyegongzuoshijian_shuoming_Index],
        'kx_jiben_yunying_nianxian': that.data.jiben_yunying_nianxian,
        'kx_jianshe_zhouqi': that.data.jianshe_zhouqi,
        'kx_jianzhuwu_geshu': that.data.jianzhuwu_geshu,
        'kx_bingwangdian_geshu': that.data.bingwangdian_geshu,
        'kx_zhedang_shuoming': that.data.zhedang_shuoming,
        'kx_wuding_chaoxiang': that.data.wuding_chaoxiang[that.data.wuding_chaoxiang_index],
        'kx_quannian_yongdianliang': that.data.quannian_yongdianliang,
        'kx_quannian_ri_yongdianliang': that.data.quannian_ri_yongdianliang,
        'kx_quannian_ri_yongdian_zhanbi': that.data.quannian_ri_yongdian_zhanbi,
        'kx_xiangxi_fenshi_dianjia': that.data.xiangxi_fenshi_dianjia,
        'kx_jianshi_dianjia': that.data.jianshi_dianjia,
        'kx_jianshi_shichang': that.data.jianshi_shichang,
        'kx_fengshi_dianjia': that.data.fengshi_dianjia,
        'kx_fengshi_shichang': that.data.fengshi_shichang,
        'kx_pingshi_dianjia': that.data.pingshi_dianjia,
        'kx_pingshi_shichang': that.data.pingshi_shichang,
        'kx_gushi_dianjia': that.data.gushi_dianjia,
        'kx_gushi_shichang': that.data.gushi_shichang,
        'kx_ri_pingjundianjia': that.data.ri_pingjundianjia,
        'kx_xiangxi_epc_baojia': that.data.xiangxi_epc_baojia,
        'kx_epc_shejifei': that.data.epc_shejifei,
        'kx_epc_zujian': that.data.epc_zujian,
        'kx_epc_nibianqi': that.data.epc_nibianqi,
        'kx_epc_ercishebei': that.data.epc_ercishebei,
        'kx_epc_xiaopc': that.data.epc_xiaopc,
        'kx_epc_jiagu': that.data.epc_jiagu,
        'kx_epc_jianli': that.data.epc_jianli,
        'kx_xiangmu_zonghe_baojia': that.data.xiangmu_zonghe_baojia

      },
      method:"GET",
      success(res){
        console.log(res)
        if(res.data.code == '0'){
          wx.showModal({
            title: '提示',
            content: '是否生成详细报告',
            confirmText: '生成',
            success (res) {
              if (res.confirm) {
                var createReportUrl = app.globalData.longReportUrl;
                wx.showLoading({
                  title: '生成中...',
                  mask: true
                });
                wx.request({
                  url: createReportUrl,
                  data:{
                    'openid': that.data.openid,
                    'recordid': that.data.recordid,
                    'group_id': that.data.group_id
                  },
                  method:"GET",
                  success(res){
                    console.log(res)
                    if(res.data.code == '0'){
                      wx.showModal({
                        title: '提示',
                        content: '文件已生成。前往个人中心查看',
                        confirmText: '前往',
                        success (res) {
                          if (res.confirm) {
                            wx.redirectTo({
                              url: '../self/self',
                            })
                          } else if (res.cancel) {
                            console.log('用户点击取消')
                          }
                        }
                      })
                    }
                  },
                  complete(){
                    wx.hideLoading();
                  }
                });

              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
          
        }
      },
      complete(){
        wx.hideLoading();
      }
    });
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

    // that.setData({
    //   openid: 'oi3_x4o3V5dAlMi1-IF1BHy6WXBY',
    //   recordid: 1626,
    //   group_id: 3
    // })
    that.setData({
      group_id: app.globalData.group_id
    })

    var getReportInfoUrl = app.globalData.getReportInfoUrl;
    wx.showLoading({
      title: '生成中...',
      mask: true
    });
    wx.request({
      url: getReportInfoUrl,
      data:{
        'openid': that.data.openid,
        'recordid': that.data.recordid
      },
      method:"GET",
      success(res){
        console.log(res)
        if(res.data.code == '0'){
          
          var checkboxItems = that.data.changfangshuoming;
          console.log(res.data.info.changfangshuoming)
          if (res.data.info.changfangshuoming != undefined && res.data.info.changfangshuoming != ''){
            var values = JSON.parse(res.data.info.changfangshuoming);
            console.log(values)
            for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
              checkboxItems[i].checked = false;
  
              for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                  if(checkboxItems[i].value == values[j]){
                    console.log('44444')
                    checkboxItems[i].checked = true;
                      break;
                  }
              }
            }
          }
          

          that.setData({
            bianyaqimiaoshu: res.data.info.bianyaqimiaoshu,
            bianyaqirongliang: res.data.info.bianyaqirongliang != undefined ? res.data.info.bianyaqirongliang : 200,
            dianzhekou: res.data.info.dianzhekou,
            wudingzujin: res.data.info.wudingzujin,
            nianzongyongdian: res.data.info.nianzongyongdian,
            pingjundianjia: res.data.info.pingjundianjia,
            report_title: res.data.info.report_title,
            ziyouzijin: res.data.info.ziyouzijin,
            dianyadengjiIndex: that.data.dianyadengji.indexOf(res.data.info.dianyadengji) >= 0 ? that.data.dianyadengji.indexOf(res.data.info.dianyadengji) : 0,
            hezuomoshiIndex: that.data.hezuomoshi.indexOf(res.data.info.hezuomoshi) >= 0 ? that.data.hezuomoshi.indexOf(res.data.info.hezuomoshi) : 0,
            wudingleixingIndex: that.data.wudingleixing.indexOf(res.data.info.wudingleixing) >= 0 ? that.data.wudingleixing.indexOf(res.data.info.wudingleixing) : 0,
            caigangleixingIndex: that.data.caigangleixing.indexOf(res.data.info.caigangleixing) >= 0 ? that.data.caigangleixing.indexOf(res.data.info.caigangleixing) : 0,
            tuoliumeidianjia: res.data.info.tuoliumeidianjia,
            report_address : res.data.info.report_address,

            yushedianlijierushijianIndex: that.data.yushedianlijierushijian.indexOf(res.data.info.yushedianlijierushijian) >= 0 ? that.data.yushedianlijierushijian.indexOf(res.data.info.yushedianlijierushijian) : 0,
            fangwushiyongnianxianIndex: that.data.fangwushiyongnianxian.indexOf(res.data.info.fangwushiyongnianxian) >= 0 ? that.data.fangwushiyongnianxian.indexOf(res.data.info.fangwushiyongnianxian) : 0,
            qiyegongzuoshijianIndex: that.data.qiyegongzuoshijian.indexOf(res.data.info.qiyegongzuoshijian) >= 0 ? that.data.qiyegongzuoshijian.indexOf(res.data.info.qiyegongzuoshijian) : 0,
            changfanggaoduIndex: that.data.changfanggaodu.indexOf(res.data.info.changfanggaodu) >= 0 ? that.data.changfanggaodu.indexOf(res.data.info.changfanggaodu) : 0,
            yezhuxingzhiIndex: that.data.yezhuxingzhi.indexOf(res.data.info.yezhuxingzhi) >= 0 ? that.data.yezhuxingzhi.indexOf(res.data.info.yezhuxingzhi) : 0,
            zaiheshuomingIndex: that.data.zaiheshuoming.indexOf(res.data.info.zaiheshuoming) >= 0 ? that.data.zaiheshuoming.indexOf(res.data.info.zaiheshuoming) : 0,
            changfangshuoming: checkboxItems,
            changfangshuoming_v : res.data.info.changfangshuoming != undefined ? JSON.parse(res.data.info.changfangshuoming) : [],

            yezhu_zhuyingyewu: res.data.info.kx_yezhu_zhuyingyewu,
            yezhu_caiwuqingkuang: res.data.info.kx_yezhu_caiwuqingkuang,
            yezhu_zhiyaqingkuang: res.data.info.kx_yezhu_zhiyaqingkuang,
            yezhu_chanzheng: res.data.info.kx_yezhu_chanzheng,
            yezhu_shixin: res.data.info.kx_yezhu_shixin,
            yezhu_fumian: res.data.info.kx_yezhu_fumian,
            yezhu_fumian_shuoming: res.data.info.kx_yezhu_fumian_shuoming,
            yezhu_qiankuan: res.data.info.kx_yezhu_qiankuan,
            yezhu_jingyingfengxian: res.data.info.kx_yezhu_jingyingfengxian,

            yezhu_jingyinganli: res.data.info.kx_yezhu_jingyinganli,
            is_yongdianhu: res.data.info.kx_is_yongdianhu,

            yongdianhu_xingzhiIndex: that.data.yezhuxingzhi.indexOf(res.data.info.kx_yongdianhu_xingzhi) >= 0 ? that.data.yezhuxingzhi.indexOf(res.data.info.kx_yongdianhu_xingzhi) : 0,
            yongdianhu_zhuyingyewu: res.data.info.kx_yongdianhu_zhuyingyewu,
            yongdianhu_zhouqihangye: res.data.info.kx_yongdianhu_zhouqihangye,
            yongdianhu_caiwuqingkuang: res.data.info.kx_yongdianhu_caiwuqingkuang,
            yongdianhu_zhiyaqingkuang: res.data.info.kx_yongdianhu_zhiyaqingkuang,


            yongdianhu_shixin: res.data.info.kx_yongdianhu_shixin,
            yongdianhu_fumian: res.data.info.kx_yongdianhu_fumian,
            yongdianhu_fumian_shuoming: res.data.info.kx_yongdianhu_fumian_shuoming,
            yongdianhu_qiankuan: res.data.info.kx_yongdianhu_qiankuan,
            yongdianhu_jingyingfengxian: res.data.info.kx_yongdianhu_jingyingfengxian,

            yongdianhu_jingyinganli: res.data.info.kx_yongdianhu_jingyinganli,
            qiyegongzuoshijian_shuoming_Index: that.data.qiyegongzuoshijian_shuoming.indexOf(res.data.info.kx_yongdianhu_gongzuomoshi) >= 0 ? that.data.qiyegongzuoshijian_shuoming.indexOf(res.data.info.kx_yongdianhu_gongzuomoshi) : 0,
            jiben_yunying_nianxian: res.data.info.kx_jiben_yunying_nianxian,
            jianshe_zhouqi: res.data.info.kx_jianshe_zhouqi,
            jianzhuwu_geshu: res.data.info.kx_jianzhuwu_geshu,

            bingwangdian_geshu: res.data.info.kx_bingwangdian_geshu,
            zhedang_shuoming: res.data.info.kx_zhedang_shuoming,
            wuding_chaoxiang_index: that.data.wuding_chaoxiang.indexOf(res.data.info.kx_wuding_chaoxiang) >= 0 ? that.data.wuding_chaoxiang.indexOf(res.data.info.kx_wuding_chaoxiang) : 0,
            quannian_yongdianliang: res.data.info.kx_quannian_yongdianliang,
            quannian_ri_yongdianliang: res.data.info.kx_quannian_ri_yongdianliang,

            quannian_ri_yongdian_zhanbi: res.data.info.kx_quannian_ri_yongdian_zhanbi,
            xiangxi_fenshi_dianjia: res.data.info.kx_xiangxi_fenshi_dianjia,
            jianshi_dianjia: res.data.info.kx_jianshi_dianjia,
            jianshi_shichang: res.data.info.kx_jianshi_shichang,
            fengshi_dianjia: res.data.info.kx_fengshi_dianjia,

            fengshi_shichang: res.data.info.kx_fengshi_shichang,
            pingshi_dianjia: res.data.info.kx_pingshi_dianjia,
            pingshi_shichang: res.data.info.kx_pingshi_shichang,
            gushi_dianjia: res.data.info.kx_gushi_dianjia,
            gushi_shichang: res.data.info.kx_gushi_shichang,

            ri_pingjundianjia: res.data.info.kx_ri_pingjundianjia,
            xiangxi_epc_baojia: res.data.info.kx_xiangxi_epc_baojia,
            epc_shejifei: res.data.info.kx_epc_shejifei,
            epc_zujian: res.data.info.kx_epc_zujian,
            epc_nibianqi: res.data.info.kx_epc_nibianqi,

            epc_ercishebei: res.data.info.kx_epc_ercishebei,
            epc_xiaopc: res.data.info.kx_epc_xiaopc,
            epc_jiagu: res.data.info.kx_epc_jiagu,
            epc_jianli: res.data.info.kx_epc_jianli,
            xiangmu_zonghe_baojia: res.data.info.kx_xiangmu_zonghe_baojia
            
          })

          if(res.data.info.kx_xiangxi_epc_baojia == 1){
            that.setData({
              xiangxi_epc_baojia_radioItems: [
                {name: '否', value: '0'},
                {name: '是', value: '1', checked: true}
              ],
            })
          }

          if(res.data.info.kx_yezhu_caiwuqingkuang == 1){
            that.setData({
              yezhu_caiwuqingkuang_radioItems: [
                {name: '无', value: '0'},
                {name: '有', value: '1', checked: true}
              ]
            })
          }
          if(res.data.info.kx_yezhu_zhiyaqingkuang == 1){
            that.setData({
              yezhu_zhiyaqingkuang_radioItems: [
                {name: '无', value: '0'},
                {name: '有', value: '1', checked: true}
              ]
            })
          }
          if(res.data.info.kx_yezhu_chanzheng == 1){
            that.setData({
              yezhu_chanzheng_radioItems: [
                {name: '无', value: '0'},
                {name: '有', value: '1', checked: true}
              ]
            })
          }
          if(res.data.info.kx_yezhu_shixin == 1){
            that.setData({
              yezhu_shixin_radioItems: [
                {name: '无', value: '0'},
                {name: '有', value: '1', checked: true}
              ]
            })
          }
          if(res.data.info.kx_yezhu_fumian == 1){
            that.setData({
              yezhu_fumian_radioItems: [
                {name: '无', value: '0'},
                {name: '有', value: '1', checked: true}
              ]
            })
          }
          if(res.data.info.kx_yezhu_qiankuan == 1){
            that.setData({
              yezhu_qiankuan_radioItems: [
                {name: '无', value: '0'},
                {name: '有', value: '1', checked: true}
              ]
            })
          }
          if(res.data.info.kx_yezhu_jingyingfengxian == 1){
            that.setData({
              yezhu_jingyingfengxian_radioItems: [
                {name: '无', value: '0'},
                {name: '有', value: '1', checked: true}
              ]
            })
          }
          if(res.data.info.kx_is_yongdianhu == 1){
            that.setData({
              is_yongdianhu_radioItems: [
                {name: '否', value: '0'},
                {name: '是', value: '1', checked: true}
              ]
            })
          }
          if(res.data.info.kx_yongdianhu_caiwuqingkuang == 1){
            that.setData({
              yongdianhu_caiwuqingkuang_radioItems: [
                {name: '无', value: '0'},
                {name: '有', value: '1', checked: true}
              ]
            })
          }
          if(res.data.info.kx_yongdianhu_zhiyaqingkuang == 1){
            that.setData({
              yongdianhu_zhiyaqingkuang_radioItems: [
                {name: '无', value: '0'},
                {name: '有', value: '1', checked: true}
              ]
            })
          }
          if(res.data.info.kx_yongdianhu_shixin == 1){
            that.setData({
              yongdianhu_shixin_radioItems: [
                {name: '无', value: '0'},
                {name: '有', value: '1', checked: true}
              ]
            })
          }
          if(res.data.info.kx_yongdianhu_fumian == 1){
            that.setData({
              yongdianhu_fumian_radioItems: [
                {name: '无', value: '0'},
                {name: '有', value: '1', checked: true}
              ]
            })
          }
          if(res.data.info.kx_yongdianhu_qiankuan == 1){
            that.setData({
              yongdianhu_qiankuan_radioItems: [
                {name: '无', value: '0'},
                {name: '有', value: '1', checked: true}
              ]
            })
          }
          if(res.data.info.kx_yongdianhu_jingyingfengxian == 1){
            that.setData({
              yongdianhu_jingyingfengxian_radioItems: [
                {name: '无', value: '0'},
                {name: '有', value: '1', checked: true}
              ]
            })
          }
          if(res.data.info.kx_zhedang_shuoming == 1){
            that.setData({
              zhedang_shuoming_radioItems: [
                {name: '无', value: '0'},
                {name: '有', value: '1', checked: true}
              ]
            })
          }
          if(res.data.info.kx_xiangxi_fenshi_dianjia == 1){
            that.setData({
              xiangxi_fenshi_dianjia_radioItems: [
                {name: '否', value: '0'},
                {name: '是', value: '1', checked: true}
              ]
            })
          }
          if(res.data.info.kx_yongdianhu_zhouqihangye == 1){
            that.setData({
              yongdianhu_zhouqihangye_radioItems: [
                {name: '否', value: '0'},
                {name: '是', value: '1', checked: true}
              ]
            })
          }
          console.log(res.data.info.kx_yezhu_zhuyingyewu)
          // console.log(res.data.info.kx_yongdianhu_zhuyingyewu)
          var yezhu_zhuyingyeli_list = res.data.info.kx_yezhu_zhuyingyewu.split('-')
          that.setData({
            yezhu_zhuyingyewu_f_index: that.data.yezhu_zhuyingyewu_f.indexOf(yezhu_zhuyingyeli_list[0]),
            yezhu_zhuyingyewu_t: that.data.yezhu_zhuyingyewu_t_dict[yezhu_zhuyingyeli_list[0]],
            yezhu_zhuyingyewu_t_index: that.data.yezhu_zhuyingyewu_t_dict[yezhu_zhuyingyeli_list[0]].indexOf(yezhu_zhuyingyeli_list[1])
          });
          if(yezhu_zhuyingyeli_list.length == 3){
            that.setData({
              yezhu_zhuyingyewu_shuoming: yezhu_zhuyingyeli_list[2]
            });
          }

          var yongdianhu_zhuyingyeli_list = res.data.info.kx_yongdianhu_zhuyingyewu.split('-')
          that.setData({
            yongdianhu_zhuyingyewu_f_index: that.data.yezhu_zhuyingyewu_f.indexOf(yongdianhu_zhuyingyeli_list[0]),
            yongdianhu_zhuyingyewu_t: that.data.yezhu_zhuyingyewu_t_dict[yongdianhu_zhuyingyeli_list[0]],
            yongdianhu_zhuyingyewu_t_index: that.data.yezhu_zhuyingyewu_t_dict[yongdianhu_zhuyingyeli_list[0]].indexOf(yongdianhu_zhuyingyeli_list[1])
          });
          if(yongdianhu_zhuyingyeli_list.length == 3){
            that.setData({
              yongdianhu_zhuyingyewu_shuoming: yongdianhu_zhuyingyeli_list[2]
            });
          }
          

        }
      },
      complete(){
        wx.hideLoading();
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
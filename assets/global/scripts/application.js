/*配置url*/
+function ($, undefined) {
    $.kf = $.kf || {};
    var URL = '';
    var WEBURL = '';
    var ishttps = 'https:' == document.location.protocol ? true: false;
	if(ishttps){
		//https://101.201.111.214:8088/
	 	URL = 'https://test.kaifengdata.com/';
	 	WEBURL = 'https://';
	}else{
	 	URL = 'http://test.kaifengdata.com/';
	 	WEBURL = 'http://';
	}
    var urlType = '';
    $.extend($.kf, {
    	ANWEBSOCKETIMPORTANT: WEBURL + '101.201.116.42:7000/kf-web-mq/baseapi/importantnews' + urlType,//websocket新闻一次性
    	ANWEBSOCKETNEWS: WEBURL + 'ws.kaifengdata.com/kf-web-mq/kf-websocket' + urlType,//websocket新闻循环
    	ANWEBSOCKET: WEBURL + '10.25.156.231:8080/kf-websocket' + urlType,//websocket行情
    	AUTHENTICATION: URL + 'supervisorservice/getCompanyAuthentication' + urlType,//督导 -》督导认证
    	ADDLEFTCOMMENT: URL + 'supervisorservice/AddLeftComment' + urlType,//督导公告审批
    	ACCOUNTINGFIRM: URL + 'antermediaryservice/getAccountingFirm' + urlType,//会计事务所
		ADDREMARKS: URL + 'optionalservice/AddRemarks' + urlType,//个人关注股票备注
		ADDTEMPLATE: URL + 'reportservice/addTemplate' + urlType,//报告制作》向导》新增模板
    	ADDCOLLECTIONOPTION: URL + 'optionalservice/addCollection' + urlType,//挂牌公司公司详情加入自选
    	ANNOUNCEMENTSERVICE: URL + 'announcementservice/getList' + urlType,//公告概览
    	ADDCONTRASTBAR: URL + 'comparedservice/addContrastBar' + urlType, //新增对比栏
    	ADDCONDITION: URL + 'searchservice/addCondition' + urlType,//综合筛选 -》指标筛选 -》导出、保存
    	BROKERTPL: URL + 'brokerageservice/getBrokerTpl' + urlType,//券商url
    	BROKERAGESERVICE: URL + 'brokerageservice/getList' + urlType,//券商概览
    	CONTRASTBAR: URL + 'comparedservice/getContrastBar' + urlType,//公司对比 -》获取对比栏
    	CANCELCOLLECTIONOPTION: URL + 'optionalservice/cancelCollection' + urlType,//挂牌公司公司详情取消自选
        CAPTCHA: URL + 'service/captcha' + urlType, //图形验证码
        CHECKCAPTCHA: URL + 'service/checkCaptcha' + urlType, //注册图形验证码
        COMPANYCODE: URL + 'companyservice/getCompanyCode' + urlType, //股票搜索
        COMPANYLIST: URL + 'companyservice/getCompanyList' + urlType, //公司列表
        COLLECTION: URL + 'userservice/collection' + urlType,//添加收藏
        CANCELCOLLECTION: URL + 'userservice/cancelCollection' + urlType,//取消收藏
        COMPANYINDUSTRY: URL + 'neeqstatservice/getListcompanyIndustry' + urlType,//新增挂牌企业
        COMPANYAREA: URL + 'neeqstatservice/getListcompanyArea' + urlType,//地区分布
        COMPANYFINANCE: URL + 'neeqstatservice/getCompanyFinance' + urlType,//企业财务对比
        COMPANYANNOUNCEMENT: URL + 'supervisorservice/companyAnnouncement' + urlType,//督导新建公告
        COMPANYLAYER: URL + 'listedcompanystatservice/getListcompanyLayer' + urlType,//挂牌公司 -》挂牌概览 -》分层
        COMPANYTRANSFORMODE: URL + 'listedcompanystatservice/getListcompanyTransforMode' + urlType,//挂牌公司 -》挂牌概览 -》转让方式
        COMPANYSPECIALTOP: URL + 'listedcompanystatservice/getListcompanySpecialTop' + urlType,//挂牌公司 -》挂牌概览 -》主办市场份额
        COMPANYSPECIAL: URL + 'listedcompanystatservice/getListcompanySpecial' + urlType,//挂牌公司 -》挂牌概览 -》主办券商分布
        COMPANYSPECAILRATE: URL + 'listedcompanystatservice/getListcompanySpecailRate' + urlType,//挂牌公司 -》挂牌概览 -》主办市场份额2
        COMPANYBRANCH: URL + 'graphservice/getCompanyBranch' + urlType,//子公司列表
        CLIENT: URL + 'graphservice/getClient' + urlType,//关系图谱 -》上下游关系
        COMPANYGETAPPROVE: URL + 'companyservice/getApprove' + urlType,//批准挂牌  
        COMPANYLISTMONTH: URL + 'privilegeservice/getCompanyListMonth' + urlType,//企业分析概览 -》本月IPO辅导预测
        COMPANYDIVSERVICEGETLIST: URL + 'companydivservice/getList' + urlType,//挂牌公司-》公司分红列表
		COPYTEMPLATE: URL + 'reportservice/copyTemplate' + urlType,//企业调查 -》报告向导 -》复制
		COMPAREDINFO: URL + 'comparedservice/getComparedInfo' + urlType, //企业对比 -》我的对比
		COMPAREDEXPORTLIST: URL + 'comparedservice/exportList' + urlType, //企业对比 -》我的对比 -》全部导出
		COMPANYOVERVIEW: URL + 'listedcompanystatservice/getListcompanyNew' + urlType,//挂牌公司 -》概览
		COMPANYMAINSTAFF: URL + 'companyinfoservice/getCompanyMainStaff' + urlType,//经营信息 -》 企业员工
		COMPAREDPROGRESS: URL + 'comparedservice/getProgress' + urlType, //企业对比 -》我的对比 -》进度条
		CASEHOTWORDS: URL + 'indexservice/getCaseHotWords' + urlType, //首页 -》案例热词分布
		DELCONTRASTBAR: URL + 'comparedservice/delContrastBar' + urlType, //企业对比 -》对比删除
		DELCOMPARISON: URL + 'comparedservice/delComparison' + urlType, //企业对比 -》删除对比
        DILUTIONSTOCK: URL + 'companyservice/getStockDilution' + urlType, //定增
        DILUTIONDETAIL: URL + 'companyservice/getStockDilutionDetail' + urlType, //定增详情
        DIRECTEDDILUTION: URL + 'secompanyservice/getSecompanyDirectedDilution' + urlType, //券商详情-》业务动态-》推荐定向发行次数
        DELCONDITION: URL + 'searchservice/delCondition' + urlType,//综合筛选 -》我的筛选 -》删除
        DISCLOSURE: URL + 'supervisorservice/disclosure' + urlType, //督导券商标记为已送股转
        DELMESSAGE: URL + 'innermsgservice/delMessage' + urlType, //督导券商标记为已送股转
        DELTEMPLATE: URL + 'reportservice/delTemplate' + urlType,//企业调查 -》报告向导 -》删除
        DELREPORT: URL + 'reportservice/delReport' + urlType,//企业调查 -》报告列表 -》删除
        DYNAMICCOLUMNHOME: URL + 'indexservice/getCompanyDynamicColumnHome' + urlType, //挂牌企业推荐
        EVENTINVESTINDUSTRY: URL + 'neeqstatservice/getEventInvestIndustry' + urlType,//投资偏好        
		EVENTINVESTAREA: URL + 'neeqstatservice/getEventInvestArea' + urlType,//投资偏好2
		EXPORTREPORT: URL + 'reportservice/exportReport' + urlType,//企业调查 -》报告列表 -》导出
		EVENTSTENDERBID: URL + 'companyinfoservice/getEventsTenderBid' + urlType,//经营信息 -》招投标
        FEEDBACK: URL + 'clientservice/addFeedback' + urlType, //意见反馈
        FINDPWD: URL + 'userservice/findPwd' + urlType, //找回密码
        GETUSERPOINT: URL + 'userservice/getUserPoint' + urlType, //获取用户点数情况
        GETUSERINFO: URL + 'userservice/getUserInfo' + urlType, //获取用户基本信息
        GETCOMPANYLISTEDLIST: URL + 'service/getCompanyListedList' + urlType, //发送验证码
        GETFUNDMANAGER: URL + 'fundmanagerservice/getFundManager' + urlType, //基金管理人列表
        GNOTE: URL + 'service/getNotice' + urlType, //获取公告列表
        GETOPTIONALLIST: URL + 'optionalservice/getOptionalList' + urlType, //个人收藏=》被投企业 券商机构
        GETNOTICECATEGORY: URL + 'companyservice/getNoticeCategory' + urlType,//公告行业类
        GTRADING: URL + 'service/getQuotation' + urlType, //获取交易
        GETREPORT: URL + 'service/getReport' + urlType, //研报
        GETNEWS: URL + 'service/getNews' + urlType, //新闻
        GETYEARLIST: URL + 'companynewservice/getYearList' + urlType, //公司年报
        GETYEARLISTINFO: URL + 'companynewservice/getYearListInfo' + urlType, //公司年报
        GETPETITORS: URL + 'companynewservice/getCompanyCompetitors' + urlType, //竞品分析
        GETCOMPANYSHAREHOLDERGRAP: URL + 'companynewservice/getCompanyShareholderGrap' + urlType, //被投详情 股东信息
        GETCOMPANYCASEHTML: URL + 'companynewservice/getCompanyCaseHtml' + urlType, //法律诉讼
        GETCOMPANYCASENOTICE: URL + 'companynewservice/getCompanyCaseNotice' + urlType, //法院公告
        GETEVENTSTENDERBIDINFO: URL + 'companyinfoservice/getEventsTenderBidInfo' + urlType, //招投标详情
        GETCOMPANYTAXRATING: URL + 'companynewservice/getCompanyTaxRating' + urlType, //税务评级
        GETCOMPANYBONDFINANCING: URL + 'companynewservice/getCompanyBondFinancing' + urlType, //债券信息
        GETCOMPANYCHECKS: URL + 'companynewservice/getCompanyChecks' + urlType, //抽查检查
        GETNOTICECATEGORY: URL + 'companyservice/getNoticeCategory' + urlType, //挂牌公司详情公告
        GETCOMPANYCORETEAM: URL + 'companynewservice/getCompanyCoreTeam' + urlType, //企业详情 核心人员
        GETFEATUREDLAYERS: URL + 'privilegeservice/getFeaturedLayers' + urlType, //IPO精选层
     	GETAGANCYAREA: URL + 'investstatservice/getAgancyArea' + urlType, //机构详情=》机构概览=》地区分布
        GETCOMPANYNOTICE: URL + 'service/getCompanyNotice' + urlType, //公司详情公告
        GETCOMPANYEXECUTIVENEW: URL + 'companyinfoservice/getCompanyExecutiveNew' + urlType, //公司详情==》公司概况==》公司高管
        GETCOMPANYREPORT: URL + 'service/getCompanyReport' + urlType, //公司详情研报
        GETCOMPANYPRODUCT: URL + 'companynewservice/getCompanyProduct' + urlType, //公司产品信息
        GETCOMPANYSTRUCTURE: URL + 'companyinfoservice/getCompanyStructure' + urlType, //公司详情股本结构
        GETCOMPANYNEWS: URL + 'service/getCompanyNews' + urlType, //公司详情新闻
        GETCOMPANYINFO: URL + 'service/getCompanyInfo' + urlType, //公司基本信息
        GETCOMPANYIMEXPORT: URL + 'companynewservice/getCompanyImExPort' + urlType, //公司详情=》进出口信用
        GETCOINVESTMENT: URL + 'investmentservice/getCoInvestment' + urlType, //机构详情合作关系合投
        GETPARTICIPATIONVOTE: URL + 'investmentservice/getParticipationVote' + urlType, //机构详情合作关系参投
        GETCOMPANYISSUANCE: URL + '/companydivservice/getCompanyIssuance' + urlType, //公司详情=》分红融资=》增发
        GETCOMPANYDIV: URL + '/companydivservice/getCompanyDiv' + urlType, //公司详情=》分红融资=》分红
        GETCOMPANYCORESTAFF: URL + '/companyinfoservice/getCompanyCorestaff' + urlType, //公司详情=》核心员工
     	GETCOMPANYDOMAIN: URL + 'companynewservice/getCompanyDomain' + urlType,//工商信息域名备案
     	GETTABLEINVESTMENTSERVICE: URL + 'investmentservice/getTable' + urlType,//投资事件模板接口
        GETCOMPANYSHAREHOLDERS: URL + 'companyservice/getCompanyShareholders' + urlType, //十大股东
        GETCOMPANYINVEST: URL + 'service/getCompanyInvest' + urlType, //对外投资
        GETMANAGERINFO: URL + 'fundmanagerservice/getManagerInfo' + urlType, //基金管理人详情
        GETMANAGERPRODUCT: URL + 'fundmanagerservice/getManagerProduct' + urlType, //基金管理人产品信息
        GETMANAGERPRODUCTINFO: URL + 'fundmanagerservice/getManagerProductInfo' + urlType, //基金信息
        GETINFORMATIONLAWS: URL + 'service/getInformationLaws' + urlType, //法规
        GETINVESTMENTHOTWORD: URL + 'investmentstatservice/getInvestmentHotWord' + urlType, //投资机构详情=》机构概览
        GETCOMPANYINFOSER: URL + 'companynewservice/getCompanyInfo' + urlType, //公司注册信息
        GETCOMPANYRECRUITMENT: URL + 'companynewservice/getCompanyRecruitment' + urlType, //招聘信息
        GETINVESTMENTCOMPANY: URL + 'companyservice/getInvestmentCompany' + urlType, //公司对外投资
        GETCOMPANYDISHONESTY: URL + 'companynewservice/getCompanyDishonesty' + urlType, //风险信息=》失信信息
        GETCOMPANYCASE: URL + 'companynewservice/getCompanyCase' + urlType, //风险信息
        GETRISKTIPS: URL + 'companyinfoservice/getRiskTips' + urlType, //风险提示
        GETCOMPANYOPERATION: URL + 'companyinfoservice/getCompanyOperation' + urlType, //经营异常
        GETCOMPANYPENALTY: URL + 'companyinfoservice/getCompanyPenalty' + urlType, //行政处罚
        GETCOMPANYSHAREHOLDERS:URL + 'companyservice/getCompanyShareholders' + urlType, //十大股东
        GETCOMPANYPATENT: URL + 'companynewservice/getCompanyPatent' + urlType, //公司专利
        GETCOMPANYRESEARCH: URL + 'companyinfoservice/getCompanyResearch' + urlType, //研发投入
        GETCERTIFICATE: URL + 'companyinfoservice/getCertificate' + urlType, //企业证书
        GETFRANCHISE: URL + 'companyinfoservice/getFranchise' + urlType, //特许经营权
        GETWECHAT: URL + 'caseservice/getWechat' + urlType, //公众号详情
        GETCOMPANYFINANCE: URL + 'companyservice/getCompanyFinance' + urlType, //导出excel
        GETSECURITIESCOMPANY: URL + 'service/getSecuritiesCompany' + urlType, //券商列表
        GETCOMPANYPROFITS: URL + 'companyservice/getCompanyProfits' + urlType, //利润表
        GETCOMPANYCASHFLOW: URL + 'companyservice/getCompanyCashFlow' + urlType, //现金流量
        GETCOMPANYBALANCESHEETS: URL + 'companyservice/getCompanyBalanceSheets' + urlType, //资产负债
        GETCOMPANYSOFTWARECOPYRIGHT: URL + 'companynewservice/getCompanySoftwareCopyright' + urlType, //软件著作权
        GETCOMPANYCOPYRIGHT: URL + 'companynewservice/getCompanyCopyright' + urlType, //作品权
        GETCOMPANYTRADEMARK: URL + 'companynewservice/getCompanyTrademark' + urlType, //商标
        GETCOMPANYCHANGE: URL + 'companynewservice/getCompanyChange' + urlType, //工商基本信息变更信息
        GETCOMPANYINDICATOR: URL + 'companyservice/getCompanyIndicator' + urlType, //财务指标
        GETNEWSDETAIL: URL + 'companyservice/getNewsDetail' + urlType, //新闻详情
        GETREPORTDETAIL: URL + 'companyservice/getReportDetail' + urlType, //研报详情
        GETLAWDETAIL: URL + 'companyservice/getLawDetail' + urlType, //法规详情
        GETSHAREHOLDERSINFO: URL + 'companyservice/getShareholdersInfo' + urlType, //股东信息
        GETSECOMPANYHIS: URL + 'secompanyservice/getSecompanyHis' + urlType, //主办券商详情
        GETMESSAGELIST:URL + 'innermsgservice/getMessageList' + urlType, //站内信
        GETMESSAGE:URL + 'innermsgservice/getMessage' + urlType, //站内信详情
        GETUNREADLIST:URL + 'innermsgservice/getUnreadList' + urlType,//站内信悬浮列表
        GETAGANCYYEAR: URL + 'investstatservice/getAgancyYear' + urlType, //投资机构投资时间走势
        GETAGANCYINDUSTRYROUND: URL + 'investstatservice/getagancyIndustryround' + urlType, //投资机构行业轮次分布
        GETAGANCYMONEY: URL + 'investstatservice/getAgancyMoney' + urlType, //投资机构金额分布
        GETSUPERNOTICE: URL + 'supervisorservice/getCompanyNotice' + urlType, //公告管理
        GETSECOMPANYNOTICE: URL + 'supervisorservice/getSecompanyNotice' + urlType, //券商公告管理列表
        GETLEFTTEMPLATE: URL + 'supervisorservice/getLeftTemplate' + urlType, //新建公告获取left-table
        GETRIGHTTEMPLATE: URL + 'supervisorservice/getRightTemplate' + urlType, //新建公告获取right-tables
		GETPLANCATEGORY: URL + 'service/getPlanCategory' + urlType,//定增进度
		GETLATESTNEWS: URL + 'newsservice/getLatestNews' + urlType,//最新动态
		GETSECOMPANYENTERPRISES: URL + 'supervisorservice/getSecompanyEnterprises' +urlType,//公告管理公司列表
		GENERATEAUTHENTICATION: URL + 'supervisorservice/generateAuthentication' + urlType,//督导-》邀请认证 -》生成认证码/生成认证码并通知
		GETUNBINDING: URL + 'supervisorservice/unBinding' + urlType, //督导 -》邀请认证 -》取消绑定
		GETAPPLYLISTED: URL + 'companyservice/getApplyListed' + urlType, //申请挂牌
		GETDELISTINGLISTED: URL + 'companyservice/getDelistingListed' + urlType, //退市
		GETLAWOFFICELIST: URL + 'companyservice/getLawOfficeList' + urlType, //律师事务所
		GETACCOUNTINGFIRMLIST: URL + 'companyservice/getAccountingFirmList' + urlType, //会计事务所
		GETACCOUNTINGPAGE: URL + 'antermediaryservice/getAccounting' + urlType, //会计事务所页面
		GETCOMPANYLIST: URL + 'investmentservice/getCompanyList' + urlType,//企业列表
		GETINVESTORLIST: URL + 'investmentservice/getInvestorList' + urlType,//投资人列表
		GETCOMPANYBRANCH: URL + 'service/getInvestmenCompany' + urlType,//挂牌公司详情投资人信息对外投资
		GETINVESTORDETAILS: URL + 'investmentservice/getInvestorDetails' + urlType,//投资人详情
		GETCOMPANYLISTED: URL + 'companyservice/getCompanylisted' + urlType,//挂牌公司页面
		GETAPPLYLISTING: URL + 'companyservice/getApplylisting' + urlType,//申请挂牌页面
		GETTERMINATIONLISTED: URL + 'companyservice/getTerminationListed' + urlType,//摘牌页面
		GETINDUSTRY: URL + 'investmentservice/getIndustry' + urlType,//投资人行业
		GETCONDITIONTIMESINFO: URL + 'searchservice/getConditionTimesInfo' + urlType,//省市关联
		GETCOMPANYINDUSTRY: URL + 'investmentservice/getCompanyIndustry' + urlType,//企业筛选标签
		GETSIMILARCOMPANIES: URL + 'industryanalysis/getSimilarCompanies' + urlType,//挂牌公司详情行业分析相似公司
		GETINDUSTRYRATING: URL + 'industryanalysis/getIndustryRating' + urlType,//挂牌公司详情行业分析获取行业评级
		GETCOMPANYOVERVIEW: URL + 'companyservice/getCompanyOverview' + urlType,//挂牌公司概览
		GETTRADETRANSACTION: URL + 'companyservice/getTradeTransaction' + urlType,//成交明细
		GETCOMPANYSHAREHOLDERNEW: URL + 'companynewservice/getCompanyShareholder' + urlType,//投资详情--股东信息
		GETMAINBUSINES: URL + 'companybusiness/getMainBusines' + urlType,//挂牌公司商业分析主营业务
		GETREVENUESOURCES: URL + 'companybusiness/getRevenueSources' + urlType,//挂牌公司商业分析营收来源
		GETMAINBUSINESSTATISTICS: URL + 'companybusiness/getMainBusinesStatistics' + urlType,//挂牌公司商业分析营收来源统计图
		GETMAJORCLIENT: URL + 'companybusiness/getMajorClient' + urlType,//挂牌公司商业分析主要客户
		GETMAJORCLIENTSTATISTICS: URL + 'companybusiness/getMajorClientStatistics' + urlType,//挂牌公司商业分析主要客户统计图
        GETMAJORSUPPLIER: URL + 'companybusiness/getMajorSupplier' + urlType,//挂牌公司商业分析主要供应商
        GETMAJORSUPPLIERSTASISTICS: URL + 'companybusiness/getMajorSupplierStatistics' + urlType,//挂牌公司商业分析主要供应商统计图
        GETBUSINESSMODEL: URL + 'companybusiness/getBusinessModel' + urlType,//挂牌公司商业分析商业模式
        GETCOMPANYMORTGAGE: URL + 'companyinfoservice/getCompanyMortgage' + urlType,//挂牌公司动产抵押
        GETJUDICIALAUCTION: URL + 'companyinfoservice/getJudicialAuction' + urlType,//挂牌公司司法拍卖
        GETCOMPANYBONDPLEDGE: URL + 'companyinfoservice/getCompanyBondPledge' + urlType,//挂牌公司股权质押
        GETCOMPANYEQUITYFREEZE: URL + 'companyinfoservice/getCompanyEquityFreeze' + urlType,//挂牌公司股权冻结
        GETOPTIONALSECURITIESLIST: URL + 'optionalservice/getOptionalSecuritiesList' + urlType,//收藏列表股票列表
        GETQUOTATIONREAL: URL + 'quotationservice/getQuotation' + urlType,//实时行情=》全部  （实时行情api）
        GETQUOTESREAL: URL + 'quotationservice/getQuotes' + urlType,//实时行情=》轮询  （实时行情api）
        GETQUOTESTPL: URL + 'quotationservice/getQuotesTpl' + urlType,//实时行情概览两个页面
        GETAGREEMENTINFO: URL + 'quotationservice/getAgreementInfo' + urlType,//实时行情报单详情
        GETFINANCINGEVENTS: URL + 'investmentservice/getFinancingEvents' + urlType,//投融资信息
        GETFEEDBACK: URL + 'clientservice/getFeedback' + urlType, //反馈列表
        GETCOMPANYSIMILIAR: URL + 'companybusiness/getCompanySimiliar' + urlType, //反馈列表
        GETFINANCINGCOMPANY: URL + 'appcompanyservice/getFinancingCompany' + urlType, //投资时间=》正在融资
        GETRECORDTIPS: URL + 'privilegeservice/getRecordTips' + urlType, //ipo监控
        GETPRIVILEGETPL: URL + 'privilegeservice/getPrivilegeTpl' + urlType, //ipo监控分页
        GETEXPORTQUOTES: URL + 'exportservice/getExportQuotes' + urlType, //ipo监控
		GETTEMPLATE: URL + 'reportservice/getTemplate' + urlType,//报告向导
        GETREPORTLIST: URL + 'reportservice/getReportList' + urlType,//企业调查 -》报告列表
        GETPROGRESS: URL + 'reportservice/getProgress' + urlType,//企业调查 -》报告列表 -》导出 -》进度条
        GETCOMPANYTOTAL: URL + 'listedcompanystatservice/getCompanyTotal' + urlType,//公司列表概览总家数
        GETCOMPAREDSIMILIAR: URL + 'companybusiness/getComparedSimiliar' + urlType,//同商业模式企业
        GETTOPSIMILIAR: URL + 'companybusiness/getTopSimiliar' + urlType,//同行业龙头企业
        GETENTERPRISELABEL: URL + 'comparedservice/getEnterpriseLabel' + urlType,//企业标签
        GETBUSINESSCOMPARISON: URL + 'comparedservice/getBusinessComparison' + urlType,//同行对比页面
        GETCOMPANYCOPMLIST: URL + 'companycompservice/getCompanyCopmList' + urlType,//公司对比页面
        GETREPEATSERVICE: URL + 'comparedservice/getRepeat' + urlType,//保存对比检测名称是否重复
        GETLISTEDCOMPARED: URL + 'comparedservice/getListed' + urlType,//行业对比检测是否为正确的code和公司
        GETCOMPANYTAG: URL + 'service/getCompanyTag' + urlType,//公司列表企业标签
        GETWHETHEROPTIONAL: URL + 'optionalservice/getWhetherOptional' + urlType,//公司详情自选
        GETCONDITION: URL + 'searchservice/getCondition' + urlType,//综合搜索tab
        GETCONDITIONTIMES: URL + 'searchservice/getConditionTimes' + urlType,//综合搜索tab
        GETSECCODE: URL + 'searchservice/getSecCode' + urlType,//综合搜索
        GETSEARCHINFO: URL + 'searchservice/getSearchInfo' + urlType,//综合搜索表格
        GETCONDITIONMULTIPLE: URL + 'searchservice/getConditionMultiple' + urlType,//获得筛选条件
        GETREPEAT: URL + 'searchservice/getRepeat' + urlType,//筛选 -》判断名称是否重复
		GETSINGLEINPUTTHINK: URL + 'searchservice/getSingleInputThink' + urlType,//综合搜索输入框联想
		GETSEARCHTPL: URL + 'searchservice/getSearchTpl' + urlType,//综合搜索模板
		GETANNOUNCEMENTA: URL + 'caseservice/getAnnouncementA' + urlType,//A股公告
		GETFINANCEINDICATORYEARZCFZ: URL + 'companyinfoservice/getfinanceIndicatorYear' + urlType,//财务数据--资产负债
		GETFINANCIALANALYSIS: URL + 'companyinfoservice/getFinancialAnalysis' + urlType,//财务数据--财务分析最上图
		GETFINANCIALANALYSISTABLE: URL + 'companyinfoservice/getFinancialAnalysisTable' + urlType,//财务数据--财务分析表格
		GETFINANCIALANALYSISBAR: URL + 'companyinfoservice/getFinancialAnalysisBar' + urlType,//财务数据--财务分析图表
		GRAPHSERVICEGETMAP: URL + 'graphservice/getMap' + urlType,//关系图谱
		GRAPHSERVICEBRANCHLIST: URL + 'graphservice/getCompanyBranchList' + urlType,//关系图谱 -》分支机构
		GRAPHSERVICEEVENTSINVESTMENT: URL + 'graphservice/getEventsInvestment' + urlType,//关系图谱 -》主要客户
		GETCOMPANYDYNAMICCOLUMN: URL + 'service/getCompanyDynamicColumn' + urlType,//挂牌公司动态列
		GETSTOCKDILUTIONCOLUMN: URL + 'companyservice/getStockDilutionColumn' + urlType,//定增动态列
		GRAPHSERVICEINVESTED: URL + 'investmentservice/getCompanyList' + urlType,//历史融资 -》投资机构
		GETINVESTMENTMANAGEMENT: URL + 'investmentservice/getInvestmentManagement' + urlType,//机构详情-基金管理
		GETTOPAYCOMPANYLISTED: URL + 'companylisted/getToPay' + urlType,//财务数据权限
		GETHTMLNOTICESERVICE: URL + 'noticeservice/getHtml' + urlType,//获取psd的html格式
		GETFINANCIALANALYSISYEARMONTH: URL + 'companyinfoservice/getFinancialAnalysisYearMonth' + urlType,//财务分析获取下拉年份
		GETCOMPANYANNOUNCEMENT: URL + 'companynewservice/getCompanyAnnouncement' + urlType,//开庭公告
		GETCOMPANYDISHONESTY: URL + 'companynewservice/getCompanyDishonesty' + urlType,//失信人
		GETCOMPANYEXECUTOR: URL + 'companynewservice/getCompanyExecutor' + urlType,//被执行人
		GETCOMPANYTAXARREARS: URL + 'companynewservice/getCompanyTaxArrears' + urlType,//欠税公告
		GETCREDITCREDITSERVICE: URL + 'creditservice/getCredit' + urlType,//贷款
        LOGIN: URL + 'service/login' + urlType, //登录   
        LAWOFFICE: URL + 'antermediaryservice/getLawOffice' + urlType,//律师事务所列表
        LAWEROFFICE: URL + 'antermediaryservice/getLawyer' + urlType,//律师事务所页面
        LISTCOMPANY: URL + 'listedcompanystatservice/getListcompany' + urlType,//挂牌公司 -》挂牌概览 -》挂牌企业分布
        LISTCOMPANYLAYER: URL + 'listedcompanystatservice/getListcompanyLayer' + urlType,//挂牌公司 -》挂牌概览 -》分层及转让方式分布
        MESSAGETYPE: URL + 'clientservice/getMessageType' + urlType,//反馈提问 -》列表
        MODIFYPASSWORD: URL + 'userservice/modifyPassword' + urlType, //修改密码
        MODIFYPWD: URL + 'userservice/modifyPwd' + urlType,//修改密码 新
        MAJORCLIENT: URL + 'graphservice/getMajorClient' + urlType,//关系图谱 -》上下级关系 -》主要客户
        MAJORSUPPLIER: URL + 'graphservice/getMajorSupplier' + urlType,//关系图谱 -》上下级关系 -》主要供应商
        MODIFYCODE: URL + 'userservice/getModifyCode' + urlType,//发送验证
        MYSEARCHLIST:URL + 'searchservice/getMySearchList' + urlType,//综合筛选 -》我的筛选 -》筛选列表
        NOTICETPL: URL + 'noticeservice/getNoticeTpl' + urlType,//公告链接接口
        INDUSTRYWORD: URL + 'service/industryWord' + urlType, //挂牌公司-》行业
        INVESTHING: URL + 'service/investEvent' + urlType, //投资
        INVESTEVENTSTAGE: URL + 'service/investmentField' + urlType, //投资领域
        INVESTINSTITUTIONS: URL + 'service/investfirmList' + urlType, //投资机构
        INVESTMENTFIELD: URL + 'service/investmentStage' + urlType, //投资机构-》阶段
        INVESTCOMPANY: URL + 'service/getInvestCompany' + urlType, //投资机构-》组合
        INVESTMEMBER: URL + 'service/getInvestMember' + urlType, //投资机构-》团队
        INVESTINFORMATION: URL + 'service/getInvestInformation' + urlType, //投资机构-》基本信息
        INVESTIFUNDRAISING: URL + 'service/investmentFundraising' + urlType, //投资机构-》募资事件
        INVESTIMENTNEWS: URL + 'service/investmentNews' + urlType, //投资机构-》相关新闻
        INVESTDETAIL: URL + 'service/getInvestMemberInformation' + urlType, //投资机构-》人物详情
        INVESTNEWS: URL + 'service/getInvestMemberNews' + urlType, //投资机构-》人物详情-》新闻
        INVESTMENTSTATSERVICE: URL + 'investmentstatservice/getList' + urlType, //场外市场概览
        ISCHECKIN: URL + 'userservice/isCheckIn' + urlType, //获取用户是否已打卡
        ISSUANCESTAT: URL + 'issuancestatservice/getList' + urlType,//定增 -》概览
        ISSUANCESTATOVERVIEW: URL + 'issuanceservice/getOverview' + urlType,//定增 -》概览页面
        ISSUANCESTATLIST: URL + 'issuanceservice/getList' + urlType,//定增 -》列表页面
        INTERNALSECTION: URL + 'clientservice/getInternalSection' + urlType,//客服select
        INDUSTRYGRAPH: URL + 'investmentservice/getIndustryGraph' + urlType,//三板慧色谱
        PRIVILECOMPANYLIST: URL + 'privilegeservice/getCompanyList' +urlType,//vip
        PAYPROFESSION: URL + 'userservice/payProfession' +urlType,//用户权限弹窗
        REGISTER: URL + 'service/registerUser' + urlType, //注册
        RESETPASSWORD: URL + '/userservice/resetPassword' + urlType, //重置密码
        RECOMMENDLISTEDCOMPANY: URL + 'secompanyservice/getRecommendListedCompany' + urlType, //券商详情-》业务动态-》推荐挂牌公司数
        READMESSAGE:URL + 'innermsgservice/setReadMessage' + urlType, //站内信 -》设置已读
        RECORDTIPSMONTH: URL + 'privilegeservice/getRecordTipsMonth' + urlType,//企业分析概览 -》本月IPO辅导提示
        REPORTCOMPANYINFO: URL + 'reportservice/getCompanyInfo' + urlType,//导出研报 -》基本信息 -》基本公司信息
        REPORTINTERMEDIARYINFO: URL + 'reportservice/getIntermediaryInfo' + urlType,//导出研报 -》基本信息 -》中介基本信息
        REPORTPATENTINFO: URL + 'reportservice/getPatentInfo' + urlType,//导出研报 -》基本信息 -》资质专利信息
        REPORTRISKWARNING: URL + 'reportservice/getRiskWarning' + urlType,//导出研报 -》风险提示 -》风险提示
        REPORTPENALTIES: URL + 'reportservice/getPenalties' + urlType,//导出研报 -》风险提示 -》过往处罚情况
        REPORTSAVEEXPORT: URL + 'reportservice/saveExport' + urlType,//导出研报 -》上送接口
        REPORTINFORMATION: URL + 'reportservice/getInformation' + urlType,//导出研报 -》 人员信息 -》管理层信息
        REPORTINFORMATIONINFO: URL + 'reportservice/getInformationInfo' + urlType,//导出研报 -》 人员信息 -》高管信息
		REPORTEDITTEMPLATE: URL + 'reportservice/editTemplate' + urlType,//研报模板》模板修改获取
        REPORTINDICATOR: URL + 'reportservice/getIndicator' + urlType,//导出研报 -》 财务数据
        REPORTREVENUESITUATION: URL + 'reportservice/getRevenueSituation' + urlType,//导出研报 -》商业分析 -》 营收情况
        REPORTCUSTOMERSITUATION: URL + 'reportservice/getCustomerSituation' + urlType,//导出研报 -》商业分析 -》 前五名客户情况
        REPORTSUPPLIERSITUATION: URL + 'reportservice/getSupplierSituation' + urlType,//导出研报 -》商业分析 -》 前五名供应商情况
        REPORTBUSINESSMODEL: URL + 'reportservice/getBusinessModel' + urlType,//导出研报 -》商业分析 -》 商业模式
        REPORTBUSINESSWITH: URL + 'reportservice/getBusinessWith' + urlType,//导出研报 -》商业分析 -》 同商业模式企业
        REPORTSINFOMEDIA: URL + 'reportservice/getMediaReportsInfo' + urlType,//导出研报 -》媒体报道
        REPORTNOTICEINFO: URL + 'reportservice/getNoticeInfo' + urlType,//导出研报 -》公告信息
        REPORTSTRUCTURE: URL + 'reportservice/getStructure' + urlType,//导出研报 -》股权信息 -》股权结构分析
        REPORTHISTORYINCREASE: URL + 'reportservice/getHistoryIncrease' + urlType,//导出研报 -》股权信息 -》历史定增
        REPORTDIVIDENDS: URL + 'reportservice/getDividends' + urlType,//导出研报 -》股权信息 -》分红
        REPORTBONDPLEDGE: URL + 'reportservice/getBondPledge' + urlType,//导出研报 -》股权质押 
        REPORTCOMPANYSITUATION: URL + 'reportservice/getCompanySituation' + urlType,//导出研报 -》投融信息 -》关联公司情况
        REPORTMARKETINFO: URL + 'reportservice/getMarketInfo' + urlType,//导出研报 -》做市信息
		REPORTGETTEMPLATECODE: URL + 'reportservice/getTemplateCode' + urlType,//研报模板》模板code获取
		REPORTGENERATE: URL + 'reportservice/generateReport' + urlType,//研报模板》获取当前
		REPORTCONTACTSITUATION: URL + 'reportservice/getContactSituation' + urlType,//导出研报 -》 基本信息 -》 联系情况
		REPORTCOMMUNICATION: URL + 'reportservice/getCommunication' + urlType, //导出研报 -》企业交流
		REPORTMODULECHECK: URL + 'reportservice/getModuleCheck' + urlType, //导出研报 -》导航列表
		REPORTSERVICE: URL + 'reportservice/getQuotes' + urlType, //行情做市 -》图表勾选
		REPORTLIST: URL + 'reportservice/exportReportList' + urlType,//导出研报 -》报告列表 -》导出
        SENDCODE: URL + 'service/sendCode' + urlType, //发送验证码
        SPECIALWORD: URL + 'service/specialWord' + urlType, //挂牌公司列表页面-》券商
        SECURITIESCOMPANY: URL + 'service/getSecuritiesCompany' + urlType, //主办券商
        SECURITIESCOMPANYINFO: URL + 'service/getSecuritiesCompanyInfo' + urlType, //主办券商 -》公司概况
        SECURITIESSTATISTICS: URL + 'service/getSecuritiesCompanyStatistics' + urlType, //主办券商 -》业务动态
        SECURITIESDEPARTMENT: URL + 'service/getSecuritiesCompanyDepartment' + urlType, //主办券商 -》部门设置
        SEARCHNOTICE:URL + 'caseservice/searchNotice' + urlType,//搜索案例 -》公告搜索列表
        SEARCHCHWECHA:URL + 'caseservice/searchWecha' + urlType,//搜索案例-》微信搜索
        SUPBBSERVICE: URL + 'supervisorservice/pdf' + urlType, //督导导出pdf
        SUPXBRL: URL + 'supervisorservice/xbrl' + urlType, //督导导出xbrl
        SEARCHGETKEYWORDRESULT: URL + 'searchservice/getKeywordResult' + urlType, //搜索十大排名
        SEARCHGETCOMPANYSEARCH: URL + 'searchservice/getCompanySearch' + urlType, //大搜索 --公司
        SEARCHGETINVESTMENSEARCH: URL + 'searchservice/getInvestmenSearch' + urlType, //大搜索--投资机构
        SUPWORD: URL + 'supervisorservice/word' + urlType, //督导导出word
        STATSERVICECOMPANYAREA: URL + 'listedcompanystatservice/getListcompanyArea' + urlType,//挂牌公司 -》挂牌概览 -》企业地区分布
        SHAREHOLDER: URL + 'graphservice/getShareholder' + urlType,//挂牌公司详情-》关系图谱-》股权关系
        SHAREHOLDERLIST: URL + 'graphservice/getCompanyShareholder' + urlType,//关系图谱 股东列表
        SECURITIESDETAILS: URL + 'securities/details' + urlType, //markting跳转
        SAVECOMPANYCOMPSERVICE: URL + 'companycompservice/save' + urlType, //公司对比导出和保存
        SAVEBUSINESSCOMPARISON: URL + 'comparedservice/saveBusinessComparison' + urlType, //行业对比导出和保存
        SEARCHEXPORTLIST: URL + 'searchservice/exportList' + urlType,// 我的筛选 -》导出
        SEARCHGETPROGRESS: URL + 'searchservice/getProgress' + urlType,// 我的筛选 -》 进度条
        STATISTICSTURN: URL + 'indexservice/getStatisticsTurn' + urlType, //图表数据
        SEARCHGETSEARCHRESULT: URL + 'searchservice/getSearchResult' + urlType, //固定榜单搜索  
        TABLEBASESERVICEGETLIST:URL + 'tablebaseservice/getList' + urlType,//我的报表 -》报表列表
        TABLEBASESERVICEGETTABLEDETAIL:URL + 'tablebaseservice/getTableDetail' + urlType,//报表详情
        TABLEBASESERVICEGETCOLLECTIONLIST: URL + 'tablebaseservice/getCollectionList' + urlType,//我的报表 -》列表
        TABLEBASESERVICEADDCOLLECTION: URL + 'tablebaseservice/addCollection' + urlType,//我的报表 -》添加收藏
        TABLEBASESERVICEGETEXPORT:URL + 'tablebaseservice/getExport' + urlType,//我的报表 -》导出
        TABLEBASESERVICECANCELCOLLECTION:URL + 'tablebaseservice/cancelCollection' + urlType,//我的报表 -》取消收藏
        TRADINGTIPS: URL + 'neeqstatservice/getTradingTips' + urlType,//交易提醒
        UPDATEUSERINFOU: URL + 'userservice/updateUserInfo' + urlType, //修改个人信息
        UPDATEUSERINFO: URL + 'service/updateUserInfo' + urlType, //注册之后提交信息
        USERCHECKIN: URL + 'userservice/userCheckIn' + urlType, //用户打卡
        USERPOINT: URL + 'userservice/getUserPoint' + urlType, //点数列表
        USERCHECKINC: URL + 'userservice/getUserCheckIn' + urlType,//点数详情
        USERCOLLECTION:URL + 'userservice/getUserCollection' + urlType,//收藏列表
        USERSERVICEUPLOADIMAGE:URL + 'userservice/uploadImage' + urlType,//认证上传图片
        USERSERVICESUBMITCERTIFIED:URL + 'userservice/submitCertified' + urlType,//认证图片提交
       	VERSIONINFO: URL + 'userservice/getVersionInfo' + urlType, //版本详情
        VALIDATEUSER: URL + 'service/validateUser' + urlType //手机号是否注册
    });
}(window.jQuery);

//配置跳转路径
+function ($, undefined) {
    $.url = $.url || {};
    /*if(isNullOrEmpty(sessionStorage.getItem("fakeId"))){
		var fakeId = "";
	}else{
		var fakeId = sessionStorage.getItem("fakeId");
	}*/
	
	if(isNullOrEmpty($.cookie("fakeId"))){
		var fakeId = "";
	}else{
		var fakeId = $.cookie("fakeId");
	}
	fakeId = "73yeud7w6uy3hs898dr57ff8ui3dt49";
    $.extend($.url, {
        isServer: false, //是否使用服务器地址,是true,否false
		fackID:'',
        getContextPath: function () {//相对路径
            var contextPath = document.location.pathname;
            var index = contextPath.substr(1).indexOf("/");
            contextPath = contextPath.substr(0, index + 1);
            delete index;
            //console.log(window.location.host);
            return contextPath;
        },
        companyListUrl: function () {//公司列表跳转
            if ($.url.isServer) {
                var companyListUrl = "/companylisted/details?sid="+fakeId+"&r=s25&from=companylisted"+ Query.urlState();
            } else {
                var companyListUrl = "http://" + window.location.host + $.url.getContextPath() + "/templates/companyDetail/companyListDetail.html?sid="+fakeId+"&r=s25"+ Query.urlState();
            }
            return companyListUrl;
        },
        companyIndex: function () {//首页
            if ($.url.isServer) {
                var companyIndex = "/companylisted/index?sid="+fakeId+"&r=s25";
            } else {
                var companyIndex = "http://" + window.location.host + $.url.getContextPath() + "/templates/index.html?sid="+fakeId+"&r=s25";
            }
            return companyIndex;
        },
        companyList: function () {//公司列表跳转
            if ($.url.isServer) {
                var companyList = "/companylisted/list?sid="+fakeId+"&r=s25&from=companylisted";
            } else {
                var companyList = "http://" + window.location.host + $.url.getContextPath() + "/templates/companyList/companyList.html?sid="+fakeId+"&r=s25";
            }
            return companyList;
        },
        industryUrl: function () {//工商信息
            if ($.url.isServer) {
                var industryUrl = "/companylisted/details?sid="+fakeId+"&r=s25&from=investCompany"+ Query.urlState();
            } else {
                var industryUrl = "http://" + window.location.host + $.url.getContextPath() + "/templates/companyDetail/companyListDetail.html?sid="+fakeId+"&r=s25&from=investCompany"+ Query.urlState();
            }
            return industryUrl;
        },
        brokersUrl: function () {//主办券商
            if ($.url.isServer) {
                var brokersUrl = "/securities/index?sid="+fakeId+"&r=s26&from=securities"+ Query.urlState();
            } else {
                var brokersUrl = "http://" + window.location.host + $.url.getContextPath() + "/templates/neeq/masterBrokers.html?sid="+fakeId+"&r=s25"+ Query.urlState();
            }
            return brokersUrl;
        },
        fundManagerUrl: function () {//基金管理人
            if ($.url.isServer) {
                var fundManagerUrl = "/investment/fundManagerDetails?sid="+fakeId+"&r=s27&from=fundManager"+ Query.urlState();
            } else {
                var fundManagerUrl = "http://" + window.location.host + $.url.getContextPath() + "/templates/fundMsg/fundMgdetail.html?sid="+fakeId+"&r=s25"+ Query.urlState();
            }
            return fundManagerUrl;
        },
        fundDetailUrl: function () {//基金详情
            if ($.url.isServer) {
                var fundDetailUrl = "/investment/fundDetails?sid="+fakeId+"&r=s27&from=fundManager"+ Query.urlState();
            } else {
                var fundDetailUrl = "http://" + window.location.host + $.url.getContextPath() + "/templates/fundMsg/fundDetail.html?sid="+fakeId+"&r=s25"+ Query.urlState();
            }
            return fundDetailUrl;
        },
        newsUrl: function () {//新闻跳转
            if ($.url.isServer) {
                var newsUrl = "/news/details?sid="+fakeId+"&r=s28&from=news"+ Query.urlState();
            } else {
                var newsUrl = "http://" + window.location.host + $.url.getContextPath() + "/templates/details/newsDetail.html?r=s28&from=news"+ Query.urlState();
            }
            return newsUrl;
        },
        newsInfoUrl: function () {//资讯新闻跳转
            if ($.url.isServer) {
                var newsUrl = "/news/newsdetails?sid="+fakeId+"&r=s28&from=news"+ Query.urlState();
            } else {
                var newsUrl = "http://" + window.location.host + $.url.getContextPath() + "/templates/details/newsInfo.html?r=s28&from=news"+ Query.urlState();
            }
            return newsUrl;
        },
        supervisionUrl: function () {//监管要闻
            if ($.url.isServer) {
                var supervisionUrl = "/news/newsdetails?sid="+fakeId+"&r=s28"+ Query.urlState();
            } else {
                var supervisionUrl = "http://" + window.location.host + $.url.getContextPath() + "/templates/details/newsInfo.html?sid="+fakeId+"&r=s25"+ Query.urlState();
            }
            return supervisionUrl;
        },
        timePolicyUrl: function () {//时政新闻
            if ($.url.isServer) {
                var timePolicyUrl = "/news/newsdetails?sid="+fakeId+"&r=s28&from=timePolicyNews"+ Query.urlState();
            } else {
                var timePolicyUrl = "http://" + window.location.host + $.url.getContextPath() + "/templates/details/newsInfo.html?sid="+fakeId+"&r=s25"+ Query.urlState();
            }
            return timePolicyUrl;
        },
        lawsUrl: function () {//政策法规
            if ($.url.isServer) {
                var lawsUrl = "details?sid="+fakeId+"&r=s29&from=law"+ Query.urlState();
            } else {
                var lawsUrl = "http://" + window.location.host + $.url.getContextPath() + "/templates/neeq/policyLawsDetail.html?sid="+fakeId+"&r=s25"+ Query.urlState();
            }
            return lawsUrl;
        },
        addUrl: function () {//定增/公告
            if ($.url.isServer) {
                var addUrl = "/companylisted/details?sid="+fakeId+"&r=s25&from=stockdilution"+ Query.urlState();
            } else {
                var addUrl = "http://" + window.location.host + $.url.getContextPath() + "/templates/companyDetail/companyListDetail.html?sid="+fakeId+"&r=s25"+ Query.urlState();
            }
            return addUrl;
        },
        addList: function () {//定增列表
            if ($.url.isServer) {
                var addList = "/stockdilution/index?sid="+fakeId+"&r=s25"+ Query.urlState();
            } else {
                var addList = "http://" + window.location.host + $.url.getContextPath() + "/templates/neeq/privateAdd.html?sid="+fakeId+"&r=s25"+ Query.urlState();
            }
            return addList;
        },
        securitiesUrl: function () {//券商
            if ($.url.isServer) {
                var addUrl = "/securities/details?sid="+fakeId+"&r=s4"+ Query.urlState();
            } else {
                var addUrl = "http://" + window.location.host + $.url.getContextPath() + "/templates/neeq/masterHold.html?sid="+fakeId+"&r=s25"+ Query.urlState();
            }
            return addUrl;
        },
        investUrl: function () {//投资机构/投资事件
            if ($.url.isServer) {
                var investUrl = "/companylisted/details?sid="+fakeId+"&r=s31&from=securities"+ Query.urlState();
            } else {
                var investUrl = "";
            }
            return investUrl;
        },
        investmentAgency: function () {//投资机构
            if ($.url.isServer) {
                var investUrl = "/investment/investmentAgency?sid="+fakeId+"&r=s32&from=investment"+ Query.urlState();
            } else {
                var investUrl = "http://" + window.location.host + $.url.getContextPath() + "/templates/investment/investOrganization.html?sid="+fakeId+"&r=s25"+ Query.urlState();
            }
            return investUrl;
        },
        investmentAgencyDetailsUrl: function () {//投资机构详情
            if ($.url.isServer) {
                var investUrl = "/investment/investmentAgencyDetails?sid="+fakeId+"&r=s32&from=investment"+ Query.urlState();
            } else {
                var investUrl = "http://" + window.location.host + $.url.getContextPath() + "/templates/investment/investDetail.html?sid="+fakeId+"&r=s25"+ Query.urlState();
            }
            return investUrl;
        },
        buyUrl: function () {//购买
            if ($.url.isServer) {
                var buyUrl = "/account/buy?sid="+fakeId+"&r=s25"+ Query.urlState();
            } else {
                var buyUrl = "";
            }
            return buyUrl;
        },
        infoUrl: function () {//我的三板慧
            if ($.url.isServer) {
                var infoUrl = "/account/info?sid="+fakeId+"&r=s25"+ Query.urlState();
            } else {
                var infoUrl = "";
            }
            return infoUrl;
        },
        letterListUrl: function () {//站内信列表
            if ($.url.isServer) {
                var letterListUrl = "/msg/index?sid="+fakeId+"&r=s25"+ Query.urlState();
            } else {
                var letterListUrl = "http://" + window.location.host + $.url.getContextPath() + "/templates/user/standLetter.html?sid="+fakeId+"&r=s25"+ Query.urlState();
            }
            return letterUrl;
        },
        letterDetailsUrl: function () {//站内信详情
            if ($.url.isServer) {
                var letterUrl = "/msg/details?sid="+fakeId+"&r=s25"+ Query.urlState();
            } else {
                var letterUrl = "http://" + window.location.host + $.url.getContextPath() + "/templates/user/letterDetail.html?sid="+fakeId+"&r=s25"+ Query.urlState();
            }
            return letterUrl;
        },
        investorDetailsUrl: function () {//投资人详情
            if ($.url.isServer) {
                var investorDetailsUrl = "/investment/investorDetails?sid="+fakeId+"&r=s33&from=investor"+ Query.urlState();
            } else {
                var investorDetailsUrl = "http://" + window.location.host + $.url.getContextPath() + "/templates/investment/investorsDetail.html?sid="+fakeId+"&r=s25"+ Query.urlState();
            }
            return investorDetailsUrl;
        },
        historyQuotes: function () {//历史行情详情
            if ($.url.isServer) {
                var historyQuotes = "/quotation/index?sid="+fakeId+"&r=s34&from=quotation"+ Query.urlState();
            } else {
                var historyQuotes = "http://" + window.location.host + $.url.getContextPath() + "/templates/neeq/historyQuotes.html?sid="+fakeId+"&r=s25"+ Query.urlState();
            }
            return historyQuotes;
        },
        marketView: function () {//概览
            if ($.url.isServer) {
                var marketView = "/companylisted/index?sid="+fakeId+"&r=s2&from=companylisted"+ Query.urlState();
            } else {
                var marketView = "http://" + window.location.host + $.url.getContextPath() + "/templates/neeq/marketing.html?sid="+fakeId+"&r=s25"+ Query.urlState();
            }
            return marketView;
        },
        privilegeUrl: function () {//IPO提示
            if ($.url.isServer) {
                var privilegeUrl = "/privilege/index?sid="+fakeId+"&r=s23&from=privilege"+ Query.urlState();
            } else {
                var privilegeUrl = "http://" + window.location.host + $.url.getContextPath() + "/templates/ipo/ipo.html?sid="+fakeId+"&r=s25"+ Query.urlState();
            }
            return privilegeUrl;
        },
        reportModify: function () {//报告修改
            if ($.url.isServer) {
                var reportModifyUrl = "/reportproduction/production?sid="+fakeId+"&r=s31"+ Query.urlState();
            } else {
                var reportModifyUrl = "http://" + window.location.host + $.url.getContextPath() + "/templates/companySurvey/reportProduction.html?sid="+fakeId+"&r=s25"+ Query.urlState();
            }
            return reportModifyUrl;
        },
        reportGuide: function () {//默认报告
            if ($.url.isServer) {
                var reportGuide = "/reportproduction/template?sid="+fakeId+"&r=s31"+ Query.urlState();
            } else {
                var reportGuide = "http://" + window.location.host + $.url.getContextPath() + "/templates/companySurvey/reportGuide.html?sid="+fakeId+"&r=s25"+ Query.urlState();
            }
            return reportGuide;
        },
        reportList: function () {//报告列表
            if ($.url.isServer) {
                var reportList = "/reportproduction/reportList?sid="+fakeId+"&r=s31"+ Query.urlState();
            } else {
                var reportList = "http://" + window.location.host + $.url.getContextPath() + "/templates/companySurvey/reportList.html?sid="+fakeId+"&r=s25"+ Query.urlState();
            }
            return reportList;
        },
        contrastPage: function () {//公司对比
            if ($.url.isServer) {
                var contrastPage = "/compared/companyPeer?sid="+fakeId+"&r=s27-7"+ Query.urlState();
            } else {
                var contrastPage = "http://" + window.location.host + $.url.getContextPath() + "/templates/companyComparison/compContrast.html?sid="+fakeId+"&r=s25"+ Query.urlState();
            }
            return contrastPage;
        },
        myContrast: function () {//我的对比
            if ($.url.isServer) {
                var myContrast = "/compared/contrast?sid="+fakeId+"&r=s28"+ Query.urlState();
            } else {
                var myContrast = "http://" + window.location.host + $.url.getContextPath() + "/templates/companyComparison/myContrast.html?sid="+fakeId+"&r=s25"+ Query.urlState();
            }
            return myContrast;
        },
        contrastSameIn: function () {//同行对比
            if ($.url.isServer) {
                var contrastSameIn = "/compared/peer?sid="+fakeId+"&r=s26-8"+ Query.urlState();
            } else {
                var contrastSameIn = "http://" + window.location.host + $.url.getContextPath() + "/templates/companyComparison/sameInContrast.html?sid="+fakeId+"&r=s25"+ Query.urlState();
            }
            return contrastSameIn;
        },
        ipoExponential: function () {//三板IPO指数
            if ($.url.isServer) {
                var ipoExponential = "/privilege/threeBoardIndex?sid="+fakeId+"&r=s23";
            } else {
                var ipoExponential = "http://" + window.location.host + $.url.getContextPath() + "/templates/ipo/ipoIndex.html?sid="+fakeId+"&r=s25";
            }
            return ipoExponential;
        },
        searchIndex: function(){ //综合搜索结果页面
        	if ($.url.isServer) {
                var searchIndex = "/search/index?sid="+fakeId+Query.urlState();
            } else {
                var searchIndex = "http://" + window.location.host + $.url.getContextPath() + "/templates/user/searchResult.html?sid="+fakeId+"&r=s25"+Query.urlState();
            }
            return searchIndex;
        },
        formDetail: function(){ //综合搜索结果页面
        	if ($.url.isServer) {
                var formDetail = "/table/formDetail?sid="+fakeId+Query.urlState();
            } else {
                var formDetail = "http://" + window.location.host + $.url.getContextPath() + "/templates/formsList/formDetail.html?sid="+fakeId+"&r=s25"+Query.urlState();
            }
            return formDetail;
        },
        indexSearch: function(){ //综合搜索结果页面
        	if ($.url.isServer) {
                var indexSearch = "/search/indexSearch?sid="+fakeId+Query.urlState();
            } else {
                var indexSearch = "http://" + window.location.host + $.url.getContextPath() + "/templates/integratedSearch/indexSearch.html?sid="+fakeId+"&r=s25"+Query.urlState();
            }
            return indexSearch;
        },
        mySearch: function(){ //综合搜索结果页面
        	if ($.url.isServer) {
                var mySearch = "/search/mySearch?sid="+fakeId+Query.urlState();
            } else {
                var mySearch = "http://" + window.location.host + $.url.getContextPath() + "/templates/integratedSearch/mySearch.html?sid="+fakeId+"&r=s25"+Query.urlState();
            }
            return mySearch;
        },
        certification: function(){ //认证页面
        	if ($.url.isServer) {
                var certification = "/user/certification?sid="+fakeId+"&r=s25";
            } else {
                var certification = "http://" + window.location.host + $.url.getContextPath() + "/templates/user/certification.html?sid="+fakeId+"&r=s25";
            }
            return certification;
        },
        personInfo: function(){ //个人中心页面
        	if ($.url.isServer) {
                var personInfo = "/account/info?sid="+fakeId+"&r=s25";
            } else {
                var personInfo = "http://" + window.location.host + $.url.getContextPath() + "/templates/user/personInfo.html?sid="+fakeId+"&r=s25";
            }
            return personInfo;
        },
        login: function(){ //登录页面
        	if ($.url.isServer) {
                var login = "/user/login";
            } else {
                var login = "http://" + window.location.host + $.url.getContextPath() + "/templates/user/login.html";
            }
            return login;
        },
        modifyInfo: function(){ //修改信息
        	if ($.url.isServer) {
                var modifyInfo = "/account/modifyInfo?sid="+fakeId+"&r=s25";
            } else {
                var modifyInfo = "http://" + window.location.host + $.url.getContextPath() + "/templates/user/modifyInfo.html?sid="+fakeId+"&r=s25";
            }
            return modifyInfo;
        },
        toCertify: function(){ //权限过期页面
        	if ($.url.isServer) {
                var toCertify = "/user/toCertify?sid="+fakeId+"&r=s25";
            } else {
                var toCertify = "http://" + window.location.host + $.url.getContextPath() + "/templates/user/toCertify.html?sid="+fakeId+"&r=s25";
            }
            return toCertify;
        },
        formList: function(){ //报表列表
        	if ($.url.isServer) {
                var formList = "/table/formList?sid="+fakeId+"&r=s25";
            } else {
                var formList = "http://" + window.location.host + $.url.getContextPath() + "/templates/formsList/formList.html?sid="+fakeId+"&r=s25";
            }
            return formList;
        },
        myForm: function(){ //我的报表
        	if ($.url.isServer) {
                var myForm = "/table/myForm?sid="+fakeId+"&r=s25";
            } else {
                var myForm = "http://" + window.location.host + $.url.getContextPath() + "/templates/formsList/myForm.html?sid="+fakeId+"&r=s25";
            }
            return myForm;
        },
        searchList: function(){ //高级搜索
        	if ($.url.isServer) {
                var searchList = "/case/notice?sid="+fakeId+"&r=s25";
            } else {
                var searchList = "http://" + window.location.host + $.url.getContextPath() + "/templates/searchCase/searchList.html?sid="+fakeId+"&r=s25";
            }
            return searchList;
        },
        wechaSearch: function(){ //案例搜索
        	if ($.url.isServer) {
                var wechaSearch = "/case/index?sid="+fakeId+"&r=s25";
            } else {
                var wechaSearch = "http://" + window.location.host + $.url.getContextPath() + "/templates/searchCase/wechaSearch.html?sid="+fakeId+"&r=s25";
            }
            return wechaSearch;
        },
        accounting: function(){ //会计师事务所
        	if ($.url.isServer) {
                var accounting = "/agency/accounting?sid="+fakeId+"&r=s25";
            } else {
                var accounting = "http://" + window.location.host + $.url.getContextPath() + "/templates/neeq/accountingOffice.html?sid="+fakeId+"&r=s25";
            }
            return accounting;
        },
        agencyLaw: function(){ //律师事务所
        	if ($.url.isServer) {
                var agencyLaw = "/agency/law?sid="+fakeId+"&r=s25";
            } else {
                var agencyLaw = "http://" + window.location.host + $.url.getContextPath() + "/templates/neeq/lawOffice.html?sid="+fakeId+"&r=s25";
            }
            return agencyLaw;
        },
        searchBillboard: function(){ //律师事务所
        	if ($.url.isServer) {
                var searchBillboard = "/agency/law?sid="+fakeId+"&r=s25";
            } else {
                var searchBillboard = "http://" + window.location.host + $.url.getContextPath() + "/templates/user/searchBillboard.html?sid="+fakeId+"&r=s25";
            }
            return searchBillboard;
        }
    });
    
}(window.jQuery);
//ajax封装
+function($) {
	$.kf = $.kf || {};
	$.extend($.kf, {
		ajax:function(options){
			var option = $.extend(options, {
				cache: false,
				dataType: 'json',
				traditional: true
			});
			
			/*if(isNullOrEmpty(sessionStorage.getItem("fakeId"))){
				var fakeId = "";
			}else{
				var fakeId = sessionStorage.getItem("fakeId");
			}*/
			
			if(isNullOrEmpty($.cookie("fakeId"))){
				var fakeId = "";
			}else{
				var fakeId = $.cookie("fakeId");
			}
			
			if(options.url.indexOf("?") > 0){
				options.url = encodeURI(options.url+"&sid="+fakeId);
			}else{
				options.url = encodeURI(options.url+"?sid="+fakeId);
			}
			//正常情况
			function doResponse(data) {
				//去掉数据中null的值，改为空
				$.each(data, function(name, value) { 
					//json格式
					if (value == 'null' || value == null || value == undefined || value == 'undefined') {
						data[name] = '';
					}
					//数组格式
					if ($.isArray(data.data)) {
						$.each(data.data, function(i, value1) {
							$.each(data.data[i], function(m, value2) {
								if (value2 == 'null' || value2 == null || value2 == undefined || value2 == 'undefined') {
									data.data[i][m] = '--';
								}
							});
						});
					}

				}); 
				if(data.code == "-11"){ //跳转到登录
					window.top.location.href ="/user/login";
				}else{
					options.processResponse(data);
				}
				
			}
			//错误信息处理
			function processFailed() {
				console.log("这个接口不通："+ options.url);
			}
			//ajax success
			if (options.processResponse) {
				$.extend(options, {
					success: doResponse
				});
			}
			//ajax failed
			if (options.processFailed)
				$.extend(options, {
					error: options.processFailed
				});
			else
				$.extend(options, {
					error: processFailed
				});
			
			return $.ajax(option);
		}
	})
}(window.jQuery);

/*登录BTN*/
$('#loginBtn').on("click", function () {
    if (checkAllLogin()) {
        if (errorTipLogin()) {
            //记住密码
            savePw();
			$('#loginBtn').attr("disabled",true);
            //验证码校验
            if ($(".login-picCode").css("display") != "none") {
                if ($('#loginCode').val() == "") {
                    $("#loginCodeError").text('验证码不能为空');
                    $('#loginBtn').attr("disabled",false);
                    return false;
                } else if ($('#loginCode').val().length != 4) {
                    $("#loginCodeError").text('验证码格式错误');
                     $('#loginBtn').attr("disabled",false);
                    return false;
                } else if (!isCode($('#loginCode').val())) {
                    $("#loginCodeError").text('验证码格式错误');
                     $('#loginBtn').attr("disabled",false);
                    return false;
                } else {
                    $("#loginCodeError").text('');
                }
            }

            //是否记住密码
            var isRemember = 0;//默认不记住密码，0否1是
            if ($("#rmbPw").is(":checked")) {
                isRemember = 1;
            }

            //上送参数
            var param = {
                username: $("#loginName").val(),
                password: $("#loginPw").val(),
                code: $('#loginCode').val(),
                isRemember: isRemember
            }
			var certifiedDate = '';//14天
			var certified = '';//认证状态
            $.ajax({
                type: "post",
                url: $.kf.LOGIN,
                data: param,
                dataType: "json",
                success: function (data) {
                	/*sessionStorage.setItem("fakeId", data.data.fakeId); 
                	sessionStorage.setItem("uuid", data.data.uuid);*/
                	
                	/*	certified   认证状态
                     *	未认证	    unCertify
                     *  认证中	    certifying
                     *  认证失败	    certifyFailed
                     *  已认证	    certified
                     *  已认证1	    certifiedFirst          //已认证后的第一次登录之后，弹窗恭喜认证成功
                     *  认证失败1   certifyFailedFirst    	//认证失败后的第一次登录之后，弹窗提示认证失败，重新认证。
                     * 					    				如果小于等于14天可以继续浏览页面，否则强制进入$.url.certification()
                     * 
                     * */
                	certifiedDate = data.data.date;
                	certified = data.data.certified;
                	/*certified = "unCertify";
                	certifiedDate = true;*/
                	//存cookie
                	$.cookie("certified", certified,{ path: "/", expiress: "" ,sucue:true});//是否认证
                	$.cookie("uuid", data.data.uuid,{ path: "/", expiress: "" ,sucue:true});//uuid
                	$.cookie("fakeId", data.data.fakeId,{ path: "/", expiress: "" ,sucue:true});//fakeID
                    //用户名或者密码错误
                    if (data.code != "0") {
                        if (data.code == "33333") {//显示验证码
                            $(".login-picCode").show();
                            $("#loginError").text('');
                            //$("#loginCodeError").text("请输入验证码");
                            $("#loginError").text(data.message);
                            var time = new Date().getTime();
                            $("#verify").attr("src", $.kf.CAPTCHA +"?v="+ time);
                            $('#loginBtn').attr("disabled",false);
                        } else {
                            var time = new Date().getTime();
                            $("#verify").attr("src", $.kf.CAPTCHA +"?v="+ time);
                            $("#loginError").text(data.message);
                            $('#loginBtn').attr("disabled",false);

                        }
                    
                    //未认证
                    } else if(certified == "unCertify"){
                        if(certifiedDate){//小于等于14天
                        	$("#loginError").text('');
                        	window.location.href = $.url.companyIndex();
                        }else{//跳转认证页面
                        	$("#loginError").text('');
                        	window.location.href = $.url.toCertify()+"&certify=login";
                        }
                        
                     //认证中
                    } else if(certified == "certifying"){
                    	$("#loginError").text('');
                    	window.location.href = $.url.companyIndex();
                    	
                    //认证失败
                    } else if(certified == "certifyFailed"){
                    	if(certifiedDate){//小于等于14天
                    		$("#loginError").text('');
                    		window.location.href = $.url.companyIndex();
                    	}else{//跳转认证页面
                    		$("#loginError").text('');
                        	window.location.href = $.url.toCertify() +"&certify=login";
                    	}
                    	
                    //认证成功
                    } else if(certified == "certified"){
                    	$("#loginError").text('');
                    	window.location.href = $.url.companyIndex();
                    	
                    //认证成功后第一次登录
                    } else if(certified == "certifiedFirst"){
                    	$("#loginError").text('');
                    	//存储认证状态
                    	$.cookie("myCertify", "true", { path: "/", expiress: "" ,sucue:true});
                    	window.location.href = $.url.companyIndex();
                    	
                    //认证失败后第一次登录
                    } else if(certified == "certifyFailedFirst"){
                    	if(certifiedDate){//小于等于14天
                    		$("#loginError").text('');
                    		
                    		$.cookie("myCertify", "true", { path: "/", expiress: "" ,sucue:true});
                    		window.location.href = $.url.companyIndex();
                    	}else{//跳转认证页面
                    		$("#loginError").text('');
                        	window.location.href = $.url.toCertify()+"&certify=login";
                    	}
                    }
                }
            });
        }
    };
});
/*手机号检验*/
function isMobile(s) {
    var isIntChar = RegExp(/^1[3|4|5|6|7|8|9]\d{9}$/);
    return (isIntChar.test(s));
}
/*数字英文组合校验*/
function isCode(s) {
    var isIntCharSpecial = RegExp(/^[A-Za-z0-9]+$/);
    return (isIntCharSpecial.test(s));
}
/*密码检验规则校验字母、数字组合*/
function isPassWord(s)
{
    var isIntCharSpecial = RegExp(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,})$/);
    return (isIntCharSpecial.test(s));
}
/*姓名检验规则*/
function userName(s)
{
    var isIntCharSpecial = RegExp(/^[\u4e00-\u9fa5a-zA-Z]{2,20}$/);
    return (isIntCharSpecial.test(s));
}
/*邮箱检验规则*/
function userEmail(s)
{
    var isIntCharSpecial = RegExp(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/);
    return (isIntCharSpecial.test(s));
}
/*汉字，数字，英文*/
function userMess(s)
{
    var isIntCharSpecial = RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/);
    return (isIntCharSpecial.test(s));
}
//删除输入框前后空格
function trim(str) {
    str = str + "";
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

//删除输入框全部空格
function trimAll(str) {
    var val = str.replace(/\s/g, '');
    return val;
}
//判断是否为null或空
function isNullOrEmpty(prop) {
    if (prop == null || trim(prop) == "" || prop == undefined)
        return true;
    else
        return false;
}
//检测obj是否为空
function isEmptyObject(e) {  
    var t;  
    for (t in e)  
        return !1;  
    return !0  
} 
function isChinese(val){
	var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
	if(reg.test(val)){ 
		return true;
	}else{
		return false;
	}
}


/*输入框校验*/
var BlurIpt = function (el, options, fun, id) {
    this.el = el;
    this.options = options;
    this.fun = fun;
    this.id = id;
}
BlurIpt.prototype = {
    init: function (el, options, fun, id) {
        var _this = this;
        this.el.on("blur", function () {
            var txt = $(this).val();
            var name = $(this).attr("name");
            if (!isNullOrEmpty(txt)) {
                if (_this.fun(txt)) {
                    _this.id.text("");
                } else {
                    _this.id.text(name + "格式错误");
                }
            } else {
                _this.id.text(name + "不能为空");
            }
        })
    }
}
/*注册全局校验输入项*/
var checkAll = function () {
    var flg = true;
    $(".register-wrap").find("input[type=text]").each(function () {
        if ($(this).val() == "") {
            $(this).parents(".register-con").next(".error-tip").text($(this).attr("name") + "不能为空");
            flg = false;
        }
    });
    return flg;
}
/*注册错误提示校验*/
var errorTip = function () {
    var tip = true;
    $(".register-wrap").find(".error-tip").each(function () {
        if ($(this).text() != "") {
            tip = false;
        }
    });
    return tip;
}

/*模拟select选中,和宽度适应*/
var Select = function (el, options) {
    this.el = el;
    this.options = options;
    var _width = this.el.width();
	var _minwidth = _width - 44;
  //this.el.find(".dropdown-menu").width(_width);
    this.el.find(".dropdown-menu").css("min-width",_minwidth);
}

Select.prototype = {
    init: function (el, opitions) {
        var _this = this;
        if(_this.el.parent().is("th")){
			var _intext = "<b class='caret'></b>";
		}else{
			var _intext = "<span class='input-group-btn caret2'><button class='btn btn-sm  btn-icon-btn' type='button'><i class='fa fa-calendar2'></i></button></span>";
		};
        this.el.find(".dropdown-menu").children("li").unbind().on("click", function () {
            var _a = $(this).find("a");
            var _text = _a.text();
            var _name = _a.attr("name");
            var _tabindex = _a.attr("tabindex");
            if (_text == "全部") {
                _this.el.find(".dropdown-toggle").html(_tabindex + _intext);
            } else {
                _this.el.find(".dropdown-toggle").html(_text + _intext);
            }
            _this.el.find(".dropdown-toggle").attr("name", _name)

        });
    }
};
//执行下拉框
//new Select($(".dropdown-select"),{}).init();



/*
 * 
 * new GetTableQuotes("请求地址"，"分页id"，"上送参数"，"拼接表格方法名","表格tbody的id","当前页数","加载中el","是否显示暂无数据").init();
 * new GetTableQuotes(url,$("#pageTool"),"",getList,$("#tableOne"),lastPage,$("#maskIn"),true).init();
 * 
 */
/*加载表格和分页*/
var timePicker = null;//实时行情点击分页暂停计时器，个例
var timePicker2 = null;
var GetTableQuotes = function (doUrl, el, param, listFun, method, tbodyId,lastPage,loadEle,isShowData,dataTip,dataTipObj) {
    this.doUrl = doUrl;
    this.el = el;
    this.param = param;
    this.listFun = listFun;
    this.tbodyId = tbodyId;
    this.lastPage = lastPage;
    this.loadEle = loadEle;
    this.isShowData = isShowData;
    this.dataTip = dataTip;
    this.dataTipObj = dataTipObj;
    var totalPage = "";
}

GetTableQuotes.prototype = {
    //初始化表格
    init: function (doUrl, el, param, listFun, method, tbodyId,lastPage,loadEle,isShowData,dataTip,dataTipObj) {
        var _this = this;
        var param = this.param;
        this.getListAjax(param);
        this.el.parent().find("#nodata").remove();
    },
    //默认加载表格
    getListAjax: function (param,lastPage,loadEle,isShowData) {
        var _this = this;
        var doUrl = this.doUrl;
        var page = this.page;
        var method = this.method;
        var lastPage = this.lastPage;
        var loadEle = this.loadEle;
        if(isNullOrEmpty(loadEle)){
        _this.tbodyId.html("");
        }else{
        	if(!loadEle.selector == ".noLoading"){
	        	_this.tbodyId.html("");
	        }
        }
        
        if(!isNullOrEmpty(loadEle)){
        	new Loading(loadEle, {}, _this.el).init();//统一处理加载中。。。
        }else{
        	//表格并列，特殊处理（少参数）
	        if(_this.el.selector == "#pageToolWe"){
	             new Loading($(".maskInTableWe"), {}, _this.el).init(); //显示加载中提示。。。
	        }else{
	            new Loading($(".maskInTable"), {}, _this.el).init(); //显示加载中提示。。。
	        }
        }
        
        if(isNullOrEmpty(lastPage)){
        	lastPage = 1;
        };
        var currentParam = {"page": lastPage};
        $.kf.ajax({
            type: method,
            url: doUrl,
            data: currentParam,
            dataType: "json",
            processResponse: function (data) {
                if(!isNullOrEmpty(_this.loadEle)){
		        	new Loading(_this.loadEle, {}, _this.el).close();//统一处理加载中。。。
		        }else{
		        	//表格并列，特殊处理（少参数）
			        if(_this.el.selector == "#pageToolWe"){
			             new Loading($(".maskInTableWe"), {}, _this.el).close(); //显示加载中提示。。。
			        }else{
			            new Loading($(".maskInTable"), {}, _this.el).close(); //显示加载中提示。。。
			        }
		        };
                _this.checkData(data,_this.isShowData,_this.dataTip,_this.dataTipObj); //检测是否有数据
                totalPage = Number(data.total); //获取总条数
                pageLine = 20; //暂定20
                _this.pageLine = pageLine;
                _this.totalPage = totalPage;
                if (isNullOrEmpty(_this.totalPage)) {
                    _this.totalPage = 0;
                }
                 $(".pageTotalDiv").remove();
                _this.listFun(data); //加载表格
                _this.getPage(page,lastPage); //加载分页
            }
        });
    },
    //点击分页时，重新加载表格
    getPageAjax: function (param) {
        var _this = this;
        var doUrl = this.doUrl;
        var method = this.method;
        var loadEle = this.loadEle;
        /*new Loading($(".maskInTable"), {}, _this.el).init(); //显示加载中提示。。。*/
       //表格并列，特殊处理
        if(!isNullOrEmpty(loadEle)){
        	new Loading(loadEle, {}, _this.el).init();//统一处理加载中。。。
        }else{
        	//表格并列，特殊处理（少参数）
	        if(_this.el.selector == "#pageToolWe"){
	             new Loading($(".maskInTableWe"), {}, _this.el).init(); //显示加载中提示。。。
	        }else{
	            new Loading($(".maskInTable"), {}, _this.el).init(); //显示加载中提示。。。
	        }
        }
        $.kf.ajax({
            type: method,
            url: doUrl,
            data: param,
            dataType: "json",
            processResponse: function (data) {
                _this.listFun(data);
                if(!isNullOrEmpty(_this.loadEle)){
		        	new Loading(_this.loadEle, {}, _this.el).close();//统一处理加载中。。。
		        }else{
		        	//表格并列，特殊处理（少参数）
			        if(_this.el.selector == "#pageToolWe"){
			            new Loading($(".maskInTableWe"), {}, _this.el).close(); //显示加载中提示。。。
			        }else{
			            new Loading($(".maskInTable"), {}, _this.el).close(); //显示加载中提示。。。
			        }
		        }
            }
        });
    },
    //加载分页
    getPage: function (el,lastPage) {
        var _this = this;
        var tbodyId = this.tbodyId;
        var lastPage = this.lastPage;
        if(isNullOrEmpty(lastPage)){
        	lastPage = 1;
        };
        this.el.empty().html("");
        this.el.Paging({
            pagesize: _this.pageLine, //默认表格行数
            count: _this.totalPage,
            current:lastPage,
            callback: function (page, size, count) {//'当前第 ' +page +'页,每页 '+size+'条,总页数：'+count+'页'
                var param = {"page": page}
                if(timePicker){
                	clearInterval(timePicker);
                }
                _this.tbodyId.html("");
                _this.getPageAjax(param);
                _this.el.find("ul").prepend("<li class='first-page-li'><span>共" + _this.totalPage + "条</span></li>");
                _this.el.find(".ui-paging-toolbar").prepend("<span>跳转到:</span>");
           },
           toolbar:true
        });
        if(!$.isNumeric(_this.totalPage)){
        	_this.totalPage = 0;
        }
        this.el.find("ul").prepend("<li class='first-page-li'><span>共" + _this.totalPage + "条</span></li>");
        this.el.find(".ui-paging-toolbar").prepend("<span>跳转到:</span>");
        if(this.el.parents(".page-content-par").find(".allListSo").size()){
        	this.el.parents(".page-content-par").find(".allListSo").after("<div class='row allList pageTotalDiv'><div class='hang-title'>共<span class='pageTotal'>"+_this.totalPage+"</span>条结果</div></div>");
        }else{
        	//针对我的筛选没有#allListSo的情况
        	$("#mySelectPage").text(_this.totalPage);
        }
    },
    //check表格是否有数据
    checkData: function (data,isShowData,dataTip,dataTipObj) {
        var _this = this;
        var el = this.el;
        _this.el.parent().find("#nodata").remove();
        _this.el.show();
        if (data.data.length == 0) {
        	if(this.isShowData != false){
        		if(_this.el.attr("id") != "pageToolDeal"){
	        		var html = "";
	        		if(isNullOrEmpty(dataTip)){
			            html += "<div id='nodata'>";
			            html += "<img src='../../assets/admin/layout/img/nodata.png' />";
			            html += "<p>抱歉，暂未搜到信息</p>";
			            html += "<span>请查阅其他栏目</span>";
			            html += "</div>";
	        		}else{
	        			if(_this.dataTip == true){
		        			html += "<div id='nodata'>";
				            html += "<p class='notDateTit'>"+ _this.dataTipObj.title +"</p>";
				            html += "<span class='notDateCon'>"+ _this.dataTipObj.stitle +"</span>";
				            html += "</div>";	
		        		}else{
		        			html += "<div id='nodata'>";
				            html += "<img src='../../assets/admin/layout/img/nodata.png' />";
				            html += "<p>抱歉，暂未搜到信息</p>";
				            html += "<span>请查阅其他栏目</span>";
				            html += "</div>";	
		        		}
	        		}
		            _this.el.before(html);
	            	
	        	}
        	}
            _this.el.hide();
        };
    }
}


/*加载表格end*/

/*
 
 * 
 * 
 * 
 * 加载中。。。
 * 
 * 
 * */
var Loading = function (el, options, pageId) {//加载中父标签,obj,分页ID
    this.el = el;
    this.options = options;
    this.pageId = pageId;
}

Loading.prototype = {
    init: function (el, options, pageId) {
        var _this = this;
        //针对财报的加载中样式
        $(".my-wrapTable").css("border", "0");
        var html = "";
        _this.el.find(".mask-in").remove();
        html += "<div class='mask-in'>";
        html += "<img src='../../assets/admin/layout/img/load.gif' />";
        html += "<p></p>";
        html += "</div>";
        _this.el.append(html);
        _this.el.height(300);
        if (!isNullOrEmpty(_this.pageId)) {
            _this.pageId.hide();
        }

    },
    close: function (el, options) {
        var _this = this;
        //针对财报的加载中样式
        $(".my-wrapTable").css("border", "1px solid #ddd");
        _this.el.find(".mask-in").remove();
        _this.el.height("auto");
        if (!isNullOrEmpty(_this.pageId)) {
            _this.pageId.show();
        }

    }
}

//非表格状态的加载中。。。。。。
var LoadingAjax = function (el, options, tbodyId) {//加载中父标签,obj,data容器
    this.el = el;
    this.options = options;
    this.tbodyId = tbodyId;
}

LoadingAjax.prototype = {
    init: function (el, options, tbodyId) {
        var _this = this;
        var html = "";
        _this.tbodyId.hide();
        _this.el.find(".mask-in").remove();
        html += "<div class='mask-in'>";
        html += "<img src='../../assets/admin/layout/img/load.gif' />";
        html += "<p></p>";
        html += "</div>";
        _this.el.append(html);
        _this.el.height(300);
    },
    close: function (el, options) {
        var _this = this;
        _this.tbodyId.show();
        _this.el.find(".mask-in").remove();
        _this.el.height("auto");
    }
}
/*
 * 
 * 
 * 暂无数据  
 * 
 * 
 */

//判断独自加载ajax模式的暂无数据
function isData(el, obj, dataId) {//参照物div，data.length，加载data的标签
    var flg = "";
    el.parent().find("#noOutData").remove();
    if (obj.length == 0) {
        if (!isNullOrEmpty(dataId)) {
            dataId.html("");
        }
        var html = "";
        html += "<div id='noOutData' class='noOutData'>";//noOutPic
        html += "<img src='../../assets/admin/layout/img/nodata.png' />";
        html += "<p>抱歉，暂未搜到信息</p>";
        html += "<span>请查阅其他栏目</span>";
        html += "</div>";
        el.before(html);
        el.hide();
        flg = false;
    } else {
        flg = true;
    }
    ;
    return flg;
}
//不符合data.data.length = 0 的逻辑的暂无数据，比如高管信息是data.data.excu.length = 0;
function funNoData(el) {
	el.parent().find("#noOutData").remove();
    var html = "";
    html += "<div id='noOutData' class='noOutData'>";
    html += "<img src='../../assets/admin/layout/img/nodata.png' />";
    html += "<p>抱歉，暂未搜到信息</p>";
    html += "<span>请查阅其他栏目</span>";
    html += "</div>";
    el.before(html);
    el.hide();
}
//不符合data.data.length = 0 的逻辑的暂无数据，比如高管信息是data.data.excu.length = 0;
function canvasNoData(el) {
	el.find(".canvasNoData").remove();
    var html = "";
    html += "<div class='canvasNoData'>";
    html += "<p>暂无数据</p>";
    html += "</div>";
    el.append(html);
    el.find(".canvas-position").hide();
    //el.hide();
}
//企业对比
function sameNoData(el) {
	el.find(".canvasNoData").remove();
    var html = "";
    html += "<tr><td></td><td class='canvasNoData'>";
    html += "<p>暂无数据</p>";
    html += "</td><td></td></tr>";
    el.append(html);
}
//弹窗字母筛选
function popLetter() {
    $(".province-ul").find("li").on("click", function () {
        var letter = $(this).text().toLowerCase();
        $(this).addClass("provinceLi");
        $(this).siblings().removeClass("provinceLi");
        $(this).parents(".province-ul").next(".city-list").find("li").removeClass("provinceLi");
        $(".modal-footer").find("button:last").addClass("default").removeClass("btn-primary");
        //alert(letter);
        if ($(this).text() != "全部") {
            $(this).parents(".province").find(".city-list").find("li").each(function () {

                var _lettet = $(this).attr("data-name");
                if (_lettet == letter) {
                    $(this).show();
                    //$(this).siblings().show();
                } else {
                    $(this).hide();
                }
            });
        } else {
            $(this).parents(".province").find(".city-list").find("li").show();
        }

    });
}
;

//排序

function sortToggle(el) {
    var _removeup = $(el).parents("th").siblings("th").find("a");
    if ($(el).hasClass("sort-up")) {
        $(el).addClass("bgredT").siblings("a").removeClass("bgredB");
        _removeup.removeClass("bgredT");
        _removeup.removeClass("bgredB");
    } else {
        $(el).addClass("bgredB").siblings("a").removeClass("bgredT");
        _removeup.removeClass("bgredB");
        _removeup.removeClass("bgredT");
    }
}

//禁止密码复制和空格
$("input[type=password]").on("keydown", function (e) {
    var keyCode = e.which;
    if (keyCode == 32) {
        return false;
    }

});
$("input[type=password]").bind("cut copy paste", function (e) {
    e.preventDefault();
});
//MyAlert，样式为bootstrap弹窗样式
window.alert = function (txt, title, options, notBtn) {//优化alert弹窗
    if (!title) {
        title = "提示"
    }
    var html = "";
    html += '			<div class="modal fade myAlert1" id="" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
    html += '            <div class="modal-dialog">';
    html += '                <div class="modal-content">';
    html += '                    <div class="modal-header">';
    html += '                        <button type="button" class="close closeAlert" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
    html += '                        <h4 class="modal-title" id="myModalLabel">' + title + '</h4>';
    html += '                    </div>';
    html += '                    <div class="modal-body">';
    html += '                        <div class="row text-center" style="line-height: 36px;">';
    html += '                              <p class="myalertText">' + txt + '</p>';
    html += '                        </div>';
    html += '                    </div>';
    html += '                    <div class="modal-footer">';
    if(notBtn == true){
    html += '                       <button type="button" data-dismiss="modal" id="'+ options +'"  class="btn btn-primary closeAlert">确定</button>';
    html += '                       <button type="button" data-dismiss="modal" class="btn btn-default closeAlert">取消</button>';
    }else{
    	html += '                       <button type="button" data-dismiss="modal" id="'+ options +'"  class="btn btn-primary closeAlert">确定</button>';
    }
    html += '                    </div>';
    html += '                </div>';
    html += '           </div>';
    html += '        </div>';
    $("body").append(html);
    $('.myAlert1').modal({backdrop: 'static', keyboard: false});
    //关闭弹窗
    $(".closeAlert").on("click", function () {
        $('.myAlert1').remove();
        $(".modal-backdrop").remove();
    });
}


//选择日期对比
function compareDate(startTime, endTime) {
	if(isNullOrEmpty(startTime) && isNullOrEmpty(endTime)){
		return true;
	}else{
		var st = new Date(startTime.replace(/\-/g, "\/"));
	    var et = new Date(endTime.replace(/\-/g, "\/"));
	    var crDay = new Date(currentDay.replace(/\-/g, "\/"));
	    if(st > crDay){
	    	alert("开始时间必须小于今天");
	        return false;
	    }else if(et > crDay){
	    	alert("结束时间必须小于今天");
	        return false;
	    }else if (startTime != "" && endTime != "" && st > et) {
	        alert("开始时间不能大于结束时间");
	        return false;
	    }else if(startTime != "" && endTime ==""){
	    	alert("请选择结束时间！");
	    	return false;
	    }else if(endTime != "" && startTime ==""){
	    	alert("请选择开始时间！");
	    	return false;
	    } else {
	        return true;
	    }
	}
    
}
/*
 window.onbeforeunload = function() {   
 alert("qweqwe");  
 return false; // 可以阻止关闭  
 } */
//是否已打卡
$(function () {
	$(".page-sidebar-menu .start").find(".arrow").removeClass("open");
	$(".page-sidebar-menu .start.active").find(".arrow").addClass("open");
	
    if (!$("body").hasClass("clock")) {
        clock();//打卡
        searchBlur();//大搜索
        clickTop();//头部的意见反馈
        contrast();//对比栏
    }
    if($("body").hasClass("certify")){
    	//认证页面不发请求
    }else{
    	getUserNamePhoto(); //获取昵称和头像
	    letterPage();//站内信悬浮下拉
	    brandMap();//面包屑
	    $(".userToltip").hide();
	    if(isNullOrEmpty($.cookie("certified"))){
	    	$(".userToltip").hide();
	    	
	    //未认证
	    }else if($.cookie("certified") == "unCertify"){
	    	$(".userToltip").addClass("hovers").show().find("span").css("cursor","pointer").text("未认证");
	    	$(".userToltip").show().find("span").on("click",function(){
	    		window.location.href = $.url.certification()+"&certify=companyList";
	    	})
	    	
	    // 认证中，登录；
	    }else if($.cookie("certified") == "certifying"){
	    	$(".userToltip").show().find("span").text("认证中");
	    
	    //认证失败，认证失败后第一次
	    }else if($.cookie("certified") == "certifyFailed" || $.cookie("certified") == "certifyFailedFirst"){
	    	$(".userToltip").addClass("hovers").show().find("span").css("cursor","pointer").text("未认证");
	    	$(".userToltip").show().find("span").on("click",function(){
	    		window.location.href = $.url.certification()+"&certify=companyList";
	    	})
	    //认证成功，认证成功后第一次登录
	    }else if($.cookie("certified") == "certified" || $.cookie("certified") == "certifiedFirst"){
	    	$(".userToltip").hide();
	    }
    }
    
})
//获取昵称和头像
function getUserNamePhoto(data) {
    $(".top-menu").find(".img-circle").hide();
    $.kf.ajax({
        type: "get",
        url: $.kf.GETUSERINFO,
        data: "",
        dataType: "json",
        processResponse: function (data) {
            var data = data.data;
            getUserNamePhotoIn(data);
            if(data.role == 'pay'){
            	$.cookie('permission', 'true');
            } else {
                $.cookie('permission', 'false');
            }
        }
    });
    function getUserNamePhotoIn(data) {
        $(".top-menu").find(".img-circle").attr('src', data.photo_url).css("height", "29px");
        $(".top-menu").find(".img-circle").show();
        $(".top-menu").find(".username").text(data.name);
    }
}
function clock() {
    $.kf.ajax({
        type: "get",
        url: $.kf.ISCHECKIN,
        data: "",
        dataType: "json",
        processResponse: function (data) {
            if (data.code == 0) {
                $(".pay span").text(data.message);
                $(".top-menu").find(".dropdown-user").append("<span class='dropdown-user-span'></span>");
                $(".top-menu").find(".pay").append("<span class='dropdown-user-pay'></span>");
            } else if (data.code == 100002) {
                $(".pay span").text(data.message);
                $(".pay").children("a").css("cursor", "default");
                //$(".top-menu").find(".dropdown-user").append("<span class='dropdown-user-span'></span>");
                //$(".top-menu").find(".pay").append("<span class='dropdown-user-pay'></span>");
            } else {
                $(".top-menu").find(".pay").find(".dropdown-user-pay").remove();
                $(".pay span").text(data.message);
                $(".pay").children("a").css("cursor", "default");
            }
        }
    });
    function dayClick(data) {
        var list = data.data;
        var tr = "";
        var trM = "";
        if (data.code == 100001) {
            $(".top-menu").find(".dropdown-user").find(".dropdown-user-span").remove();
            $(".top-menu").find(".pay").find(".dropdown-user-pay").remove();
            return false;
        } else if (data.code == 100003) {
            window.location.href = "/user/login";
        } else if (data.code == 100002) {
            $(".pay span").text("每日打卡");
            trM += '<div class="row text-center" style="line-height: 36px;">';
            trM += '	<b>您的当月打卡赠送点已满</b>';
            trM += '	<p>您可以通过以下方式购买<br/>';
            trM += '		服务电话： 400-6262-168<br />';
            trM += '		联系邮箱：sales@kaifengdata.com<br />';
            trM += '		或联系对应的客户经理';
            trM += '	</p>';
            trM += '</div>';
        } else {
            trM += '<div class="row text-center" style="line-height: 36px;">';
            trM += '   <b>打卡成功</b>';
            trM += '   <p>特权点数<span class="text-danger">+1</span>点 目前可用特权点数<span class="text-danger countD"></span>点</p>';
            trM += '</div>';
            $(".top-menu").find(".dropdown-user").find(".dropdown-user-span").remove();
            $(".top-menu").find(".pay").find(".dropdown-user-pay").remove();
        }




        tr += '<div class="modal fade myModal02" id="clockIn" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
        tr += '    <div class="modal-dialog">';
        tr += '        <div class="modal-content">';
        tr += '            <div class="modal-header">';
        tr += '               <h4 class="modal-title" id="myModalLabel">每日打卡</h4>';
        tr += '            </div>';
        tr += '            <div class="modal-body">' + trM + '</div>';
        tr += '            <div class="modal-footer">';
        tr += '                <button type="button" data-dismiss="modal"  class="btn btn-primary dksuccess">确定</button>';
        tr += '            </div>';
        tr += '        </div>';
        tr += '   </div>';
        tr += '</div>';
        $("body").append(tr);
        $(".countD").text(list.points);
        $(".pay span").text(data.message);
        $(".pay").children("a").css("cursor", "default");
        $("#clockIn").modal('show');
    }


    //每日打卡
    $("#dk").on("click", function () {
        if ($("#clockIn").size()) {
            $("#clockIn").remove(); //先删除
            $(".modal-backdrop").remove(); //遮罩
        }

        $.kf.ajax({//上送参数
            type: "post",
            url: $.kf.USERCHECKIN,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                dayClick(data);
            }
        });
    })

    $(".dksuccess").on("click", function () {
        $("#clockIn").modal('hide');
        $("#clockIn").remove();
        $(".modal-backdrop").remove(); //遮罩
    })
}


//获取搜索焦点
function searchBlur() {
	var windowWith = $(window).width();
	if(windowWith <= 768){
		$(".mobileInput").addClass("searchBlur");
		$(".pcInput").removeClass("searchBlur");
	}else{
		$(".mobileInput").removeClass("searchBlur");
		$(".pcInput").addClass("searchBlur");
	}
    var keyText = Query.getHash("keyword");
    if (!isNullOrEmpty(keyText)) {
        $(".searchBlur").val(keyText);
    }
    $(".searchBlur").focus(function () {
        $(this).val('');
        $(".searchList").hide();
    });
    //大搜索输入框失焦  下拉列表消失
    $(document).on("click", function (e) {
	    var target = $(e.target);
	    if (target.attr("class") != "searchList") {
	        $(".searchList").hide();
	        $(".searchBlur").val("");
	    } 
	});
    var flag = 0;
    //未来元素委托
    $(document).on("focus","input[type=text], input[type=password], textarea",function(){
    	flag = 1;
    });
    $(document).on("blur","input[type=text], input[type=password], textarea",function(){
    	flag = 0;
    });
    //$(".searchList").css({"display":"block"});
    $(document).keyup(function (event) {
        var searchI = $(".searchBlur").val();
        if (searchI != "") {
            //上送参数
            $.kf.ajax({
                type: "get",
                url: $.kf.COMPANYCODE,
                data: {"code": searchI},
                dataType: "json",
                processResponse: function (data) {
                    if (data.total == 0) {
                        $(".searchList ul").html("");
                        $(".searchList ul").append("<li>回车查看更多类型</li>");
                        $(".searchList").show().css("min-width","145px");
                    } else {
                        var list = data.data.companyList;
                        var listTag = data.data.tagList;
                        var listTabel = data.data.table;
                        var tagNum = 10 - listTag.length;
                        var tr = "";
                        $(".searchList ul").html("");
                        if(!isNullOrEmpty(listTag)){
                        	$(listTag).each(function (i) {
	                            tr += "<li><a href='"+ $.url.companyList() +"&currentTab=tab1&bqCode="+ listTag[i].id +"&page=1'><span class='searchSlide'>[标签]</span><span class='searchSlide'>" + listTag[i].name + "</span></a></li>";
	                        });
                        }
                        if(!isNullOrEmpty(listTabel)){
                        	$(listTabel).each(function (i) {
	                            tr += "<li><a href='"+ $.url.formDetail() +"id="+ listTabel[i].id +"&page=1'><span class='searchSlide'>[报表]</span><span class='searchSlide'>" + listTabel[i].name + "</span></a></li>";
	                        });
                        }
                        if(!isNullOrEmpty(list)){
                        	$(list).each(function (i) {
	                            if (i < tagNum) {
	                                tr += "<li><a href='"+ $.url.companyListUrl() +"id=" + list[i].companyId +"'><span class='searchSlide'>["+ list[i].type +"]</span><span class='searchSlide'>" + list[i].code + "</span><b class='searchSlide'>" + list[i].shortname + "</b><span>"+ list[i].name +"</span></a></li>";
	                            }
	                        });
                        }
                        $(".searchList ul").append(tr);
                        $(".searchList").show();
                        /*var _left = $(".pc-search").position().left - $(".pc-search").width()/2;
                        $(".searchList").show().css("left",_left).css("width","auto");*/
                    }

                    //点击搜索结果插入
                    $(".searchList ul li a").on("click", function () {
                        var Sname = $(this).attr("href");
                        location.reload(Sname)
                        window.top.location.href = Sname;
                    })
                }
            });
        } else {
            $(".searchList").hide();
        }

        //判断键盘是否是英文和数字
        if (flag != 1) {
            var keyCode = event.keyCode;
            if (keyCode >= 48 && keyCode <= 57) {
                $(".searchBlur").focus();
            } else if (keyCode >= 65 && keyCode <= 90) {
                $(".searchBlur").focus();
            } else if (keyCode >= 96 && keyCode <= 105) {
                $(".searchBlur").focus();
            }
        }
    })
	/*$(window).resize(function(){
		var _left = $(".pc-search").position().left - $(".pc-search").width()/2;
        $(".searchList").css("left",_left).css("width","auto");
	});*/
	$(".searchEvent").on("click",function(){
		var searchI = $(this).siblings("input").val();
        var searchK = $.trim(searchI);
        if(searchK == ""){
        	return false;
        } else if(!$(".searchList ul li").hasClass("active") && $.trim($(".mod-title").text()) != "搜索结果") {
            window.top.location.href = $.url.searchIndex() + "&type=search&keyword=" + searchK;
            //不含有下拉选中项并且在搜索界面
        } else if (!$(".searchList ul li").hasClass("active") && $.trim($(".mod-title").text()) == "搜索结果") {
            window.top.location.href = $.url.searchIndex() + "&type=search&keyword=" + searchK;
            //location.reload(location.href);
            //含有下拉选项并且在公司详情页界面
        }else if ($(".searchList ul li").hasClass("active") && $.trim($(".mod-title").text()) == "挂牌公司详情") {
            var selectc = $(".searchList .active").children("a").attr("href");
            window.top.location.href = selectc;
            //location.reload(location.href);
            //含有下拉选项并且不在公司详情页界面
        } else if ($(".searchList ul li").hasClass("active") && $.trim($(".mod-title").text()) != "挂牌公司详情") {
            var selectc = $(".searchList .active").children("a").attr("href");
            window.top.location.href = selectc;
        }
	});
	
	
	//回车搜索
    $(".searchBlur").on("keyup", function (e) {
        var searchI = $(this).val();
        var searchK = $.trim(searchI);
        var keyCode = e.which;
        if (keyCode == 13 && searchK) {
        	/*if(searchK == ""){
        		
        	}*/
            //不含有下拉选中项并且不再搜索界面
            if (!$(".searchList ul li").hasClass("active") && $.trim($(".mod-title").text()) != "搜索结果") {
                window.top.location.href = $.url.searchIndex() + "type=search&keyword=" + encodeURI(searchK);
                //不含有下拉选中项并且在搜索界面
            } else if (!$(".searchList ul li").hasClass("active") && $.trim($(".mod-title").text()) == "搜索结果") {
                window.top.location.href = $.url.searchIndex() + "type=search&keyword=" + encodeURI(searchK);
                //location.reload(location.href);
                //含有下拉选项并且在公司详情页界面
            } else if ($(".searchList ul li").hasClass("active") && $.trim($(".mod-title").text()) == "挂牌公司详情") {
                var selectc = $(".searchList .active").children("a").attr("href");
                window.location.href = selectc;
                //location.reload(location.href);
                //含有下拉选项并且不在公司详情页界面
            } else if ($(".searchList ul li").hasClass("active") && $.trim($(".mod-title").text()) != "挂牌公司详情") {
                var selectc = $(".searchList .active").children("a").attr("href");
                window.top.location.href = selectc;
            }
        } else if (keyCode == 40) {
            if($(".searchList ul li").text() != "回车查看更多类型"){
	            if ($(".searchList ul li:last-child").hasClass("active")) {
	                return false;
	            } else if (!$(".searchList ul li").hasClass("active")) {
	                $(".searchList ul li:first-child").addClass("active");
	                return false;
	            } else {
	                $(".searchList .active").removeClass("active").next().addClass("active");
	                return false;
                }
            }
        } else if (keyCode == 38) {
            if ($(".searchList ul li:first-child").hasClass("active")) {
                return false;
            } else {
                $(".searchList .active").removeClass("active").prev().addClass("active");
                return false;
            }
        }
    });
}

//站内信悬浮下拉
var letterPage = function(){
	$.kf.ajax({
	    type: "get",
	    url: $.kf.GETUNREADLIST,
	    data: "",
	    dataType: "json",
	    processResponse: function (data) {
	        letterList(data);
	    }
	});
}



/*拼table表格*/
var letterList = function (data) {
    var list = data.data;
    var tr = "";
    $(".letterList").html("");
    $(list).each(function (i) {
        tr += "<li>";
        tr += "<a href='" + $.url.letterDetailsUrl() + "id=" + list[i].id + "&name=letter" + "'>" + list[i].title;
        tr += "<span class='subject mgl'>";
        tr += "<span class='from'>系统</span>";
        tr += "<span class='time'>" + list[i].date + "</span>";
        tr += "</span>";
        tr += "<span class='message mgl'>" + list[i].title + "</span>";
        tr += "</a>";
        tr += "</li>"
    });
    $(".letterList").append(tr);
    var letterLen = $(".letterList li").length;
    if(letterLen == 0){
    	$(".letterN").show().text(letterLen);
    	$(".myMails").find(".letterN").hide();
    }else{
    	$(".letterN").show().text(letterLen);
    }
    $(".letterNs").text(letterLen);
    if(letterLen != 0){
    	$(".letterList").addClass("heightH")
    }else{
    	$(".letterList").removeClass("heightH")
    }
};

//重置按钮清空当前页所有输入框
$("body").on("click","#compReset", function () {
    $(this).parents(".page-content-par").find("input").val("");
});
//“清空选项”按钮的小叉叉(hahahah啊!!!)
/*$(document).on("click", function (e) {
    var target = $(e.target);
    //console.log(target);
    if (target.attr("id") == "soClear" || target.hasClass("soListClose") || target.attr("id") == "soFundClear") {
        $(".soListClose").show();
    } else {
        $(".soListClose").hide();
    }
});*/
//跳转收费
function moneyUrl(el, mflg, mcookie) {//a连接的id,是否存了cookie,保存cookie的名字
    var useCount = ""; //扣除点数
    var vipPointCount = ''; //剩余点数
    var murl = ""; //a标签href
    var companyName = ""//公司全名
    var point = true; //判断点数是否能继续访问页面
    var isPayment = ""; //是否已经付费 1是  0否
    if ($.cookie(mcookie) == "true") {
        mflg = true;
    }
    //a连接的点击
    el.unbind("click").on("click", function (e) {
        $('#ckPop').remove();
        $(".modal-backdrop").remove();
        var t = null;
        e.preventDefault(); //阻止默认连接
        murl = $(this).attr("href");
        if(!isNullOrEmpty($(this).attr('data-name'))){
             companyName = $(this).attr('data-name');
        }else{
             companyName = $(this).text();
        }
        
        t = setTimeout(function () {
            $.kf.ajax({
                type: "get",
                url: $.kf.GETUSERPOINT + "?companyName=" + companyName,
                data: "",
                dataType: "json",
                processResponse: function (data) {
                    dotNum(data); //拼接弹窗
                }
            });
        }, 500)

    });
    //拼接弹窗，请求剩余点数
    function dotNum(data) {
        useCount = 1; //默认每次扣除1点
        vipPointCount = data.data.vipPointCount; //剩余点数
        isPayment = data.data.isPayment;
//        isPayment = 0;
        $("#ckPop").remove();
        $(".modal-backdrop").remove();
        var html = "";
        if (isPayment == 0) {//是否已经扣费
            var tr = "";
            if (useCount <= vipPointCount) {//判断剩余点数和消耗点数
                if (mflg) {
                    //存了COOKIE
                    window.location.href = murl; //刷新页面连接
                } else {
                    window.location.href = murl; //刷新页面连接
//                    html += ' <div class="row text-center" style="line-height: 36px;">';
//                    html += '    <p>将扣除特权点数<span style="color:red">' + useCount + '</span>点，目前可用特权点数<span style="color:red">' + vipPointCount + '</span>点</p>';
//                    html += '    <p></p>';
//                    html += ' </div>';
//                    tr += '			<div class="modal fade myModal02" id="ckPop" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
//                    tr += '            <div class="modal-dialog">';
//                    tr += '                <div class="modal-content">';
//                    tr += '                    <div class="modal-header">';
//                    tr += '                        <button type="button"class="close closeMoney" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
//                    tr += '                        <h4 class="modal-title" id="myModalLabel">温馨提示</h4>';
//                    tr += '                    </div>';
//                    tr += '                    <div class="modal-body">' + html + '</div>';
//                    tr += '                    <div class="modal-footer"><label id="doNotTip"><input style="" type="checkbox"/><span style="padding-left:4px;">不再提示</span></label>';
//                    tr += '                        <button type="button"  data-dismiss="modal" id=""  class="btn btn-default closeMoney">取消</button><button type="button" id="doMoney"  class="btn btn-primary">确定</button>';
//                    tr += '                    </div>';
//                    tr += '                </div>';
//                    tr += '           </div>';
//                    tr += '        </div>';
                }


            } else {
                point = false; //点数不足
                html += ' <div class="row text-center" style="line-height: 36px;">';
                html += '    <p><b>您的特权点数余额不足</b></p>';
                html += '    <p>您可以通过以下方式购买</p>';
                html += '    <p><span style="font-weight:bold;">服务电话：</span>400-6262-168</p>';
                html += '    <p><span style="font-weight:bold;">联系邮箱：</span>sales@kaifengdata.com</p>';
                html += '    <p>或联系对应的客户经理</p>';
                html += ' </div>';
                tr += '			<div class="modal fade myModal02" id="ckPop" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
                tr += '            <div class="modal-dialog">';
                tr += '                <div class="modal-content">';
                tr += '                    <div class="modal-header">';
                tr += '                        <button type="button"class="close closeMoney" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
                tr += '                        <h4 class="modal-title" id="myModalLabel">温馨提示</h4>';
                tr += '                    </div>';
                tr += '                    <div class="modal-body">' + html + '</div>';
                tr += '                    <div class="modal-footer"><label id="doNotTip"><input style="" type="checkbox"/><span style="padding-left:4px;">不再提示</span></label>';
                tr += '                        <button type="button"  data-dismiss="modal" id=""  class="btn btn-default closeMoney">取消</button><button type="button" id="doMoney"  class="btn btn-primary">确定</button>';
                tr += '                    </div>';
                tr += '                </div>';
                tr += '           </div>';
                tr += '        </div>';
            }


            $("body").append(tr);
        } else {
            /*if (useCount > vipPointCount) {
                point = false; //点数不足
                html += ' <div class="row text-center" style="line-height: 36px;">';
                html += '    <p><b>您的特权点数余额不足</b></p>';
                html += '    <p>您可以通过以下方式购买</p>';
                html += '    <p><span style="font-weight:bold;">服务电话：</span>400-6262-168</p>';
                html += '    <p><span style="font-weight:bold;">联系邮箱：</span>sales@kaifengdata.com</p>';
                html += '    <p>或联系对应的客户经理</p>';
                html += ' </div>';
                tr += '			<div class="modal fade myModal02" id="ckPop" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
                tr += '            <div class="modal-dialog">';
                tr += '                <div class="modal-content">';
                tr += '                    <div class="modal-header">';
                tr += '                        <button type="button"class="close closeMoney" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
                tr += '                        <h4 class="modal-title" id="myModalLabel">温馨提示</h4>';
                tr += '                    </div>';
                tr += '                    <div class="modal-body">' + html + '</div>';
                tr += '                    <div class="modal-footer"><label id="doNotTip"><input style="" type="checkbox"/><span style="padding-left:4px;">不再提示</span></label>';
                tr += '                        <button type="button"  data-dismiss="modal" id=""  class="btn btn-default closeMoney">取消</button><button type="button" id="doMoney"  class="btn btn-primary">确定</button>';
                tr += '                    </div>';
                tr += '                </div>';
                tr += '           </div>';
                tr += '        </div>';
                $("body").append(tr);
            } else {
                window.location.href = murl; //刷新页面连接
            }*/
			window.location.href = murl; //刷新页面连接

        }

        //点数不足时隐藏checkBox
        if (!point) {
            $("#doNotTip").hide();
        }
        //显示模态框	
        $('#ckPop').modal("show");
        //确认点击
        $("#doMoney").on("click", function () {

            //是否关闭继续提示
            if ($("#doNotTip").find("input").is(':checked')) {
                $.cookie(mcookie, "true", {expires: 30}); //存储一个带30天期限的cookie
            } else {
                $.cookie(mcookie, "false", {expires: -1}); //删除cookie
            }

            //删除弹窗
            $('#ckPop').modal("hide");
            $('#ckPop').remove();
            $(".modal-backdrop").remove();
            //点数充足，继续访问页面，!point时则无变化
            if (point) {
                window.location.href = murl; //刷新页面连接
            }
        });
        //关闭弹窗
        $(".closeMoney").on("click", function (e) {
            e.stopPropagation();
            $('#ckPop').modal("hide");
            $(".modal-backdrop").remove();
            $('#ckPop').remove();
        });
    }
};

//多点击延迟加载
var _timer = {};
function delay_till_last(id, fn, wait) {
    if (_timer[id]) {
        window.clearTimeout(_timer[id]);
        delete _timer[id];
    }
 
    return _timer[id] = window.setTimeout(function() {
        fn();
        delete _timer[id];
    }, wait);
}

 //获取当前系统时间
function getNowtime(){
	var mydate = new Date();
    var myweek;
    var getWeek = mydate.getDay();
	if(getWeek==0) myweek="星期日";
	if(getWeek==1) myweek="星期一";
	if(getWeek==2) myweek="星期二";
	if(getWeek==3) myweek="星期三";
	if(getWeek==4) myweek="星期四";
	if(getWeek==5) myweek="星期五";
	if(getWeek==6) myweek="星期六";
	var myMonth = mydate.getMonth();
	myMonth = myMonth + 1 ;
	if(myMonth.toString().length<2){
    	myMonth = "0"+(mydate.getMonth()+1);
    }else{
    	myMonth = mydate.getMonth()+1;
    }
    if(mydate.getDate().toString().length<2){
    	myDay = "0"+(mydate.getDate());
    }else{
    	myDay = mydate.getDate();
    }
    if(mydate.getMinutes().toString().length<2){
    	myMinutes = "0"+mydate.getMinutes();
    }else{
    	myMinutes = mydate.getMinutes();
    }
    currentDay = mydate.getFullYear()+"-"+myMonth+"-"+myDay;
    var nowDate = mydate.getFullYear()+"-"+myMonth+"-"+myDay+" "+mydate.getHours()+":"+myMinutes+" "+myweek;
	return nowDate;
}
$("#nowDate").text(getNowtime());
var t = setInterval(function(){
	$("#nowDate").text(getNowtime());
},1000)

//顶部弹窗事件
function clickTop() {
	$.kf.ajax({
        type: "get",
        url: $.kf.INTERNALSECTION,
        data: "",
        dataType: "json",
        processResponse: function (data) {
        	var result = data.data;
            var td = "";
            for(var i=1; i<result.length; i++){
            	td += "<option value='"+ result[i].related_section_id +"'>"+ result[i].related_section +"</option>"
            }
            $("#menu1Top").append(td);
             var _comtent = $(".sub-menu").find(".active").find(".neeqText").text();
             if(isNullOrEmpty(_comtent)){
             	_comtent = "其他"
             }
   			 $("#select2-chosen-1").text(_comtent);
        }
    });
   
    var _textTop= $(".sub-menu").find(".active").parent().parent().find(".title").text();
    if(isNullOrEmpty(_textTop)){
    	_textTop = "意见反馈";
    }
    var html = "";
    html += '<div class="modal fade myModal01" id="myModalHome" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
	html += '<div class="modal-dialog">';
	html += '	    <div class="modal-content">';
	html += '	      <div class="modal-header">';
	html += '	        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
	html += '	        <h4 class="modal-title" id="myModalLabel">' + _textTop + '</h4>';
	html += '	      </div>';
	html += '	      <div class="modal-body">';
	html += '	        <div class="mgt20 mgb20">';
	html += '	        	<div class="pull-left pdt5 mgb20 feedbackMap">数据定制</div>';
	html += '	        	<div class="pull-left" id="menuTopParent">';
	html += '		        	<select id="menu1Top" class="form-control input-xlarge select2me mgl20" data-placeholder="请选择...">';
	html += '						<option value="s1">新三板</option>';
	html += '					</select>';
	html += '				</div>';
	html += '	        </div>';
	html += '	        <div class="feedback col-md-12 pdl">';
	html += '			<div class="feedbackConApp">';
	html += '				<textarea style="width: 100%;" rows="8" maxlength="500"></textarea>';
	html += '					<div class="countApp"><span>0</span>/500</div>';
	html += '				</div>';
	html += '			</div>';
	html += '	      </div>';
	html += '	      <div class="modal-footer">';
	html += '	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>';
	html += '	        <button type="button" class="btn default" id="fbBtnTop">提交</button>';
	html += '	      </div>';
	html += '	    </div>';
	html += '	  </div>';
	html += '	</div>';
	html += '		<div id="content2" style="display: none;">';
	html += '	        <div class="contentBg"></div>';
	html += '	        <div class="contentSeccess ft16"><span class="fa fa-check" style="font-size: 28px; color: green;"></span>提交成功。感谢您提出的宝贵意见！</div>';
	html += '	    </div>';
   $("body").append(html);
  // $("#menu1Top").select2();
    var num = $(".feedbackConApp textarea").val().length;
    $(".countApp span").text(num);
    $(".feedbackConApp textarea").on("keyup", function () {
        var numT = $(".feedbackConApp textarea").val().length;
        if(trim(numT != "")){
        	$("#fbBtnTop").addClass("btn-primary").removeClass("default");
        	$(".countApp span").text(numT);
        } 
        if($(".countApp span").text() == 0){
        	$("#fbBtnTop").addClass("default").removeClass("btn-primary");
        }
    })
    //点击弹窗获取内容
    var thisText="";
	$(".submitXq a").on("click",function(){
		$(".feedbackMap").text($(this).text())
		thisText = $(this).attr("name");
	})
    //提交
	$("#fbBtnTop").on("click", function () {
		var typeId = $('#menu1Top option:selected').val();
	    //上送参数
	    var param = {
	    	related_section_id: typeId,
	    	message_type_id: thisText,
	        content: $(".feedbackConApp textarea").val(),
	    }
	   
	    if(trimAll($(".feedbackConApp textarea").val()) == ""){
			return false;
		}else{
			$("#myModalHome").modal("hide");
			$.kf.ajax({
	            type: "post",
	            url: $.kf.FEEDBACK,
	            data: param,
	            dataType: "json",
	            processResponse: function (data) {
	            	if (data.code == 0) {
	                    $("#fbError01").text("");
	                    $("#content2").fadeIn().delay(3000).fadeOut();
	                    $(".feedbackConApp textarea").val("");
	                    $(".countApp span").text("0");
	                } else {
	                    $("#fbError01").text(data.message)
	                }
	            }
	        });
		}
	})
	
}

//面包屑获取
function brandMap(){
	$(".start").each(function(){
		if($(this).hasClass("active")){
			var _thisText = $(this).find(".title").text();
			$("#brandOne").text(_thisText)
		}
	})
	$(".sub-menu li").each(function(){
		if($(this).hasClass("active")){
            var _thisText = $(this).find('.neeqText').text();
			var threeText = $(".mod-title").text();
			var _thisUrl = $(this).children("a").attr("href");
			$("#brandTwo").text(_thisText);
			if(trimAll($("#brandTwo").text()) != trimAll(threeText)){
				$(".threeTextLi").remove();
				$("#brandTwo").html("");
				$("#brandTwo").append("<a href='"+ _thisUrl +"'>"+ _thisText +"</a>")
				$("#brandTwo").append("<i class='fa fa-angle-right'></i>");
				$(".page-breadcrumb").append("<li class='threeTextLi'>"+ threeText +"</li>");
			}
		}
	})
}

//无刷新 改变地址栏的参数
var QueryUrl = {
	//修改地址栏参数
	changeParam:function(currentUrl,name,value){
		var currentUrl = currentUrl.split("?")[1];
		var res = {};
		var _name = name;
		//获取url放进obj里面
		currentUrl.split('&').forEach(function(i){
	        var j = i.split('=');
	        res[j[0]]=j[1];
	    });
	    //删除对象中已经存在的的name
	    for(var val in res){   
	        if(val == _name){
	       		delete res[val];
	        }
	    } 
	    //如果res为空，就说明地址栏参数只有name
	    if(isEmptyObject(res)){
	    	var resNew = name + "=" + value;
	    }else{
	    	//对象转换成地址栏参数形式
	    	var resNew  = $.param(res) + "&" + name + "=" + value;
	    }
	    return resNew;
	},
	//获取地址栏目参数
	getParam:function(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null)return  unescape(r[2]); return null;
	},
	//set   地址栏参数
	setParam:function(name,value){
		var _href = window.location.href;
		//是否有"?"
		if (/\?/g.test(_href)) {  
			//是否含有name
			if(!isNullOrEmpty(QueryUrl.getParam(name))){
				_href = QueryUrl.changeParam(_href,name,value);
			}else{
				//直接往后面添加参数
				_href = _href + "&" + name + "=" + value
			}
	    } else {  
	    	//，没有参数的情况，直接往后面添加参数
	       _href = name + "=" + value
	    }  
		window.history.pushState({}, "", window.location.pathname + "?" + _href);
	}
}
//tab页，重定向地址栏url ，num是tab的索引;

function pushUrlState(num,obj){
	var sid = Query.getHash("sid");
	var r = Query.getHash("r");
	if(Query.h5State()){
		if(!isEmptyObject(obj)){
	    	var objUrl  = $.param(obj);
	    	if(isNullOrEmpty(sid)){
	    		var _href = window.location.href.split("?")[0]+"?"+"currentTab=tab"+num+"&"+objUrl;
	    	}else{
	    		var _href = window.location.href.split("?")[0]+"?sid="+sid+"&r="+r+"&currentTab=tab"+num+"&"+objUrl;
	    	}
	    }else{
	    	if(isNullOrEmpty(sid)){
	    		var _href = window.location.href.split("?")[0]+"?"+"currentTab=tab"+num;
	    	}else{
	    		var _href = window.location.href.split("?")[0]+"?sid="+sid+"&r="+r+"&currentTab=tab"+num;
	    	}
	    };
		window.history.pushState({},"",_href);
	}else{
		if(!isEmptyObject(obj)){
	    	var objUrl  = $.param(obj);
	    	window.location.hash = "currentTab=tab"+num+"&"+objUrl;
	    }else{
	    	window.location.hash = "currentTab=tab"+num;
	    };
	}
}


//禁止对比悬浮框点击隐藏
$('.contrastModal').click(function(e) {
    e.stopPropagation();
});
$("#header_contrast_bar").on("mouseover",function(){
	$(".contrastModal").show();
})
$(".contrastModal").on("mouseout",function(){
	$(".contrastModal").hide();
});
$(".codeList2").on("mouseleave",function(e){
	e.stopPropagation();
});

var _flgCons = "";

function contrast(){
	//对比头部弹出层
	function setContrastList(data){
		_flgCons = true;
    	var dataList = data.data;
    	var tr = '';
    	var thisNum = 0;
    	var addC = $(".add");
    	$(".trast").remove();
    	$(dataList).each(function(i){
    		tr+= "<li class='trast liList'>";
    		if(dataList[i].code == ""){
    			tr+=	"<i>"+ (i+1) +"</i>";
				tr+=	"<div style='font-size:10px'>还可以继续添加</div>";
    		}else{
    			thisNum ++ ;
    			tr+=	"<span>"+ dataList[i].code +"</span>";
				tr+=	"<p class='companyP1'>"+ dataList[i].name +"<a><img class='hide' src='../../assets/admin/layout/img/delConpread.png'></a></p>";
    		}
			tr+=	"<i class='hide'>"+ (i+1) +"</i>";
			tr+=	"<div class='hide' style='font-size:10px'>还可以继续添加</div>";
			tr+= "</li>";
    	});
    	if(thisNum<2){
    		$("#columnContrast").attr("name","0");
    		$("#columnContrast").css("background-color","#b1b1b1");
    	}else{
    		$("#columnContrast").attr("name","1");
    		$("#columnContrast").css("background-color","#9398cb");
    	}
    	$(tr).insertBefore(addC);
    	if(dataList[7].code == ""){
      		$(".trast").eq(7).hide();
    	}else{
    		$(".trast").eq(7).show();
    		addC.hide();
    	}
    	delCon();
				        
	}
	//默认加载
	function contrastDate(){
		_flgCons = false;
		$.kf.ajax({
	        type: "get",
	        url: $.kf.CONTRASTBAR,
	        data: "",
	        dataType: "json",
	        processResponse: function(data){
	        	setContrastList(data);
	        	deleteAll();
	        }
	    });
	}
	contrastDate();
    //单个删除
    function delCon(){
    	var contrLen = $(".companyP1").length;
		//悬浮显示删除小标
	    $(".companyP1").on("mouseover",function(){
	    	$(this).find("img").removeClass("hide")
	    }).on("mouseout",function(){
	    	$(this).find("img").addClass("hide")
	    })
	    //悬浮对比删除
	    $(".companyP1 a").on("click",function(){
	    	_flgCons = false;
	    	$(".tipContrast").html("");
	    	//上送参数
	    	if($(this).parents(".liList").index() == 7){
	    		$(this).parents(".liList").hide();
	    		$("li.add").show();
	    	}
	    	var parentsContrast = $(this).parents(".trast");
            var param = {
                code: $(this).parents(".trast").find("span").text()
            }
	    	$.kf.ajax({
		        type: "post",
		        url: $.kf.DELCONTRASTBAR,
		        data: param,
		        dataType: "json",
		        processResponse: function(data){
			    	$.kf.ajax({
				        type: "get",
				        url: $.kf.CONTRASTBAR,
				        data: "",
				        dataType: "json",
				        processResponse: function(data){
				        	setContrastList(data);
				        }
				    });
			    	$(".add").show();
		        }
		    });
	    })
	}
    
    //全部清空
    function deleteAll(){
	    
	    $(".clearContrastr").off("click.clear").on("click.clear",function(){
	    	if(_flgCons){
	    		$(".tipContrast").html("");
		    	_flgCons = false;
		    	Query.setHash({"code":""});
	            var param = {
	                code: "all"
	            }
		    	$.kf.ajax({
			        type: "post",
			        url: $.kf.DELCONTRASTBAR,
			        data: param,
			        dataType: "json",
			        processResponse: function(data){
				    	$.kf.ajax({
					        type: "get",
					        url: $.kf.CONTRASTBAR,
					        data: "",
					        dataType: "json",
					        processResponse: function(data){
					        	setContrastList(data);
					        }
					    });
				    	$(".add").show();
			        }
			    });
	    	}else{
	    		//else
	    	}
	    })
	    //新增
	    $(".newAddContrast").click(function(){
	    	$(".tipContrast").text("");
	    	_flgCons = false;
	    	var contrastInput = $("#contrastInput").val();
	    	if(isNullOrEmpty(contrastInput)){
	    		$(".tipContrast").text("请输入简称或代码");
	    	}else{
		    	var param = {
	                code: contrastInput
	            }
		    	$.kf.ajax({
			        type: "post",
			        url: $.kf.ADDCONTRASTBAR,
			        data: param,
			        dataType: "json",
			        processResponse: function(data){
			        	_flgCons = true;
			        	if(data.code == 10010){
			        		$(".tipContrast").text("名称或代码错误");
			        	}else if(data.code == 10011){
			        		$(".tipContrast").text("所选公司已存在");
			        	}else if(data.code == 10012){
			        		$(".tipContrast").text("对比栏已满，您可以删除不需要的公司再继续添加");
			        	}else{
			        		$(".tipContrast").text("");
							$.kf.ajax({
						        type: "get",
						        url: $.kf.CONTRASTBAR,
						        data: "",
						        dataType: "json",
						        processResponse: function(data){
						        	setContrastList(data);
						        }
						    });
			        	}
			        }
			    });
	    	}
	    })
	    //输入框联想
	    $("#contrastInput").off().on("keyup",function(e){
    		var searchI = trim($("#contrastInput").val());
    		var keyCode = e.which;
            if (keyCode == 13) {
                var code = '';
                if($(".codeList2 .active").find("span").text() == ""){
                	code = $("#contrastInput").val();
                	$("#getCodeTem").click()
                }else{
                	code = $(".codeList2 .active").find("span").text();
                }
                $("#contrastInput").val(code);
                $(".newAddContrast").click();
                $("#contrastInput").val("");
        		$(".codeList2").hide();
        		$(".codeList2 ul").html("");
            } else if (keyCode == 40) {
	            if ($(".codeList2 ul li:last-child").hasClass("active")) {
	                return false;
	            } else if (!$(".codeList2 ul li").hasClass("active")) {
	                $(".codeList2 ul li:first-child").addClass("active");
	                return false;
	            } else {
	                $(".codeList2 .active").removeClass("active").next().addClass("active");
	                return false;
	                }
	        } else if (keyCode == 38) {
	            if ($(".codeList2 ul li:first-child").hasClass("active")) {
	                return false;
	            } else {
	                $(".codeList2 .active").removeClass("active").prev().addClass("active");
	                return false;
	            }
	        }else{
	        	$(".codeList2 ul").html("");
        		if (searchI != "") {
		            //上送参数
		            var param = {"code": searchI,"listStatusId":"b2"};
		            $.kf.ajax({
		                type: "get",
		                url: $.kf.COMPANYCODE,
		                data: param,
		                dataType: "json",
		                processResponse: function (data) {
		                    if (isNullOrEmpty(data.data.companyList)) {
		                         $(".codeList2").hide();
		                    } else {
		                    	$(".codeHide").hide();
		                        var list = data.data.companyList;
		                        var tr = "";
		                        $(".codeList2 ul").html("");
		                        $(list).each(function (i) {
		                            if (i < 10) {
		                                tr += "<li><a href='javascript:void(0)'><b class='pull-right'>" + list[i].shortname + "</b><span>" + list[i].code + "</span></a></li>";
		                            }
		                        });
		                        $(".codeList2 ul").append(tr);
		                        $(".codeList2").show();
		                        $(".codeList2").find("li").on("click",function(){
		                        	var code = $(this).find("span").text();
		                        	$("#contrastInput").val(code);
		                        	$(".newAddContrast").click();
		                        	$("#contrastInput").val("");
		                        	$(".codeList2").hide();
		                        	$("#getCodeTem").click();
		                        });
		                    }
		                }
		            });
		        } else {
		            $(".codeList2").hide();
	             	$(".codeHide").hide();
		        }
	        }
    	})
	    $("body").on("click",function(){
    		$(".codeList2").hide();
    	})
    }
    //对比跳转
    $("#columnContrast").on("click",function(){
    	var name = $(this).attr("name");
    	if(name == "1"){
    		var arr = [];
			$(".trast span").each(function(){
				arr.push($(this).text())
			})
			var code = arr.join(",");
			window.top.location.href = $.url.contrastPage()+"companyPeerCode=" + code + "&code=" + code;
    	}
		
    })
}

 //用户权限弹窗
$(".toPay").on("click",function(){
	if($(this).hasClass("toPay")){
		$("#toPay-Modal").modal("show");
	}
})
$("#contactWe , .contactWeCaiWu").on("click",function(){
	$.kf.ajax({
        type: "get",
        url: $.kf.PAYPROFESSION,
        data: "",
        dataType: "json",
        processResponse: function(data){
        	$("#toPay-Modal").modal("hide");
			$("#contact-Modal").modal("show");
    	}
 	})
}) 

//手机端菜单收缩
$(".menu-toggler").on("click",function(){
	$(".mobileMenu").toggleClass("hide");
	$(".page-content-wrapper").toggleClass("animated slideInLeft conLeft");
})
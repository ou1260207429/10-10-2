const laws = {
  serach_lawsList: "api/services/app/Home/HomeRegulationList", //查询法律法规
  serach_lawsDetail: "api/services/app/Home/HomeRegulationDetailsById" //查询法律法规详情
}
const table = {
  search_tableList: "api/services/app/Home/HomeTableDownloadList", //查询表格下载列表
  compute_downLoad: "api/services/app/Home/HomeTableDownloadAddVisitCount", //计算下载次数
  downLoadList: "api/Attachment/Download" //下载表格
}
const infO = {
  SEARCH_INFO: "api/services/app/Home/LoadFireFightingInfoByCondition" //查询公告信息
}
const handle = {
  search_handleList: "api/services/app/Home/HomeNoticeList", //查询办事指南列表
  search_handleDetail: "api/services/app/Home/HomeNoticeDetailsById" //查询办事指南详情

}
export {
  laws,
  table,
  infO,
  handle
}

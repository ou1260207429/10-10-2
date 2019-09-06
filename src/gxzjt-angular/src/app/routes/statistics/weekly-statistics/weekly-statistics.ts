import { Component, OnInit, ViewChild, Inject, Optional } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, XlsxService } from '@delon/abc';

import { FormBuilder, FormGroup } from '@angular/forms';
import { StatisticalServiceServiceProxy, WarningCenterQueryDto, API_BASE_URL } from '@shared/service-proxies/service-proxies';
import { dateTrans } from 'infrastructure/regular-expression';
import { NzMessageService } from 'ng-zorro-antd';
import { DateHelper } from './date-helper';


@Component({
    selector: 'weekly-statistics',
    templateUrl: './weekly-statistics.html',
    styleUrls: ['./weekly-statistics.less'],
})
export class WeeklyStatisticsComponent implements OnInit {

    startDateName; //显示的开始日期
    endDateName; //显示的结束日期
    endDate; //选择的结束日期
    startDate; //开始时间
    reportData; // 报表数据
    isTableLoading=false;
    isPage=false;

    notUpdateInWeekStyle={'font-weight': '700','color':'red'};

    constructor(private http: _HttpClient,
        private messageBox: NzMessageService,
        @Optional() @Inject(API_BASE_URL) private baseUrl?: string, ) {
        this.startDate = new Date(2019, 6, 1);
        this.endDate = new Date();
        this.reportData = { transitionalData4Week: {}, cityList: [], weeklyCityAmount: {}, cityAmount: {} }
    }

    onDateChange(data) {
        //this.endDate =DateHelper.getDateStrByV(data);
    }

    ngOnInit() {
        this.search();
    }

    getSearchDate(){
        
        var searchData = { startTime: null, endTime: null, weekStartTime: null, weekEndTime: null };

        searchData.startTime = DateHelper.getDateStrByV(this.startDate) + " 00:00:00";
        searchData.endTime = DateHelper.getDateStrByV(this.endDate) + " 23:59:59";

        if(searchData.endTime!=null && searchData.endTime!=''){
            var endDatetime=DateHelper.getDateTimeByStrV(searchData.endTime);
            var monday=DateHelper.getMondayByCurDate(endDatetime);
            monday=DateHelper.addDate(monday, -1);
            searchData.weekStartTime=DateHelper.getDateStrByV(monday)+" 12:00:00";

            var sunday=DateHelper.getSundayByCurDate(endDatetime);
            if(this.endDate<sunday){
                sunday=this.endDate;
            }
            searchData.weekEndTime=DateHelper.getDateStrByV(sunday)+" 12:00:00";
        }else{
            searchData.weekStartTime=null;
            searchData.weekEndTime=null;
        }

        this.startDateName =DateHelper.getDateStrByZn(this.startDate);
        this.endDateName=DateHelper.getDateStrByZn(this.endDate)

        return searchData
    }

    search() {
        this.isTableLoading=true;
        var searchData =this.getSearchDate();
        let url = this.baseUrl + "/api/services/app/ReportStatistcal/WeeklyReport";
        this.http.post(url, searchData).subscribe((res: any) => {
            if (res.success) {
                this.reportData = res.result;
            } else {
                this.messageBox.error(res.error);
            }
        }, null, ()=>{
            this.isTableLoading=false;
        });
    }

    exportExcel() {
        let url = this.baseUrl + "/api/services/app/ReportStatistcal/ExportWeeklyReportUrl";
        var searchData =this.getSearchDate();
        this.http.post(url, searchData).subscribe((res: any) => {
            if (res.success) {
                debugger
                let exportUrl=this.baseUrl+res.result
                open(exportUrl);
            } else {
                this.messageBox.error(res.error);
            }
        }, null, ()=>{
            this.isTableLoading=false;
        });
    }

}

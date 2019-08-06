import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { dateTrans } from 'infrastructure/regular-expression';
import { StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-unit-project-statis',
  templateUrl: './unit-project-statis.component.html',
  styleUrls: []
})
export class UnitProjectStatisComponent implements OnInit {
  fliterForm: FormGroup;
  hiddenFliter = false;
  formResultData = [];
  rangeTime = [];
  FrontPagination = false
  exportLoading = false
  tableLoading = false;
  total2 = 0;
  param = {
    page: 1,
    maxResultCount: 10,
    cityName: "",
    unitName:"",
    startApplyTime: "",
    endApplyTime: "",
  };


  constructor(
    private StatisticsService: StatisticsService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.resetTime();
    this.fliterForm = this.formBuilder.group({
      cityName: [null],
      unitName: [null],
      dateRange: [this.rangeTime],
    });
    this.search();
  }
  export() {
    this.exportLoading = true;
    this.param.page = 1;
    this.param.cityName = this.fliterForm.controls.cityName.value;
    this.param.unitName = this.fliterForm.controls.unitName.value;
    let time = this.fliterForm.controls.dateRange.value
    if (time && time.length != 0) {
      this.param.startApplyTime = dateTrans(time[0]) + " 00:00:00";
      this.param.endApplyTime = dateTrans(time[1]) + " 23:59:59";
    } else {
      this.param.startApplyTime = '';
      this.param.endApplyTime = '';
    }
    this.StatisticsService.GetUnitProjectStisticListExport(this.param).subscribe(
      res => {
        window.open(res.result);
        this.exportLoading = false;
      }, err => {
      },
    );

  }
  switchFilter() {
    this.hiddenFliter = !this.hiddenFliter;
  }
  refresh() {
    this.getList();
  }
  search() {
    this.param.page = 1;
    this.param.cityName = this.fliterForm.controls.cityName.value;
    this.param.unitName = this.fliterForm.controls.unitName.value;
    let time = this.fliterForm.controls.dateRange.value
    if (time && time.length != 0) {
      this.param.startApplyTime = dateTrans(time[0]) + " 00:00:00";
      this.param.endApplyTime = dateTrans(time[1]) + " 23:59:59";
    } else {
      this.param.startApplyTime = '';
      this.param.endApplyTime = '';
    }
    this.getList();
  }
  resetForm(): void {
    this.fliterForm = this.formBuilder.group({
      cityName: [null],
      unitName: [null],
      dateRange: [this.rangeTime],
    });
    this.param.page = 1;
    this.search();
  }

  getList() {
    let _this = this;
    this.tableLoading = true;
    this.StatisticsService.GetUnitProjectStisticList(this.param).subscribe(
      res => {
        this.tableLoading = false;
        if (res.result.data) {
          this.formResultData = res.result.data;
          _this.total2 = res.result.total;

        } else {
          this.formResultData = [];
        }
      }, err => {
      },
    );
  }
  resetTime() {
    var startTime = new Date();
    startTime.setDate(startTime.getDate() - 7)
    this.rangeTime = [startTime, new Date()];
  }
  change(v) {
    if (this.param.page == v) {
      return   //解决页面数据不能复制问题，因为change改变事件当点击的就会触发了所以当page不变的时候不执行方法
    }
    this.param.page = v;
    this.getList();
  }
}

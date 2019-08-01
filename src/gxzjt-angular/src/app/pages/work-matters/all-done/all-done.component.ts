import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STPage } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WorkMattersService } from '../../work-matters/work-matters.service';
import { dateTrans } from 'infrastructure/regular-expression';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { publicPageConfig } from 'infrastructure/expression';
@Component({
  selector: 'app-work-matters-all-done',
  templateUrl: './all-done.component.html',
  styleUrls: ['./all-done.component.less']
})
export class WorkMattersAllDoneComponent implements OnInit {
  rangeTime;
  fliterForm: FormGroup;
  cityarray = [];
  selectedcity;//存市
  countyarray;//存县数组
  data;
  url;//导出地址

  param = {
    cityName: null,
    startApplyTime: null,
    endApplyTime: null,
    startTime: null,
    endTime: null,
    projectName: null,
    flowPathType: null,
    size: 10,
    page: 1,
    regionAndCountyName: null,
    status: null,
    isExpire: null,
    companyName: null,
    totalCount: null,
  }
  pageConfig: STPage = {
    front: false,
    show: true,
  };
  total;

  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {
      title: '操作',
      width: '200px',
      buttons: [
        {
          text: '详情',

          click: (item: any) => {
            this.watchItem(item);
          }
        },
        {
          text: '受理凭证', iif: record => record.acceptAttachmentUrl != null, click: (record: any) => {
            if (record.acceptAttachmentUrl) {
              window.open(record.acceptAttachmentUrl)
            } else {
              this.message.error('暂无受理凭证');
            }
          }
        },
        {
          text: '意见书', iif: record => record.opinionAttachmentUrl != null, click: (record: any) => {
            if (record.opinionAttachmentUrl) {
              window.open(record.opinionAttachmentUrl)
            } else {
              this.message.error('暂无意见书');
            }
          }
        },
      ]
    },
    { title: '地市', index: 'city', width: '60px' },
    { title: '区域', index: 'regionAndCountyName', width: '60px' },
    { title: '工程名称', index: 'projectName', width: '120px' },
    { title: '工程编号', index: 'projectCode', width: '120px' },
    { title: '建设单位', index: 'companyName', width: '120px' },
    { title: '工程类型', index: 'flowTypeName', width: '100px' },
    { title: '当前环节', index: 'curNodeName', width: '100px' },
    // { title: '节点审核人', index: 'cur_NodeAuditorName', width: '120px' },
    // { title: '是否超时', index: 'isExpire',width:'120px'  },
    {
      title: '是否超时', index: 'isExpire', width: '60px', type: 'tag', tag: {
        true: { text: '是', color: 'red' },
        false: { text: '否', color: 'green' },
      }
    },
    {
      title: '状态', index: 'acceptStatus', width: '40px', type: 'tag', tag: {
        0: { text: '未处理', color: '' },
        1: { text: '受理中', color: 'blue' },
        2: { text: '不受理', color: 'rgb(219, 56, 6)' },
        3: { text: '不合格', color: 'red' },
        4: { text: '合格', color: 'green' },
        5: { text: '未抽中', color: 'orange' },
      }
    },
    { title: '申报时间', type: 'date', index: 'applyTime', width: '80px' },
    { title: '完成时间', type: 'date', index: 'endTime', width: '80px' },
  ];

  constructor(private http: _HttpClient,
    private modal: ModalHelper,
    private formBuilder: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private WorkMattersService: WorkMattersService,
  ) {
    this.getCityList();
  }

  ngOnInit() {
    this.resetTime();
    this.param.startApplyTime = dateTrans(this.rangeTime[0]) + " 00:00:00";
    this.param.endApplyTime = dateTrans(this.rangeTime[1]) + " 23:59:59";
    this.param.startTime = null;
    this.param.endTime = null;
    this.fliterForm = this.formBuilder.group({
      city: [null],
      count: [null],
      proNo: [null],
      proName: [null],
      proType: [null],
      buildname: [null],
      timetype: [null],
      dateRange: [this.rangeTime],
      sbdateRange: [null],
      status: [null],
    });
    this.GetHandlingMatters()
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
  resetForm(): void {
    this.param.page = 1;
    this.fliterForm = this.formBuilder.group({
      city: [null],
      count: [null],
      proNo: [null],
      proName: [null],
      proType: [null],
      buildname: [null],
      timetype: [null],
      dateRange: [this.rangeTime],
      sbdateRange: [null],
      status: [null],
      workName: [null],
      designName: [null],
      supervisorName: [null],
      detectionName: [null],
      drawName: [null],

    });
    if (this.fliterForm.controls.sbdateRange.value) {

      this.param.startTime = dateTrans(this.fliterForm.controls.sbdateRange.value[0]) + " 00:00:00";
      this.param.endTime = dateTrans(this.fliterForm.controls.sbdateRange.value[1]) + " 23:59:59";
    } else {
      this.param.startTime = null;
      this.param.endTime = null;
    }

    this.countyarray = [];
    this.search();
  }
  getCityList() {
    this.WorkMattersService.GetAreaDropdown().subscribe(
      res => {

        this.cityarray = JSON.parse(res.result).Children
      },
    );

  }
  GetHandlingMatters() {
    this.WorkMattersService.GetHandlingMatters(this.param).subscribe(
      res => {

        this.data = res.result.data;
        this.total = res.result.totalCount;
      },
    );

  }

  search() {
    this.param.page = 1;
    if (this.fliterForm.controls.city.value) {
      this.param.cityName = this.fliterForm.controls.city.value;
    } else {
      this.param.cityName = null
    }
    // if (this.fliterForm.controls.workName.value) {
    //   this.param.workName = this.fliterForm.controls.workName.value;
    // } else {
    //   this.param.workName = null
    // }
    // if (this.fliterForm.controls.designName.value) {
    //   this.param.designName = this.fliterForm.controls.designName.value;
    // } else {
    //   this.param.designName = null
    // }
    // if (this.fliterForm.controls.supervisorName.value) {
    //   this.param.supervisorName = this.fliterForm.controls.supervisorName.value;
    // } else {
    //   this.param.supervisorName = null
    // }
    // if (this.fliterForm.controls.detectionName.value) {
    //   this.param.detectionName = this.fliterForm.controls.detectionName.value;
    // } else {
    //   this.param.detectionName = null
    // }
    // if (this.fliterForm.controls.drawName.value) {
    //   this.param.drawName = this.fliterForm.controls.drawName.value;
    // } else {
    //   this.param.drawName = null
    // }
    if (this.fliterForm.controls.count.value) {
      this.param.regionAndCountyName = this.fliterForm.controls.count.value;
    } else {
      this.param.regionAndCountyName = null
    }
    if (this.fliterForm.controls.proName.value) {
      this.param.projectName = this.fliterForm.controls.proName.value;
    } else {
      this.param.projectName = null
    }
    if (this.fliterForm.controls.proType.value) {
      this.param.flowPathType = this.fliterForm.controls.proType.value;
    } else {
      this.param.flowPathType = null
    }

    if (this.fliterForm.controls.buildname.value) {
      this.param.companyName = this.fliterForm.controls.buildname.value;
    } else {
      this.param.companyName = null
    }
    if (this.fliterForm.controls.timetype.value) {
      this.param.isExpire = this.fliterForm.controls.timetype.value;
    } else {
      this.param.isExpire = null
    }
    if (this.fliterForm.controls.status.value) {
      this.param.status = this.fliterForm.controls.status.value;
    } else {
      this.param.status = null
    }
    // this.param.flowPathType = Number(this.fliterForm.controls.proType.value);
    //   if (this.param.flowPathType == 0) {
    //     this.param.flowPathType = -1;
    //   }

    if (this.fliterForm.controls.dateRange.value.length != 0) {

      this.param.startApplyTime = dateTrans(this.fliterForm.controls.dateRange.value[0]) + " 00:00:00";
      this.param.endApplyTime = dateTrans(this.fliterForm.controls.dateRange.value[1]) + " 23:59:59";
    } else {
      this.param.startApplyTime = '';
      this.param.endApplyTime = '';
    }
    if (this.fliterForm.controls.sbdateRange.value) {

      this.param.startTime = dateTrans(this.fliterForm.controls.sbdateRange.value[0]) + " 00:00:00";
      this.param.endTime = dateTrans(this.fliterForm.controls.sbdateRange.value[1]) + " 23:59:59";
    } else {
      this.param.startTime = null;
      this.param.endTime = null;
    }
    console.log(this.param)
    this.GetHandlingMatters();

  }

  resetTime() {
    var startTime = new Date();
    startTime.setDate(startTime.getDate() - 30)
    this.rangeTime = [startTime, new Date()];
  }
  cityChange(e) {
    this.fliterForm = this.formBuilder.group({
      city: [e],
      count: [null],
      proNo: this.fliterForm.controls.proNo.value,
      proName: this.fliterForm.controls.proName.value,
      proType: this.fliterForm.controls.proType.value,
      dateRange: [this.fliterForm.controls.dateRange.value],
      sbdateRange: [this.fliterForm.controls.sbdateRange.value],
      timetype: this.fliterForm.controls.timetype.value,
      buildname: this.fliterForm.controls.buildname.value,
      status: this.fliterForm.controls.status.value,

    });
    this.countyarray = []
    this.cityarray.forEach(element => {
      if (element.Name == e) {
        this.countyarray = element.Children
      }

    });

  }
  watchItem(item) {
    this.router.navigate([`/app/work-matters/alreadyDoneDetailsComponent/${item.flowNo}/${item.flowId}/${item.flowPathType}`]);
  }
  change(v) {
    if (this.param.page == v.pi) {
      return   //解决页面数据不能复制问题，因为change改变事件当点击的就会触发了所以当page不变的时候不执行方法
    }
    this.param.page = v.pi;
    this.GetHandlingMatters();
  }
  export() {
    this.param.page = 1;
    if (this.fliterForm.controls.city.value) {
      this.param.cityName = this.fliterForm.controls.city.value;
    } else {
      this.param.cityName = null
    }
    // if (this.fliterForm.controls.workName.value) {
    //   this.param.workName = this.fliterForm.controls.workName.value;
    // } else {
    //   this.param.workName = null
    // }
    // if (this.fliterForm.controls.designName.value) {
    //   this.param.designName = this.fliterForm.controls.designName.value;
    // } else {
    //   this.param.designName = null
    // }
    // if (this.fliterForm.controls.supervisorName.value) {
    //   this.param.supervisorName = this.fliterForm.controls.supervisorName.value;
    // } else {
    //   this.param.supervisorName = null
    // }
    // if (this.fliterForm.controls.detectionName.value) {
    //   this.param.detectionName = this.fliterForm.controls.detectionName.value;
    // } else {
    //   this.param.detectionName = null
    // }
    // if (this.fliterForm.controls.drawName.value) {
    //   this.param.drawName = this.fliterForm.controls.drawName.value;
    // } else {
    //   this.param.drawName = null
    // }
    if (this.fliterForm.controls.count.value) {
      this.param.regionAndCountyName = this.fliterForm.controls.count.value;
    } else {
      this.param.regionAndCountyName = null
    }
    if (this.fliterForm.controls.proName.value) {
      this.param.projectName = this.fliterForm.controls.proName.value;
    } else {
      this.param.projectName = null
    }
    if (this.fliterForm.controls.proType.value) {
      this.param.flowPathType = this.fliterForm.controls.proType.value;
    } else {
      this.param.flowPathType = null
    }

    if (this.fliterForm.controls.buildname.value) {
      this.param.companyName = this.fliterForm.controls.buildname.value;
    } else {
      this.param.companyName = null
    }
    if (this.fliterForm.controls.timetype.value) {
      this.param.isExpire = this.fliterForm.controls.timetype.value;
    } else {
      this.param.isExpire = null
    }
    if (this.fliterForm.controls.status.value) {
      this.param.status = this.fliterForm.controls.status.value;
    } else {
      this.param.status = null
    }
    if (this.fliterForm.controls.dateRange.value.length != 0) {

      this.param.startApplyTime = dateTrans(this.fliterForm.controls.dateRange.value[0]) + " 00:00:00";
      this.param.endApplyTime = dateTrans(this.fliterForm.controls.dateRange.value[1]) + " 23:59:59";
    } else {
      this.param.startApplyTime = '';
      this.param.endApplyTime = '';
    }
    if (this.fliterForm.controls.sbdateRange.value) {

      this.param.startTime = dateTrans(this.fliterForm.controls.sbdateRange.value[0]) + " 00:00:00";
      this.param.endTime = dateTrans(this.fliterForm.controls.sbdateRange.value[1]) + " 23:59:59";
    } else {
      this.param.startTime = null;
      this.param.endTime = null;
    }
    this.WorkMattersService.ExportHandlingMatters(this.param).subscribe(
      res => {
        this.url = res.result;
        window.open(this.url)

      },
    );



  }

}

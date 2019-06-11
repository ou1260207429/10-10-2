import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STPage, STComponent } from '@delon/abc';
import { publicPageConfig, pageOnChange } from 'infrastructure/expression';
import { Router } from '@angular/router';
import { EventEmiter } from 'infrastructure/eventEmiter';
import { FormBuilder, FormGroup} from '@angular/forms';

import { PoliciesAndRegulationsServices } from './../../../../services/policies-and-regulations.services';
@Component({
  selector: 'app-policies-and-regulations',
  templateUrl: './policies-and-regulations.component.html',
  styles: []
})
export class PoliciesAndRegulationsComponent implements OnInit {
  validateForm: FormGroup;
  @ViewChild('treeCom') treeCom;
  @ViewChild('st') st: STComponent;
  flowAddType: any = {
    type: '',
    name: ''
  };
  nodes = [{
    title: '全部',
    key: '',
    icon: 'folder-open',
    isLeaf: true
  }];

  chooseAuditors;
allDate=[]
  params={
    sort:"",
    isAsc:false,
    orderby:"",
    totalCount:20,
    title:null,
    startTime:null,
    endTime:null,
  };
  data
  columns: STColumn[] = [
    { title: '法规编号', index: 'regulationCode' },
    { title: '法规类型', index: 'regulationTypeId' },
    { title: '标题名称', index: 'title' },
    { title: '颁布机关', index: 'issueOrg' },
    {
      title: '发布时间', index: 'creationTime', type: 'date'
    },
    { title: '生效日期', index: 'issueDate', type: 'date' },
    {
      title: '内容存放路径', index: 'contentUrl'
    },
    {
      title: '最近修改时间', index: 'lastUpdateTime', type: 'date' 
    },
    {
      title: '最近操作人账号', index: 'lastUpdateUserCode'
    },
    {
      title: '最近操作人名字', index: 'lastUpdateUserName'
    },
    {
      title: '浏览量', index: 'visitCount'
    },
    {
      title: '删除人id', index: '删除人id'
    },
    
    {
      title: '操作', className: 'text-center', buttons: [
        {
          text: '<font class="stButton">详情</font>', click: (record: any) => {
            this.router.navigate([`/app/content-manage/policiesAndRegulationsDetailsComponent/${record.id}`，,{ queryParams: { operate: "详情" } }]);
          }
        },
        {
          text: '<font class="stButton">编辑</font>', click: (record: any) => {
            this.router.navigate([`/app/content-manage/policiesAndRegulationsDetailsComponent/${record.id}`]);
          }
        },
      ]
    }
  ];


  pageConfig: STPage = publicPageConfig;
  constructor(private fb: FormBuilder,private router: Router ,private _policiesAndRegulationsServices:PoliciesAndRegulationsServices , private eventEmiter: EventEmiter) {
  }

  ngOnInit() {
    let _self = this;
    this.validateForm = this.fb.group({
      title: [null],
      allDate: [[]]
    });
   this.init();

    // this.eventEmiter.on('init', () => {
    //   _self.init();
    // });

    // this.eventEmiter.on('flowadd', () => {
    //   _self.init();
    // });
  }

  /**
   * 初始化
   */
  init() {
    let params={
      sort:"",
      isAsc:false,
      orderby:"",
      totalCount:20,
      title:this.validateForm.value.title,
      startTime:this.validateForm.value.allDate.length>0?this.validateForm.value.allDate[0]:null,
      endTime:this.validateForm.value.allDate.length>0?this.validateForm.value.allDate[1]:null,
    };
    //let params = this.validateForm.value
   this.workFlow_NodeAuditorRecords(params);
  }

  /**
   * 回车
   */
  onEnter(v) {
    if (v.which === 13) {
      this.query();
    }
  }

  /**
   * 获取列表 
   */
  workFlow_NodeAuditorRecords(params?: any) {
   this.data = '';
   console.log(params)
    this._policiesAndRegulationsServices.get_PoliciesAndRegulations(params).subscribe(data => {
      this.data = data.result;
      console.log(this.data)
    })
    // this._regulationService.getRegulationListAsync()
  }

  /**
   * 点击查询
   */
  query() {
    this.params.page = 1;
    this.workFlow_NodeAuditorRecords(this.params);
  }

  change(v) {
    pageOnChange(v, this.params, () => {
      this.workFlow_NodeAuditorRecords(this.params);
    })
  }

}

import { Component, OnInit,ViewChild } from '@angular/core';
import { STColumn, STPage, STComponent } from '@delon/abc';
import { publicPageConfig } from 'infrastructure/expression';

@Component({
  selector: 'app-announcement-information',
  templateUrl: './announcement-information.component.html',
  styleUrls: ['./announcement-information.less']
})
export class AnnouncementInformationComponent implements OnInit {
  @ViewChild('treeCom') treeCom;
  @ViewChild('st') st: STComponent;



  data:any;
  constructor() { }
  currentIndex = 0;
  navList = [
    {
      type: 'index',
      name: '消防设计审查',
    },
    {
      path: '/form-download',
      name: '消防验收',
    },
    {
      path: '/laws-and-regulations',
      name: '竣工验收消防备案',
    },
  ];
  columns: STColumn[] = [
    { title: '表名', index: 'attachmentName' },
    { title: '创建时间', index: 'creationTime', type: 'date' },
    // { title: '最近操作时间', index: 'lastUpdateTime', type: 'date' },
    { title: '最近操作人账号', index: 'lastUpdateUserCode' },
    { title: '最近操作人姓名', index: 'lastUpdateUserName' },
    {
      title: '访问量', index: 'visitCount'
    },

    {
      title: '操作', className: 'text-center', buttons: [
        {
          text: '<font class="stButton">删除</font>', click: (record: any) => {
            this._publicModel.isDeleteModal(()=>{
              this._attachmentServiceProxy.deleteAttachmentById(record.id).subscribe(data => {
                this.init();
              })
            });
          }
        }
      ]
    }
  ];
  pageConfig: STPage = publicPageConfig;

  ngOnInit(): void { }

  init() { }


  /**
   * 跳转进表单列表页
   */
  goFromList() {
    // this.router.navigate(item.path);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { RegulationServiceProxy, NoticeServiceProxy } from '@shared/service-proxies/service-proxies';
import { timeTrans } from 'infrastructure/regular-expression';
import { NzMessageService, UploadFile, UploadFilter } from 'ng-zorro-antd';
import { EventEmiter } from 'infrastructure/eventEmiter';
import { UploadFileModel, PublicServices } from 'services/public.services';
@Component({
  selector: 'app-handling-guid-detail',
  templateUrl: './handling-guid-detail.component.html',
  styleUrls: ['./handling-guid-detail.less']
})
export class HandlingGuidDetailComponent implements OnInit {
  fileList: UploadFile[] = [];
  uploading = false;
  // acceptType: ".doc,.docx,.xls,.xlsx,.pdf"
  acceptType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  uploadUrl = "http://demo.rjtx.net:5001/api/Upload/Upload"
  files = []
  sourceId: string
  filters: UploadFilter[] = [
    {
      name: 'type',
      fn: (fileList: UploadFile[]) => {
        const filterFiles = fileList.filter(w => ~['application/vnd.openxmlformats-officedocument.wordprocessingml.document'].indexOf(w.type));
        if (filterFiles.length !== fileList.length) {
          this.message.error("上传文件格式不正确，请选择.doc文件");
          return filterFiles;
        }
        return fileList;
      }
    },
  ];
  operate
  //0是新增  1是查看 2是编辑
  type
  id

  //表单对象
  data: any = {

  };
  RegulationType: any
  constructor(private _publicServices: PublicServices,private _eventEmiter: EventEmiter, private message: NzMessageService, private _noticeServiceProxy: NoticeServiceProxy, private _regulationServiceProxy: RegulationServiceProxy, private _activatedRoute: ActivatedRoute) {
    this.id = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));
    this.operate = parseInt(this._activatedRoute.snapshot.paramMap.get('operate'));
    this.initType()
  }
  ngOnInit() {
    this.init()
  }
  init() {
    // this.data = new NoticeDto();

    if (this.operate == 0) {
    } else {
      this.getRegulationDetailsByIdAsync()
    }

  }
  goBack() {
    history.go(-1);
  }
  /**
   * 获取类型
   */
  initType() {
    this._regulationServiceProxy.getDropdownTypeByEnumType("NoticeType").subscribe((data: any) => {
      this.RegulationType = data
    })
  }

  /**
   * 获取详情
   */
  getRegulationDetailsByIdAsync() {
    this._noticeServiceProxy.noticeDetailsByIdAsync(this.id).subscribe((data: any) => {
      // this.RegulationType.forEach(element => {
      //   if (element.value == data.noticeType) {
      //     data.noticeType = element.key
      //   }
      // });
      //  / this.data = data;
      this.data = {
        id: data.id,
        content: data.content,
        guid: data.guid,
        noticeTypeId: data.noticeTypeId,
        title: data.title,
      }
      console.log(this.data)
    })
  }

  /**
   * 删除对象多余的属性
   * @param data 对象
   * @param arr 删除的属性数组
   */
  deleteSum(data: any, arr: Array<any>) {
    arr.forEach(item => {
      delete data[item]
    })
  }

  /**
   * 提交
   */
  save() {
    if (this.operate == 0) {
      this.data.guid = this.createguid();
      this.data.noticeId = 0;
    } else {
      this.data.noticeId = this.id;
    }
    console.log(this.data)

    const src = this.operate == 0 ? this._noticeServiceProxy.addNoticeAsync(this.data) : this._noticeServiceProxy.editNoticeAsync(this.data)
    src.subscribe(data => {
      const name = this.operate == 0 ? '新增成功' : '修改成功';
      this.message.success(name);
      this._eventEmiter.emit('init', []);
      this.goBack()
    })
  }

  createguid() {
    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    var chars = CHARS,
      uuid = [],
      i
    // rfc4122, version 4 form
    var r
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
      }
    }

    var ret = uuid.join('')
    console.log(ret);
    return ret
  }
   /**
   * 上传文件
   */
  uploadFiles() {
    let uploadFileModel: UploadFileModel = {
      files: this.fileList,
      sourceId: this.data.guid(),
      AppId: "9F947774-8CB4-4504-B441-2B9AAEEAF450",
      module: "table"
    }
    this._publicServices.upload(uploadFileModel).subscribe(data => {
      console.log(data)
    })
  }
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    console.log(file)
    console.log(this.fileList)

    return false;
  };
  removeFile = (file: UploadFile): boolean => {
    this.fileList = [];
    return true;
  }
}

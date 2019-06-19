import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegulationServiceProxy } from '@shared/service-proxies/service-proxies';
import { PublicModel } from 'infrastructure/public-model';
import { timeTrans } from 'infrastructure/regular-expression';
import { NzMessageService, UploadFile, UploadFilter } from 'ng-zorro-antd';
import { EventEmiter } from 'infrastructure/eventEmiter';
import { UploadFileModel, PublicServices } from 'services/public.services';
@Component({
  selector: 'app-policies-and-regulations-details',
  templateUrl: './policies-and-regulations-details.component.html',
  styleUrls: ['./policies-and-regulations-details.component.less']
})
export class PoliciesAndRegulationsDetailsComponent implements OnInit {

  operate
  //0是新增  1是查看 2是编辑
  type
  id
  // title: null
  // issueOrg: ""
  // regulationTypeId: ""
  // curNodeName: ""
  // creationTime: ""

  // regulationCode: "string"
  // regulationType: "string"
  // issueDate: "2019-06-11T10:50:10.649Z"
  // content: "string"
  // attachmentList: [
  //   {
  //     attachmentId: 0,
  //     relationID: 0,
  //     attachmentName: "string",
  //     category: 0,
  //     fileUrl: "string"
  //   }
  // ]
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

  //表单对象
  data: any = {
    title: '',
    issueOrg: '',
    regulationTypeId: '',
    issueDate: '',
    content: '',
  };
  RegulationType: any
  constructor(private _publicServices: PublicServices, private _eventEmiter: EventEmiter, private message: NzMessageService, private _regulationServiceProxy: RegulationServiceProxy, private _activatedRoute: ActivatedRoute) {
    this.id = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));
    this.operate = parseInt(this._activatedRoute.snapshot.paramMap.get('operate'));
    this.initType();

  }
  ngOnInit() {
    this.init()
  }
  init() {
    // this.data = new RegulationDto();

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
    this._regulationServiceProxy.getDropdownTypeByEnumType("RegulationType").subscribe((data: any) => {
      this.RegulationType = data
    })
  }

  /**
   * 获取详情
   */
  getRegulationDetailsByIdAsync() {
    this._regulationServiceProxy.getRegulationDetailsByIdAsync(this.id).subscribe((data: any) => {

      // this.data.issueDate = timeTrans(Date.parse(this.data.issueDate) / 1000, 'yyyy-MM-dd HH:mm:ss', '-');
      // this.RegulationType.forEach(element => {
      //   if (element.value == data.regulationType) {
      //     data.regulationType = element.key
      //   }
      // });
      this.data = data
      this.data.regulationId = this.id;
      this.data = {
        id: data.id,
        content: data.content,
        guid: data.guid,
        issueDate: timeTrans(Date.parse(this.data.issueDate) / 1000, 'yyyy-MM-dd HH:mm:ss', '-'),
        issueOrg: data.issueOrg,
        regulationCode: data.regulationCode,
        regulationTypeId: data.regulationTypeId,
        title: data.title,
      }
      // this.deleteSum(this.data, ['contentUrl', 'creationTime', 'id', 'lastUpdateUserName', 'visitCount','lastUpdateTime','lastUpdateUserCode']);
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
    } else {
      this.data.regulationId = this.id;
    }
    this.uploadFiles(this.data.guid);
    this.data.issueDate = new Date(timeTrans(Date.parse(this.data.issueDate) / 1000, 'yyyy-MM-dd HH:mm:ss', '-'))
    const src = this.operate == 0 ? this._regulationServiceProxy.addRegulationAsync(this.data) : this._regulationServiceProxy.editRegulationAsync(this.data)
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
  uploadFiles(guid) {
    let params = {
      sourceId: guid,
      AppId: "9F947774-8CB4-4504-B441-2B9AAEEAF450",
      module: "table",
    }

    this.fileList.forEach((file: any) => {
      const formData = new FormData();
      formData.append('files', file);
      this._publicServices.newUpload(formData, params).subscribe(data => {
        console.log(data)
      })
    });
  }
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    console.log(file)
    console.log(this.fileList)

    return false;
  };
  removeFile = (file: UploadFile): boolean => {
    this.fileList.forEach((item, index) => {
      if (item.uid == file.uid) {
        this.fileList.splice(index, 1);
      }
    });
    return true;
  }
}

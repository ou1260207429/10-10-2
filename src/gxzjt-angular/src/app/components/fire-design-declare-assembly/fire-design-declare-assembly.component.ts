import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ArchitectureTypeEnum, OptionsEnum, RefractoryEnum } from 'infrastructure/expression';
import { objDeleteType, genID } from 'infrastructure/regular-expression';
import { PublicModel } from 'infrastructure/public-model';
import { UploadFile } from 'ng-zorro-antd';
import { PublicServices, UploadFileModel } from 'services/public.services';

/**
 * 消防设计的表单模块
 */
@Component({
  selector: 'app-fire-design-declare-assembly',
  templateUrl: './fire-design-declare-assembly.component.html',
  styles: []
})
export class FireDesignDeclareAssemblyComponent implements OnInit {

  //判断是新增或者办理  0是新增 1是办理
  @Input() type: number = 0

  @Input() data: any

  //市县区
  position = OptionsEnum

  //结构类型
  typeSelect = ArchitectureTypeEnum

  //耐火结构
  refractoryEnum = RefractoryEnum

  //获取表单对象
  @ViewChild('f') f: FormGroup;

  //向父组件发送数据
  @Output() private childOuter = new EventEmitter();

  //判断上传的焦点
  uoloadIndex: number = -1;

  arr = [
    {
      type:0,
      imgList:[
        {name:'图片名字',uid:''}
      ]
    },
    {
      type:1,
      imgList:[
        
      ]
    },
    {
      type:2,
      imgList:[
        
      ]
    }
  ]
  constructor(public _publicServices: PublicServices, public publicModel: PublicModel, ) { }

  ngOnInit() {
    //向父组件发送数据   把表单对象传过去
    this.childOuter.emit(this.f);
  }



  /**
   * 选择市县区
   * @param v 
   */
  changeCitycountyAndDistrict(v) {
    this.data.engineeringCitycountyAndDistrict = v;
  }

  /**
   * 添加数组
   * @param arr 数组
   */
  addArray(arr) {
    arr.push(objDeleteType(arr[0]))
  }

  /**
   * 删除数组
   */
  deleteArray(arr, index) {
    this.publicModel.engineeringDeleteArray(arr, index)
  }

  fileList: UploadFile[] = [];
  /**
   * 上传文件之前的钩子
   */
  beforeUpload = (file: UploadFile): boolean => {
    console.log(file);

    const arr: UploadFileModel = {
      files: [file],
      AppId: '9F947774-8CB4-4504-B441-2B9AAEEAF450',
      module: 'xfsj'
    }


    // console.log(genID(1).length);
    // console.log(arr);
    // return false;
    this._publicServices.upload(arr).subscribe(data => {
      // if (data.uploadAttachments.length > 0) {

      // } else {
      //   // this.data.push({
      //   //   type: this.uoloadIndex,
      //   //   imgList: [{}]
      //   // })
      // }
      // this.data.push({
      //   type:this.uoloadIndex,
      // })
      console.log(data);
    })
    // this.fileList = this.fileList.concat(file);
    return false;
  };

  handleChange(index) {
    this.uoloadIndex = index
  }

}

import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ArchitectureTypeEnum, OptionsEnum, RefractoryEnum } from 'infrastructure/expression';
import { objDeleteType } from 'infrastructure/regular-expression';
import { PublicModel } from 'infrastructure/public-model';

/**
 * 消防验收的表单模块
 */
@Component({
  selector: 'app-fire-acceptance-assembly',
  templateUrl: './fire-acceptance-assembly.component.html',
  styles: []
})
export class FireAcceptanceAssemblyComponent implements OnInit {

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
  constructor(public publicModel: PublicModel, ) { }

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

}

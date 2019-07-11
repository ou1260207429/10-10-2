import { Injectable } from "@angular/core";
import { MessageService } from "abp-ng2-module/dist/src/message/message.service";
import { NzMessageService } from "ng-zorro-antd";
import { STColumn, XlsxService } from "@delon/abc";
import { checkArrayString } from "./regular-expression";

/**
 * 通用的方法
 */
@Injectable()
export class PublicModel {

  positionIndex = 0;

  constructor(private xlsx: XlsxService,private message: MessageService, private nzMessage: NzMessageService, ) { }
  isDeleteModal(then?: Function) {
    this.message.confirm(
      '是否确认删除',
      '温馨提示',
      (result: boolean) => {
        if (result) {
          if (then) then();
        }
      },
    );
  }

  /**
   * 删除数组
   * @param arr 数组
   * @param index 下标
   */
  engineeringDeleteArray(arr: Array<any>, index: number) {
    if (arr.length == 1) {
      this.nzMessage.error('不允许删除完，必须保留一个')
      return false
    }
    arr.splice(index, 1)
  }

  /**
   * 市县区获取当前选中的值
   * @param arr 市县区的列表
   * @param positionValue 选中的值 ：数组
   * @param list 返回的值
   */
  positionTreeArray(arr: Array<any>,arrType:string, positionValue: Array<any>, list: Array<any>): Array<any> { 
    for (let index = 0; index < positionValue.length; index++) { 
      this.positionIndex = checkArrayString(arr, arrType, positionValue[index]) 
      list.push({label:arr[this.positionIndex].label,value:arr[this.positionIndex].value,id:arr[this.positionIndex].ID})
      if (arr[this.positionIndex].children && arr[this.positionIndex].children.length > 0) {
        positionValue.splice(index, 1)
        this.positionTreeArray(arr[this.positionIndex].children,arrType, positionValue, list)   
        break
      }
    } 
    return list;
  }

  exportXlsx(columns:STColumn[],array:Array<any>,filename:string='表单') {
    const expData = [columns.map(i => i.title)];

    array.forEach((item,index)=>{
      const list = [];
      columns.forEach((box,i)=>{
        const value = box.index?item[box.index.toString()]:''
        list.push(value)
      })
      expData.push(list)
    })

    this.xlsx.export({
      sheets: [
        {
          data: expData,
          name: 'sheet name',
        },
      ],
      filename:filename,
    });
  }

  isAddModal(then?: Function) {
    this.message.confirm(
      '是否确认添加',
      '温馨提示',
      (result: boolean) => {
        if (result) {
          if (then) then();
        }
      },
    );
  }

}

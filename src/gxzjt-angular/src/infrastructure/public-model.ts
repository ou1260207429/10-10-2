import { Injectable } from "@angular/core";
import { MessageService } from "abp-ng2-module/dist/src/message/message.service";
import { NzMessageService } from "ng-zorro-antd";
import { STColumn, XlsxService } from "@delon/abc";

/**
 * 通用的方法
 */
@Injectable()
export class PublicModel {
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


}
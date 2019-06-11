import { Injectable } from "@angular/core";
import { MessageService } from "abp-ng2-module/dist/src/message/message.service";

/**
 * 通用的方法
 */
@Injectable()
export class PublicModel {
  constructor(private message: MessageService) { }
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


}
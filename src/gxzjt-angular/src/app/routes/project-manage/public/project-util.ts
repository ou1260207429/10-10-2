import { debug } from "util";

/**
 * 用于循环表单项目的验证
 * @param form 表单对象
 * @param controlName  控制器名称
 * @param index  索引
 */
export function getForsItemFormStatus(form: any, controlName: String, index) {

    var control = form.get(controlName + index);
    if (!control) {
        return true;
    }
    return control.dirty && control.errors;
}


/**
 * 初始化表单 状态
 * @param form 
 */
export function resetFormControlStatus(controls: any) {

    setTimeout(() => {
        var keys = Object.keys(controls);
        keys.forEach(key => {

            // this.validateForm.controls[key].setErrors([{ "require": false }], { emitEvent: true });
            controls[key].markAsDirty({ onlySelf: true });
            // this.validateForm.controls[key].updateValueAndValidity({ onlySelf: true, emitEvent: true });
        });

    }, 20);


}




export function addEmptyElement(list) {
    if (list && list instanceof Array) {
        list.push({});
    }

}


export function removeListElement(list, i) {

    if (list && list instanceof Array) {
        list.splice(i, 1);
    }

}

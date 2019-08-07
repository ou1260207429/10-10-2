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
    console.log(controls)
    controls.forEach(key => {
        console.log(controls[key])
        controls[key].dirty(true);
        controls[key].errors(true);
    });
    // if (form.controls != null) {
    // for (var i = 0; i < form.controls.length; ++i) {
    //     form.controls[i].dirty = true;
    //     form.controls[i].errors = true;
    // }  Object.keys(obj).forEach(function (key) {

    // for (var item in form.controls) {
    //     console.log(form.controls[item])
    //     form.controls[item].dirty = true;
    //     form.controls[item].errors = true;
    // }
    // }

}

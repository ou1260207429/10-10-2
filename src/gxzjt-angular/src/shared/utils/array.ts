//兼容性转化
export function convertToArray(src): any {
    if (src instanceof Array) {
        return src;
    }

    var arr = [];
    arr.push(src);
    return arr;

}


/**
 * 根据文件名检索
 */
export function indexOfFileByName(arr: any, fileName): any {
    if (arr instanceof Array) {
        for (var i = arr.length - 1; i >= 0; --i) {
            var item = arr[i];
            if (item.name && item.name == fileName) {
                return item;
            }
        }
    }

    return null;
}

//兼容性转化
export function convertToArray(src): any {
    if (!(src instanceof Array)) {
        var arr = [];
        arr.push(src);
        return arr;
    }
    return src;
}

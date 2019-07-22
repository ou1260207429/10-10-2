//兼容性转化
export function convertToArray(src): any {
    if (!(src instanceof Array)) {
        var arr = [];
        arr.push(src);
        return arr;
    }
    return src;
}



// export function indexOfFile<File>(arr:[],item:File): any {
//     for(var i=arr.length;i>=0;--i){
//         if(arr.lastIndexOf){

//         }
//     }
//     return src;
// }

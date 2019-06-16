
export function isPhone(res: any): Boolean {
    var reg = /^1[3456789]\d{9}$/;
    return reg.test(res);
}

export function isIdcard(res): Boolean {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(res);
}
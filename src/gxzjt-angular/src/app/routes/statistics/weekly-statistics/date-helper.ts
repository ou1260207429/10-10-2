export class DateHelper {

    // 获取日期字符串2019-08-01
    public static getDateStrByH(datetime) {
        var dateStr = null;
        if (datetime != null) {
            var y = datetime.getFullYear();
            var m = datetime.getMonth() + 1;
            if (m < 10) {
                m = "0" + m;
            }
            var d = datetime.getDate()
            if (d < 10) {
                d = "0" + d;
            }

            dateStr = y + "-" + m + "-" + d;
        }
        return dateStr;
    }

    // 获取日期字符串2019/08/01
    public static getDateStrByV(datetime) {
        var dateStr = null;
        if (datetime != null) {
            var y = datetime.getFullYear();
            var m = datetime.getMonth() + 1;
            if (m < 10) {
                m = "0" + m;
            }
            var d = datetime.getDate()
            if (d < 10) {
                d = "0" + d;
            }

            dateStr = y + "/" + m + "/" + d;
        }
        return dateStr;
    }

    // 获取日期字符串2019年08月01
    public static getDateStrByZn(datetime) {
        var dateStr = null;
        if (datetime != null) {
            var y = datetime.getFullYear();
            var m = datetime.getMonth() + 1;
            if (m < 10) {
                m = "0" + m;
            }
            var d = datetime.getDate()
            if (d < 10) {
                d = "0" + d;
            }

            dateStr = y + "年" + m + "月" + d+"日";
        }
        return dateStr;
    }

    // 字符串2019/08/01 23:02:56转时间
    public static getDateTimeByStrV(datetimeStr: string) {
        var str = datetimeStr.split(' ');
        var dateStrArray = str[0].split('/');
        var y = +dateStrArray[0];
        var month = +dateStrArray[1];
        month = month - 1;
        var d = +dateStrArray[2];

        var timeStrArray = str[1].split(':');
        var h = +timeStrArray[0];
        var m = +timeStrArray[1];
        var s = +timeStrArray[2];

        var date = new Date(y, month, d, h, m, s)
        return date;
    }

    //获取当前日期的周一
    public static getMondayByCurDate(datetime) {
        var weekDay = datetime.getDay();
        if (weekDay == 0) {
            weekDay = 7;
        }

        var d = 1 - weekDay;
        var monday = DateHelper.addDate(datetime, d);
        return monday;

    }

    //获取当前日期的周日
    public static getSundayByCurDate(datetime) {
        var weekDay = datetime.getDay();
        if (weekDay == 0) {
            weekDay = 7;
        }

        var d = 7 - weekDay;
        var sunday = DateHelper.addDate(datetime, d);
        return sunday;
    }

    //日期加减
    public static addDate(date: Date, days) {
        if (days == null || days == '' || days == 0) {
            return date;
        }

        var dateStr = date.toString();
        var dateInt = Date.parse(dateStr);
        var d = new Date(dateInt);// JSON.parse(dateStr);
        d.setDate(d.getDate() + days);
        return d;
    }
}
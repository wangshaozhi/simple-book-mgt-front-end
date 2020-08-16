export default {
    //获取多长时间之前
    getDateDiff(dateTimeStamp) {
        let minute = 1000 * 60,
            hour = minute * 60,
            day = hour * 24,
            week = 7 * day,
            month = day * 30,
            year = month * 12,
            now_second = new Date().getTime();
        //时间差
        let timeDiff = now_second - dateTimeStamp;
        //如果传入的参数比现在的时间还要大，说明是未来
        if (timeDiff < 0) {
            return;
        } else if (timeDiff >= 0 && timeDiff < minute) {
            return `刚刚`;
        }
        let minute_diff = parseInt(timeDiff / minute),
            hour_diff = parseInt(timeDiff / hour),
            day_diff = parseInt(timeDiff / day),
            week_diff = parseInt(timeDiff / week),
            month_diff = parseInt(timeDiff / month),
            year_diff = Math.floor(timeDiff / year),
            result_date = '';
        // console.log(timeDiff) //时间差 2468596092 一周的时间戳 604800000 一个月的时间戳 2592000000
        if (year_diff < 100 && year_diff > 0) {
            return `${year_diff}年前`;
        }
        else {
            if (month_diff > 0 && month_diff < 12) {
                result_date = `${month_diff}个月前`;
            } else if (week_diff > 0 && week_diff <=4) {
                result_date = `${week_diff}周前`;
            } else if (day_diff > 0 && day_diff <= 7) {
                result_date = `${++day_diff}天前`;
            } else if (hour_diff > 0 && hour_diff <= 24) {
                result_date = `${hour_diff}小时前`;
            } else if (minute_diff > 0 && minute_diff <= 60) {
                result_date = `${minute_diff}分钟前`;
            }
        }
        return result_date;
    },
    addZero(val) {
        return val < 10 ? '0' + val : val;
    },
    /**
     * 将时间戳格式化为标准时间
     * @param {*} timestamp 时间戳
     */
    formatStandard(timestamp) {
        let date = new Date(timestamp)
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        var second = date.getSeconds();
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    },
}
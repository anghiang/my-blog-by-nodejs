function makeDate(data, i, time) {

    try {
        let Etime;
        if (time == "release_time") {
            Etime = data[i].release_time
        } else if (time == "update_time") {
            Etime = data[i].update_time
        } else if (time == "register_time") {
            Etime = data[i].register_time
        } else if (time == "lastLogin_time") {
            Etime = data[i].lastLogin_time
        }
        var newDate = new Date(Etime);

        //在小于10的月份前补0

        var month = eval(newDate.getMonth() + 1) < 10 ? '0' + eval(newDate.getMonth() + 1) : eval(newDate.getMonth() + 1);

        //在小于10的日期前补0

        var day = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();

        //在小于10的小时前补0

        var hours = newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours();

        //在小于10的分钟前补0

        var minutes = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes();

        //在小于10的秒数前补0

        var seconds = newDate.getSeconds() < 10 ? '0' + newDate.getSeconds() : newDate.getSeconds();

        //拼接时间

        var stringDate = newDate.getFullYear() + '-' + month + '-' + day + " " + hours + ":" + minutes + ":" + seconds;

    } catch (e) {
        var stringDate = "0000-00-00 00:00:00";

    } finally {
        if (time == "release_time") {
            data[i].release_time = stringDate
        } else if (time == "update_time") {
            data[i].update_time = stringDate
        } else if (time == "register_time") {
            data[i].register_time = stringDate
        } else if (time == "lastLogin_time") {
            data[i].lastLogin_time = stringDate
        }

    }

};
exports.timeFormat = (data, time) => {
    for (let i = 0; i < data.length; i++) {
        makeDate(data, i, time)
    }

}

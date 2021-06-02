var express = require('express');
let formidable = require('formidable');
let userOper = require('../Dao/userOper')
const path = require('path')
var router = express.Router();
let fs = require('fs')

router.post('/', (req, res) => {
    let form = new formidable.IncomingForm();
    form.uploadDir = path.join("D:\\git文档\\git_blog\\public\\images\\upload_img")
    form.keepExtensions = true;//保存扩展名
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.status(err.status || 500);
            return
        }
        var t = (new Date()).getTime();

        // 生成随机数
        var ran = parseInt(Math.random() * 8999 + 10000);
        //拿到扩展名
        var extname = path.extname(files.file0.name);

        //path.normalize('./path//upload/data/../file/./123.jpg'); 规范格式文件名
        var oldpath = path.normalize(files.file0.path);



        //新的路径
        let newfilename = t + ran + extname;
        var newpath = 'D:\\git文档\\git_blog\\public\\images\\upload_img\\' + newfilename;
        console.warn('oldpath:' + oldpath + ' newpath:' + newpath);

        fs.rename(oldpath, newpath, function (err) {
            if (err) {
                console.error("改名失败" + err);
                res.status(500);
            } else {
                console.log(newfilename)
                userOper.updateImg(newfilename, res, req, (err) => {
                    if (err) {
                        throw err
                    }
                })

                res.status(200);
            }


        });
    })
})
module.exports = router;
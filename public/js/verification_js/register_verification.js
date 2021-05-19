$('form').on('submit', function (e) {
    let username = $('.username').val()
    let password = $('.password').val()
    let confirm_password = $('.confirm_password').val()
    let sex = $('.sex').val()
    let email = $('.email').val()
    e.preventDefault()
    let formData = $(this).serialize()
    let verification = new Promise((resolve, reject) => {
        let jduge = (username, password, confirm_password, sex, email) => {
            // 记录匹配次数，只有全部验证(总数等于4)通过才能提交
            let codeSum = 0;
            let usrRegexp = new RegExp("^[\u4E00-\u9FA5|\\d|\\w]{2,8}$")
            let passwordRegexp = new RegExp("^[\\d|\\w]{2,8}")
            let sexRegexp = new RegExp("男|女")
            let emailRegexp = new RegExp("^([0-9a-zA-Z_\.\-\u4e00-\u9fa5])+\@([0-9a-zA-Z_\.\-\])+\.([a-zA-Z]{2,8})$")
            // 匹配用户名
            if (username == "") {
                $('.metion_text').html('用户名不能为空！')
                $('.metion').css({
                    "top": "223px",
                    "left": "500px"
                }).show(300).delay(2000).hide(300)
                return codeSum
            } else if (usrRegexp.test("" + username + "")) {
                codeSum += 1
            } else {
                $('.metion_text').html('请输入2-8个数字，英文，或文字')
                $('.metion').css({
                    "top": "223px",
                    "left": "500px"
                }).show(300).delay(2000).hide(300)
                return codeSum
            }
            // 匹配密码
            if (password == "") {
                $('.metion_text').html('密码不能为空！')
                $('.metion').css({
                    "top": "292px",
                    "left": "500px"
                }).show(300).delay(2000).hide(300)
                return codeSum
            } else if (passwordRegexp.test("" + password + "")) {
                codeSum += 1
            } else {
                $('.metion_text').html('请输入2-8位的英文或数字密码！')
                $('.metion').css({
                    "top": "292px",
                    "left": "500px"
                }).show(300).delay(2000).hide(300)
                return codeSum
            }
            if (confirm_password == "") {
                $('.metion_text').html('请再次输入密码！')
                $('.metion').css({
                    "top": "361px",
                    "left": "500px"
                }).show(300).delay(2000).hide(300)
                return codeSum
            } else if (passwordRegexp.test("" + confirm_password + "")) {
                codeSum += 1
            } else {
                $('.metion_text').html('请输入2-8位的英文或数字！')
                $('.metion').css({
                    "top": "361px",
                    "left": "500px"
                }).show(300).delay(2000).hide(300)
                return codeSum
            }

            if (sex == "") {
                $('.metion_text').html('性别不能为空！')
                $('.metion').css({
                    "top": "431px",
                    "left": "500px"
                }).show(300).delay(2000).hide(300)
                return codeSum
            } else if (sexRegexp.test("" + sex + "")) {
                codeSum += 1
            } else {
                $('.metion_text').html('请注意选择或输入的性别！')
                $('.metion').css({
                    "top": "431px",
                    "left": "500px"
                }).show(300).delay(2000).hide(300)
                return codeSum
            }

            if (email == "") {
                $('.metion_text').html('邮箱不能为空！')
                $('.metion').css({
                    "top": "500px",
                    "left": "500px"
                }).show(300).delay(2000).hide(300)
                return codeSum
            } else if (emailRegexp.test("" + email + "")) {
                codeSum += 1
            } else {
                $('.metion_text').html('请输入正确的邮箱格式！')
                $('.metion').css({
                    "top": "500px",
                    "left": "500px"
                }).show(300).delay(2000).hide(300)
                return codeSum
            }
            return codeSum
        }
        resolve(jduge(username, password, confirm_password, sex, email))
    })
    verification.then((codeSum) => {
        if (codeSum == 5) {
            $.ajax({
                type: 'post',
                url: '/register',
                data: formData,
                dataType: 'json',
                success: function (data) {
                    if (data.err_code == '1') {
                        $('.metion_text').html('用户已注册！')
                        $('.metion').css({
                            "top": "189px",
                            "left": "790px"
                        }).show(300).delay(2000).hide(300)
                    }
                    if (data.err_code == '2') {
                        $('.metion_text').html('两次密码不一致！')
                        $('.metion').css({
                            "top": "292px",
                            "left": "790px"
                        }).show(300).delay(2000).hide(300)
                    }
                    if (data.err_code == '0') {
                        swal({
                            title: "注册成功",
                            text: "Here's my error message!",
                            type: "success"
                        }, function (ifConfirm) {
                            if (ifConfirm) {
                                window.location.href = '/'
                            }
                        });

                    }
                },
                error: function (err) {
                    console.log(err)
                }


            })
        }
    })

})
$('form').on('submit', function (e) {
    let username = $('.username').val()
    let password = $('.password').val()
    e.preventDefault()
    let formData = $(this).serialize()
    let verification = new Promise((resolve, reject) => {
        let jduge = (username, password) => {
            let codeSum = 0;
            let usrRegexp = new RegExp("^[\u4E00-\u9FA5|\\d|\\w]{2,8}$")
            let passwordRegexp = new RegExp("^[\\d|\\w]{2,8}$")
            if (username == "") {
                $('.metion_text').html('请输入用户名！')
                $('.metion').css({
                    "top": "249px",
                    "left": "500px"
                }).show(300).delay(2000).hide(300)
                return codeSum
            } else if (usrRegexp.test("" + username + "")) {
                codeSum += 1
            } else {
                $('.metion_text').html('请输入2-8个数字，英文，或文字')
                $('.metion').css({
                    "top": "249px",
                    "left": "500px"
                }).show(300).delay(2000).hide(300)
                return codeSum
            }
            // 匹配密码
            if (password == "") {
                $('.metion_text').html('密码不能为空！')
                $('.metion').css({
                    "top": "317px",
                    "left": "500px"
                }).show(300).delay(2000).hide(300)
                return codeSum
            } else if (passwordRegexp.test("" + password + "")) {
                codeSum += 1
            } else {
                $('.metion_text').html('请输入2-8位的英文或数字密码！')
                $('.metion').css({
                    "top": "317px",
                    "left": "500px"
                }).show(300).delay(2000).hide(300)
                return codeSum
            }
            return codeSum
        }
        resolve(jduge(username, password))
    })
    verification.then((codeSum) => {
        if (codeSum == 2) {
            $.ajax({
                type: 'post',
                url: '/',
                data: formData,
                dataType: 'json',
                success: function (data) {
                    if (data.err_code == '1') {
                        $('.metion_text').html('用户名或密码错误！')
                        $('.metion').css({
                            "top": "173px",
                            "left": "500px"
                        }).show(300).delay(2000).hide(300)
                    }
                    if (data.err_code == '0') {
                        swal({
                            title: "登入成功",
                            text: "Here's my error message!",
                            type: "success"
                        }, function (ifConfirm) {
                            if (ifConfirm) {
                                window.location.href = '/home'
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
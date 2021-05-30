exports.dataHandle = (data) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].user_id == null) {
            data[i].userName = "管理员"
        }
        if (data[i].head_portrait == null) {
            data[i].head_portrait = "/images/upload_img/01.png"
        }
        data[i].content = data[i].content.substring(0, 20) + "......"
    }
}
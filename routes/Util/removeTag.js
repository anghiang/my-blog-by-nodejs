exports.removeTag = (str) => {
    return str.replace(/<[^>]+>/g, "");
}

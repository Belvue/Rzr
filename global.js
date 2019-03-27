const resizeImg = require('resize-img');
const dataUriToBuffer = require('data-uri-to-buffer');
exports.resize = function (data) {
    return new Promise((resolve, reject) => {
        resizeImg(dataUriToBuffer(data.stream), {
            width: data.width,
            height: data.height
        }).then((buf) => {
            resolve(buf);
        }).catch((err) => {
            reject(err);
        })
    });
}
// https://www.jianshu.com/p/da32d38962e7
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const FORM = 'FORM';
const DELETE = 'DELETE';

// const baseURL = 'https://some-domain.com/api/';
function request(method, url, data) {
    return new Promise(function(resolve, reject) {
        let header = {
            'content-type': 'application/json',
        };
        wx.request({
            url: url,
            method: method,
            data: method === POST ? JSON.stringify(data) : data,
            header: header,
            success(res) {
                //请求成功
                //判断状态码---errCode状态根据后端定义来判断
                console.log(res)
                if (res.statusCode == 200) {
                    resolve(res);
                } else {
                    //其他异常
                    reject('运行时错误,请稍后再试');
                }
            },
            fail(err) {
                //请求失败
                reject(err);
            }
        })
    })
}

const TendxunAPI = {
  postrequest: (url, data) => request(POST, url, data),
};

module.exports = {
  TendxunAPI: TendxunAPI
}
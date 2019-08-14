const express = require('express');

let router = express.Router();

// http://127.0.0.1:5000/api/getData?name=qwe&age=18
router.get('/api/getData', (req, res) => {
    console.info(req.query);   // 普通方式获取url参数 => req.query
    res.send({
        name: req.query.name,
        age: req.query.age
    })
})

// http://127.0.0.1:5000/api/getData2/qwe/18
router.get('/api/getData2/:name/:age', (req, res) => {
    console.info(req.params)   // 使用占位符获取url参数 => req.params
    res.send({
        name: req.params.name,
        age: req.params.age
    })
})

// post方式 - body-parser 中间件使用
router.post('/api/post', (req, res) => {
    console.info(req.body)
    res.send({
        status: 1,
        data: '请求成功'
    })
})

// 导出路由
module.exports = router;
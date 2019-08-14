const express = require('express');
const path = require('path');
const template = require('art-template');
const bodyParser = require('body-parser');
const cors = require('cors');

let app = express();

// 注册跨域中间件
// app.use(cors())

// 注册 body-parse 中间件
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());   //解决 axios 请求时,后台获取不到 参数

// 手写拦截器(允许跨域)
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    // res.header("Content-Type", "application/json;charset=utf-8");  //会导致 art-template 引擎模板 显示源码
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

// 开启服务
app.listen(5000, () => {
    console.info('服务启动完毕');
})

// 静态资源托管
app.use(express.static(path.join(__dirname, "./views")))
app.use('/public', express.static(path.join(__dirname, "./public")))
app.use('/node_modules', express.static(path.join(__dirname, "./node_modules")))

// 重定向
app.get('/', (req, res) => {
    res.redirect('/home')
})

// art-template
app.get('/home', (req, res) => {
    let html = template(path.join(__dirname, "./views/home.html"), {
        name: 'qwe',
        age: 18
    })
    res.end(html)
})

// ejs
app.set("engine view", "ejs");
app.set("views", path.join(__dirname, './views'));

app.get('/about', (req, res) => {
    res.render("about.ejs", {
        name: 'asd',
        age: 20
    })
})

// 路由
app.use(require('./route'))
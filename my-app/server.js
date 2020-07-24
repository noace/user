const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const _ = require('lodash');

app.use(express.urlencoded({ extended: true }))
app.use( bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

let userList = [
    { id: 1, name: '周杰伦', sex: '男', age: 38 },
    { id: 2, name: '黄渤', sex: '男', age: 40},
    { id: 3, name: '张艺谋', sex: '男', age: 42},
    { id: 4, name: '金星', sex: '女', age: 53},
    { id: 5, name: '屠呦呦', sex: '女', age: 64,}
]

// 获取数据列表
app.get('/api/userList', (req, res) => {
    res.send({
        code: 10,
        data: userList,
        message: 'success'
    });
});

// 更新 ｜ 新增 | 删除数据
app.post('/api/user', (req, res) => {
    const { data } = req.body;
    // console.log(req.body, '=====req.body')
    if (!Array.isArray(data)) {
        if (!data.id) {
            data.id = userList.length + 1;
            userList.push(data);
        } else {
            userList.forEach(item => {
                if (item.id === data.id) {
                    item.name = data.name;
                    item.sex = data.sex;
                    item.age = data.age;
                }
            })
        }
    } else {
        userList = data;
    }

    res.send({
        code: 20,
        data: userList,
        message: 'success'
    });
});

app.post("/api/login", function (req, res) {
    
    const { name, pwd } = req.body;
    console.log(req.body);
    if (name === 'abc' && pwd === '123') {
        res.send({
            code: 20,
            data: '',
            message: '登录成功'
        });
    } else {
        res.send({
            code: 40,
            data: '',
            message: '用户名或密码错误'
        });
    }
});

app.listen(3001, () => console.log('listening on port 3001'));

const express = require('express');
const path = require('path');
const compression = require('compression') 
const routes = require('./routes');
const app = express();
const config = require('config')
// 设置环境
app.set('env', process.env.NODE_ENV);
app.locals.ENV_DEVELOPMENT = app.get('env') === 'development';
// 设置静态资源
app.use(express.static(path.join(__dirname), routes.sourcePath));

app.use(compression());

// 注册路由
// routes(app);
routes(app);

app.listen(config.server.port, function() {
    // logger.info(`Listening ${config.server.port}`)
    console.log(`Listening ${config.server.port}`)
})


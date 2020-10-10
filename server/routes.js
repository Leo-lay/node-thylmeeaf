const path = require('path');
const fs = require('fs')

module.exports = function(app) {
    const router = app;
    const sourcePath =  'E:\\workspace\\cas-server\\cas-server-app\\src\\main\\resources\\';

    // thymeleaf 配置
    const thymeleaf = require('thymeleaf');

    const thTemplate = thymeleaf.TemplateEngine;
    const StandarDialect = thymeleaf.StandardDialect;
    // 模板引擎
    const templateEngine = new thTemplate({
        dialects: [
            new StandarDialect('th')
        ]
    })

    function getThymeleafFile(filepath, params, handler) {
        let html = fs.readFileSync(path.join('', sourcePath, filepath), { 
            encoding: 'utf-8'
        });
        html = handler(html);
        return new Promise((resolve, reject)=> {
            templateEngine.process(html, params).then(result => {
                resolve(result)
            })
        })
    }

    router.get('/caslogin', function(req, res, next) {
        getThymeleafFile('templates\\userNamePsView.html', {
            name: 'thymeleaf',
        }, function(html){
            return html;
        }).then(result => {
            res.send(result)
        })
    })
}


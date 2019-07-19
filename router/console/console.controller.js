const Console = require('../../model/Console')
const sendRule = require('../../modules/send-rule')

module.exports.getData = function (req, res, next) {
    Console.find()
        .then(data => {
            sendRule.sendOK(res, data)
        })
        .catch(err => {
            if (err) next(err)
            sendRule.sendInternalServerError(res)
        })
}
module.exports.searchData = function (req, res, next) {
    Console.find()
        .then(data => {
            sendRule.sendOK(res, data.filter(x => x.title.indexOf(req.body.searchKeyword) != -1))
        })
        .catch(err => {
            if (err) next(err)
            sendRule.sendInternalServerError(res)
        })
}

module.exports.createConsole = function (req, res, next) {
    Console.findOne({ title: req.body.title }).then(data => {
        if (!data) {
            var newConsole = new Console(Console.filterData(req.body))
            newConsole.email = req.user.email
            newConsole.save(err => {
                if (err) next(err)
                sendRule.sendCreated(res, null, "콘솔 생성 성공")
            })
        }
        else {
            sendRule.sendBadRequest(res, null, "이미 있는 콘솔")
        }
    })

}
module.exports.changeConsole = function (req, res, next) {
    Console.findOne({ title: req.body.title })
        .then(data => {
            if (!data) {
                var newConsole = new Console(Console.filterData(req.body))
                newConsole.email = req.user.email
                newConsole.save(err => {
                    if (err) next(err)
                    sendRule.sendCreated(res, null, "콘솔 생성 성공")
                })
            }
            else if (data.email == req.user.email) {
                data.lastChange = new Date()
                var dataKey = Console.getConsoleStatusList()
                dataKey.forEach(x => {
                    if (req.body[x])
                        data[x] = req.body[x]
                })
                data.save(err => {
                    if (err) next(err)
                    sendRule.sendOK(res, null, "데이터 수정 성공")
                })
            } else {
                sendRule.sendUnauthorized(res)
            }
        })
}
const router = require('express').Router()

const passportJwtAuth = require('../../modules/passport-jwt-auth')()

const con = require('./console.controller')

// 로그인이 필요 없는 작업 또는 로그인 작업
router.get('/getData',con.getData)
router.post('/searchData/',con.searchData)

router.post('/createConsole', passportJwtAuth.authenticate(), con.createConsole)
router.post('/changeConsole', passportJwtAuth.authenticate(), con.changeConsole)

module.exports = router

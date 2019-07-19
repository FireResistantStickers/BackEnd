const router = require('express').Router()

const auth = require('./auth/auth.router')
const con = require('./console/console.router')

router.use('/auth', auth)
router.use('/console', con)

module.exports = router
// var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

const publicPath = path.join(__dirname, 'public')
const srcPath = path.join(__dirname, '/src')
const routesPath = path.join(__dirname, '/src', 'views', 'routes')
const viewPath = path.join(__dirname, '/src', 'views')

// console.log('directoryPath', __dirname)
// console.log()
// console.log('publicPath: ', publicPath)
// console.log()
// console.log('srcPath', srcPath)
// console.log()
// console.log('routesPath: ', routesPath)
// console.log()
// console.log('viewPath: ', viewPath)

var indexRouter = require(path.join(viewPath, 'routes'))
var usersRouter = require(path.join(viewPath, 'routes'))

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send({ error: 'Not found' })
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500).send({ error: err })
})

module.exports = app

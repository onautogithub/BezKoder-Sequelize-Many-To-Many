var express = require('express')
var router = express.Router()
var path = require('path')
const controllerPath = path.join(__dirname, '../../', 'controllers')

console.log('***************************************************************')
console.log('controllerPath: ', controllerPath)
console.log('***************************************************************')

const tagsController = require(path.join(controllerPath, 'tags.js'))
const tutorialsController = require(path.join(controllerPath, 'tutorials.js'))

// const tagsController = require(controllerPath).tags.js
// const tutorialsController = require(controllerPath).tutorials.js

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/api/tags', tagsController.list)
router.get('/api/tags/:id', tagsController.getById)
router.post('/api/tags', tagsController.add)
router.put('/api/tags/:id', tagsController.update)
router.delete('/api/tags/:id', tagsController.delete)

router.get('/api/tutorials', tutorialsController.list)
router.get('/api/tutorials/:id', tutorialsController.getById)
router.post('/api/tutorials', tutorialsController.add)
router.post('/api/tutorials/addTutorialToTag/:id/:id', tutorialsController.addTutorialToTag)
// router.post('/api/tutorials/addTutorialToTag/:tagsId/TurorialsId', tutorialsController.addTutorialToTag)
// router.put('/api/tutorials/:id', tutorialsController.update)
// router.delete('/api/tutorials/:id', tutorialsController.delete)
// router.post('/api/tutorials/add_courses', tutorialsController.addcourse)

module.exports = router

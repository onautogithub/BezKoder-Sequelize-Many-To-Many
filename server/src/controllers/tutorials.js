
const tutorials = require('../models').tutorials
const tags = require('../models').tags

module.exports = {
  list (req, res) {
    return tutorials
      .findAll({
        include: [{
          model: tags,
          as: 'tags'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: tags, as: 'tags' }, 'createdAt', 'DESC']
        ]
      })
      .then((tutorials) => res.status(200).send(tutorials))
      .catch((error) => { res.status(400).send(error) })
  },

  getById (req, res) {
    return tutorials
      .findByPk(req.params.id, {
        include: [
          {
            model: tags,
            as: 'tags',
            attributes: ['id', 'name'],
            through: {
              attributes: ['tag_id', 'tutorial_id']
            }
          }
        ]
      })
      .then((tutorials) => {
        if (!tutorials) {
          return res.status(404).send({
            message: 'tutorials Not Found'
          })
        }
        return res.status(200).send(tutorials)
      })
      .catch((error) => {
        console.log(error)
        res.status(400).send('>> Error while finding Tutorial: ', error)
      })
  },

  add (req, res) {
    return tutorials
      .create({
        title: req.body.title,
        description: req.body.description
      })
      .then((tutorials) => res.status(201).send(tutorials))
      .catch((error) => res.status(400).send(error))
  },

  update (req, res) {
    return tutorials
      .findByPk(req.params.id, {
        include: [{
          model: tags,
          as: 'tags'
        }]
      })
      .then(tutorials => {
        if (!tutorials) {
          return res.status(404).send({
            message: 'tutorials Not Found'
          })
        }
        return tutorials
          .update({
            class_name: req.body.class_name || tutorials.class_name
          })
          .then(() => res.status(200).send(tutorials))
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  delete (req, res) {
    return tutorials
      .findByPk(req.params.id)
      .then(tutorials => {
        if (!tutorials) {
          return res.status(400).send({
            message: 'Classroom Not Found'
          })
        }
        return tutorials
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  // addTutorialToTag (req, res) {
  addTutorialToTag (req, resp) {
    console.log('I am in the addTutorialtoTag')
    const tagId = req.params.id
    const tutorialId = req.params.id
    console.log(tagId, tutorialId)
    return tags.findByPk(tagId)
      .then((tags) => {
        if (!tags) {
          console.log('Tag not found!')
          return null
        }
        return tutorials.findByPk(tutorialId).then((tutorial) => {
          if (!tutorial) {
            console.log('Tutorial not found!')
            return null
          }
          tags.addTutorial(tutorial)
          console.log(`>> added Tutorial id=${tutorials.id} to Tag id=${tags.id}`)
          return tags
        })
      })
      .catch((err) => {
        console.log('>> Error while adding Tutorial to Tag: ', err)
      })
  }
}

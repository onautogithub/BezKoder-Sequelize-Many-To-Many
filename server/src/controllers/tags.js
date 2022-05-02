const tags = require('../models').tags
const tutorials = require('../models').tutorials

module.exports = {
  list (req, res) {
    return tags
      .findAll({
        include: [
          {
            model: tutorials,
            as: 'tutorials',
            attributes: ['id', 'title', 'description'],
            through: {
              attributes: []
            }
          }
        ]
      })
      .then((tags) => res.status(200).send(tags))
      .catch((error) => { res.status(400).send('>> Error while retrieving Tags: ', error) })
  },

  getById (req, res) {
    return tags
      .findByPk(req.params.id, {
        include: [
          {
            model: tutorials,
            as: 'tutorials',
            attributes: ['id', 'title', 'description'],
            through: {
              attributes: []
            }
          }
        ]
      })
      .then((tags) => {
        if (!tags) {
          return res.status(404).send({
            message: 'tags Not Found'
          })
        }
        return res.status(200).send(tags)
      })
      .catch((error) => {
        console.log(error)
        res.status(400).send('>> Error while finding Tag: ', error)
      })
  },

  add (req, res) {
    return tags
      .create({
        name: req.body.name
      })
      .then((tags) => res.status(201).send(tags))
      .catch((error) => res.status(400).send('>> Error while creating Tag: ', error))
  },

  update (req, res) {
    return tags
      .findByPk(req.params.id, {
        include: [{
          model: tutorials,
          as: 'tutorials'
        }]
      })
      .then(tags => {
        if (!tags) {
          return res.status(404).send({
            message: 'tags Not Found'
          })
        }
        return tags
          .update({
            name: req.body.name || tags.name
          })
          .then(() => res.status(200).send(tags))
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  delete (req, res) {
    return tags
      .findByPk(req.params.id)
      .then(tags => {
        if (!tags) {
          return res.status(400).send({
            message: 'Classroom Not Found'
          })
        }
        return tags
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  }
}

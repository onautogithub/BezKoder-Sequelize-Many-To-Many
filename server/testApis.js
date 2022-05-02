const db = require("./app/models");
const TutorialController = require("./app/controllers/tutorial.controller");
const TagController = require("./app/controllers/tag.controller");
const run = async () => {
};
// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  run();
});
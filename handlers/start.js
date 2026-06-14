const { showStartMenu } = require("../utils/menu");

module.exports = (bot) => {
    bot.start((ctx) => {
        showStartMenu(ctx);
    });
};
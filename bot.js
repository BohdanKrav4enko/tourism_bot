require("dotenv").config();
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

require("./handlers/routes")(bot);
require("./handlers/start")(bot);
require("./handlers/payments")(bot);
require("./handlers/questions")(bot);

bot.launch();

console.log("🚀 Bot is running");
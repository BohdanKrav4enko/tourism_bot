const { Markup } = require("telegraf");

const mainKeyboard = Markup.keyboard([
    ["🏔️ Маршрути", "❓ Задати питання"],
    ["ℹ️ Про бот", "🏠 Головна"]
]).resize();

module.exports = mainKeyboard;
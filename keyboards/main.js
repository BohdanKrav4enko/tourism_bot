const { Markup } = require("telegraf");

const mainKeyboard = Markup.keyboard([
    ["🏔️ Маршрути", "❓ Задати питання"],
    ["ℹ️ Про бот", "🏠 Головна"]
]).resize();

const questionsKeyboardBack = Markup.keyboard([
    ["↩️ Назад"],
]).resize();

module.exports = {
    mainKeyboard,
    questionsKeyboardBack
};
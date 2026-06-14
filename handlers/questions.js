const {Markup} = require("telegraf");
const userState = require("../utils/state");
const mainKeyboard = require("../keyboards/main");

module.exports = (bot) => {
    bot.on("text", async (ctx) => {
        const state = userState[ctx.from.id];

        if (state !== "question") return;

        const text = ctx.message.text;

        console.log("QUESTION:", text);

        delete userState[ctx.from.id];

        await ctx.reply(
            "📩 Дякую! Вже отримав твоє питання — відповім найближчим часом 👍",
            mainKeyboard
        );
    });
}
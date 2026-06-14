const userState = require("../utils/state");
const {mainKeyboard} = require("../keyboards/main");
const admins = require("../config/admins");

module.exports = (bot) => {
    bot.on("text", async (ctx) => {
        const state = userState[ctx.from.id];
        console.log(ctx.from.id);
        if (state !== "question") return;

        const text = ctx.message.text;

        for (const adminId of admins) {
            await bot.telegram.sendMessage(
                adminId,
                `📩 Є нове питання 📩

👤 ${ctx.from.first_name} ${ctx.from.last_name || ""}
👉 @${ctx.from.username || "немає"}
🆔 ${ctx.from.id}
🌍 ${ctx.from.language_code || "невідомо"}

💬 ${text}`
            );
        }

        delete userState[ctx.from.id];

        await ctx.reply(
            "📩 Дякую! Вже отримав твоє питання — відповім найближчим часом 👍",
            mainKeyboard
        );
    });

}
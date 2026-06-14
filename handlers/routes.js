const routes = require("../data/routes");
const { questionsKeyboardBack } = require("../keyboards/main");
const { showStartMenu } = require("../utils/menu");
const { showAboutUs } = require("../utils/aboutUs");

const { Markup } = require("telegraf");
const userState = require("../utils/state");


module.exports = (bot) => {
    bot.hears("🏔️ Маршрути", async (ctx) => {
        for (const r of routes) {
            await ctx.replyWithPhoto(r.image, {
                caption: `🏔️ ${r.name}

📍 ${r.desc}
⏱️ ${r.time}
📊 ${r.difficulty}
💰 ${r.price} $`,
                ...Markup.inlineKeyboard([
                    [Markup.button.callback("📖 Детальніше", `info_${r.id}`)]
                ])
            });
        }
    });

    bot.action(/^info_(\d+)$/, async (ctx) => {
        await ctx.answerCbQuery();

        const id = Number(ctx.match[1]);
        const route = routes.find(r => r.id === id);

        if (!route) return ctx.reply("Маршрут не найден");

        return ctx.reply(
            route.fullDesc,
            Markup.inlineKeyboard([
                [Markup.button.callback(`💰 Купити за ${route.price} $`, `buy_${route.id}`)]
            ])
        );
    });
    bot.hears("↩️ Назад", (ctx) => {
        delete userState[ctx.from.id];
        showStartMenu(ctx);
    });

    bot.hears("❓ Задати питання", (ctx) => {
        userState[ctx.from.id] = "question";

        ctx.reply(
            "❓ Давай твоє питання 👇 я допоможу 👍",
            questionsKeyboardBack
        );
    });

    bot.hears("ℹ️ Про бот", (ctx) => {
        showAboutUs(ctx)
    });

    bot.hears("🏠 Головна", (ctx) => {
        showStartMenu(ctx)
    });
}
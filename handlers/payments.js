const routes = require("../data/routes");
const CRYPTO_WALLET = "USDT TRC20: TXXXXXXFAKEADDRESS";
const { Markup } = require("telegraf");

module.exports = (bot) => {
    bot.action(/^buy_(\d+)$/, async (ctx) => {
        await ctx.answerCbQuery();

        const id = Number(ctx.match[1]);
        const route = routes.find(r => r.id === id);

        if (!route) return ctx.reply("Маршрут не знайден");

        return ctx.reply(
            `💳 ОПЛАТА МАРШРУТУ

🏔️ ${route.name}

💰 Сума: ${route.price} $

📌 Адреса для оплати:
${CRYPTO_WALLET}

Після оплати натисніть кнопку нижче 👇`,
            Markup.inlineKeyboard([
                [Markup.button.callback("Я сплатив ✅", `paid_${route.id}`)]
            ])
        );
    });

    bot.action(/^paid_(\d+)$/, async (ctx) => {
        await ctx.answerCbQuery();

        const id = Number(ctx.match[1]);
        const route = routes.find(r => r.id === id);

        if (!route) return ctx.reply("Маршрут не знайдено😒");

        return ctx.reply(`⏳ Перевірка оплати: ${route.name}`);
    });
}
const routes = require("../data/routes");
const mainKeyboard = require("../keyboards/main");
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

    bot.hears("❓ Задати питання", (ctx) => {
        userState[ctx.from.id] = "question";

        ctx.reply(
            "❓ Давай твоє питання 👇 я допоможу 👍",
            Markup.removeKeyboard()
        );
    });

    bot.hears("ℹ️ Про бот", (ctx) => {
        ctx.reply(
            `🛡️ ПЕРЕВІРЕНІ МАРШРУТИ КАРПАТ

Це готові маршрути для реальних подорожей Карпатами — без зайвої інформації, хаосу та довгого пошуку.

Кожен маршрут – це зібрана та структурована схема руху по горах, заснована на реальних туристичних треках та практичному досвіді.

🏔️ Що ти отримуєш:
• готовий маршрут від старту до фінішу
• чітку логіку руху по дорозі
• ключові орієнтири та точки зупинок
• зрозумілий рівень складності
• адаптацію до реальних умов Карпат

🔥 Головна цінність
Ти не плануєш — ти одразу використовуєш готове рішення.

Замість годин підготовки, карт та пошуку інформації ти отримуєш уже зібраний маршрут, яким можна йти.

📍 Результат
Мінімум невизначеності. Максимум ясності та структури.

Ти вибираєш маршрут - все інше вже готове.`
        );
    });

    bot.hears("🏠 Головна", (ctx) => {
        ctx.reply(
            `🏔️ KARPATY GUIDE

Я зібрав для тебе готові маршрути Карпатами 🌲

Без хаосу, довгих пошуків і складного планування — просто обираєш маршрут і йдеш.

📍 Усередині:
• чіткі маршрути від старту до фінішу  
• точки зупинок і орієнтири  
• рівень складності  
• атмосферні місця для фото  
🔥 Це не просто інформація — це готові подорожі.

Оберіть розділ 👇`,
            mainKeyboard
        );
    });
}
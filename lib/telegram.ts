import { Telegraf } from "telegraf";

export const sendTelegramForm = async(email: string, name: string, description: string) => {
    const bot = new Telegraf(process.env.BOT_TOKEN!);
    const channelId = process.env.CHANNEL_ID_TELEGRAM!;

    const botResult = await bot.telegram.sendMessage(
        channelId,
        `<b>Mail:</b> ${email}\n<b>Name:</b> ${name}\n<b>Descrip:</b> ${description}`,
        {
            parse_mode: "HTML"
        }
    )
    .then(() => {
        return "Good";
    })
    .catch(() => {
        return "Error"
    })

    bot.launch();

    return botResult;
}
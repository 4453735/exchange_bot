import axios from 'axios';
import { Telegraf } from 'telegraf';
import {BOT_TOKEN} from "./AppConfig";
import {getDollar, getDollar2, getLira, getLira2} from "./api";
import { Job, scheduleJob, gracefulShutdown } from "node-schedule";
import {startWatchingCurrency, stopWatchingCurrency} from "./jobs/watchCurrency";


const bot = new Telegraf(BOT_TOKEN);

let counter = 0;




bot.start((ctx) => {
    ctx.reply('Hello!!!');
})

bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));


bot.command('hello', (ctx) => {
    ctx.reply('Random');
})

bot.command('getUsers', async (ctx) => {
    const response = axios.get('https://jsonplaceholder.typicode.com/users');
    const firstUser = (await response).data[0];
    console.table((await response).data[0]);
    ctx.reply(firstUser.name);
})

bot.command('getDollar', async (ctx) => {
    const response = await getDollar();
    setInterval(async () => {
        const response = await getDollar();
        let responseOld = response;

        if (response != responseOld) {
            ctx.reply(`${response}`);
        }
    }, 18000000);
    ctx.reply(`${response}`);
});

bot.command('getLira', async (ctx) => {
    const response = await getLira();
    let responseOld = response;
    setInterval(async () => {
        const response = await getLira();

        if (response > responseOld) {
            ctx.reply(`Курс Турецкой лиры подрос! Новый курс: ${response} RUB`);
            responseOld = response;
        } else if (response < responseOld) {
            ctx.reply(`Курс Турецкой лиры упал! Новый курс: ${response} RUB`);
            responseOld = response;
        }
    }, 18000000);
    ctx.reply(`Курс Турецкой лиры: ${response} RUB`);
});

bot.command('getDollar2', async (ctx) => {
    const response = await getDollar2();

    ctx.reply(`${response}`);
})

bot.command('job', async (ctx) => {
    startWatchingCurrency(ctx);
});

bot.command('stop', async (ctx) => {
    stopWatchingCurrency(ctx);
})


bot.launch();

// Enable graceful stop
process.once('SIGINT', () => {
    gracefulShutdown();
    bot.stop('SIGINT');
});
process.once('SIGTERM', () => {
    gracefulShutdown();
    bot.stop('SIGTERM');
});

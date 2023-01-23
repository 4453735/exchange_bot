const { Telegraf } = require('telegraf');
require("dotenv").config();
const axios = require('axios');

// const app = require('express')();


// console.log(process.env.BOT_TOKEN);



const bot = new Telegraf(process.env.BOT_TOKEN);

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

bot.launch();

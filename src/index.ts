import axios from 'axios';
import { Telegraf } from 'telegraf';
import {BOT_TOKEN} from "./AppConfig";

// require("dotenv").config();

// const app = require('express')();


// console.log(process.env.BOT_TOKEN);


const bot = new Telegraf(BOT_TOKEN);

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
    const response = axios.get('https://jsonplaceholder.typicode.com/users');
    const firstUser = (await response).data[0];
    console.table((await response).data[0]);
    ctx.reply(firstUser.name);
})

bot.launch();

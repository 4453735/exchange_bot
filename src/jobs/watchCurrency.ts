import {Job, scheduleJob} from "node-schedule";
import {getLira2} from "../api";
import {Context} from "telegraf";

let job: Job;

export const startWatchingCurrency = async (ctx: Context) => {
    const response = await getLira2();
    ctx.reply(`10 TRY = ${response} RUB`);
    let responseOld = response;
    job = scheduleJob('* * */3 * * *', async () => {
        const response = await getLira2();
        if (response > responseOld) {
            ctx.reply(`10 TRY = ${response} RUB`);
            responseOld = response;
        } else if (response < responseOld) {
            ctx.reply(`10 TRY = ${response} RUB`);
            responseOld = response;
        }
        console.log(response);
        //ctx.reply(`${response}`);
    });
};

export const stopWatchingCurrency = (ctx: Context) => {
    job.cancel();
    ctx.reply('Stopped!');
}


const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = "5424499160:AAEd_tqhmT2bSTrOcNmwW3XJ7oBuQXhql6U";
// Replace YOUR_BOT_TOKEN with the actual token for your bot
const bot = new TelegramBot(token, { polling: true });
const url = "https://yo-mama.onrender.com/";

bot.onText(/\/start/,(msg)=>
{
axios.get(url)
    .then((response) => {
      const data = response.data;
      bot.sendMessage(msg.chat.id, JSON.stringify(data));
    })
    .catch((error) => {
      console.log(error);
    });

});


bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  let tag= msg.text;
 bot.sendChatAction(chatId,'typing');

axios.get(`${url}/${tag}`)
    .then((response) => {
      const data = response.data;
      bot.sendMessage(chatId, data);
    })
    .catch((error) => {
      console.log(error);
    });
});
console.log("ready");

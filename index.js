const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('.options')

const token = '6284838836:AAGHoqJAffOhPMPWK2R5UoITPNOz1VULbUI'

const bot = new TelegramApi(token, {
    polling: true
})


const chats = {}




const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `now i guess a number 0 to 9`)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Guess!', gameOptions)
}



const start = () => {

    bot.setMyCommands([{
            command: '/start',
            description: 'Start'
        },
        {
            command: '/info',
            description: 'Info'
        },
        {
            command: '/game',
            description: 'Game'
        },
    ])


    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, `Ты евписал мне ${text}`)

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/1.jpg')
            return bot.sendMessage(chatId, 'Длбро пожаловать в телегоым бот')
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `тебя зовут ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if (text === '/game') {
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, `I don't understand you`)

    })


    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data === '/again') {
            return startGame(chatId);
        }

        if (data === chats[chatId]) {
            return await bot.sendMessage(chatId, `Congratiulation, you guesed number ${chats[chatId]}`, againOptions)
        } else {
            return await bot.sendMessage(chatId, `unfortunatelly, bot guesed number  ${chats[chatId]}`, againOptions)
        }
    })
}


start()
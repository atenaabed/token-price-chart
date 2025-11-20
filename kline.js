const finnhub = require('finnhub');

const log = console.log;
const express = require('express')
const app = express();
const server = app.listen('4000' , () => log(`Kline Data server started on port 4000`));
const socket = require('socket.io');
const io = socket(server)



const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cksemq9r01qjpllh3hjgcksemq9r01qjpllh3hk0"
const finnhubClient = new finnhub.DefaultApi()

finnhubClient.cryptoCandles("BINANCE:BTCUSDT", "D", 1697957145,1698043545, (error, data, response) => {
  console.log(data)
  io.sockets.emit({time:data[0]/1000, open:parseFloat(data[1]), high:parseFloat(data[2]), low:parseFloat(data[3]), close:parseFloat(data[4])})
});







  



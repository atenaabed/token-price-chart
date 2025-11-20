const WebSocket = require('ws');
const fs = require('fs')
const express = require('express');
const app = express();
const server = app.listen('4000' , () => console.log(` Started on port 4000`))
const socket = require('socket.io');
const io = socket(server)





//const readline = require('readline');

const ws = new WebSocket(`wss://stream.binance.com/stream?streams=BNBBTC@kline_1m`);

const stream = {
    method: "SUBSCRIBE",
    params: ["btcusdt@kline_1m"],
    id: 1,

  };


ws.on('open',  () => {
    console.log('...client.on.open: connected')
    ws.send(stream)
    //console.log('this is my data:',data)

  });
  


ws.on('message', data => {
  //console.log(`${data}`)
  const jsonData = JSON.parse(data.toString());
  const result = jsonData.data
  //console.log(result)
  if( jsonData.data){
      const getItem = Object.values(result)
      const getTime = getItem.at(1)
      const truTime = new Date(getTime)
      const getYear = truTime.getFullYear(); // prints the year (e.g. 2021)
      const getMonth = truTime.getMonth(); // prints the month (0-11, where 0 = January)
      const getDate = truTime.getDate(); // prints the day of the month (1-31)
      const getHour = truTime.getHours(); // prints the hour (0-23)
      const getMinutes = truTime.getMinutes(); // prints the minute (0-59)
      const getSeconds = truTime.getSeconds(); // prints the second (0-59)
      const time = `${getYear}-${getMonth}-${getDate}-${getHour}:${getMinutes}:${getSeconds}`
      const alldata = getItem.at(3)
      const getValue = Object.values(alldata)
      const getOpen = getValue.at(5)
      const getClose = getValue.at(6)
      const getHigh = getValue.at(7)
      const getLow = getValue.at(8)
      //console.log('this is time:' ,getTime)
      //console.log('this is open:',getOpen)
     // console.log('this is close:',getClose)
      //console.log('this is high:',getHigh)
     // console.log('this is low:',getLow)
      const listOfData = []
      listOfData.push(getTime)
      listOfData.push(getOpen)
      listOfData.push(getClose)
      listOfData.push(getHigh)
      listOfData.push(getLow)
      //console.log(listOfData)

     const obj = {}
    
      if (!Object.keys(obj).length) {
        Object.assign(obj, {time:listOfData[0],open:listOfData[1],high:parseFloat(listOfData[3]), low:parseFloat(listOfData[4]), close:parseFloat(listOfData[2])});
    }
     
     //console.log(obj);
     return obj

  }


    })
    
  
ws.on('close', () => {
    console.log('...client.on.close: disconnected');
    process.exit();
  });
  
  
  



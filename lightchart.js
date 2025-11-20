//const  {createChart}= require('lightweight-charts') ;

const log = console.log;
const chartProperties = {
    width:1500,
    height:6000,
    timeScale:{
        timeVisible:true,
        secondsVisible:false,

    }
}
const chart = LightweightCharts.createChart(document.body, { width: 2000, height: 1000 });
const domElement = document.getElementById('tvchart');
const candleSeries = chart.addCandlestickSeries();

fetch(`http://127.0.0.1:9665/fetchAPI?endpoint=https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=1000`)
.then(response => response.json())
.then(data => {
    const cdata = data.map(d =>{
        return {time:d[0]/1000, open:parseFloat(d[1]), high:parseFloat(d[2]), low:parseFloat(d[3]), close:parseFloat(d[4])}
    })

    candleSeries.setData(cdata);
    


})
.catch(err =>log(err))

const timeInterval = `1m`

const ws = new WebSocket(`wss://stream.binance.com/stream?streams=BNBBTC@kline_${timeInterval}`);

const stream = JSON.stringify({
    method: "SUBSCRIBE",
    params: [`btcusdt@kline_${timeInterval}`],
    id: 1,

  });




  ws.addEventListener('open' , function(){
    console.log("Connection established using event");
    ws.send(stream)
    
  });



  
  const listOfData = []
  

  ws.onmessage = (event) =>{
    const result = JSON.parse(event.data)
    const jsonResult = result.data

    const getTime = Object.values(jsonResult)[1]

    const getData = jsonResult.k
    const getOpen = getData.o
    const getHigh = getData.h
    const getLow = getData.l
    const getClose = getData.c
    listOfData.push(getOpen)
    listOfData.push(getHigh)
    listOfData.push(getLow)
    listOfData.push(getClose)

    if(listOfData.length !== 0 ){
      candleSeries.update({time: getTime /1000 ,open:listOfData[0],high:parseFloat(listOfData[1]), low:parseFloat(listOfData[2]), close:parseFloat(listOfData[3])})
    }
    
   


  };









       










 
  
  





















    


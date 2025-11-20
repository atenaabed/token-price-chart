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
//const chart = createChart(document.getElementById(domElement), chartProperties);
const candleSeries = chart.addCandlestickSeries();

fetch(`http://127.0.0.1:9665/fetchAPI?endpoint=https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1d&limit=1000`)
.then(response => response.json())
.then(data => {
    const cdata = data.map(d =>{
        return {time:d[0]/1000, open:parseFloat(d[1]), high:parseFloat(d[2]), low:parseFloat(d[3]), close:parseFloat(d[4])}
    })

    candleSeries.setData(cdata);

})
.catch(err =>log(err))

const chart = LightweightCharts.createChart(document.body, { width: 2000, height: 999 });
const domElement = document.getElementById('tvchart');
//const chart = createChart(document.getElementById(domElement), chartProperties);
const candleSeries = chart.addCandlestickSeries();



fetch('./datachart.json')
.then(response => response.json())
.then(response=>console.log(response))
.then(response => candleSeries.update(response))













    
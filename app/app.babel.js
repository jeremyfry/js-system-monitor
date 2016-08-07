class SystemMonitor {
	constructor(){
		this.view = document.querySelector('[view]');

		this.charts = {};
		let element = document.createElement("div");
		this.view.appendChild(element);
		this.charts = [];
		this.charts.push(new Chart(element, 'Pie', {
			sensorName: 'Generic Memory: Memory',
			sensorClass: 'Load',
			chartOptions:{
				donut: true,
				total: 200,
				startAngle: 270,
				donutWidth: 30
			}
		}));

		setInterval(()=>{
			this.fetchData();
		}, 1000);
	}

	fetchData(){
		fetch('/api/')
			.then((res)=>{
				return res.json();
			})
			.then((json)=>{
				this.processData(json);
			});
	}

	processData(data) {
		this.charts.forEach((chart)=>{
			chart.update(data);
		});
		console.log(data);
	}

}

window.addEventListener('load', () => new SystemMonitor());

class Chart {
	constructor(element, chartType, options = {}){
		this.element = element;
		this.dataSet = {
			series: [[1]]
		};
		this.chart = new Chartist[chartType](element, this.dataSet, options.chartOptions);
		this.sensorName = options.sensorName;
		this.sensorClass = options.sensorClass;
	}

	update(data){
		let dataItems = data.filter((dataItem)=> {
			return dataItem.SensorClass === this.sensorClass && dataItem.SensorName === this.sensorName;
		});
		this.dataSet.series[0] = [+dataItems[0].SensorValue];
		this.chart.update();
	}
}

// class Donut extends Chart{
//
// }
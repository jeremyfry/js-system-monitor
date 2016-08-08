import DonutChart from './charts/donut';
import LineChart from './charts/line';
import chartDefinitions from './chartDefinitions';

const CHART_MAGIC_STRINGS = {
	Donut: DonutChart,
	Line: LineChart
};

class SystemMonitor {
	constructor(){
		this.view = document.querySelector('[view]');
		this.charts = [];

		this.createCharts(chartDefinitions);
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

	createCharts(chartDefinitions){
		chartDefinitions.forEach((chart)=>{
			let element = document.createElement('div');
			element.className = chart.classNames;
			this.view.appendChild(element);

			this.charts.push(new CHART_MAGIC_STRINGS[chart.type](element, chart.options));
		});

	}
}

window.addEventListener('load', () => new SystemMonitor());
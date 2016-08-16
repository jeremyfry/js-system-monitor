import DonutChart from './charts/donut';
import LineChart from './charts/line';
import chartDefinitions from './chartDefinitions';
import {htmlToElement} from './helpers';
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
			let wrapper = document.createElement('div');
			let element = document.createElement('div');

			wrapper.className = chart.wrapperClasses;
			element.className = chart.chartClasses;

			this.createLegend(wrapper, chart.legend);

			wrapper.appendChild(element);
			this.view.appendChild(wrapper);

			this.charts.push(new CHART_MAGIC_STRINGS[chart.type](element, chart.options));
		});
	}

	createLegend(element, legends){
		if(!legends){
			return;
		}

		Object.keys(legends).forEach((key) =>{
			let legendElement = htmlToElement('<div><span></span>'+legends[key]+'</div>');
			legendElement.className = 'legend legend-'+key;
			element.appendChild(legendElement);
		});
	}
}

window.addEventListener('load', () => new SystemMonitor());
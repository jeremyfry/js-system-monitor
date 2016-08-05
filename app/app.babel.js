class SystemMonitor {
	constructor(){
		this.view = document.querySelector('[view]');

		this.charts = {};
		let element = document.createElement("div");
		this.view.appendChild(element);
		this.charts.cpuUsage = new Chart(element, 'Pie');

		setInterval(()=>{
			this.fetchData();
		}, 2000);
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
		console.log(data);
	}

}

window.addEventListener('load', () => new SystemMonitor());

class Chart {
	constructor(element, chartType, options){
		this.element = element;
		this.dataSet = [];
		this.chart = new Chartist[chartType](element, this.dataSet);
	}

	update(data){
		this.dataSet.push(data);
	}
}
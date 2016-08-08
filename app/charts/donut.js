import Chart from './chart';
export default class DonutChart extends Chart{
	constructor(element, options = {}){
		super(element, 'Pie', options);
		this.dataSets.series = [];
	}

	update(data){
		this.dataSets.series = data
			.filter(dataItem => this.matchedSensorIndex(dataItem) > -1)
			.map(dataItem => +dataItem.SensorValue);

		this.chart.update();
	}
}
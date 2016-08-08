import Chart from './chart';
export default class lineChart extends Chart{
	constructor(element, options = {}){
		super(element, 'Line', options);
		this.maxXAxis = -options.maxXAxis || -10;
	}

	update(data){
		super.update(data, false);
		this.dataSets.series = this.dataSets.series.map(dataSet => dataSet.splice(this.maxXAxis));
		this.dataSets.labels = null;
		this.chart.update();
	}
}
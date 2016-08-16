import Chart from './chart';
import {HSLCalc} from '../helpers';
export default class DonutChart extends Chart{
	constructor(element, options = {}){
		super(element, 'Pie', options);
		this.dataSets.series = [];
		this.chartLabel = options.label || '';

		this.chart.on('draw', (ctx) => {
			if(ctx.type === 'label') {
				if(ctx.index === 0) {
					let textHtml = ['<p>', ctx.text+'<br>'+this.chartLabel, '</p>'].join('');
					let multilineText = Chartist.Svg('svg').foreignObject(
						textHtml,
						{
							height:  ctx.element.root().height(),
							width:  ctx.element.root().width(),
							dx: ctx.element.root().width() / 2,
							dy: ctx.element.root().height() / 2.1
						},
						'ct-label'
					);

					ctx.element.replace(multilineText);
				} else {
					ctx.element.remove();
				}
			}else if(ctx.type === 'slice' && ctx.index === 0){
				ctx.element._node.style.stroke = HSLCalc(ctx.value, 120, 40);
			}
		});
	}

	update(data){
		this.dataSets.series = data
			.filter(dataItem => this.matchedSensorIndex(dataItem) > -1)
			.map(dataItem => +dataItem.SensorValue);
		// Singular value for donuts. Add another to get to 100 for styling
		this.dataSets.series.push(100-this.dataSets.series[0]);
		this.chart.update();
	}
}
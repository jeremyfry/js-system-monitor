export default class Chart {
	constructor(element, chartType, options = {}){
		this.element = element;
		this.dataSets = {
			series: []
		};
		this.chart = new Chartist[chartType](element, this.dataSets, options.chartOptions);
		this.sensors = options.sensors;
	}

	matchedSensorIndex(dataItem){
		return this.sensors.findIndex((sensor)=>{
			return dataItem.SensorClass.indexOf(sensor.sensorClass) !== -1 && dataItem.SensorName === sensor.sensorName;
		});
	}

	update(data, draw){
		data.map((dataItem)=> {
			let dataIndex = this.matchedSensorIndex(dataItem);
			if(dataIndex !== -1){
				try{
					this.dataSets.series[dataIndex].push(+dataItem.SensorValue);
				}catch(e){
					this.dataSets.series[dataIndex] = [+dataItem.SensorValue];
				}
			}
		});
		if(draw){
			this.chart.update();
		}
	}
}
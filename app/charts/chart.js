export default class Chart {
	constructor(element, chartType, options = {}){
		this.element = element;
		this.dataSets = {
			series: [[1,2,3,4,5,6,7], [5,6,7]]
		};
		this.chart = new Chartist[chartType](element, this.dataSets, options.chartOptions);
		this.sensors = options.sensors;
	}

	matchedSensorIndex(dataItem){
		return this.sensors.findIndex((sensor)=>{
			return dataItem.SensorClass === sensor.sensorClass && dataItem.SensorName === sensor.sensorName;
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
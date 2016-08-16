export default [
	{
		type: 'Donut',
		wrapperClasses: 'pc-memory-usage one-third donut',
		chartClasses: 'ct-perfect-fourth',
		options: {
			sensors:[{
				sensorName: 'Generic Memory: Memory',
				sensorClass: 'Load',
			}],
			label: 'RAM Usage',
			chartOptions:{
				donut: true,
				total: 200,
				startAngle: 270,
				donutWidth: 30,
				labelInterpolationFnc: function(value) {
					return Math.round(value) + '%';
				}
			}
		}
	},
	{
		type: 'Donut',
		wrapperClasses: 'graphics-memory-usage one-third donut',
		chartClasses: 'ct-perfect-fourth',
		options: {
			sensors:[{
				sensorName: 'NVIDIA GeForce GTX 1070: GPU Memory Controller',
				sensorClass: 'Load',
			}],
			label: 'GPU Memory',
			chartOptions:{
				donut: true,
				total: 200,
				startAngle: 270,
				donutWidth: 30,
				labelInterpolationFnc: function(value) {
					return Math.round(value) + '%';
				}
			}
		}
	},
	{
		type: 'Donut',
		wrapperClasses: 'graphics-memory-usage one-third donut',
		chartClasses: 'ct-perfect-fourth',
		options: {
			sensors:[{
				sensorName: 'ST31000528AS: Used Space',
				sensorClass: 'Load',
			}],
			label: 'Disk Usage',
			chartOptions:{
				donut: true,
				total: 200,
				startAngle: 270,
				donutWidth: 30,
				labelInterpolationFnc: function(value) {
					return Math.round(value) + '%';
				}
			}
		}
	},
	{
		type: 'Line',
		wrapperClasses: 'cpu-usage three-fifths',
		chartClasses: 'ct-major-sixth ct-chart',
		legend: {
			a: 'Core 1',
			b: 'Core 2',
			c: 'Core 3',
			d: 'Core 4',
			e: 'GPU Core'
		},
		options: {
			sensors:[{
				sensorName: 'Intel Core i7-6700K: CPU Core #1',
				sensorClass: 'Load',
			},
			{
				sensorName: 'Intel Core i7-6700K: CPU Core #2',
				sensorClass: 'Load',
			},
			{
				sensorName: 'Intel Core i7-6700K: CPU Core #3',
				sensorClass: 'Load',
			},
			{
				sensorName: 'Intel Core i7-6700K: CPU Core #4',
				sensorClass: 'Load',
			},
			{
				sensorName: 'NVIDIA GeForce GTX 1070: GPU Core',
				sensorClass: 'Load',
			}],
			maxXAxis: 21,
			chartOptions:{
				high: 100,
				low: 0,
				fullWidth: true,
				axisX: {
					labelInterpolationFnc: function(value, index) {
						return index % 5 === 0 ? value : null;
					}
				}
			}
		}
	},
	{
		type: 'Line',
		wrapperClasses: 'network whole',
		chartClasses: 'ct-chart',
		legend: {
			a: 'Download',
			b: 'Upload'
		},
		options: {
			sensors:[{
					sensorName: 'Current DL rate',
					sensorClass: 'Ethernet Controller',
				},
				{
					sensorName: 'Current UL rate',
					sensorClass: 'Ethernet Controller',
				}
			],
			maxXAxis: 41,
			chartOptions:{
				high: 100,
				low: 0,
				fullWidth: true,
				axisX: {
					labelInterpolationFnc: function(value, index) {
						return index % 5 === 0 ? value : null;
					}
				}
			}
		}
	}
];
export default [
	{
		type: 'Donut',
		classNames: 'pc-memory-usage ct-perfect-fourth ct-chart',
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
		classNames: 'graphics-memory-usage ct-perfect-fourth ct-chart',
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
		type: 'Line',
		classNames: 'cpu-usage ct-perfect-fourth ct-chart',
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
			],
			maxXAxis: 21,
			chartOptions:{
				chartPadding: {
					right: 60
				},
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
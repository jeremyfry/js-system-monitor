export default [
	{
		type: 'Donut',
		classNames: 'pc-memory-usage',
		options: {
				sensors:[{
					sensorName: 'Generic Memory: Memory',
					sensorClass: 'Load',
				}],
					chartOptions:{
				donut: true,
					total: 200,
					startAngle: 270,
					donutWidth: 30
			}
		}
	},
	{
		type: 'Line',
		classNames: 'cpu-usage',
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
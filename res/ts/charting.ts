import Chart from 'chart.js/auto';

export class ResultsChart {
	chart: Chart | null = null;

	private destroyOldChart(existingChart: Chart | null) {
		if (existingChart) {
			existingChart.destroy();
		}
	}

	public chartResults(resultData: Record<string, any>, chart = this.chart): void {
		this.destroyOldChart(chart);
		const chartArea = document.getElementById("chartCanvas") as HTMLCanvasElement;
		
		let resultsChart = new Chart(chartArea, {
			type: 'bar',
			data: {
				labels: [
					'Total Wounds Inflicted', 
					'Main Unit Models Killed', 
					'Additional Unit Models Killed'
				],
				datasets: [{
					label: 'Average Simulation Results',
					data: [
						resultData.woundsInflicted, 
						resultData.mainModelsKilled, 
						resultData.additionalModelsKilled
					], 
					borderWidth: 1
				}]
			},
			options: {
				responsive: true,
				scales: {
					y: {
						beginAtZero: true
					}
				},
				plugins: {
					tooltip: {
					  callbacks: {
						label: function(context) {
						  const label = context.label || '';
						  const value = context.parsed.y; // `parsed.y` for bar chart
				
						  switch (label) {
							case 'Total Wounds Inflicted':
							  return `Wounds inflicted by attacker: ${value}`;
							case 'Main Unit Models Killed':
							  return `Models Killed: ${value}`;
							case 'Additional Unit Models Killed':
							  return `Models Killed: ${value}`;
							default:
							  return `${label}: ${value}`;
						  }
						}
					  }
					}
				  }
			}
		});
		this.chart = resultsChart;
	}

	
}
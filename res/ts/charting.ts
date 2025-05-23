import Chart from 'chart.js/auto';

export class ResultsChart {
	chart: Chart | null = null;

	private destroyOldChart(existingChart: Chart | null) {
		if (existingChart) {
			existingChart.destroy();
		}
	}

	private getKillCountRange(killCountAverage: number, modelQuantity: number, rangeRadius: number = 6): 
	Record<string, number> {
		const killAverage = Math.round(killCountAverage);
		let lowerBound = killAverage - rangeRadius;
		let upperBound = killAverage + rangeRadius;

		lowerBound = lowerBound < 0 ? 0 : lowerBound;
		upperBound = upperBound > modelQuantity ? modelQuantity : upperBound; 
		

		return {"lowerBound": lowerBound, "upperBound": upperBound}
	}

	private getValueProbability(killValue: number, simulationResults: Record<string, any>[]): number {
		let valueSuccessCount = 0;
		for (const simulationResult of simulationResults) {
			if (simulationResult.mainUnitAttackResults.modelsKilled >= killValue) {
				valueSuccessCount++
			}
		}
		return ((valueSuccessCount/simulationResults.length) * 100);
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

	public getSimulationAverages(simulationResults: Record<string, any>[]): Record<string, any> {
	const simulationAverages = {
		woundsInflicted : 0,
		mainModelsKilled : 0,
		additionalModelsKilled: 0
	}

	let totalModelsKilled = 0;
	let totalWoundsInflicted = 0;
	let totalAdditionalUnitsKilled = 0;
	simulationResults.forEach((simulationResult) => {
		totalWoundsInflicted += simulationResult.totalWounds;
		totalModelsKilled += simulationResult.mainUnitAttackResults.modelsKilled;
		totalAdditionalUnitsKilled += simulationResult.additionalUnitAttackResults.modelsKilled;
	});


	simulationAverages.woundsInflicted = totalWoundsInflicted/simulationResults.length;
	simulationAverages.mainModelsKilled = totalModelsKilled/simulationResults.length;
	simulationAverages.additionalModelsKilled = totalAdditionalUnitsKilled/simulationResults.length;

	return simulationAverages;
	}

	public getSimulationProbabilities (
		killAverage: number,
		modelQuantity: number,
		simulationResults: Record<string, any>[]
	):void  //Record<string, number> 
	{
		const valuesRange = this.getKillCountRange(killAverage, modelQuantity);
		const rangedValues = Array.from(
			{length: valuesRange.upperBound - valuesRange.lowerBound + 1},
			(_, i) => valuesRange.lowerBound + i
		);
		for (let modelKillValue of rangedValues) {
			console.log(
				`Models Killed: ${modelKillValue} | Probability: ${this.getValueProbability(modelKillValue, simulationResults)} %`
			);
		}
		

		return
	}
	
	
}
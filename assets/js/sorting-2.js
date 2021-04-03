//Chart.js configuration
Chart.defaults.global.tooltips.titleFontFamily = 'Montserrat'
Chart.defaults.global.tooltips.bodyFontFamily = 'Montserrat'
Chart.defaults.global.title.fontFamily = 'Montserrat'
Chart.defaults.global.title.fontSize = 18

// Transpose matrix function
const transpose = a => a[0].map((_, c) => a.map(r => parseFloat(r[c])))
const processData = text => {
	const textLines = text.split(/\r\n|\n/);
	const headers = textLines[0].split(',');
	const lines = [];

	for (let line of textLines) {
		if (line == textLines[0]) continue;
		const data = line.split(',');
		if (data.length == headers.length) {

			const tarr = [];
			for (let val of data) tarr.push(val);
			lines.push(tarr);
		}
	}
	return {
		headers: headers,
		lines: lines
	}
}
const generateArrays = (n, f0, f1, f2, incremento = 1) => {
	let labels = [],
		arr0 = [],
		arr1 = [],
		arr2 = [];
	for (let i = 0; i < n; i += incremento) {
		labels.push(i);
	}

	return {
		labels: labels,
		arr0: labels.map(f0),
		arr1: labels.map(f1),
		arr2: labels.map(f2)
	}
}

$(document)
	.ready(() => {

		//SORTING CHARTS
		//Quick Sort
		$.ajax({
			type: "GET",
			url: "/assets/csv/quickSort200.csv",
			dataType: "text",
			success: data => {
				const {
					headers,
					lines
				} = processData(data);
				const info = transpose(lines);

				const quickSortChart = new Chart(document.getElementById("quick-1"), {
					type: "bar",
					data: {
						labels: info[0],
						datasets: [{
								label: "Average Time",
								data: info[4],
								type: 'line',
								fill: true,
								borderColor: "rgb(75, 192, 192)",
								lineTension: 0.5,
								yAxisID: 'right'
							},
							{
								label: "Average Recursive Calls",
								data: info[3],
								backgroundColor: 'rgb(200, 140, 20)',
								lineTension: 0.5,
								yAxesIdsID: 'left'
							}
						]
					},
					options: {
						title: {
							display: true,
							text: 'Quick Sort - RANDOM'
						},
						tooltips: {
							mode: 'label',
							callbacks: {
								title: (item, data) => `Size: ${item[0].xLabel}`
							}
						},
						scales: {
							yAxes: [{
								id: 'left',
								type: 'linear',
								position: 'left',
								ticks: {
									beginAtZero: true
								}
							}, {
								id: 'right',
								type: 'linear',
								position: 'right',
								ticks: {
									beginAtZero: true
								}
							}]
						}
					}
				});
			}
		});


		//Merge Sort
		$.ajax({
			type: "GET",
			url: "/assets/csv/mergeSort200.csv",
			dataType: "text",
			success: data => {
				const {
					headers,
					lines
				} = processData(data);
				const info = transpose(lines);

				const mergeSortChart = new Chart(document.getElementById("merge-1"), {
					type: "bar",
					data: {
						labels: info[0],
						datasets: [{
								label: "Average Time",
								data: info[4],
								type: 'line',
								fill: true,
								borderColor: "rgb(75, 192, 192)",
								lineTension: 0.5,
								yAxisID: 'right'
							},
							{
								label: "Average Recursive Calls",
								data: info[3],
								backgroundColor: 'rgb(200, 140, 20)',
								lineTension: 0.5,
								yAxesIdsID: 'left'
							}
						]
					},
					options: {
						title: {
							display: true,
							text: 'Merge Sort - RANDOM'
						},
						tooltips: {
							mode: 'label',
							callbacks: {
								title: (item, data) => `Size: ${item[0].xLabel}`
							}
						},
						scales: {
							yAxes: [{
								id: 'left',
								type: 'linear',
								position: 'left',
								ticks: {
									beginAtZero: true
								}
							}, {
								id: 'right',
								type: 'linear',
								position: 'right',
								ticks: {
									beginAtZero: true
								}
							}]
						}
					}
				});
			}
		});

		//Merge Sort
		$.ajax({
			type: "GET",
			url: "/assets/csv/radixSort200.csv",
			dataType: "text",
			success: data => {
				const {
					headers,
					lines
				} = processData(data);
				const info = transpose(lines);

				const radixSortChart = new Chart(document.getElementById("radix-1"), {
					type: "bar",
					data: {
						labels: info[0],
						datasets: [{
								label: "Average Time",
								data: info[4],
								type: 'line',
								fill: true,
								borderColor: "rgb(75, 192, 192)",
								lineTension: 0.5,
								yAxisID: 'right'
							},
							{
								label: "Average Recursive Calls",
								data: info[3],
								backgroundColor: 'rgb(200, 140, 20)',
								lineTension: 0.5,
								yAxesIdsID: 'left'
							}
						]
					},
					options: {
						title: {
							display: true,
							text: 'Radix Sort - RANDOM'
						},
						tooltips: {
							mode: 'label',
							callbacks: {
								title: (item, data) => `Size: ${item[0].xLabel}`
							}
						},
						scales: {
							yAxes: [{
								id: 'left',
								type: 'linear',
								position: 'left',
								ticks: {
									beginAtZero: true
								}
							}, {
								id: 'right',
								type: 'linear',
								position: 'right',
								ticks: {
									beginAtZero: true
								}
							}]
						}
					}
				});
			}
		});

		// Comparison
		$.when($.ajax('/assets/csv/quickSort200.csv'),
				$.ajax('/assets/csv/mergeSort200.csv'),
				$.ajax('/assets/csv/radixSort200.csv'))
			.done((...data) => {
				let parsedData = data.map(each => processData(each[0]));
				let labels = parsedData.map(sort => transpose(sort['lines'])[0]);
				let times = parsedData.map(sort => transpose(sort['lines'])[4]);

				const sortedChart = new Chart(document.getElementById("timeComparsion-1"), {
					type: "line",
					data: {
						labels: labels[0],
						datasets: [{
								label: "Quick Sort",
								data: times[0],
								fill: false,
								borderColor: "rgb(75, 192, 192)",
								lineTension: 0.5
							},
							{
								label: "Merge Sort",
								data: times[1],
								fill: false,
								borderColor: "rgb(192, 75, 192)",
								lineTension: 0.5
							},
							{
								label: "Radix Sort",
								data: times[2],
								fill: false,
								borderColor: "rgb(192, 192, 75)",
								lineTension: 0.5
							}
						]
					},
					options: {
						title: {
							display: true,
							text: "Random array times"
						},
						pan: {
							enabled: true,
							mode: 'xy'
						},
						tooltips: {
							mode: 'label'
						},
						hover: {
							mode: 'dataset'
						},
						zoom: {
							sensitivity: 0.5,
							enabled: true,
							mode: 'xy'
						},
						scales: {
							yAxes: [{
								type: 'linear',
								position: 'left',
								ticks: {
									beginAtZero: true
								}
							}]
						}
					}
				})
			});


		//DATA STRUCTURES
		//Quick Sort
		$.when($.ajax('/assets/csv/quickSortFiles200.csv'),
				$.ajax('/assets/csv/mergeArrays200.csv'),
				$.ajax('/assets/csv/selectionTree200.csv'))
			.done((...data) => {
				let parsedData = data.map(each => processData(each[0]));
				let labels = parsedData.map(sort => transpose(sort['lines'])[0]);
				let times = parsedData.map(sort => transpose(sort['lines'])[2]);

				const sortedChart = new Chart(document.getElementById("dataStructures-1"), {
					type: "line",
					data: {
						labels: labels[2].map(val => val * 200),
						datasets: [{
								label: "Quick Sort",
								data: times[0],
								fill: false,
								borderColor: "rgb(75, 192, 192)",
								lineTension: 0.5
							},
							{
								label: "Merge Arrays",
								data: times[1],
								fill: false,
								borderColor: "rgb(192, 75, 192)",
								lineTension: 0.5
							},
							{
								label: "Selection Tree",
								data: times[2],
								fill: false,
								borderColor: "rgb(192, 192, 75)",
								lineTension: 0.5
							}
						]
					},
					options: {
						title: {
							display: true,
							text: "Random array times"
						},
						pan: {
							enabled: true,
							mode: 'xy'
						},
						tooltips: {
							mode: 'label'
						},
						hover: {
							mode: 'dataset'
						},
						zoom: {
							sensitivity: 0.5,
							enabled: true,
							mode: 'xy'
						},
						scales: {
							yAxes: [{
								type: 'linear',
								position: 'left',
								ticks: {
									beginAtZero: true
								}
							}]
						}
					}
				})
			});
	});


/* ============================
   * TABLE CODE
   */

  const AMAZON_API = ' https://m9qx1gsg88.execute-api.sa-east-1.amazonaws.com/prod';

  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

  $('#submitButton').click(e => {
    e.preventDefault();

    const preSortingAlgorithm = $('#sortingAlgorithm')[0].value.split('/');
    const sortingAlgorithm = preSortingAlgorithm[0];
    const shellType = preSortingAlgorithm.len === 2 ? preSortingAlgorithm[1] : '';
    const arrayType = $('#arrayType')[0].value;
    const arraySize = parseInt($('#arraySize')[0].value);
    const customValue = $('#customField')[0].value.split(' ').map(x => parseInt(x)).join(',');

    const errorMessage = msg => {
      const table = $('#playgroundTable');
      
      $('#information').hide(0);
      $('#playgroundTable').append($('<tr></tr>').append($('<td></td>').append(table[0].children.length)).append($('<td></td>').append(sortingAlgorithm.split('-').map(capitalize).join(' '))).append($('<td></td>').append(capitalize(arrayType))).append($('<td></td>').append(
        msg)).append($(
        '<td></td>').append('-')).append($(
        '<td></td>').append(
        '-')));
    }
    if (arrayType == 'custom' && !isNaN(customValue[0])) {
      
      $.ajax({
        url: `${AMAZON_API}/custom/${sortingAlgorithm}?array=${customValue}&type=${shellType}`,
        async: true,
        crossDomain: true,
        cache: false,
        dataType: 'json',
        contentType: 'application/json',
      }).then(data => {
        if (data.errorMessage) {
          errorMessage('TIMED OUT! Max. allowed running time is 3 seconds');
          return;
        }

        $('#information').hide(0);
        const table = $('#playgroundTable');
        const {
          changes,
          time
        } = data.response;

        table.append($('<tr></tr>').append($('<td></td>').append(table[0].children.length)).append($('<td></td>').append(sortingAlgorithm.split('-').map(capitalize).join(' '))).append($('<td></td>').append(capitalize(arrayType))).append($('<td></td>')
          .append(
            data.size)).append($(
          '<td></td>').append(time)).append($(
          '<td></td>').append(
          changes)));
      }).catch(console.error);

    } else if (arrayType != 'custom' && !isNaN(arraySize)) {
      $.ajax({
        url: `${AMAZON_API}/${arrayType}/${sortingAlgorithm}?size=${arraySize}&type=${shellType}`,
        async: true,
        crossDomain: true,
        cache: false,
        dataType: 'json',
        contentType: 'application/json',
      }).then(data => {        
        if (data.errorMessage) {
          errorMessage('TIMED OUT! Max. allowed running time is 3 seconds');
          return;
        }

        $('#information').hide(0);
        const table = $('#playgroundTable');
        const {
          changes,
          time
        } = data.response;

        table.append($('<tr></tr>').append($('<td></td>').append(table[0].children.length)).append($('<td></td>').append(sortingAlgorithm.split('-').map(capitalize).join(' '))).append($('<td></td>').append(capitalize(arrayType))).append($('<td></td>')
          .append(
            arraySize)).append($(
          '<td></td>').append(time)).append($(
          '<td></td>').append(
          changes)));
      }).catch(console.error);
    } else {
      errorMessage('BAD REQUISITION');
      return;
    }
  })

  $('#arrayType').change(e => {
    if (e.target.value == 'custom') {
      $('#customFieldDiv').show(0)
      $('#arraySizeDiv').hide(0)
    } else {
      $('#customFieldDiv').hide(0)
      $('#arraySizeDiv').show(0)
    }
  });

  $('#resetTable').click(e => {
    const table = $('#playgroundTable');
    const length = table[0].children.length
    $('#information').show(0);
    for (let i = 1; i < length; i++)
      table[0].deleteRow(1);
  })
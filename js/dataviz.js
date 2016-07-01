$(document).ready(function(){
	// Pas de cache sur les requête IMPORTANT !
	$.ajaxSetup({ cache: false });
	
	/*** 
		On définit ici les fonctions de base qui vont nous servir à la récupération des données
		Je ne définis que le GET ici, mais il est possible d'utiliser POST pour récupérer ses données (on le verra dans un prochain TP)
	****/
	function getRequest(url, callback) {
		$.get(url, function(data) {
			data = $.parseJSON(data);
			return callback(data);
		});
	}

	google.charts.load('current', {packages: ['corechart', 'geochart', 'scatter']});

	/***************************************
		Chart 1: Departure Order
	****************************************/


	// getRequest("webservices/departure.php", function(data_dep) {
	// 	departure_array = [['Departure', 'Number of departure',],];
	// 	var total = 0;
	// 	for (var i = 0; i<10; i++) {
	// 			var dep = data_dep[i]['airport_dep'];
	// 			var num = data_dep[i]['num'];
	// 			total += data_dep[i]['num'];
	// 			departure_array.push([dep, num]);

	// 	}
	// 	departure(departure_array);
	// 	// for (var i = 0; i<data_dep.length; i++) {
	// 	// 		total += data_dep[i]['num'];
	// 	// }
	// 	// departure_array.push(['Total', total]);

	// });

	// function departure() {
 //      var data = google.visualization.arrayToDataTable(departure_array);

 //      var options = {
 //        title: 'Departure order (First Ten)',
 //        chartArea: {width: '50%'},
 //        hAxis: {
 //          title: 'Departure order',
 //          minValue: 0
 //        },
 //        vAxis: {
 //          title: 'Airports'
 //        }
 //      };

 //      var chart = new google.visualization.BarChart(document.getElementById('departure'));

 //      chart.draw(data, options);
 //    }

	/***************************************
		Chart 2: Arrival Order
	****************************************/

	// getRequest("webservices/arrival.php", function(data_arr) {
	// 	arrival_array = [['Arrival', 'Number of arrival',],];
	// 	var total = 0;
	// 	for (var i = 0; i<10; i++) {
	// 			var dep = data_arr[i]['airport_arr'];
	// 			var num = data_arr[i]['num'];
	// 			total += data_arr[i]['num'];
	// 			arrival_array.push([dep, num]);

	// 	}
	// 	arrival(arrival_array);
	// 	// for (var i = 0; i<data_arr.length; i++) {
	// 	// 		total += data_arr[i]['num'];
	// 	// }
	// 	// arrival_array.push(['Total', total]);

	// });

	// function arrival() {
 //      var data = google.visualization.arrayToDataTable(arrival_array);

 //      var options = {
 //        title: 'Arrival order (First Ten)',
 //        chartArea: {width: '50%'},
 //        hAxis: {
 //          title: 'Arrival order',
 //          minValue: 0
 //        },
 //        vAxis: {
 //          title: 'Airports'
 //        }
 //      };

 //      var chart = new google.visualization.BarChart(document.getElementById('arrival'));

 //      chart.draw(data, options);
 //    }

	/***************************************
		Chart 3: Arrival Departure
	****************************************/

	getRequest("webservices/arrival.php", function(datas_arr) {
		getRequest("webservices/departure.php", function(datas_dep) {
			arrival_departure_array = [['Arrival', 'Number of arrival', 'Number of departure',],];
			var total = 0;
			for (var i = 0; i<10; i++) {
					var dep = datas_dep[i]['airport_dep'];
					var num_dest = datas_dep[i]['num'];
					for (var j = 0; j<datas_arr.length; j++) {
							if (datas_arr[j]['airport_arr'] == dep) {
								var num_arr = datas_arr[j]['num'];
								
							}
					}
					arrival_departure_array.push([dep, num_dest, num_arr]);
			};
			departure_arrival(arrival_departure_array);
		});
	});
	


	function departure_arrival() {
      var data = google.visualization.arrayToDataTable(arrival_departure_array);

      var options = {
        title: 'Departure-Arrival order (First Ten)',
        chartArea: {width: '50%'},
        hAxis: {
          title: 'Departure-Arrival order',
          minValue: 0
        },
        vAxis: {
          title: 'Airports'
        }
      };

      var chart = new google.visualization.BarChart(document.getElementById('departure_arrival'));

      chart.draw(data, options);
    }

	/***************************************
		Chart 4: Carriers Desc
	****************************************/

	getRequest("webservices/carriers.php", function(datas_carriers) {
		carriers_array = [['Carriers Name', 'Number of flights'],];
		var total = 0;
		for (var i = 0; i<10; i++) {
				var name = datas_carriers[i]['carriers_name'];
				var num_carriers = datas_carriers[i]['num'];
				carriers_array.push([name, num_carriers]);
		};
		Carriers(carriers_array);
	});
	


	function Carriers() {

        var data = google.visualization.arrayToDataTable(carriers_array);

        var options = {
          title: 'Number of carriers used'
        };

        var chart = new google.visualization.PieChart(document.getElementById('carriers'));

        chart.draw(data, options);
      };

	/***************************************
		Chart 5: Combo Chart
	****************************************/

	getRequest("webservices/distance_dayofweek.php", function(datas_carriers_distance) {
		carriers_distance_array = [['Day of Week', 'Southwest Airlines Co.', 'Skywest Airlines Inc.', 'US Airways', 'United Air Lines Inc.', 'Expressjet Airlines','Delta Air Lines Inc.', 'Average'],];
		days = {1:'Lundi', 2:'Mardi', 3:'Mercredi', 4:'Jeudi', 5:'Vendredi', 6:'Samedi', 7:'Dimanche'};
		for (var i = 0; i<=7; i++) {
			distancewn = distanceua = distanceus = distancedl= distanceoo = distancexe = undefined;
			for (var j = 0; j<datas_carriers_distance.length; j++) {
					if (datas_carriers_distance[j]['day_of_week'] == i){
						if (datas_carriers_distance[j]['carriers_code'] == 'WN'){
							distancewn = datas_carriers_distance[j]['distance'];
						} 
						else if (datas_carriers_distance[j]['carriers_code'] == 'UA'){
							distanceua = datas_carriers_distance[j]['distance'];
						}
						else if (datas_carriers_distance[j]['carriers_code'] == 'US'){
							distanceus = datas_carriers_distance[j]['distance'];
						}
						else if (datas_carriers_distance[j]['carriers_code'] == 'DL'){
							distancedl = datas_carriers_distance[j]['distance'];
						}
						else if (datas_carriers_distance[j]['carriers_code'] == 'OO'){
							distanceoo = datas_carriers_distance[j]['distance'];
						}
						else if (datas_carriers_distance[j]['carriers_code'] == 'XE'){
							distancexe = datas_carriers_distance[j]['distance'];
						}
					}
			};
			if ((distancewn != undefined)&&(distanceua != undefined)&&(distanceus != undefined)&&(distancedl != undefined)&&(distanceoo != undefined)&&(distancexe != undefined)){
				average = (distancewn+distanceua+distanceus+distancedl+distanceoo+distancexe)/6;
				carriers_distance_array.push([days[i], distancewn, distanceoo, distanceus, distanceua, distancexe, distancedl, average]);
			}	
		};
		CarriersDistance(carriers_distance_array);
	});
	


	function CarriersDistance() {

        var data = google.visualization.arrayToDataTable(carriers_distance_array);

	    var options = {
	      title : 'Flights by day',
	      vAxis: {title: 'Miles'},
	      seriesType: 'bars',
	      series: {6: {type: 'line'}}
	    };

		var chart = new google.visualization.ComboChart(document.getElementById('combo_chart'));
    	chart.draw(data, options);
      };

	/***************************************
		Chart 6: MAP
	****************************************/
	getRequest("webservices/arrival.php", function(datas_arr) {
		getRequest("webservices/departure.php", function(datas_dep) {
			map_array = [['City', 'Departure', 'Arrival'],];
			var total = 0;
			for (var i = 0; i<20; i++) {
					var dep = datas_dep[i]['origin'];
					var num_dest = datas_dep[i]['num'];
					for (var j = 0; j<datas_arr.length; j++) {
							if (datas_arr[j]['dest'] == dep) {
								var num_arr = datas_arr[j]['num'];
							}
					}
					map_array.push([datas_dep[i]['origin_city'], num_dest, num_arr]);
			};
			Map(map_array);
		});
	});
	

	function Map() {
		var data = google.visualization.arrayToDataTable(map_array);

		var options = {
		title: 'Departure-Arrival Map',
		region: 'US',
		displayMode: 'markers',
		colorAxis: {colors: ['#e7711c', '#4374e0']}
		};

		var chart = new google.visualization.GeoChart(document.getElementById('map'));
		chart.draw(data, options);
	};

	/***************************************
		Chart 7: MAP - DELAY : Retard du vol en fonction de l'aéroport de départ
	****************************************/
	getRequest("webservices/delays_dep.php", function(datas_delays) {
		map_array_delays_dep = [['Etat', 'Retard par avion en minutes (en fonction de l\'aéroport de départ)'],];
		var total = 0;
		for (var i = 0; i<datas_delays.length; i++) {
				var state = datas_delays[i]['state'];
				var total_delay = datas_delays[i]['total_delay']/datas_delays[i]['total_departure'];
				// var weather_delay = datas_delays[i]['weather_delay'];
				// var carrier_delay = datas_delays[i]['carrier_delay'];
				// var nas_delay = datas_delays[i]['nas_delay'];
				// var aircraft_delay = datas_delays[i]['aircraft_delay'];
				map_array_delays_dep.push([state, Math.round(total_delay*100)/100]);
		};
		MapDelays(map_array_delays_dep);
	});
	

	function MapDelays() {
		var data = google.visualization.arrayToDataTable(map_array_delays_dep);

		var options = {
		title: 'Delays Map',
		region: 'US',
		resolution: 'provinces',
		colorAxis: {colors: ['#4374e0', '#e7711c']}
		};

		var chart = new google.visualization.GeoChart(document.getElementById('map_delays_dep'));
		chart.draw(data, options);
	};

	/***************************************
		Chart 8: MAP - DELAY : Retard du vol en fonction de l'aéroport d'arrivée
	****************************************/
	getRequest("webservices/delays_arr.php", function(datas_delays) {
		map_array_delays_dest = [['Etat', 'Retard par avion en minutes (en fonction de l\'aéroport d\'arrivée)'],];
		var total = 0;
		for (var i = 0; i<datas_delays.length; i++) {
				var state = datas_delays[i]['state'];
				var total_delay = datas_delays[i]['total_delay']/datas_delays[i]['total_arrival'];
				// var weather_delay = datas_delays[i]['weather_delay'];
				// var carrier_delay = datas_delays[i]['carrier_delay'];
				// var nas_delay = datas_delays[i]['nas_delay'];
				// var aircraft_delay = datas_delays[i]['aircraft_delay'];
				map_array_delays_dest.push([state, Math.round(total_delay*100)/100]);
		};
		MapDelaysDest(map_array_delays_dest);
	});
	

	function MapDelaysDest() {
		var data = google.visualization.arrayToDataTable(map_array_delays_dest);

		var options = {
		title: 'Delays Map',
		region: 'US',
		resolution: 'provinces',
		colorAxis: {colors: ['#4374e0', '#e7711c']}
		};

		var chart = new google.visualization.GeoChart(document.getElementById('map_delays_dest'));
		chart.draw(data, options);
	};

	/***************************************
		Chart 9: Distance/Retard
	****************************************/
	getRequest("webservices/distance_delay.php", function(datas_distance_delays) {
		distance_delays_compute = [['Date de construction de l\'avion', 'Distance', 'Retard'],];
		distance_year = [['Date de construction de l\'avion', 'Distance'],];
		delay_year = [['Date de construction de l\'avion', 'Retard'],];
		distance_year_bis = [['Date de construction de l\'avion', 'Distance'],];
		delay_year_bis = [['Date de construction de l\'avion', 'Retard'],];
		for (var i = 0; i<datas_distance_delays.length; i++) {
				var distance = datas_distance_delays[i]['distance'];
				var total_delay = datas_distance_delays[i]['total_delay'];
				var year = datas_distance_delays[i]['year'];
				var nb_avion = datas_distance_delays[i]['nb_avion'];
				distance_year.push([year, distance]);
				real_distance = distance/nb_avion;
				distance_year_bis.push([year, real_distance]);
				if (total_delay > 0){
					real_total_delay = total_delay/nb_avion;
					distance_delays_compute.push([year, real_distance, real_total_delay]);
					delay_year.push([year, total_delay]);
					delay_year_bis.push([year, real_total_delay]);
				}
				
		};
		DistanceDelayCompute(distance_delays);
		DistanceYear(distance_year);
		DelayYear(delay_year);
		DelayYearBIS(delay_year_bis);
		DistanceYearBIS(distance_year_bis);
	});
	

	function DistanceDelayCompute() {
        var data = google.visualization.arrayToDataTable(distance_delays_compute);
		var options = {
          chart: {
            title: 'Retard par avion / Distance par avion',
            subtitle: 'par Date de construction des avions'
          },
          hAxis: {format:'',},
          vAxis: {},

          series: {
            0: {axis: 'Distance par avion en Miles'},
            1: {axis: 'Retard par avion en minutes'}
          },
          axes: {
            y: {
              'Distance par avion en Miles': {label: 'Distance par avion en Miles'},
              'Retard par avion en minutes': {label: 'Retard par avion en minutes'}
            }
          },
        };
		var chart = new google.charts.Scatter(document.getElementById('distance_delays'));

        chart.draw(data, google.charts.Scatter.convertOptions(options));
      
  	}

 	/***************************************
		Chart 9bis: Distance/Retard
	****************************************/
	function DistanceYear() {
        var data = google.visualization.arrayToDataTable(distance_year);



        var options = {
          title: 'Distance total en Miles / Année de construction des avions',
          hAxis: {title: 'Année de construction', format:''},
          vAxis: {title: 'Distance en Miles parcouru', format:'',},
          legend: 'none',
          trendlines: { 0: {} }
        };

        var chart = new google.visualization.ScatterChart(document.getElementById('distance_year'));

        chart.draw(data, options);
      
  	}

	function DistanceYearBIS() {
        var data = google.visualization.arrayToDataTable(distance_year_bis);



        var options = {
          title: 'Distance par avion par année de construction',
          hAxis: {title: 'Année de construction', format:''},
          vAxis: {title: 'Distance en Miles parcouru', format:'',},
          legend: 'none',
          trendlines: { 0: {} },
        };

        var chart = new google.visualization.ScatterChart(document.getElementById('distance_year_bis'));

        chart.draw(data, options);
      
  	}
 	/***************************************
		Chart 9ter: Distance/Retard
	****************************************/
	function DelayYear() {

        var data = google.visualization.arrayToDataTable(delay_year);



        var options = {
          title: 'Retard total en Minutes / Année de construction des avions',
          hAxis: {title: 'Année de construction', format:''},
          vAxis: {title: 'Retard en minutes', format:''},
          legend: 'none',
          trendlines: { 0: {} },
          series: {0:{color: 'green'},1:{color: 'green'}},
        };

        var chart = new google.visualization.ScatterChart(document.getElementById('delay_year'));

        chart.draw(data, options);
      
  	}
	function DelayYearBIS() {

        var data = google.visualization.arrayToDataTable(delay_year_bis);



        var options = {
          title: 'Retard par avion par année de construction',
          hAxis: {title: 'Année de construction', format:''},
          vAxis: {title: 'Retard en minutes', format:''},
          legend: 'none',
          trendlines: { 0: {} },
          series: {0:{color: 'green'},1:{color: 'green'}},
        };

        var chart = new google.visualization.ScatterChart(document.getElementById('delay_year_bis'));

        chart.draw(data, options);
      
  	}
  	/***************************************
		Chart 10: Manufacturer/Day of month
	****************************************/
	getRequest("webservices/manufacturer_daymonth.php", function(datas_man_day) {
		manufacturerday = [['Day', 'Boeing', 'Bombardier', 'Embraer', 'Airbus', 'Average'],];
		for (var i = 1; i<=31; i++) {
			airbus = boeing = bombardier = embraer= undefined;
			for (var j = 0; j<datas_man_day.length; j++) {
					if (datas_man_day[j]['day'] == i){
						if (datas_man_day[j]['manufacturer'] == 'BOEING'){
							boeing = datas_man_day[j]['num'];
						} 
						else if (datas_man_day[j]['manufacturer'] == 'BOMBARDIER'){
							bombardier = datas_man_day[j]['num'];
						}
						else if (datas_man_day[j]['manufacturer'] == 'EMBRAER'){
							embraer = datas_man_day[j]['num'];
						}
						else if (datas_man_day[j]['manufacturer'] == 'AIRBUS'){
							airbus = datas_man_day[j]['num'];
						}
					}
			};
			if ((boeing != undefined)&&(bombardier != undefined)&&(embraer != undefined)&&(airbus != undefined)){
				average = (boeing+bombardier+embraer+airbus)/4;
				manufacturerday.push([i, boeing, bombardier, embraer, airbus, average]);
			}	
		};
		ManufacturerDay(manufacturerday);
	});
	

	function ManufacturerDay() {
        var data = google.visualization.arrayToDataTable(manufacturerday);

        var options = {
          title: 'Vols par marque / jour du mois',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('manufacturer_day'));

        chart.draw(data, options);
      }
	/***************************************
		Chart 11: Construction Year / Flights
	****************************************/
	getRequest("webservices/year_construction_num_flights.php", function(datas_year_flights) {
		yearflights = [['Année de construction', 'Nombre d\'avion'],];
		for (var i = 0; i<datas_year_flights.length; i++) {
				yearflights.push([datas_year_flights[i]['year'], datas_year_flights[i]['nb_avion']])
		};
		YearFlights(yearflights);
	});
	

	function YearFlights() {
        var data = google.visualization.arrayToDataTable(yearflights);

        var options = {
	        hAxis: {
	          title: 'Année de construction',
	          format:'',
	        },
	        vAxis: {
	          title: 'Nombre d\'avion'
	        },
	        colors: ['#a52714', '#097138'],
	        crosshair: {
	          color: '#000',
	          trigger: 'selection'
	        }
      	};

        var chart = new google.visualization.LineChart(document.getElementById('year_flights'));

        chart.draw(data, options);
      }
});
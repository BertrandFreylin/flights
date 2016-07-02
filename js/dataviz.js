$(document).ready(function() {
    // Pas de cache sur les requête IMPORTANT !
    $('.graph').addClass("loading");
    $('.graph_middle').addClass("loading");

    $.ajaxSetup({ cache: false });


    function getRequest(url, callback) {
        $.get(url, function(data) {
            data = $.parseJSON(data);
            return callback(data);
        });
    }

    google.charts.load('current', { packages: ['corechart', 'geochart', 'scatter'] });


    /***************************************
    	Chart 3: Arrival Departure
    ****************************************/

    getRequest("webservices/arrival.php", function(datas_arr) {
        getRequest("webservices/departure.php", function(datas_dep) {
            arrival_departure_array = [
                ['Aéroport', 'Nombre de départ', 'Nombre d\'arrivée', ],
            ];
            var total = 0;
            for (var i = 0; i < 20; i++) {
                var dep = datas_dep[i]['airport_dep'];
                var city = datas_dep[i]['airport_city'];
                var num_dest = datas_dep[i]['num'];
                for (var j = 0; j < datas_arr.length; j++) {
                    if (datas_arr[j]['airport_arr'] == dep) {
                        var num_arr = datas_arr[j]['num'];

                    }
                }
                arrival_departure_array.push([city, num_dest, num_arr]);
            };
            departure_arrival(arrival_departure_array);
        });
    });



    function departure_arrival() {
        var data = google.visualization.arrayToDataTable(arrival_departure_array);

        var options = {
            title: 'Départ-Arrivée',
            chartArea: { width: '50%' },
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
        carriers_array = [
            ['Nom de la compagnie', 'Nombre de vols'],
        ];
        var total = 0;
        for (var i = 0; i < datas_carriers.length; i++) {
            var name = datas_carriers[i]['carriers_name'];
            var num_carriers = datas_carriers[i]['num'];
            carriers_array.push([name, num_carriers]);
        };
        Carriers(carriers_array);
    });



    function Carriers() {

        var data = google.visualization.arrayToDataTable(carriers_array);

        var options = {
            title: 'Pourcentage par compagnie'
        };

        var chart = new google.visualization.PieChart(document.getElementById('carriers'));

        chart.draw(data, options);
    };

    /***************************************
    	Chart 5: Combo Chart
    ****************************************/

    getRequest("webservices/distance_dayofmonth.php", function(datas_carriers_distance) {
        carriers_distance_array = [
            ['Jour du mois', 'Southwest Airlines Co.', 'Skywest Airlines Inc.', 'US Airways', 'United Air Lines Inc.', 'Expressjet Airlines', 'Delta Air Lines Inc.', 'Moyenne'],
        ];

        for (var i = 1; i <= 31; i++) {
            distancewn = distanceua = distanceus = distancedl = distanceoo = distancexe = undefined;
            for (var j = 0; j < datas_carriers_distance.length; j++) {
                if (datas_carriers_distance[j]['day_of_month'] == i) {
                    if (datas_carriers_distance[j]['carriers_code'] == 'WN') {
                        distancewn = datas_carriers_distance[j]['distance'];
                    } else if (datas_carriers_distance[j]['carriers_code'] == 'UA') {
                        distanceua = datas_carriers_distance[j]['distance'];
                    } else if (datas_carriers_distance[j]['carriers_code'] == 'US') {
                        distanceus = datas_carriers_distance[j]['distance'];
                    } else if (datas_carriers_distance[j]['carriers_code'] == 'DL') {
                        distancedl = datas_carriers_distance[j]['distance'];
                    } else if (datas_carriers_distance[j]['carriers_code'] == 'OO') {
                        distanceoo = datas_carriers_distance[j]['distance'];
                    } else if (datas_carriers_distance[j]['carriers_code'] == 'XE') {
                        distancexe = datas_carriers_distance[j]['distance'];
                    }
                }
            };
            if ((distancewn != undefined) && (distanceua != undefined) && (distanceus != undefined) && (distancedl != undefined) && (distanceoo != undefined) && (distancexe != undefined)) {
                average = (distancewn + distanceua + distanceus + distancedl + distanceoo + distancexe) / 6;
                carriers_distance_array.push([i, distancewn, distanceoo, distanceus, distanceua, distancexe, distancedl, average]);
            }
        };
        CarriersDistance(carriers_distance_array);
    });



    function CarriersDistance() {

        var data = google.visualization.arrayToDataTable(carriers_distance_array);

        var options = {
            title: 'Distance par jour du mois',
            vAxis: { title: 'Miles' },
            seriesType: 'bars',
            series: { 6: { type: 'line' } },
            explorer: { actions: ['dragToZoom', 'rightClickToReset'] }
        };

        var chart = new google.visualization.ComboChart(document.getElementById('combo_chart'));
        chart.draw(data, options);
    };

    /***************************************
    	Chart 6: MAP
    ****************************************/
    getRequest("webservices/arrival.php", function(datas_arr) {
        getRequest("webservices/departure.php", function(datas_dep) {
            map_array = [
                ['City', 'Departure', 'Arrival'],
            ];
            var total = 0;
            for (var i = 0; i < 20; i++) {
                var dep = datas_dep[i]['origin'];
                var num_dest = datas_dep[i]['num'];
                for (var j = 0; j < datas_arr.length; j++) {
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
            colorAxis: { colors: ['#e7711c', '#4374e0'] },
            legend: {},
        };

        var chart = new google.visualization.GeoChart(document.getElementById('map'));
        chart.draw(data, options);
    };

    /***************************************
    	Chart 7: MAP - DELAY : Retard du vol en fonction de l'aéroport de départ
    ****************************************/
    getRequest("webservices/delays_dep.php", function(datas_delays) {
        map_array_delays_dep = [
            ['Etat', 'Retard moyen d\'un vol en minutes (en fonction de l\'aéroport de départ)'],
        ];
        var total = 0;
        for (var i = 0; i < datas_delays.length; i++) {
            var state = datas_delays[i]['state'];
            var total_delay = datas_delays[i]['total_delay'] / datas_delays[i]['total_departure'];
            // var weather_delay = datas_delays[i]['weather_delay'];
            // var carrier_delay = datas_delays[i]['carrier_delay'];
            // var nas_delay = datas_delays[i]['nas_delay'];
            // var aircraft_delay = datas_delays[i]['aircraft_delay'];
            map_array_delays_dep.push([state, Math.round(total_delay * 100) / 100]);
        };
        MapDelays(map_array_delays_dep);
    });


    function MapDelays() {
        var data = google.visualization.arrayToDataTable(map_array_delays_dep);

        var options = {
            title: 'Delays Map',
            region: 'US',
            resolution: 'provinces',
            colorAxis: { colors: ['#4374e0', '#e7711c'] }
        };

        var chart = new google.visualization.GeoChart(document.getElementById('map_delays_dep'));
        chart.draw(data, options);
    };

    /***************************************
    	Chart 8: MAP - DELAY : Retard du vol en fonction de l'aéroport d'arrivée
    ****************************************/
    getRequest("webservices/delays_arr.php", function(datas_delays) {
        map_array_delays_dest = [
            ['Etat', 'Retard moyen d\'un vol en minutes (en fonction de l\'aéroport d\'arrivée)'],
        ];
        var total = 0;
        for (var i = 0; i < datas_delays.length; i++) {
            var state = datas_delays[i]['state'];
            var total_delay = datas_delays[i]['total_delay'] / datas_delays[i]['total_arrival'];
            // var weather_delay = datas_delays[i]['weather_delay'];
            // var carrier_delay = datas_delays[i]['carrier_delay'];
            // var nas_delay = datas_delays[i]['nas_delay'];
            // var aircraft_delay = datas_delays[i]['aircraft_delay'];
            map_array_delays_dest.push([state, Math.round(total_delay * 100) / 100]);
        };
        MapDelaysDest(map_array_delays_dest);
    });


    function MapDelaysDest() {
        var data = google.visualization.arrayToDataTable(map_array_delays_dest);

        var options = {
            title: 'Delays Map',
            region: 'US',
            resolution: 'provinces',
            colorAxis: { colors: ['#4374e0', '#e7711c'] }
        };

        var chart = new google.visualization.GeoChart(document.getElementById('map_delays_dest'));
        chart.draw(data, options);
    };

    /***************************************
    	Chart 9: Distance/Retard
    ****************************************/
    getRequest("webservices/distance_delay.php", function(datas_distance_delays) {
        distance_delays_compute = [
            ['Date de construction de l\'avion', 'Distance', 'Retard'],
        ];
        distance_year = [
            ['Date de construction de l\'avion', 'Distance'],
        ];
        delay_year = [
            ['Date de construction de l\'avion', 'Retard'],
        ];
        distance_year_bis = [
            ['Date de construction de l\'avion', 'Distance'],
        ];
        delay_year_bis = [
            ['Date de construction de l\'avion', 'Retard'],
        ];
        for (var i = 0; i < datas_distance_delays.length; i++) {
            var distance = datas_distance_delays[i]['distance'];
            var total_delay = datas_distance_delays[i]['total_delay'];
            var year = datas_distance_delays[i]['year'];
            var nb_avion = datas_distance_delays[i]['nb_avion'];
            distance_year.push([year, distance]);
            real_distance = distance / nb_avion;
            distance_year_bis.push([year, real_distance]);
            if (total_delay > 0) {
                real_total_delay = total_delay / nb_avion;
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
            hAxis: { format: '', },
            vAxis: {},

            series: {
                0: { axis: 'Distance par avion en Miles' },
                1: { axis: 'Retard par avion en minutes' }
            },
            axes: {
                y: {
                    'Distance par avion en Miles': { label: 'Distance par avion en Miles' },
                    'Retard par avion en minutes': { label: 'Retard par avion en minutes' }
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
            hAxis: { title: 'Année de construction', format: '' },
            vAxis: { title: 'Distance en Miles parcouru', format: '', },
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
            hAxis: { title: 'Année de construction', format: '' },
            vAxis: { title: 'Distance en Miles parcouru', format: '', },
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
            hAxis: { title: 'Année de construction', format: '' },
            vAxis: { title: 'Retard en minutes', format: '' },
            legend: 'none',
            trendlines: { 0: {} },
            series: { 0: { color: 'green' }, 1: { color: 'green' } },
        };

        var chart = new google.visualization.ScatterChart(document.getElementById('delay_year'));

        chart.draw(data, options);

    }

    function DelayYearBIS() {

        var data = google.visualization.arrayToDataTable(delay_year_bis);



        var options = {
            title: 'Retard par avion par année de construction',
            hAxis: { title: 'Année de construction', format: '' },
            vAxis: { title: 'Retard en minutes', format: '' },
            legend: 'none',
            trendlines: { 0: {} },
            series: { 0: { color: 'green' }, 1: { color: 'green' } },
        };

        var chart = new google.visualization.ScatterChart(document.getElementById('delay_year_bis'));

        chart.draw(data, options);

    }
    /***************************************
		Chart 10: Manufacturer/Day of month
	****************************************/
    getRequest("webservices/manufacturer_dayweek.php", function(datas_man_day) {
        manufacturerday = [
            ['Jour de la semaine', 'Boeing', 'Bombardier', 'Embraer', 'Airbus', 'Moyenne', 'Indice Retard'],
        ];
        days = { 1: 'Lundi', 2: 'Mardi', 3: 'Mercredi', 4: 'Jeudi', 5: 'Vendredi', 6: 'Samedi', 7: 'Dimanche' };
        for (var i = 1; i <= 7; i++) {
            airbus = boeing = bombardier = embraer = undefined;
            total_delay = 0;
            for (var j = 0; j < datas_man_day.length; j++) {
                if (datas_man_day[j]['day'] == i) {
                    total_delay += datas_man_day[j]['total_delay'];
                    if (datas_man_day[j]['manufacturer'] == 'BOEING') {
                        boeing = datas_man_day[j]['num'];
                    } else if (datas_man_day[j]['manufacturer'] == 'BOMBARDIER') {
                        bombardier = datas_man_day[j]['num'];
                    } else if (datas_man_day[j]['manufacturer'] == 'EMBRAER') {
                        embraer = datas_man_day[j]['num'];
                    } else if (datas_man_day[j]['manufacturer'] == 'AIRBUS') {
                        airbus = datas_man_day[j]['num'];
                    }
                }
            };
            if ((boeing != undefined) && (bombardier != undefined) && (embraer != undefined) && (airbus != undefined)) {
                average = (boeing + bombardier + embraer + airbus) / 4;
                manufacturerday.push([days[i], boeing, bombardier, embraer, airbus, average, total_delay * 10000000 / average / 2]);
            }
        };
        ManufacturerDay(manufacturerday);
    });


    function ManufacturerDay() {
        var data = google.visualization.arrayToDataTable(manufacturerday);

        var options = {
            title: 'Vols par compagnie / jour de la semaine',
            curveType: 'function',
            legend: { position: 'bottom' },
            vAxis: { minValue: 0 },
            series: { 5: { curveType: 'none' } },
        };

        var chart = new google.visualization.LineChart(document.getElementById('manufacturer_day'));

        chart.draw(data, options);
    }
    /***************************************
    	Chart 11: Construction Year / Flights
    ****************************************/
    getRequest("webservices/year_construction_num_flights.php", function(datas_year_flights) {
        yearflights = [
            ['Année de construction', 'Nombre d\'avion'],
        ];
        for (var i = 0; i < datas_year_flights.length; i++) {
            yearflights.push([datas_year_flights[i]['year'], datas_year_flights[i]['nb_avion']])
        };
        YearFlights(yearflights);
    });


    function YearFlights() {
        var data = google.visualization.arrayToDataTable(yearflights);

        var options = {
            hAxis: {
                title: 'Année de construction',
                format: '',
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

    /***************************************
    	Chart 6: MAP AIRPORT / CANCELATION / CARRIERS
    ****************************************/
    getRequest("webservices/cancel_number_airport.php", function(airport_cancel) {
        map_cancel_carrier = [
            ['Aéroport', 'Nombre d\'annulation'],
        ];
        map_cancel_carrier_ratio = [
            ['Aéroport', 'Nombre d\'annulation rationalisé'],
        ];
        for (var i = 0; i < 20; i++) {
            var airport = airport_cancel[i]['airport'];
            var ratio = airport_cancel[i]['somme_cancel'];
            var ratio_cancel = airport_cancel[i]['somme_cancel']/airport_cancel[i]['vols_total']*100;
            map_cancel_carrier.push([airport, ratio]);
            map_cancel_carrier_ratio.push([airport, ratio_cancel]);
        };
        MapCancelCarrier(map_cancel_carrier);
        MapCancelCarrierRatio(map_cancel_carrier)
    });


    function MapCancelCarrier() {
        var data = google.visualization.arrayToDataTable(map_cancel_carrier);

        var options = {
            title: 'Cancel Map',
            region: 'US',
            displayMode: 'markers',
            colorAxis: { colors: ['#e7711c', '#4374e0'] },
            legend: {},
        };

        var chart = new google.visualization.GeoChart(document.getElementById('map_cancel_carrier'));
        chart.draw(data, options);
    };

    function MapCancelCarrierRatio() {
        var data = google.visualization.arrayToDataTable(map_cancel_carrier_ratio);

        var options = {
            title: 'Cancel Map Ratio',
            region: 'US',
            displayMode: 'markers',
            colorAxis: { colors: ['#e7711c', '#4374e0'] },
            legend: {},
        };

        var chart = new google.visualization.GeoChart(document.getElementById('map_cancel_carrier_ratio'));
        chart.draw(data, options);
    };

    /***************************************
    	Chart 42: Carriers Cancel
    ****************************************/

    getRequest("webservices/cancel_number_carriers.php", function(datas_carriers_cancel) {
        carriers_cancel_array = [
            ['Annulation par compagnie', 'Nombre d\'annulation'],
        ];
        carriers_cancel_array_ratio = [
            ['Annulation par compagnie rationalisée', 'Nombre d\'annulation'],
        ];
        var total = 0;
        for (var i = 0; i < datas_carriers_cancel.length; i++) {
            var name = datas_carriers_cancel[i]['carrier'];
            var num_carriers = datas_carriers_cancel[i]['somme'];
            var num_carriers_ratio = datas_carriers_cancel[i]['somme']/datas_carriers_cancel[i]['total']*100;
            carriers_cancel_array.push([name, num_carriers]);
            carriers_cancel_array_ratio.push([name, num_carriers_ratio]);
        };
        CarriersCancel(carriers_cancel_array);
        CarriersCancelRatio(carriers_cancel_array_ratio);
    });



    function CarriersCancel() {

        var data = google.visualization.arrayToDataTable(carriers_cancel_array);

        var options = {
            title: 'Annulation par compagnie'
        };

        var chart = new google.visualization.PieChart(document.getElementById('carriers_cancel'));

        chart.draw(data, options);
    };

    function CarriersCancelRatio() {

        var data = google.visualization.arrayToDataTable(carriers_cancel_array_ratio);

        var options = {
            title: 'Annulation par compagnie rationalisée'
        };

        var chart = new google.visualization.PieChart(document.getElementById('carriers_cancel_ratio'));

        chart.draw(data, options);
    };
});

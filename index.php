<!DOCTYPE html>
<html>
<head>
	<title>Flights</title>
	<link rel="stylesheet" type="text/css" href="css/dataviz.css">
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/loader.js"></script>
	<script type="text/javascript" src="js/dataviz.js"></script>
	<script async defer src="js/async.js" type="text/javascript"></script>
	<script type="text/javascript" src="js/jsapi.js"></script>
	<script type="text/javascript" src="js/highcharts.js"></script>
</head>
	<body>
		<?php include ('structure/header.php'); ?>
		<div id="content">

<div class="graph_middle"><p class="center">Nombre de Départ/Arrivée par Aéroport</p><div id="departure_arrival" class="master_graph"><div class="modal"></div></div></div>

<div class="graph_middle"><p class="center">Pourcentage de vols par compagnie</p><div id="carriers" class="master_graph"><div class="modal"></div></div></div>

<div class="graph"><p class="center">Distance (en Miles) par jour du mois, des 6 premières compagnies</p><div id="combo_chart" class="master_graph"><div class="modal"></div></div></div>

<div class="graph"><p class="center">Nombre de Départ/Arrivée par Aéroport</p><div id="map" class="master_graph"><div class="modal"></div></div></div>

<div class="graph_middle"><p class="center">Nombre d'annulation de vol par Aéroport</p><div id="map_cancel_carrier" class="master_graph"><div class="modal"></div></div></div>

<div class="graph_middle"><p class="center">Nombre d'annulation de vol par Aéroport rationalisé par le nombre de départ à l'aéroport</p><div id="map_cancel_carrier_ratio" class="master_graph"><div class="modal"></div></div></div>

<div class="graph_middle"><p class="center">Retard (en minutes) moyen d'un vol en fonction de l'aéroport de départ</p><div id="map_delays_dep" class="master_graph"><div class="modal"></div></div></div>

<div class="graph_middle"><p class="center">Retard (en minutes) moyen d'un vol en fonction de l'aéroport d'arrivée</p><div id="map_delays_dest" class="master_graph"><div class="modal"></div></div></div>

<div class="graph_middle"><p class="center">Distance totale parcourue par année de construction des avions</p><div id="distance_year" class="master_graph"><div class="modal"></div></div></div>

<div class="graph_middle"><p class="center">Retard total par année de construction des avions</p><div id="delay_year" class="master_graph"><div class="modal"></div></div></div>

<div class="graph"><p class="center">Nombre d'avions en vols en fonction de l'année de construction des avions</p><div id="year_flights" class="master_graph"><div class="modal"></div></div></div>

<div class="graph_middle"><p class="center">Distance par avion parcourue par année de construction des avions</p><div id="distance_year_bis" class="master_graph"><div class="modal"></div></div></div>

<div class="graph_middle"><p class="center">Retard par avion par année de construction des avions</p><div id="delay_year_bis" class="master_graph"><div class="modal"></div></div></div>

<div class="graph"><p class="center">Retard/Distance parcourue par avion par année de construction des avions</p><div id="distance_delays" class="master_graph"><div class="modal"></div></div></div>

<div class="graph"><p class="center">Nombre de vols par compagnie et retard moyen en fonction du jour de la semaine</p><div id="manufacturer_day" class="master_graph"><div class="modal"></div></div></div>

<div class="graph_middle"><p class="center">Pourcentage d'annulation des vols par compagnie</p><div id="carriers_cancel" class="master_graph"><div class="modal"></div></div></div>

<div class="graph_middle"><p class="center">Pourcentage d'annulation des vols par compagnie rationalisé par le nombre de vols total de la compagnie</p><div id="carriers_cancel_ratio" class="master_graph"><div class="modal"></div></div></div>

<div class="table_graph"><div id="table_airport" class="master_graph"><div class="modal"></div></div></div>

<div class="graph"><p class="center">Vols les plus populaires</p><div id="common_flights" class="master_graph"><div class="modal"></div></div></div>

<div class="graph"><p class="center">Données Live</p><div id="compagnie-name"><span class="name"></span></div><div id="container" class="master_graph"><div class="modal"></div></div></div>

<div class="graph" style="height: 520px;"><p class="center">Retard moyen par compagnie en fonction du jour de la semaine</p><select id="list-compagnie"></select><div id="compagnie-name"><span class="name"></span></div><div id="delay_compagnie" class="master_graph"><div class="modal"></div></div></div>
		</div>
		<?php include ('structure/footer.php'); ?>
	</body>
</html>
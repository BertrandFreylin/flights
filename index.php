<!DOCTYPE html>
<html>
<head>
	<title>Flights</title>
	<!-- Inclusion CSS (librairie + perso) -->
	<link rel="stylesheet" type="text/css" href="css/jquery.jqplot.min.css">
	<link rel="stylesheet" type="text/css" href="css/dataviz.css">

	<!-- Inclusion JS (librairie + scripts de création de graph) -->
	<script type="text/javascript" src="js/jquery.js"></script>

	<!--jqplot-->
	<script type="text/javascript" src="js/jquery.jqplot.min.js"></script>
	<script type="text/javascript" src="js/renderer/jqplot.dateAxisRenderer.js"></script>
	<script type="text/javascript" src="js/renderer/jqplot.barRenderer.js"></script>
	<script type="text/javascript" src="js/renderer/jqplot.CategoryAxisRenderer.js"></script>
	<!--Google charts-->
	<script type="text/javascript" src="js/loader.js"></script>

	<script type="text/javascript" src="js/dataviz.js"></script>
	<script async defer src="//maps.googleapis.com/maps/api/js?key=AIzaSyDkp_aypAEozlHaVB4g1wF7F7lsek3OWcU" type="text/javascript"></script>

	<script type="text/javascript" src="js/jsapi.js"></script>
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
<div class="graph"><div id="table_airport" class="master_graph"><div class="modal"></div></div></div>
		</div>
		<?php include ('structure/footer.php'); ?>
	</body>
</html>
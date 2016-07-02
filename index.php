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
			<div id="departure_arrival" class="graph_middle"><div class="modal"></div></div>
			<div id="carriers" class="graph_middle"><div class="modal"></div></div>
			<div id="combo_chart" class="graph"><div class="modal"></div></div>
			<div id="map" class="graph"><div class="modal"></div></div>
			<div id="map_cancel_carrier" class="graph_middle"><div class="modal"></div></div>
			<div id="map_cancel_carrier_ratio" class="graph_middle"><div class="modal"></div></div>
			<div id="map_delays_dep" class="graph_middle"><div class="modal"></div></div>
			<div id="map_delays_dest" class="graph_middle"><div class="modal"></div></div>
			<div id="distance_year" class="graph_middle"><div class="modal"></div></div>
			<div id="delay_year" class="graph_middle"><div class="modal"></div></div>
			<div id="year_flights" class="graph"><div class="modal"></div></div>
			<div id="distance_year_bis" class="graph_middle"><div class="modal"></div></div>
			<div id="delay_year_bis" class="graph_middle"><div class="modal"></div></div>
			<div id="distance_delays" class="graph"><div class="modal"></div></div>
			<div id="manufacturer_day" class="graph"><div class="modal"></div></div>
			<div id="carriers_cancel" class="graph_middle"><div class="modal"></div></div>
			<div id="carriers_cancel_ratio" class="graph_middle"><div class="modal"></div></div>
			<div id="table_airport" class="graph"><div class="modal"></div></div>
		</div>
		<?php include ('structure/footer.php'); ?>
	</body>
</html>
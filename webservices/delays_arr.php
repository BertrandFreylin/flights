<?php
	// Le tableau de résultat
	$result_request = array();
	
	
	// Connexion à la BDD
	include("../bdd/connexion_bdd.php");
	

	$query = "SELECT a.state, 
				SUM(WeatherDelay + CarrierDelay + NASDelay + SecurityDelay + LateAircraftDelay) AS total,
				SUM(WeatherDelay), 
				SUM(CarrierDelay),
				SUM(NASDelay),
				SUM(SecurityDelay),
				SUM(LateAircraftDelay),
				SUM(1) AS total_arrival
				FROM flights f
				JOIN airports a ON a.iata = f.Dest
				GROUP BY a.state
                ORDER BY total DESC
                LIMIT 1000";
	
	$result = mysqli_query($conn, $query);

	while ($row = mysqli_fetch_array($result)) {
		$result_request[] = array(
			'state' => 'US-'.$row[0],
			'total_delay' => intval($row[1]), 
			'weather_delay' => intval($row[2]), 
			'carrier_delay' => intval($row[3]),
			'nas_delay' => intval($row[4]),
			'aircraft_delay' => intval($row[5]),
			'total_arrival' => intval($row[6]),

			);
	}

	mysqli_free_result($result);

	// Déconnexion de la BDD
	include("../bdd/deconnexion_bdd.php");
	
	
	// Renvoyer le résultat au javascript
	echo json_encode($result_request);

?>
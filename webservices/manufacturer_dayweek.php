<?php
	// Le tableau de résultat
	$result_request = array();
	
	
	// Connexion à la BDD
	include("../bdd/connexion_bdd.php");
	

	$query = "SELECT f.DayOfWeek, t.manufacturer, SUM(1) AS nombre_vols, (f.WeatherDelay + f.CarrierDelay + f.NASDelay + f.SecurityDelay + f.LateAircraftDelay) AS total_delay
				FROM flights f
				JOIN tailnum t ON t.tailnum = f.TailNum
                WHERE ((t.manufacturer LIKE 'BOEING') or (t.manufacturer LIKE 'AIRBUS') or (t.manufacturer LIKE 'EMBRAER') or (t.manufacturer LIKE 'BOMBARDIER')) AND Month = 1
				GROUP BY f.DayOfWeek, t.manufacturer
                ORDER BY total_delay DESC
                LIMIT 500";
	
	$result = mysqli_query($conn, $query);

	while ($row = mysqli_fetch_array($result)) {
			$result_request[] = array(
				'day' => intval($row[0]),
			 	'manufacturer' => $row[1], 
			 	'num' => intval($row[2]),
			 	'total_delay' => intval($row[3])
			 	);
	}

	mysqli_free_result($result);

	// Déconnexion de la BDD
	include("../bdd/deconnexion_bdd.php");
	
	
	// Renvoyer le résultat au javascript
	echo json_encode($result_request);

?>
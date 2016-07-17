<?php
	// Le tableau de résultat
	$result_request = array();
	
	if(isset($_GET['code'])) {
		// Connexion à la BDD
		include("../bdd/connexion_bdd.php");
		
		$code = $_GET['code'];
		
		if($code=='*'){
			$query = "SELECT f.DayOfWeek, c.description, SUM(1) AS nombre_vols, (f.WeatherDelay + f.CarrierDelay + f.NASDelay + f.SecurityDelay + f.LateAircraftDelay) AS total_delay
				FROM flights f
				JOIN carriers c ON c.code = f.UniqueCarrier
                GROUP BY f.DayOfWeek, c.description
                ORDER BY total_delay DESC";
		}
		else {
			$query = "SELECT f.DayOfWeek, c.description, SUM(1) AS nombre_vols, (f.WeatherDelay + f.CarrierDelay + f.NASDelay + f.SecurityDelay + f.LateAircraftDelay) AS total_delay
				FROM flights f
				JOIN carriers c ON c.code LIKE '".$code."'
                GROUP BY f.DayOfWeek, c.description
                ORDER BY total_delay DESC";
		}
		
		
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
	};
	
	// Renvoyer le résultat au javascript
	echo json_encode($result_request);

?>
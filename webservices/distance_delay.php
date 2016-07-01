<?php
	// Le tableau de résultat
	$result_request = array();
	
	
	// Connexion à la BDD
	include("../bdd/connexion_bdd.php");
	

	$query = "SELECT t.year, (f.WeatherDelay + f.CarrierDelay + f.NASDelay + f.SecurityDelay + f.LateAircraftDelay) AS total_delay, SUM(f.Distance), COUNT(t.year) AS nb_avion
				FROM flights f
				JOIN tailnum t ON t.tailnum = f.TailNum
				WHERE (f.WeatherDelay + f.CarrierDelay + f.NASDelay + f.SecurityDelay + f.LateAircraftDelay) >= 0 AND `t`.`year`>1970
				GROUP BY `t`.`year`
                ORDER BY `t`.`year` DESC";
	
	$result = mysqli_query($conn, $query);

	while ($row = mysqli_fetch_array($result)) {
		$result_request[] = array(
			'year' => intval($row[0]),
			'total_delay' => intval($row[1]),
			'distance' => intval($row[2]),
			'nb_avion' => intval($row[3])
			);
	}

	mysqli_free_result($result);

	// Déconnexion de la BDD
	include("../bdd/deconnexion_bdd.php");
	
	
	// Renvoyer le résultat au javascript
	echo json_encode($result_request);

?>
<?php
	// Le tableau de résultat
	$result_request = array();
	
	
	// Connexion à la BDD
	include("../bdd/connexion_bdd.php");
	

	$query = "SELECT t.year, COUNT(t.year) AS somme
				FROM flights f
				JOIN tailnum t ON t.tailnum = f.TailNum
                WHERE (f.WeatherDelay + f.CarrierDelay + f.NASDelay + f.SecurityDelay + f.LateAircraftDelay) >= 0 AND `t`.`year`>1970
				GROUP BY `t`.`year`
                ORDER BY `t`.`year`
                LIMIT 500";
	
	$result = mysqli_query($conn, $query);

	while ($row = mysqli_fetch_array($result)) {
		$result_request[] = array(
			'year' => intval($row[0]),
			'nb_avion' => intval($row[1])
			);
	}

	mysqli_free_result($result);

	// Déconnexion de la BDD
	include("../bdd/deconnexion_bdd.php");
	
	
	// Renvoyer le résultat au javascript
	echo json_encode($result_request);

?>
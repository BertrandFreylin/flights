<?php
	// Le tableau de résultat
	$result_request = array();
	
	
	// Connexion à la BDD
	include("../bdd/connexion_bdd.php");
	

	$query = "SELECT f.DayOfWeek, f.UniqueCarrier, c.description, SUM(f.Distance) AS distance
				FROM flights f
				JOIN carriers c ON c.code = f.UniqueCarrier
				GROUP BY f.UniqueCarrier, f.DayOfWeek
				ORDER BY `f`.`DayOfWeek` ASC, distance DESC
				LIMIT 1000";
	
	$result = mysqli_query($conn, $query);

	while ($row = mysqli_fetch_array($result)) {
			$result_request[] = array('day_of_week' => intval($row[0]), 'carriers_code' => $row[1], 'carriers_name' => $row[2], 'distance' => intval($row[3]));
	}

	mysqli_free_result($result);

	// Déconnexion de la BDD
	include("../bdd/deconnexion_bdd.php");
	
	
	// Renvoyer le résultat au javascript
	echo json_encode($result_request);

?>
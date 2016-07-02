<?php
	// Le tableau de résultat
	$result_request = array();
	
	
	// Connexion à la BDD
	include("../bdd/connexion_bdd.php");
	

	$query = "SELECT 
				a.city,
				a.airport,
				c.description,
				SUM(1) AS flights
				FROM flights f
				JOIN airports a ON (a.iata = f.Origin)
				JOIN carriers c ON (c.code = f.UniqueCarrier)
				WHERE (c.description IS NOT NULL) AND (a.city IS NOT NULL) AND (a.airport IS NOT NULL)
				GROUP BY a.city, c.description, a.airport
				ORDER BY a.airport
					";
	
	$result = mysqli_query($conn, $query);

	while ($row = mysqli_fetch_array($result)) {
			$result_request[] = array(
				'city' => $row[0],
				'airport' => $row[1],
			 	'carrier' => $row[2],
			 	'vols_total' => intval($row[3])
			 	);
	}

	mysqli_free_result($result);

	// Déconnexion de la BDD
	include("../bdd/deconnexion_bdd.php");
	
	
	// Renvoyer le résultat au javascript
	echo json_encode($result_request);

?>
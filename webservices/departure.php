<?php
	// Le tableau de résultat
	$result_request = array();
	
	
	// Connexion à la BDD
	include("../bdd/connexion_bdd.php");
	

	$query = "SELECT a.airport, f.Origin, SUM(1) AS somme, a.city 
				FROM flights f
				JOIN airports a ON a.iata = f.Origin
				GROUP BY f.Origin
				ORDER BY somme DESC
				LIMIT 1000";
	
	$result = mysqli_query($conn, $query);

	while ($row = mysqli_fetch_array($result)) {
		$result_request[] = array('airport_dep' => $row[0], 'origin' => $row[1], 'num' => intval($row[2]), 'origin_city' => $row[3]);
	}

	mysqli_free_result($result);

	// Déconnexion de la BDD
	include("../bdd/deconnexion_bdd.php");
	
	
	// Renvoyer le résultat au javascript
	echo json_encode($result_request);

?>
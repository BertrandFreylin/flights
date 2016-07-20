<?php
	// Le tableau de résultat
	$result_request = array();
	
	
	// Connexion à la BDD
	include("../bdd/connexion_bdd.php");
	

	$query = "SELECT c.description, f.UniqueCarrier, SUM(1) AS nombre_vols, SUM(Distance) AS distance
				FROM flights f
				JOIN carriers c ON c.code = f.UniqueCarrier
				WHERE c.description IS NOT NULL
				GROUP BY f.UniqueCarrier
				ORDER BY nombre_vols DESC
				LIMIT 500";
	
	$result = mysqli_query($conn, $query);

	while ($row = mysqli_fetch_array($result)) {
			$result_request[] = array('carriers_name' => $row[0], 'carriers_code' => $row[1], 'num' => intval($row[2]), 'distance' => intval($row[3]));
	}

	mysqli_free_result($result);

	// Déconnexion de la BDD
	include("../bdd/deconnexion_bdd.php");
	
	
	// Renvoyer le résultat au javascript
	echo json_encode($result_request);

?>
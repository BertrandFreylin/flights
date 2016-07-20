<?php
	// Le tableau de résultat
	$result_request = array();
	
	
	// Connexion à la BDD
	include("../bdd/connexion_bdd.php");
	

	$query = "SELECT 
					a.city,
					SUM((f.`CancellationCode` LIKE 'A') or (f.`CancellationCode` LIKE 'B') or (f.`CancellationCode` LIKE 'C') or (f.`CancellationCode` LIKE 'D')) AS somme_cancel,
					SUM(1) AS vols_total
					FROM flights f
					JOIN airports a ON (a.iata = f.Origin)
					GROUP BY a.city
					ORDER BY somme_cancel DESC
					LIMIT 500
					";
	
	$result = mysqli_query($conn, $query);

	while ($row = mysqli_fetch_array($result)) {
			$result_request[] = array(
				'airport' => $row[0],
			 	'somme_cancel' => intval($row[1]),
			 	'vols_total' => intval($row[2])
			 	);
	}

	mysqli_free_result($result);

	// Déconnexion de la BDD
	include("../bdd/deconnexion_bdd.php");
	
	
	// Renvoyer le résultat au javascript
	echo json_encode($result_request);

?>
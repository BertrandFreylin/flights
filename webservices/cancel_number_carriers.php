<?php
	// Le tableau de résultat
	$result_request = array();
	
	
	// Connexion à la BDD
	include("../bdd/connexion_bdd.php");
	

	$query = "SELECT c.description,
				SUM(f.`CancellationCode` LIKE 'A') AS somme_cancel,
				SUM(1) AS total
				FROM flights f
				JOIN carriers c ON (c.code = f.UniqueCarrier)
                GROUP BY c.description
				ORDER BY somme_cancel DESC
				LIMIT 500";
	
	$result = mysqli_query($conn, $query);

	while ($row = mysqli_fetch_array($result)) {
			$result_request[] = array(
				'carrier' => $row[0],
			 	'somme' => intval($row[1]),
			 	'total' => intval($row[2])
			 	);
	}

	mysqli_free_result($result);

	// Déconnexion de la BDD
	include("../bdd/deconnexion_bdd.php");
	
	
	// Renvoyer le résultat au javascript
	echo json_encode($result_request);

?>
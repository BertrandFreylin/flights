<?php
	// Le tableau de résultat
	$result_request = array();
	
	
	// Connexion à la BDD
	include("../bdd/connexion_bdd.php");
	

	$query = "SELECT code, description FROM carriers";

	$result = mysqli_query($conn, $query);

	while ($row = mysqli_fetch_array($result)) {
		$result_request[] = array('code' => $row[0], 'description' => $row[1]);
	}

	mysqli_free_result($result);

	// Déconnexion de la BDD
	include("../bdd/deconnexion_bdd.php");
	
	
	// Renvoyer le résultat au javascript
	echo json_encode($result_request);

?>
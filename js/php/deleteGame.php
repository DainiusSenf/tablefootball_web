<?php
		require_once 'db.php'; 
		
        // a query get all the records from the users table
		if(isset($_GET['gameId'])){
			$gameId = $_GET['gameId'];
			$sql = "DELETE FROM games WHERE gameId = '$gameId'";
		}			

        // use prepared statements, even if not strictly required is good practice
        $stmt = $dbh->prepare( $sql );

        // execute the query
        $stmt->execute();
?>
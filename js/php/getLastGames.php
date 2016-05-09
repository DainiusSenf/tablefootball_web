<?php
		require_once 'db.php'; 
		
        // a query get all the records from the users table
        $sql = "SELECT * FROM games ORDER BY gameId DESC limit 30";
		if(isset($_GET['userId'])){
			$userId = $_GET['userId'];
			$sql = "SELECT * FROM games WHERE team1user1 = '$userId' or team1user2 = '$userId' or
			team2user1 = '$userId' or team2user2 = '$userId' ORDER BY gameId DESC limit 5";
		} else if(isset($_GET['username'])){
			$username = $_GET['username'];
			$sql = "SELECT * FROM games WHERE team1user1 = '$username' or team1user2 = '$username' or
			team2user1 = '$username' or team2user2 = '$username' ORDER BY gameId DESC limit 5";
		}			

        // use prepared statements, even if not strictly required is good practice
        $stmt = $dbh->prepare( $sql );

        // execute the query
        $stmt->execute();

        // fetch the results into an array
        $result = $stmt->fetchAll( PDO::FETCH_ASSOC );

        // convert to json
        $json = json_encode( $result );

        // echo the json string
        echo $json;
?>
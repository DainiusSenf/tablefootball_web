<?php
		require_once 'db.php'; 

        // a query get all the records from the users table
        $sql = 'SELECT id, username, elo FROM users ORDER By elo DESC';

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
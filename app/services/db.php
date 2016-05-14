<?php 
	  
	    $db_name  = 'tablefootball';
        $hostname = 'Dainius';
        $username = 'Dainius';
        $password = '489756';
		try {
			// connect to the database
			$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password); 
			$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		}
		catch(PDOException $e){
			echo "Connection failed: " . $e->getMessage();
		}
  ?>
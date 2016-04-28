<?php

		require_once 'db.php'; 
		
		if(isset($_GET['asd'])){
			$username = $_GET['username'];
			$psw = $_GET['password'];
			$admin = $_GET['admin'];
			$email = $_GET['email'];
			
			try{
				$sql = "INSERT INTO users(username,password,admin,email) VALUES ('$username','$psw','$admin','$email')";
		
				$stmt = $dbh->prepare( $sql );
				$stmt->execute();
				if( $stmt )
					echo $json_response = json_encode(true);
				else
					echo $json_response = json_encode(false);
			} catch(PDOException $e){
				echo $json_response = json_encode($e);
			}
			
			
			
		}
?>
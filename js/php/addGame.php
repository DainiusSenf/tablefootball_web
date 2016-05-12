<?php

		require_once 'db.php'; 
		
		if(isset($_GET['player1'])){
			$player1 = $_GET['player1'];
			$player2 = $_GET['player2'];
			$player3 = $_GET['player3'];
			$player4 = $_GET['player4'];
			$score1 = $_GET['score1'];
			$score2 = $_GET['score2'];
			$player1eloChange = $_GET['player1eloChange'];
			$player2eloChange = $_GET['player2eloChange'];
			$player3eloChange = $_GET['player3eloChange'];
			$player4eloChange = $_GET['player4eloChange'];
						
			try{
				if(isset($_GET['approved1'])){
					$sql = "INSERT INTO games(team1user1,team1user2,team2user1,team2user2, team1score,team2score,team1user1score,team1user2score,team2user1score,team2user2score)
					VALUES ('$player1','$player2','$player3','$player4','$score1','$score2','$player1eloChange','$player2eloChange','$player3eloChange','$player4eloChange')";
				} else if(isset($_GET['approved2'])){
					$sql = "INSERT INTO games(team1user1,team1user2,team2user1,team2user2, team1score,team2score,team1user1score,team1user2score,team2user1score,team2user2score)
					VALUES ('$player1','$player2','$player3','$player4','$score1','$score2','$player1eloChange','$player2eloChange','$player3eloChange','$player4eloChange')";
				} else if(isset($_GET['approved3'])){
					$sql = "INSERT INTO games(team1user1,team1user2,team2user1,team2user2, team1score,team2score,team1user1score,team1user2score,team2user1score,team2user2score)
					VALUES ('$player1','$player2','$player3','$player4','$score1','$score2','$player1eloChange','$player2eloChange','$player3eloChange','$player4eloChange')";
				} else if(isset($_GET['approved4'])){
					$sql = "INSERT INTO games(team1user1,team1user2,team2user1,team2user2, team1score,team2score,team1user1score,team1user2score,team2user1score,team2user2score)
					VALUES ('$player1','$player2','$player3','$player4','$score1','$score2','$player1eloChange','$player2eloChange','$player3eloChange','$player4eloChange')";
				} else {
					$sql = "INSERT INTO games(team1user1,team1user2,team2user1,team2user2, team1score,team2score,team1user1score,team1user2score,team2user1score,team2user2score)
					VALUES ('$player1','$player2','$player3','$player4','$score1','$score2','$player1eloChange','$player2eloChange','$player3eloChange','$player4eloChange')";
				}
		
				$stmt = $dbh->prepare( $sql );
				$stmt->execute();
					echo $json_response = json_encode($stmt);
			} catch(PDOException $e){
				echo $json_response = json_encode($e);
			}
			
			
			
		}
?>
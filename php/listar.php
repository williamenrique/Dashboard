<?php
	$datajson = (!file_exists('database.json') ? [] : json_decode(file_get_contents('database.json')));
	echo json_encode($datajson, JSON_UNESCAPED_UNICODE);
// $resultado = json_decode($datajson);
$data = file_get_contents("database.json");
$events = json_decode($data, true);
echo count($events);
// $last = end($events);

// foreach ($events as $element) {
//     if ($last == $element) 
//         echo $element['id'];
// }
// echo count($events);
// foreach ($events as $event) {
//     // echo $event['id'];
// }
<?php
include './config.php';
	$datajson = (!file_exists(JSON_DATA_FILES) ? [] : json_decode(file_get_contents(JSON_DATA_FILES)));
	echo json_encode($datajson, JSON_UNESCAPED_UNICODE);
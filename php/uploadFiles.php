<?php
include './config.php';
if(!$_FILES == null){
	$cont = 0;
	// si no existe el directorio crearlo
	if(!is_dir(RUTA_FILES)) mkdir(RUTA_FILES, 0777, true);
	
	// simular un database decodificarlo y convertirlo en un archivo navtivo php
	$data = (!file_exists(JSON_DATA_FILES) ? [] : json_decode(file_get_contents(JSON_DATA_FILES)));
	// recorrer los archivos
	foreach ($_FILES as $key => $file) {
		// evaluamos si falla move_upload retornamos un error
		if(!move_uploaded_file($file['tmp_name'], RUTA_FILES.'/'.$file['name'])){
			$arrResponse = ["status" => false, "message" => "No fue posible subir"];
		}
		// cada vez que itera agregamos un elemnto ala rray
		$fileSize = round($file['size'] / 1048576, 2);
		array_push($data, 
		[
			'id' => $key,
			'file_name' => $file['name'],
			'file_size' => $fileSize.'MB',
			'file_date_mod' => formatear_fecha(date('d-m-Y'))
		]);
		// se incrementa para poder usarlo para enviar un msj de exito
		$cont ++;
	}
	
	if($cont == count($_FILES)){
		if($cont == 0){
				$arrResponse = ['message' => $message,'status' => false];
		}else{
			// poder escribir en un archivo simulando una base de datos
			$writable = fopen(JSON_DATA_FILES,'w');
			fwrite($writable, json_encode($data));
			fclose($writable);
			$message = ( $cont > 1 ? 'Se subieron ' . $cont . ' fotos con éxito' : 'Se subió ' . $cont . ' foto con éxito' );
			$arrResponse = ['message' => $message,'status' => true];
		}
	}
}else{
	$arrResponse = ["status" => false, "message" => "No se a cargado ningun archivo"];
}
echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
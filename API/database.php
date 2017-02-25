<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    $connConfig = [
        'host' => 'localhost',
        'database' => 'sweep',
        'user' => 'root',
        'password' => ''
    ];
        
    $conn = new PDO('mysql:host='.$connConfig['host'].';dbname='.$connConfig['database'],$connConfig['user'],$connConfig['password']);    
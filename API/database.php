<?php
    $connConfig = [
        'host' => 'localhost',
        'database' => 'sweep',
        'user' => 'root',
        'password' => ''
    ];
        
    $conn = new PDO('mysql:host='.$connConfig['host'].';dbname='.$connConfig['database'],$connConfig['user'],$connConfig['password']);    
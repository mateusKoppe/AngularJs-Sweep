<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once 'database.php';
require_once 'functions.php';

$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

$DBTable = "users";

if($data->action === 'create'){
    $username = filterValue($data->username);
    $password = filterValue($data->password);
    $sqlSelect = "SELECT user_id from $DBTable WHERE user_username = '$username' and user_password='$password'";
    if(!$conn->query($sqlSelect)->rowCount()){
        $sqlInsert = "INSERT INTO $DBTable (user_username, user_password) VALUES ('$username','$password')";
        echo $conn->exec($sqlInsert);
    }else{
        echo "login_existente";
    }
}

if($data->action === 'login'){
    $username = filterValue($data->username);
    $password = filterValue($data->password);
    $result;
    $sql = "SELECT *
            FROM $DBTable LEFT JOIN studants on users.user_id = studants.user_id
            WHERE users.user_username = '$username' AND users.user_password = '$password'";
    $query = $conn->query($sql);
    if($row = $query->fetch(PDO::FETCH_ASSOC)){
        $result['user_id'] = $row['user_id'];
        $result['user_username'] = $row['user_username'];
        $result['user_class'] = $row['user_class'];
        $result['studants'][] = [
            'id' => $row['studant_id'],
            'name' => $row['studant_name'],
            'times' => $row['studant_times'],
        ];
        while($row = $query->fetch(PDO::FETCH_ASSOC)){
            $result['studants'][] = [
                'id' => $row['studant_id'],
                'name' => $row['studant_name'],
                'times' => $row['studant_times'],
            ];
        }
        echo json_encode($result);
    }else{
        echo false;
    }
}

if($data->action === 'checkAvailability'){
    $username = filterValue($data->username);
    $sql = "SELECT * FROM $DBTable WHERE user_username = '$username'";
    echo $conn->query($sql)->rowCount() == 0;
}

if($data->action === 'defineClass'){
    $className = filterValue($data->className);
    $id = filterValue($data->id);
    $sql = "UPDATE $DBTable SET user_class = '$className' WHERE user_id = '$id'";
    echo $conn->query($sql)->rowCount() == 0;
}

if($data->action === 'sweep'){
    $studants = $data->studants;
    $sql = "UPDATE studants SET studant_times = studant_times + 1 WHERE ";
    $i = 0;
    foreach ($studants as $studant){
        $stutandsArray[++$i] = $studant->id;
    }
    $i = 0;
    foreach($stutandsArray as $studant){
        $sql .= " studant_id = $studant";
        if(++$i != sizeof($stutandsArray)){
            $sql .= " or";
        }
    }
    echo $conn->query($sql)->rowCount() == 0;
}

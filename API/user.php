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
    $sql = "SELECT users.user_id, user_class, studant_name, studant_id, studant_times
            FROM $DBTable LEFT JOIN studants on users.user_id = studants.user_id
            WHERE users.user_username = '$username' AND users.user_password = '$password'";
    $query = $conn->query($sql);
    if($row = $query->fetch(PDO::FETCH_ASSOC)){
        $result['user_id'] = $row['user_id'];
        $result['user_class'] = $row['user_class'];
        if(!empty($row['studant_id'])){
            $result['studants'][] = [
                'id' => $row['studant_id'],
                'name' => $row['studant_name'],
                'times' => $row['studant_times'],
            ];
        }
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
    $sql = "SELECT user_id FROM $DBTable WHERE user_username = '$username'";
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
        $stutandsArray[++$i] = filterValue($studant->id);
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

if($data->action === 'createStudant'){
    $studant = filterValue($data->name);
    $class = filterValue($data->class);
    $sql = "INSERT INTO studants (studant_name, user_id) values ('$studant', $class)";
    if($conn->query($sql)->rowCount() != 0){
        $sql = "SELECT studant_id, studant_name, studant_times FROM studants WHERE studant_name = '$studant' AND user_id = $class ORDER BY studant_id DESC LIMIT 1";
        echo json_encode($conn->query($sql)->fetch(PDO::FETCH_ASSOC));
    }
    return false;
}

if($data->action === 'removeStudant'){
    $studants = $data->studants;
    $sql = "DELETE FROM studants WHERE ";
    $i = 0;
    print_r($studants);
    foreach($studants as $studant){
        $sql .= " studant_id = $studant->id";
        if(++$i != sizeof($studants)){
            $sql .= " or";
        }
    }
    echo $conn->query($sql)->rowCount() == 0;
}

if($data->action === 'editStudants'){
    $studants = $data->studants;
    $success = true;
    foreach($studants as $studant){
        $sql = "UPDATE studants SET";
        foreach($studant as $key => $attrs){
            $sql .= " studant_$key = '$attrs',";
        }
        $sql .= "#WHERE studant_id = $studant->id ;";
        $sql = str_replace(",#", " ", $sql);
        $success =  ($conn->query($sql)->rowCount() == 0) && $success;
    };
    echo $success;
}

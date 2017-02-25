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
        $sql = "SELECT user_id, user_username, user_password, user_class FROM $DBTable 
                WHERE user_username = '$username' AND user_password = '$password'";
        echo json_encode($conn->query($sql)->fetch(PDO::FETCH_ASSOC));
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
<?php
    sleep(3);

    require_once 'database.php';
    require_once 'functions.php';

    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);

    if($data->action === 'create'){
        $username = filterValue($data->username);
        $password = filterValue($data->password);
        $sqlSelect = "SELECT user_id from user WHERE user_username = '$username' and user_password='$password'";        
        if(!$conn->query($sqlSelect)->rowCount()){
            $sqlInsert = "INSERT INTO user (user_username, user_password) VALUES ('$username','$password')";
            echo $conn->exec($sqlInsert);    
        }else{
            echo "login_existente";
        }
        
    }

    if($data->action === 'login'){
        $username = filterValue($data->username);
        $password = filterValue($data->password);
        $sql = "SELECT * FROM user WHERE user_username = '$username' and user_password = '$password'";
        echo json_encode($conn->query($sql)->fetch(PDO::FETCH_ASSOC));
    }

    if($data->action === 'checkAvailability'){
        $username = filterValue($data->username);
        $sql = "SELECT * FROM user WHERE user_username = '$username'";
        echo $conn->query($sql)->rowCount() == 0;
    }
<?php

$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

$DBTable = "users";

class UserController
{
    public function create()
    {
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

    public function login()
    {
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

    public function checkAvailability()
    {
        $username = filterValue($data->username);
        $sql = "SELECT user_id FROM $DBTable WHERE user_username = '$username'";
        echo $conn->query($sql)->rowCount() == 0;
    }

    public function defineClass()
    {
        $className = filterValue($data->className);
        $id = filterValue($data->id);
        $sql = "UPDATE $DBTable SET user_class = '$className' WHERE user_id = '$id'";
        echo $conn->query($sql)->rowCount() == 0;
    }
}

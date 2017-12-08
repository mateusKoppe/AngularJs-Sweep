<?php
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);

    class ClassController()
    {
        public function create()
        {
            $username = filterValue($data->className);
            $sqlSelect = "SELECT user_id from users WHERE user_username = '$username' and user_password='$password'";
            if(!$conn->query($sqlSelect)->rowCount()){
              $sqlInsert = "INSERT INTO user (user_username, user_password) VALUES ('$username','$password')";
              echo $conn->exec($sqlInsert);
            }else{
              echo "login_existente";
            }
        }
    }

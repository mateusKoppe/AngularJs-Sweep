<?php

require_once 'model/UserModel.php';
require_once 'controllers/Controller.php';

class UserController extends Controller
{

    public function create()
    {
        $user = new UserModel();
        $user->username = $this->body->username;
        $user->password = $this->body->password;
        $id = $user->save();
        if($id){
            $this->json($user->getContentData(), 201);
        } else {
            $this->json(null, 400);
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
        $username = filterValue($_GET['username']);
        $someUserCreated = UserModel::isAvailabilable($username);
        $this->json(['available' => !$someUserCreated], $someUserCreated?203:201);
    }

    public function defineClass()
    {
        $className = filterValue($data->className);
        $id = filterValue($data->id);
        $sql = "UPDATE $DBTable SET user_class = '$className' WHERE user_id = '$id'";
        echo $conn->query($sql)->rowCount() == 0;
    }
}

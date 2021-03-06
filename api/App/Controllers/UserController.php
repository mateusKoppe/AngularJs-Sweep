<?php

namespace App\Controllers;

use App\Models\UserModel;
use App\Services\Auth;

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
        $username = $this->body->username;
        $password = $this->body->password;
        $user = UserModel::login($username, $password);
        if($user){
            $this->json($user->getContentData(), 201);
        } else {
            $this->json(['message' => 'fail to login'], 403);
        }
    }

    public function loginByToken()
    {
        $user = Auth::requireLogin();
        $this->json($user->getContentData(), 201);
    }

    public function checkAvailability($params)
    {
        $username = $params['username'];
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

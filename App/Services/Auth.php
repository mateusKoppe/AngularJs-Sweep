<?php

namespace App\Services;

use App\Models\UserModel;

class Auth
{
    public static function requireLogin()
    {
        $token = $_GET['token'];
        $user = false;
        if($token) {
            $user = UserModel::userByToken();
        }
        if($user) {
            return $user;
        }
        SELF::unautorized();
        return false;
    }

    public static function unautorized()
    {
        http_response_code(401);
        exit();
    }
}

<?php

namespace App\Models;

use App\Helpers\Database;

class UserModel
{
    private static $dbTable = "users";
    public $id;
    public $username;
    public $password;
    public $className;
    public $token;

    public static function isAvailabilable($username)
    {
        $sql = "SELECT count(user_id) AS quantity FROM " . SELF::$dbTable . " WHERE user_username = :username";
        $conn = Database::createConnection();
        $sth = $conn->prepare($sql);
        $sth->bindParam(':username', $username);
        $sth->execute();
        return !!$sth->fetch(\PDO::FETCH_OBJ)->quantity;
    }

    public function save()
    {
        $sql = "
            INSERT INTO " . SELF::$dbTable . "
            (user_username, user_password, user_class, user_token)
            VALUES
            (:username, :password, :className, :token)
        ";
        $conn = Database::createConnection();
        $sth = $conn->prepare($sql);
        $sth->bindParam(':username', $this->username);
        $sth->bindParam(':password', $this->password);
        $sth->bindParam(':className', $this->className);
        $sth->bindParam(':token', SELF::generateToken());
        $success = $sth->execute();
        if($success){
            $this->id = $conn->lastInsertId();
        }
        return $success;
    }

    public static function login($username, $password)
    {
        $sql = "SELECT * FROM " . SELF::$dbTable . " WHERE user_username = :username AND user_password = :password";
        $conn = Database::createConnection();
        $sth = $conn->prepare($sql);
        $sth->bindParam(':username', $username);
        $sth->bindParam(':password', $password);
        $sth->execute();
        $user_row = $sth->fetch(\PDO::FETCH_OBJ);
        if($user_row){
            $user = SELF::dbDataToModel($user_row);
            return $user;
        }else{
            return false;
        }
    }

    public static function userByToken($token)
    {
        $sql = "SELECT * FROM " . SELF::$dbTable . " WHERE user_token = :token";
        $conn = Database::createConnection();
        $sth = $conn->prepare($sql);
        $sth->bindParam(':token', $token);
        $sth->execute();
        $user_row = $sth->fetch(\PDO::FETCH_OBJ);
        if($user_row){
            $user = SELF::dbDataToModel($user_row);
            return $user;
        }else{
            return false;
        }

    }

    public function getContentData()
    {
        return [
            'user_id' => $this->id,
            'user_username' => $this->username,
            'user_token' => $this->token
        ];
    }

    private static function dbDataToModel($data)
    {
        $user = new UserModel();
        $user->id = $data->user_id;
        $user->username = $data->user_username;
        $user->class = $data->user_class;
        $user->token = $data->user_token;
        return $user;
    }

    private static function generateToken()
    {
        return strval(bin2hex(openssl_random_pseudo_bytes(32)));
    }
}

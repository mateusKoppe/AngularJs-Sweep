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
            (user_username, user_password, user_class)
            VALUES
            (:username, :password, :className)
        ";
        $conn = Database::createConnection();
        $sth = $conn->prepare($sql);
        $sth->bindParam(':username', $this->username);
        $sth->bindParam(':password', $this->password);
        $sth->bindParam(':className', $this->className);
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
            $user = new UserModel();
            $user->id = $user_row->user_id;
            $user->username = $user_row->user_username;
            $user->class = $user_row->user_class;
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
        ];
    }
}

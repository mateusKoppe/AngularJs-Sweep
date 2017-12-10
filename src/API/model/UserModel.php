<?php
require 'database.php';

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
        return !!$sth->fetch(PDO::FETCH_OBJ)->quantity;
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

    public function getContentData()
    {
        return [
            'user_id' => $this->id,
            'user_username' => $this->username,
            'user_password' => $this->password,
            'user_class' => $this->className,
        ];
    }
}

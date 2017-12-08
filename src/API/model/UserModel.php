<?php
require 'database.php';

class UserModel
{
    private static $dbTable = "users";
    public $username;
    public $password;
    public $classId;

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
            (:username, :password, :classId)
        ";
        $conn = Database::createConnection();
        $sth = $conn->prepare($sql);
        $sth->bindParam(':username', $this->username);
        $sth->bindParam(':password', $this->password);
        $sth->bindParam(':classId', $this->classId);
        return $sth->execute();
    }
}

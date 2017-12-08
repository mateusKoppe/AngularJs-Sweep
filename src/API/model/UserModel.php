<?php
require 'database.php';

class UserModel
{
    private static $dbTable = "users";
    
    public static function isAvailabilable($username)
    {
        $sql = "SELECT count(user_id) AS quantity FROM " . SELF::$dbTable . " WHERE user_username = :username";
        $conn = Database::createConnection();
        $sth = $conn->prepare($sql);
        $sth->bindParam(':username', $username);
        $sth->execute();
        return !!$sth->fetch(PDO::FETCH_OBJ)->quantity;
    }
}

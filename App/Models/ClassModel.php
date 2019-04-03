<?php

namespace App\Models;

use App\Helpers\Database;

class ClassModel
{
    private static $dbTable = "users";
    public $id;
    public $name;
    public $studants;

    public static function findByUserId($id)
    {
        // $sql = "
        //     SELECT * FROM " . SELF::$dbTable . "
        //     LEFT JOIN studants ON users.user_id = studants.user_id
        //     WHERE users.user_id = :user
        // ";
        $sql = "
            SELECT * FROM " . SELF::$dbTable . "
            WHERE user_id = :user
        ";
        $conn = Database::createConnection();
        $sth = $conn->prepare($sql);
        $sth->execute([':user' => $id]);
        $classData = $sth->fetch(\PDO::FETCH_ASSOC);
        $class = new ClassModel();
        $class->id = $classData['user_id'];
        $class->name = $classData['user_class'];
        return $class;
    }

    public static function findById($id)
    {
        $sql = "
            SELECT * FROM " . SELF::$dbTable . "
            WHERE user_id = :user
        ";
        $conn = Database::createConnection();
        $sth = $conn->prepare($sql);
        $sth->execute([':user' => $id]);
        $classData = $sth->fetch(\PDO::FETCH_ASSOC);
        $class = new ClassModel();
        $class->id = $classData['user_id'];
        $class->name = $classData['user_class'];
        return $class;
    }

    public static function classExist($id)
    {
        $sql = "SELECT COUNT(user_id) AS exist FROM users WHERE user_id = :class";
        $conn = Database::createConnection();
        $sth = $conn->prepare($sql);
        $sth->execute([':class' => $id]);
        return $sth->fetch(\PDO::FETCH_OBJ)->exist; 
    }

    public function update()
    {
        $sql = "
            UPDATE users
            SET
                user_class = :name
            WHERE users.user_id = :id
        ";
        $conn = Database::createConnection();
        $sth = $conn->prepare($sql);
        $sth->bindParam(':id', $this->id);
        $sth->bindParam(':name', $this->name);
        return $sth->execute();
    }

    public function getContentData()
    {
        return [
            'class_id' => $this->id,
            'class_name' => $this->name,
            'class_studants' => $this->studants,
        ];
    }
}

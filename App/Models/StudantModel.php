<?php

namespace App\Models;

use App\Helpers\Database;

class StudantModel
{
    private static $dbTable = "studants";
    public $id;
    public $name;
    public $times = 0;
    public $class;

    public static function listByClassId($id)
    {
        if(!ClassModel::classExist($id)){
            return false;
        }
        $sql = "
            SELECT * FROM " . SELF::$dbTable . "
            WHERE user_id = :classId
        ";
        $conn = Database::createConnection();
        $sth = $conn->prepare($sql);
        $sth->execute([':classId' => $id]);
        $studants = [];
        while($row = $sth->fetch(\PDO::FETCH_OBJ)){
            $studant = new StudantModel();
            $studant->id = $row->studant_id;
            $studant->name = $row->studant_name;
            $studant->times = $row->studant_times;
            $studant->class = $row->user_id;
            $studants[] = $studant;
        }
        return $studants;
    }

    public function save()
    {
        $sql = "INSERT INTO studants (studant_name, studant_times, user_id) values (:name, :times, :class)";
        $conn = Database::createConnection();
        $sth = $conn->prepare($sql);
        $sth->bindParam(':name', $this->name);
        $sth->bindParam(':times', $this->times);
        $sth->bindParam(':class', $this->class);
        $success = $sth->execute();
        if($success){
            $this->id = $conn->lastInsertId();
        }
        return $success;
    }

    public function update()
    {
        $sql = "
            UPDATE " . SELF::$dbTable . "
            SET
                studant_name = :name,
                studant_times = :times
            WHERE user_id = :class AND studant_id = :id
        ";
        $conn = Database::createConnection();
        $sth = $conn->prepare($sql);
        $sth->bindParam(':id', $this->id);
        $sth->bindParam(':name', $this->name);
        $sth->bindParam(':times', $this->times);
        $sth->bindParam(':class', $this->class);
        return $sth->execute();
    }

    public function destroy()
    {
        $sql = "
            DELETE FROM " . SELF::$dbTable . "
            WHERE user_id = :class AND studant_id = :id
        ";
        $conn = Database::createConnection();
        $sth = $conn->prepare($sql);
        $sth->bindParam(':id', $this->id);
        $sth->bindParam(':class', $this->class);
        return $sth->execute();
    }

    public function getContentData()
    {
        return [
            'studant_id' => $this->id,
            'studant_name' => $this->name,
            'studant_times' => $this->times,
            'user_id' => $this->class,
        ];
    }

}

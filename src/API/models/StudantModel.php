<?php
require 'database.php';

class StudantModel
{
    private static $dbTable = "studants";
    public $id;
    public $name;
    public $times;

    public static function listByClassId($id)
    {
        $sql = "
            SELECT * FROM " . SELF::$dbTable . "
            WHERE user_id = :classId
        ";
        $conn = Database::createConnection();
        $sth = $conn->prepare($sql);
        $sth->execute([':classId' => $id]);
        $studants = [];
        while($row = $sth->fetch(PDO::FETCH_OBJ)){
            $studant = new StudantModel();
            $studant->id = $row->studant_id;
            $studant->name = $row->studant_name;
            $studant->times = $row->studant_times;
            $studants[] = $studant;
        }
        return $studants;
    }
}

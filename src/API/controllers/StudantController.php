<?php

require 'controllers/Controller.php';
require 'models/StudantModel.php';

class StudantController extends Controller
{
    public function create()
    {
        var_dump($this->body);
        $studant = filterValue($data->name);
        $class = filterValue($data->class);
        $sql = "INSERT INTO studants (studant_name, user_id) values ('$studant', $class)";
        if($conn->query($sql)->rowCount() != 0){
            $sql = "SELECT studant_id, studant_name, studant_times FROM studants WHERE studant_name = '$studant' AND user_id = $class ORDER BY studant_id DESC LIMIT 1";
            echo json_encode($conn->query($sql)->fetch(PDO::FETCH_ASSOC));
        }
        return false;
    }

    public function show(){
        echo "ok";
        exit();
    }

    public function update()
    {
        $studants = $data->studants;
        $success = true;
        foreach($studants as $studant){
            $sql = "UPDATE studants SET";
            foreach($studant as $key => $attrs){
                $sql .= " studant_$key = '$attrs',";
            }
            $sql .= "#WHERE studant_id = $studant->id ;";
            $sql = str_replace(",#", " ", $sql);
            $success =  ($conn->query($sql)->rowCount() == 0) && $success;
        };
        echo $success;
    }

    public function remove()
    {
        $studants = $data->studants;
        $sql = "DELETE FROM studants WHERE ";
        $i = 0;
        print_r($studants);
        foreach($studants as $studant){
            $sql .= " studant_id = $studant->id";
            if(++$i != sizeof($studants)){
                $sql .= " or";
            }
        }
        echo $conn->query($sql)->rowCount() == 0;
    }

    public function sweep()
    {
        $studants = $data->studants;
        $sql = "UPDATE studants SET studant_times = studant_times + 1 WHERE ";
        $i = 0;
        foreach ($studants as $studant){
            $stutandsArray[++$i] = filterValue($studant->id);
        }
        $i = 0;
        foreach($stutandsArray as $studant){
            $sql .= " studant_id = $studant";
            if(++$i != sizeof($stutandsArray)){
                $sql .= " or";
            }
        }
        echo $conn->query($sql)->rowCount() == 0;
    }
}

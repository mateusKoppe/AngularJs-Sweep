<?php

namespace App\Controllers;

use App\Models\StudantModel;

class StudantController extends Controller
{
    public function create()
    {
        $studant = new StudantModel();
        $studant->name = $this->body->name;
        $studant->class = $this->body->class;
        $success = $studant->save();
        if($success){
            $this->json($studant->getContentData(), 201);
        } else {
            $this->json(null, 400);
        }

    }

    public function show($params) {
        echo $params['id'];
    }

    public function list($params) {
        $class_id = $params['class'];
        $studants = StudantModel::listByClassId($class_id);
        if($studants === false){
            $this->json([
                'error' => "class not found"
            ], 404);
            exit();
        }
        $this->json($studants);
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

<?php
    namespace App\Controllers;

    use App\Models\ClassModel;

    class ClassController extends Controller
    {
        public function classByUser($params)
        {
            $id = $params['user'];
            $class = ClassModel::findByUserId($id);
            $this->json($class->getContentData());
        }

        public function update($params)
        {
            $id = $params['id'];
            $class = ClassModel::findById($id);
            if($this->body->class_name){
                $class->name = $this->body->class_name;
            }
            $class->update();
            $this->json($class->getContentData());
        }
    }

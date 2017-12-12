<?php
    require_once 'controllers/Controller.php';
    require_once 'model/ClassModel.php';

    class ClassController extends Controller
    {
        public function classByUser()
        {
            $id = $_GET['user'];
            $class = ClassModel::findByUserId($id);
            $this->json($class->getContentData());
        }

        public function update()
        {
            $id = $_GET['id'];
            $class = ClassModel::findById($id);
            if($this->body->class_name){
                $class->name = $this->body->class_name;
            }
            $class->update();
            $this->json($class->getContentData());
        }
    }

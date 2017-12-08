<?php
    function filterValue($value){
        return addslashes(!empty($value)?$value:false);
    }

    function getMethodAction(){
        $methodActions = [
            'POST' => 'create',
            'PUT' => 'update',
            'DELETE' => 'delete',
            'GET' => 'show',
        ];
        $method = $_SERVER['REQUEST_METHOD'];
        return $methodActions[$method];
    }

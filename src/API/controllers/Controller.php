<?php
class Controller
{
    protected $body;

    function __construct(){
      $this->body = json_decode(file_get_contents('php://input'));
    }

    protected function json($data, $status)
    {
        header('Content-Type: application/json');
        http_response_code($status);
        echo json_encode($data);
    }
}

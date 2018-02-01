<?php
class Controller
{
    protected $body;

    function __construct(){
        $this->body = json_decode(file_get_contents('php://input'));
    }

    protected function json($data, $status = 200)
    {
        header('Content-Type: application/json');
        $this->status(200);
        echo json_encode($data);
    }

    protected function status($status)
    {
        http_response_code($status);
    }
}

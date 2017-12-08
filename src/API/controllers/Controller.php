<?php
abstract class Controller
{
    protected function json($data, $status)
    {
        header('Content-Type: application/json');
        http_response_code($status);
        echo json_encode($data);
    }
}

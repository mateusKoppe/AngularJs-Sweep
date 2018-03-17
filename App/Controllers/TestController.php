<?php 

namespace App\Controllers;

class TestController {

  function test ($params) {
    echo $params['id'];
    echo "test";
  }

}

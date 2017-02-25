<?php
    header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    function filterValue($value){
        return addslashes(!empty($value)?$value:false);
    }
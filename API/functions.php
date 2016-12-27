<?php
    
    function filterValue($value){
        return addslashes(!empty($value)?$value:false);
    }
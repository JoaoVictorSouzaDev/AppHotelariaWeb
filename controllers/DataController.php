<?php

    class DataController {
        public static function validateRequiredData($data){
            //validar campo por campo
            return isset($data);
        }

        public static function validadePrice($data){
           return preg_match('/^\d+(\.\d{1,2})?$/', $data);
        }

    }

?>
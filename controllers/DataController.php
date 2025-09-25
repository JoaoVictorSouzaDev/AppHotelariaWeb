<?php


class ValidateController {

    public static function issetData($labels, $data) {
        $missinglabels = [];

        foreach ($labels as $missLabels) {
            if (!isset($data[$missLabels]) || empty($data[$missLabels])) {
                $missinglabels[] = $missLabels;
            }
        }
            if (!empty($missinglabels)) {
                return jsonResponse(['message' => 'Erro, falta o campo: ' . implode(', ', $missinglabels)]);
        }
    }
}


?>
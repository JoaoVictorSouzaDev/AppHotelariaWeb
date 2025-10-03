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

    public static function fixDateHour($data, $hora) {
        $dataHora  =  new DateTime($data);
        $dataHora->setTime($hora, 0, 0);
        return $dataHora->format('Y-m-d H:i:s');
    }
}


?>
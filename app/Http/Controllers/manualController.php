<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\ActivityIdle;
use Response;

class manualController extends Controller
{
    //
    public function manualAddIdle(Request $request) {
        $idleLasted = ActivityIdle::orderBy('time_start','asc')->first();
        $sql = 'SELECT id_activity, id_machine, time_start, time_close, status_work FROM activity WHERE time_start < "2023-01-26 21:56:51"  UNION
        SELECT id_activity, id_machine, time_start, time_close, status_work FROM activity_rework WHERE time_start < "2023-01-26 21:56:51"  UNION 
        SELECT id_activity_downtime as id_activity, id_machine, time_start, time_close, status_downtime as status_work FROM activity_downtime WHERE time_start < "2023-01-26 21:56:51"   
        ORDER BY id_machine , time_start';
        $data = DB::select($sql);
        $j = 1;
        for ($i = 0; $j < count($data); $i++){
            $time_start = strtotime($data[$i]->time_close);
            $time_close = strtotime($data[$j]->time_start);
            $time_duration_second = $time_close - $time_start;
            $time_duration =  gmdate('H:i:s', $time_duration_second);
            if($data[$i]->id_machine != $data[$j]->id_machine || $data[$i]->time_close=="0000-00-00 00:00:00"){
                $j++;
                continue;
            }

            ActivityIdle::create([
                'id_machine' => $data[$i]->id_machine,
                'status_work' => $data[$i]->status_work,
                'time_start' => $data[$i]->time_close,
                'time_end' => $data[$j]->time_start,
                'duration' => $time_duration,
            ]);
            $j++;
        }
        // print_r($i."-".$j."-".$idleLasted->time_start."-//".$time_duration."-//".$data[6222]->time_close."-//".$data[6223]->time_start);
    }
}

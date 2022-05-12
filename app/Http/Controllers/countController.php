<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Activity;
use App\Models\ActivityRework;

class countController extends Controller
{
    //
    public function getInfoCount(){
        try
        {
            $ACTIVITY_BACKFLUSH=1;
            $ACTIVITY_REWORK=2;
            $idMach = (string)$_GET["id_mc"];
            $idTask = (string)$_GET["id_task"];
            $noSend = (string)$_GET["no_send"];
            $noPulse1 = $_GET["no_pulse1"];
            $noPulse2 = $_GET["no_pulse2"];
            $noPulse3 = $_GET["no_pulse3"];

            $dataActivity = Activity::where('id_task',$idTask)
                                    ->where('id_machine',idMach)
                                    ->where('status_work','1');
            if(empty($dataActivity)){
                $dataActivity = Activity::where('id_task',$idTask)
                                    ->where('id_machine',idMach)
                                    ->where('status_work','1');
                if(empty($dataActivity)){
                    $activityType=ACTIVITY_REWORK;
                }
            }
            else{
                $activityType=ACTIVITY_BACKFLUSH;
            }

            $sql = 'select d.divider from divider as d, planning as p 
            where d.op_color = p.op_color 
            and d.op_side = p.op_side
            and p.id_task = '.$idTask;

            if(empty($dataActivity)){
                return response() -> json([
                    'code'=>'007'
                ]);
            }
            else{
                $total_food = strtotime("1970-01-01 " . $data_activity["total_food"] . " UTC");
                $total_toilet = strtotime("1970-01-01 " . $data_activity["total_toilet"] . " UTC");
                $total_break = $total_food + $total_toilet;
                $time_start = strtotime($data_activity["time_start"]);
                $time_current = strtotime($data_activity["time_current"]);
                $time_total_second = $time_current-$time_start-$total_break;
                $time_total =  gmdate('H:i:s', $time_total_second);
                if($noPulse1==0){
                    $run_time_actual=0.0;
                }
                else{
                    $run_time_actual = round($time_total_second/$noPulse1, 2);
                }

                if($activitType==ACTIVITY_BACKFLUSH){
                    Activity::where('id_activity',$dataActivity['id_activity'])
                            ->update([
                                'status_work'   =>  $dataStaff['id_staff'],
                                'total_work' => $time_total,
                                'run_time_actual' => $run_time_actual,
                                'no_send' => $noSend,
                                'no_pulse1' => $noPulse1,
                                'no_pulse2' => $noPulse2,
                                'no_pulse3' => $noPulse3,
                            ]);
                }
                elseif ($activityType==ACTIVITY_REWORK){
                    ActivityRework::where('id_activity',$dataActivity['id_activity'])
                            ->update([
                                'status_work'   =>  $dataStaff['id_staff'],
                                'total_work' => $time_total,
                                'run_time_actual' => $run_time_actual,
                                'no_send' => $noSend,
                                'no_pulse1' => $noPulse1,
                                'no_pulse2' => $noPulse2,
                                'no_pulse3' => $noPulse3,
                            ]);
                }
            }
        }
        catch(Exception $error){
            
            Log::error($error);
            
        }
    }
}

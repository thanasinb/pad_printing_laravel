<?php

namespace App\Http\Controllers;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;
use App\Models\Activity;
use App\Models\ActivityRework;
use Log;
use Exception;


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
                                    ->where('id_machine',$idMach)
                                    ->where('status_work','1')
                                    ->orderBy('id_activity','desc')
                                    ->first();
                                    // echo $dataActivity[0]->id_task;
                                    

            if(empty($dataActivity)){
                $dataActivity = ActivityRework::where('id_task',$idTask)
                                    ->where('id_machine',$idMach)
                                    ->where('status_work','1')
                                    ->orderBy('id_activity','desc')
                                    ->first();
                                
                if(empty($dataActivity)){
                    $activityType=$ACTIVITY_REWORK;
                }
            }
            else{
                $activityType=$ACTIVITY_BACKFLUSH;
            }

            if(empty($dataActivity)){
                return response() -> json([
                    'code'=>'007'
                ]);
            }
            else{
                $total_food = strtotime("1970-01-01 " . $dataActivity->total_food . " UTC");
                $total_toilet = strtotime("1970-01-01 " . $dataActivity->total_toilet . " UTC");
                $total_break = $total_food + $total_toilet;
                $time_start = strtotime($dataActivity->time_start);
                $time_current = Carbon::now()->setTimezone('Asia/Bangkok')->timestamp;
                $time_total_second = ($time_current-$time_start)-$total_break;
                $time_total =  gmdate('H:i:s', $time_total_second);

                if($noPulse1==0){
                    $run_time_actual=0.0;
                    // echo 123;
                }
                else{
                    (float)$run_time_actual = round($time_total_second/$noPulse1, 2);
                    if($run_time_actual < 0){
                        $run_time_actual = $run_time_actual * -1;
                    }
                    
                } 

                
                
                if($activityType==$ACTIVITY_BACKFLUSH){
                        Activity::where('id_activity',$dataActivity->id_activity)
                                ->update([
                                'status_work'   =>  '1',
                                'total_work' => $time_total,
                                'run_time_actual' => $run_time_actual,
                                'no_send' => $noSend,
                                'no_pulse1' => $noPulse1,
                                'no_pulse2' => $noPulse2,
                                'no_pulse3' => $noPulse3,
                            ]);
                    $jsonReturn = Activity::where('id_activity',$dataActivity->id_activity)->first();
                }
                elseif ($activityType==$ACTIVITY_REWORK){
                            ActivityRework::where('id_activity',$dataActivity->id_activity)
                            ->update([
                                'status_work'   =>  '1',
                                'total_work' => $time_total,
                                'run_time_actual' => $run_time_actual,
                                'no_send' => $noSend,
                                'no_pulse1' => $noPulse1,
                                'no_pulse2' => $noPulse2,
                                'no_pulse3' => $noPulse3,
                            ]);
                    $jsonReturn = ActivityRework::where('id_activity',$dataActivity->id_activity)->first();
                }
            }
            
                 echo 'Ok';
                //return response() -> json($jsonReturn);
        }
        catch(Exception $error){
            
            Log::error($error);
            
        }
    }







    
    public function getInfoCountV2(){
        try{
            $ACTIVITY_BACKFLUSH=1;
            $ACTIVITY_REWORK=2;
            $idActivity = (string)$_GET["id_activity"];
            $noSend = (string)$_GET["no_send"];
            $noPulse1 = $_GET["no_pulse1"];
            $noPulse2 = $_GET["no_pulse2"];
            $noPulse3 = $_GET["no_pulse3"]; 

            $dataActivity = Activity::where('id_activity',$idActivity)
                                    ->orderBy('id_activity','desc')
                                    ->first();
            if(empty($dataActivity)){
                $dataActivity = ActivityRework::where('id_activity',$idActivity)
                                    ->orderBy('id_activity','desc')
                                    ->first();
                                
                if(empty($dataActivity)){
                    $activityType=$ACTIVITY_REWORK;
                }
            }
            else{
                $activityType=$ACTIVITY_BACKFLUSH;
            }

            if(empty($dataActivity)){
                return response() -> json([
                    'code'=>'007'
                ]);
            }
            else{
                $total_food = strtotime("1970-01-01 " . $dataActivity->total_food . " UTC");
                $total_toilet = strtotime("1970-01-01 " . $dataActivity->total_toilet . " UTC");
                $total_break = $total_food + $total_toilet;
                $time_start = strtotime($dataActivity->time_start);
                $time_current = Carbon::now()->setTimezone('Asia/Bangkok')->timestamp;
                $time_total_second = ($time_current-$time_start)-$total_break;
                $time_total =  gmdate('H:i:s', $time_total_second);

                if($noPulse1==0){
                    $run_time_actual=0.0;
                    // echo 123;
                }
                else{
                    (float)$run_time_actual = round($time_total_second/$noPulse1, 2);
                    if($run_time_actual < 0){
                        $run_time_actual = $run_time_actual * -1;
                    }
                    
                }
                
                
                if($activityType==$ACTIVITY_BACKFLUSH){
                        Activity::where('id_activity',$idActivity)
                                ->update([
                                'status_work'   =>  '1',
                                'total_work' => $time_total,
                                'run_time_actual' => $run_time_actual,
                                'no_send' => $noSend,
                                'no_pulse1' => $noPulse1,
                                'no_pulse2' => $noPulse2,
                                'no_pulse3' => $noPulse3,
                            ]);
                        $jsonReturn = Activity::where('id_activity',$idActivity)->first();

                }
                elseif ($activityType==$ACTIVITY_REWORK){
                            ActivityRework::where('id_activity',$idActivity)
                            ->update([
                                'status_work'   =>  '1',
                                'total_work' => $time_total,
                                'run_time_actual' => $run_time_actual,
                                'no_send' => $noSend,
                                'no_pulse1' => $noPulse1,
                                'no_pulse2' => $noPulse2,
                                'no_pulse3' => $noPulse3,
                            ]);
                        $jsonReturn = ActivityRework::where('id_activity',$idActivity)->first();

                }
            }
            echo 'Ok';
            //return response() -> json($jsonReturn);
        }

        catch(Exception $error){
            
            Log::error($error);
            
        }
    }
}




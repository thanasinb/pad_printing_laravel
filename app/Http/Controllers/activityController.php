<?php

namespace App\Http\Controllers;
use Log;
use Exception;
use App\Models\Staff;
use App\Models\MachineQueue;
use App\Models\Activity;
use App\Models\ActivityRework;
use Illuminate\Support\Carbon;

class activityController extends Controller
{
    //
    public function getInfoActivity(){
        try
        {
            $idRfid = (string)$_GET['id_rfid'];
            $idMach = (string)$_GET["id_mc"];
            $typeActivity = (string)$_GET['activity_type'];
            $DataQueue = MachineQueue::where('id_machine',$idMach)->where('queue_number','1')->first();
            echo $DataQueue.'<br>';

            //Part : find shif
            $time_current = time();
            $time_current_string = Carbon::now()->toDateTimeString();
            $date_eff = date("Y-m-d");
            $today_00_00 = strtotime(date("Y-m-d", $time_current));
            $day_1 = 24*60*60;
            $today_07_00 = $today_00_00 + (7*60*60);
            $today_15_45 = $today_00_00 + (15*60*60) + (45*60);
            $today_19_00 = $today_00_00 + (19*60*60);
            $today_23_00 = $today_00_00 + (23*60*60);
            $tomorrow_00_00 = $today_00_00 + $day_1;
            $yesterday_19_00 = $today_00_00 + (19*60*60) - $day_1;
            $yesterday_23_00 = $today_00_00 + (23*60*60) - $day_1;
            $shif = '';

            if (empty($DataQueue->id_staff)){
                $dataStaff = Staff::where('id_rfid',$idRfid)->first();
                if($dataStaff->id_shif == 'A'){
                    $team_no = '4';
                }
                elseif($dataStaff->id_shif == 'B'){
                    $team_no = '6';
                }
                elseif($dataStaff->id_shif == 'C'){
                    $team_no = '5';
                }
                echo 'OK <br>';

                if ($today_00_00<$time_current AND $time_current<$today_07_00){
                    $dataActivity = Activity::where('id_staff',$dataStaff->id_staff)
                        ->whereBetween('time_start',[date("Y-m-d H:i:s", $yesterday_19_00),date("Y-m-d H:i:s", $yesterday_23_00)])
                        ->first();
                        echo 'OK <br>';
                    if(empty($dataActivity)){
                        $shif = 'N'.$team_no;
                    }
                    else{
                        $shif = $team_no.'N';
                    }
                    $date_eff = date('Y-m-d',strtotime("-1 days"));
                }
                elseif ($today_07_00<$time_current AND $time_current<$today_15_45){
                    $shif = "D" . $team_no;
                }
                elseif ($today_15_45<$time_current AND $time_current<$today_19_00){
                    $shif = $team_no . "D";
                    Activity::where('id_staff', $dataStaff->id_staff)
                        ->whereBetween('time_start',[date("Y-m-d H:i:s", $today_07_00),date("Y-m-d H:i:s", $today_15_45)])
                        ->update([
                        'shif'   =>  $shif,
                    ]);
                }
                elseif ($today_19_00<$time_current AND $time_current<$today_23_00){
                    $shif = $team_no . "N";
                }
                elseif ($today_23_00<$time_current AND $time_current<$tomorrow_00_00){
                    $dataActivity = Activity::where('id_staff',$dataStaff->id_staff)
                        ->whereBetween('time_start',[date("Y-m-d H:i:s", $today_19_00),date("Y-m-d H:i:s", $today_23_00)])
                        ->first();
                        if (empty($dataActivity)){
                            $shif = "N" . $team_no;
                        }
                        else{
                            $shif = $team_no . "N";
                        }
                }
                /////////////////////////////////////////////////////


                if($typeActivity=='1'){
                    echo 'OK 1 <br>';
                    echo $DataQueue->id_task.' <br>';
                    echo $idMach.' <br>';
                    echo $dataStaff->id_staff.' <br>';
                    echo $shif.' <br>';
                    echo $date_eff.' <br>';
                    echo $time_current_string.' <br>';
                    Activity::create([
                        'id_task'   =>  $DataQueue->id_task,
                        'id_machine'=>  $idMach,
                        'id_staff'=> $dataStaff->id_staff,
                        'shif'=> $shif,
                        'date_eff'=> $date_eff,
                        'status_work'=> '1',
                        'time_start'=> $time_current_string,
                    ]);
                    echo 'Create 1 OK <br>';
                    MachineQueue::where('id_machine', $idMach)
                        ->where('queue_number','1')
                        ->update([
                        'id_staff'   =>  $dataStaff->id_staff,
                    ]);
                    $jsonActivity = Activity::where('id_task', $DataQueue->id_task)
                                            ->where('id_staff', $dataStaff->id_staff)
                                            ->where('id_machine',  $idMach)
                                            ->first();
                    echo "OK Activity";
                    return response() -> json($jsonActivity);
                    

                }
                elseif($typeActivity==2){
                    echo 'OK 2 <br>';
                    ActivityRework::create([
                        'id_task'   =>  $DataQueue->id_task,
                        'id_machine'=>  $idMach,
                        'id_staff'=> $dataStaff->id_staff,
                        'shif'=> $shif,
                        'date_eff'=> $date_eff,
                        'status_work'=> '1',
                        'time_start'=> $time_current_string,
                    ]);
                    MachineQueue::where('id_machine', $idMach)
                        ->where('queue_number','1')
                        ->update([
                        'id_staff'   =>  $dataStaff->id_staff,
                    ]);
                    $jsonActivity = Activity::where('id_task', $DataQueue->id_task)
                                            ->where('id_staff', $dataStaff->id_staff)
                                            ->where('id_machine',  $idMach)
                                            ->first();
                    echo "OK Rework";
                    return response() -> json($jsonActivity);
                    
                }



            }
            else{
                return response() -> json([
                    'code'=>'025',
                    'message'=>'This machine is currently in occupied by staff ID: ' . $DataQueue->id_staff,
                ]);
            }
    
        }
        catch(Exception $error)
        {
            Log::error($error);
        }
        
    }

}

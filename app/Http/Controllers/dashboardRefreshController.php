<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\MachineQueue;
use App\Models\Activity;
use App\Models\ActivityRework;
use App\Models\ActivityDowntime;
use App\Models\Machine;
use App\Models\CodeDowntime;
use Illuminate\Support\Facades\Log;
use Exception;
class dashboardRefreshController extends Controller
{
    //
    public function dashboardRefresh(){
        try
        {
            $machineId = Machine::all();
            $id_mc = array();
            for ($i=0;$i<6;$i++){
                array_push($id_mc,$machineId[$i]->id_mc);
            }
            foreach($id_mc as $value){

            $idMach = $value;
            $data_machine_queue  = MachineQueue::where('queue_number' ,'1')->where('id_machine' ,$idMach)->get();
            $idTask = $data_machine_queue[0]->id_task;
            $idTask = (string)$idTask;
            // echo $idMach.'--';
            // echo $idTask.'--';
            // ACCUMULATE THE PROCESSED QTY WHICH HAS NOT BEEN RE-IMPORTED
            $data_activity_sum = DB::select('SELECT SUM(no_pulse1) AS qty_process, SUM(num_repeat) AS qty_repeat FROM activity WHERE status_work<6 AND id_task='.$idTask);
                // echo $data_activity_sum[0]->qty_process;
            if($data_activity_sum[0]->qty_process == null){
                $data_activity_sum[0]->qty_process = 0;
                //echo $data_activity_sum[0]->qty_process;
            }
            if($data_activity_sum[0]->qty_repeat == null){
                $data_activity_sum[0]->qty_repeat = 0;
                //echo $data_activity_sum[0]->qty_repeat;
            }
                // echo $data_activity_sum[0]->qty_process;
        // SELECT THE ACTIVE BACKFLUSH ACTIVITY

            $data_activity_time = Activity::where('id_task',$idTask)
                                        ->where('id_machine',$idMach)
                                        ->where('status_work','<','3')
                                        ->first();

            // $data_activity_time = json_encode($data_activity_time);
        // SELECT THE ACTIVE REWORK ACTIVITY

            $data_rework_time = ActivityRework::where('id_task',$idTask)
                                            ->where('id_machine',$idMach)
                                            ->where('status_work','<','3')
                                            ->first();

            // $data_rework_time = json_encode($data_rework_time);
        // SELECT THE DOWNTIME ACTIVITY OF SUCH TASK

            $data_activity_downtime = DB::select("SELECT ad.id_staff, ad.status_downtime, cd.code_downtime
            FROM activity_downtime as ad, code_downtime as cd where ad.id_code_downtime=cd.id_code_downtime
            and status_downtime < 3
            and id_task='".(string)$idTask."'
            and id_machine='".(string)$idMach."'");

            // $data_activity_downtime = json_encode($data_activity_downtime);
            // echo $data_activity_time;
            // echo $data_rework_time;
            // print_r ($data_activity_time);
            // print_r ($data_rework_time);
            // print_r ($data_activity_downtime);

            $active_work = 0;
            if(($data_activity_time) != null){
                $active_work++;
            }
            if(($data_activity_downtime) != null){
                $active_work++;
            }
            if(($data_rework_time) != null){
                $active_work++;
            }
            $rework='n';
            // echo $active_work;
            if ($active_work>1){
                $sumResult[$value] = json_encode([
                    "code" => "020",
                    "message" => "The activity exists in both activity and activity_downtime tables"
                ]);
            } 
            else {
                $data_activity_time = new Activity();
                if($data_activity_downtime[0]->status_downtime != null){
                    $data_activity_time->status_work = 4;
                    $data_activity_time->id_staff = $data_activity_downtime[0]->id_staff;
                    $data_activity_time->code_downtime = $data_activity_downtime[0]->code_downtime;
                }
                elseif($data_rework_time[0]->status_work != null){
                    $data_activity_time = $data_rework_time;
                    $rework='y';
                }
                if($data_activity_time->status_work == null){
                    $data_activity_time->status_work = 0 ;
                }
                if ($data_activity_time->run_time_actual == null) {
                    $data_activity_time->run_time_actual = 0;
                }
                $data_planning = DB::select('SELECT task_complete, status_backup, qty_order,
                qty_comp AS qty_complete, qty_open, run_time_std, divider.divider  as divider,
                p.op_color, p.op_side, p.op_des, p.item_no
                FROM planning as p, divider
                where planning.op_color=divider.op_color
                AND planning.op_side=divider.op_side
                and id_task=' . $idTask);
                $data_planning[0]->run_time_std = number_format((floatval($data_planning[0]->run_time_std)*3600)-2, 2);
                // print_r($data_planning);
                $sumResult[$value] = json_encode([
                        "qty_process"=> $data_activity_sum[0]->qty_process,
                        "qty_repeat"=> $data_activity_sum[0]->qty_repeat,
                        "task_complete"=> $data_planning[0]->task_complete,
                        "status_backup"=> $data_planning[0]->status_backup,
                        "qty_order"=> $data_planning[0]->qty_order,
                        "qty_complete"=> $data_planning[0]->qty_complete,
                        "qty_open"=> $data_planning[0]->qty_open,
                        "run_time_std"=> $data_planning[0]->run_time_std,
                        "divider"=> $data_planning[0]->divider,
                        "op_color" => $data_planning[0]->op_color,
                        "op_side" => $data_planning[0]->op_side,
                        "op_des" => $data_planning[0]->op_des,
                        "item_no" => $data_planning[0]->item_no,
                        "status_work"=> $data_activity_time->status_work,
                        "id_staff"=> $data_activity_time->id_staff,
                        "code_downtime"=> $data_activity_time->code_downtime,
                        "run_time_actual"=> $data_activity_time->run_time_actual,
                        "rework"=> $rework
                ]);
            }
        }
            echo $sumResult;
        }
        catch(Exception $error){
            Log::error($error);
        }
    }

    public function dashboardRefreshV2(){
    try{
        $machineId = Machine::all();
        $id_mc = array();
        for ($i=0;$i<6;$i++){
            array_push($id_mc,$machineId[$i]->id_mc);
            }
        $data_machine_queue  = MachineQueue::where('queue_number' ,'1') ->where('id_machine' ,$idMach)->get();
        $idTask = $data_machine_queue[0]->id_task;
        $idTask = (string)$idTask;
        print_r($idTask);
        
        $data_activity = DB::select('SELECT * FROM (select max(id_activity) as id_activity_max FROM activity GROUP by id_machine) as max_activity , activity as a where a.id_activity = max_activity.id_activity_max');
        $count = count((array)$data_activity);
        for($i = 0 ; $i<$count ; $i++){
            $data_activity_sum = DB::select('SELECT SUM(no_pulse1) AS qty_process, SUM(num_repeat) AS qty_repeat FROM activity WHERE status_work<6 AND id_task='.$data_activity[$i]->id_task);
            $data_planning = DB::select('SELECT task_complete, status_backup, qty_order,
            qty_comp AS qty_complete, qty_open, run_time_std, divider.divider as divider,
            p.op_color, p.op_side, p.op_des, p.item_no
            FROM planning as p, divider
            where p.op_color=divider.op_color
            AND p.op_side=divider.op_side
            and id_task=' . $data_activity[$i]->id_task);
            $data_planning[0]->run_time_std = number_format((floatval($data_planning[0]->run_time_std)*3600)-2, 2);
            $rework = 'y';
            $sumResult[$i] = array(
                "id_machine"=>$data_activity[$i]->id_machine,
                "qty_process"=> $data_activity_sum[0]->qty_process,
                "qty_repeat"=> $data_activity_sum[0]->qty_repeat,
                "task_complete"=> $data_planning[0]->task_complete,
                "status_backup"=> $data_planning[0]->status_backup,
                "qty_order"=> $data_planning[0]->qty_order,
                "qty_complete"=> $data_planning[0]->qty_complete,
                "qty_open"=> $data_planning[0]->qty_open,
                "run_time_std"=> $data_planning[0]->run_time_std,
                "divider"=> $data_planning[0]->divider,
                "op_color" => $data_planning[0]->op_color,
                "op_side" => $data_planning[0]->op_side,
                "op_des" => $data_planning[0]->op_des,
                "item_no" => $data_planning[0]->item_no,
                "status_work"=> $data_activity[$i]->status_work,
                "id_staff"=> $data_activity[$i]->id_staff,
                "run_time_actual"=> $data_activity[$i]->run_time_actual,
                "rework"=> $rework
        );
        }
        return response() -> json($sumResult);
        
    }
    catch(Exception $error){
        Log::error($error);
    }
    }

    public function dashboardRefreshV3(){
        
        try{
            $machineId = MachineQueue::where('queue_number' ,'1')->get();
            $id_mc = array();
            $sumResult = array();

            for ($i=0;$i<6;$i++){
                array_push($id_mc,$machineId[$i]->id_machine);
                }
                
            // $data_activity = DB::select('SELECT * FROM (select max(id_activity) as id_activity_max FROM activity GROUP by id_machine) as max_activity , activity as a where a.id_activity = max_activity.id_activity_max');
            $count = count((array)$id_mc);
            // print_r($count);
            for($i = 0 ; $i<$count ; $i++){

                $data_machine_queue = MachineQueue::where('id_machine',$id_mc[$i])->where('queue_number','1')->get();

                $data_activity_sum = DB::select('SELECT SUM(no_pulse1) AS qty_process, SUM(num_repeat) AS qty_repeat FROM activity WHERE status_work<6 AND id_task='.$data_machine_queue[0]->id_task);
                
                $data_planning = DB::select('SELECT task_complete, status_backup, qty_order,
                qty_comp AS qty_complete, qty_open, run_time_std, divider.divider as divider,
                p.op_color, p.op_side, p.op_des, p.item_no
                FROM planning as p, divider
                where p.op_color=divider.op_color
                AND p.op_side=divider.op_side
                and id_task=' . $data_machine_queue[0]->id_task);
                
                $data_planning[0]->run_time_std = number_format((floatval($data_planning[0]->run_time_std)*3600)-2, 2);
                
                $number_count = 0;
                $id_code_downtime = '-';
                $code_downtime = '-';
                $des_downtime = '-';
                $des_downtime_thai = '-';
                if($data_machine_queue[0]->id_activity != 0){
                    $number_count++;
                    $data_activity = Activity::where('id_activity',$data_machine_queue[0]->id_activity)->get();
                    
                    

                }  
                if($data_machine_queue[0]->id_activity_downtime != 0){
                    $number_count++;
                    $data_activity = ActivityDowntime::where('id_activity_downtime',$data_machine_queue[0]->id_activity_downtime)->get();
                    
                    $data_code_downtime = CodeDowntime::where('id_code_downtime',$data_activity[0]->id_code_downtime)->get();
                    // return response() -> json($data_activity);
                    $id_code_downtime = $data_code_downtime[0]->id_code_downtime;
                    $code_downtime = $data_code_downtime[0]->code_downtime;
                    $des_downtime = $data_code_downtime[0]->des_downtime;
                    $des_downtime_thai = $data_code_downtime[0]->des_downtime_thai;

                }
                if($data_machine_queue[0]->id_activity_rework != 0){
                    $number_count++;
                    $data_activity = ActivityRework::where('id_activity',$data_machine_queue[0]->id_activity_rework)->get();

                }

                if ($number_count>=2 || $number_count<=0){
                    $sumResult[$i] = array(
                        "id_machine" => $id_mc[$i],
                        "code" => "020",
                        "message" => "The activity exists in both activity and activity_downtime tables or not found in both"
                    );
                    continue;
                } 
                else{
                    $sumResult[$i] = array(
                        "id_machine"=>$id_mc[$i],
                        "qty_process"=> $data_activity_sum[0]->qty_process,
                        "qty_repeat"=> $data_activity_sum[0]->qty_repeat,
                        "task_complete"=> $data_planning[0]->task_complete,
                        "status_backup"=> $data_planning[0]->status_backup,
                        "qty_order"=> $data_planning[0]->qty_order,
                        "qty_complete"=> $data_planning[0]->qty_complete,
                        "qty_open"=> $data_planning[0]->qty_open,
                        "run_time_std"=> $data_planning[0]->run_time_std,
                        "divider"=> $data_planning[0]->divider,
                        "op_color" => $data_planning[0]->op_color,
                        "op_side" => $data_planning[0]->op_side,
                        "op_des" => $data_planning[0]->op_des,
                        "item_no" => $data_planning[0]->item_no,
                        "status_work"=> $data_activity[0]->status_work,
                        "id_staff"=> $data_activity[0]->id_staff,
                        "run_time_actual"=> $data_activity[0]->run_time_actual,
                        "id_code_downtime"=> $id_code_downtime,
                        "code_downtime"=> $code_downtime,
                        "des_downtime"=> $des_downtime,
                        "des_downtime_thai"=> $des_downtime_thai
                        

                );

                }
                
            }
            return response() -> json($sumResult);
        }

        catch(Exception $error){
            Log::error($error);
        }
    }
    
}


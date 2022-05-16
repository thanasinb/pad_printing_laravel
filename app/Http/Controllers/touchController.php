<?php
namespace App\Http\Controllers;
use Illuminate\Support\Arr;
use App\Models\ActivityDowntime;
use Illuminate\Http\Request;
use Log;
use Exception;
use App\Models\Staff;
use App\Models\MachineQueue;
use App\Models\Planning;
use Illuminate\Support\Facades\DB;
class touchController extends Controller
{
    public function getTouchInfo(){
        try
        {
            $idRfid = (string)$_GET["id_rfid"];
            $idMach = (string)$_GET["id_mc"];
            $sql = 'SELECT s.id_staff, s.name_first, s.name_last, s.id_role, p.id_job, p.item_no, p.operation, p.op_des, p.qty_order, p.qty_comp, p.qty_open, m.id_task, m.id_staff as machStaff FROM staff as s, machine_queue as m, planning as p WHERE m.id_task = p.id_task and m.id_machine = "'.$idMach.'" and s.id_rfid = "'.$idRfid.'"';
            $queryTouch = DB::select($sql);
            echo data_get($queryTouch,"m.id_task");
            // $encodeTouch = json_encode($queryTouch);
            // $decodeTouch= json_decode($encodeTouch,true);
            // echo ($decodeTouch['id_task']);

            // print_r($queryTouch);
            $dataPlanning = [];
            $dataDowntime = [];
            $sqlPlanning = 'select d.divider from divider as d, planning as p 
                        where d.op_color = p.op_color 
                        and d.op_side = p.op_side 
                        and p.id_task = '.array_pop($queryTouch)->id_task; 
            // print_r (array_pop($queryTouch)->id_task);
            // echo $sqlPlanning;
            // $touchStaff =Staff::where('id_rfid',$idRfid)->get();
            //$touchMachQueue = MachineQueue::where('id_machine',$idMach)->get();
            //$touchPlan = Planning::where('id_task',$touchMachQueue['id_task'])->get();
            if($queryTouch['machStaff'] == null){
                $dataPlanning = DB::select($sqlPlanning);
                $dataReturn =array_merge($queryTouch, $dataPlanning);
            }
            else{
                $dataDowntime = ActivityDowntime::where('id_machine', $idMach)
                                                ->where('status_downtime', '1')
                                                ->first();
                if(!empty($dataDowntime['id_staff'])){
                    $dataStaffDowntime = Staff::where('id_staff', $queryTouch['machStaff'])->first();
                    
                    if(($queryTouch['id_role'] == 2) and ($dataStaffDowntime['id_role'] == 1)){
                        $dataPlanning = DB::select($sqlPlanning);
                        $dataReturn =array_merge($queryTouch, $dataPlanning);
                    }
                    else{
                        $dataReturn = array('code'=>'027',"message"=>"This machine is currently in occupied by staff ID: " . $queryTouch['machStaff']);
                    }
                }
                else{
                    $dataReturn = array("code"=>"026", "message"=>"This machine is currently in occupied by staff ID: " . $queryTouch['machStaff']);
                }

            }

            return response() -> json($dataReturn);
        }
        catch(Exception $error)
        {
            Log::error($error);
        }
        
    }

}

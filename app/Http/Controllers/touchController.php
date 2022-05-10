<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Log;
use Exception;
use App\Models\Staff;
use App\Models\MachineQueue;
use App\Models\Planning;
use Illuminate\Support\Facades\DB;
class touchController extends Controller
{
    

    //
    public function getTouchInfo(){
        try
        {
            $idRfid = (string)$_GET["id_rfid"];
            $idMach = (string)$_GET["id_mc"];
            $sql = 'SELECT s.id_staff, s.name_first, s.name_last, s.id_role, p.id_job, p.item_no, p.operation, p.op_des, p.qty_order, p.qty_comp, p.qty_open, m.id_task FROM staff as s, machine_queue as m, planning as p WHERE m.id_task = p.id_task and m.id_machine = "'.$idMach.'" and s.id_rfid = "'.$idRfid.'"';
            $queryTouch = DB::select($sql);
            // $touchStaff =Staff::where('id_rfid',$idRfid)->get();
            //$touchMachQueue = MachineQueue::where('id_machine',$idMach)->get();
            //$touchPlan = Planning::where('id_task',$touchMachQueue['id_task'])->get();
            response() -> json($queryTouch);
            return response() -> json($queryTouch);
        }
        catch(Exception $error)
        {
            Log::error($error);
        }
        
    }

}

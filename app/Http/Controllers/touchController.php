<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Log;
use Exception;
use App\Models\Staff;
use App\Models\MachineQueue;
use App\Models\Planning;

class touchController extends Controller
{
    //
    public function getTouchInfo(){
        try
        {
            $rfid = (string)$_GET["idRfid"];
            $touchStaff = Staff::where('id_rfid',$rfid)->get();
            //$touchMach = MachineQueue::where('id_machine',$_GET['idMach'])->get();
            //$idTask = $touchMach['id_task'];
            //$touchPlan = Planning::where('id_task',$idTask)->get();
            echo "f";
            return response()->json($touchStaff,JSON_UNESCAPED_UNICODE);
        }
        catch(Exception $e)
        {
            Log::error($e);
        }
    }
}

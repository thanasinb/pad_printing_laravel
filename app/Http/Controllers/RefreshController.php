<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\MachineQueue;
use App\Models\Machine;
use App\Models\Planning;

class RefreshController extends Controller
{
    //
    public function fetchRefresh(){
        try
        {
            
            // $machineId = MachineQueue::all();
            // $id_mc = array();
            // for ($i=0;$i<6;$i++){
            //     array_push($id_mc,$machineId[$i]->id_mc);
            //     //return response() -> json($machineId);
            // }

            $idMach = (string)$_GET["id_mc"];
            $data_machine_queue  = MachineQueue::where('id_machine' ,$idMach)->get();
            $idTask = $data_machine_queue[0]->id_task;
            $idTask = (string)$idTask;
            //return response() -> json($idTask);

            $data_machine_queue_a = MachineQueue::where('id_machine' ,$idMach)->get();
            $idActivity = $data_machine_queue_a[0]->id_activity;
            $idActivity = (string)$idActivity;
            //return response() -> json($idActivity);

            $data_planning = Planning::where('id_task', $idTask)->get();
           return response() -> json($data_planning);



        }
         catch(Exception $error){
            Log::error($error);  
        }
    }    
}


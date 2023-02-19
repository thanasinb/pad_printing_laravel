<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Exception;
use App\Models\MachineQueue;
use App\Models\Machine;
use App\Models\Planning;
use App\Models\Activity;
use App\Models\ActivityRework;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class productsController extends Controller
{
    //
    public function getPlanningAll(){
        try{
            $result = Planning::select('item_no','item_des')->groupBy('item_no')->get();
            return response() -> json($result);
        }
        catch(Exception $error){
            Log::error($error);
        }
    }
    
    public function getPlanningSelect(Request $request){
        try{
            $data = $request->all();
            $data_key = array_keys($data);
            $result = Planning::where('item_no',$data_key[0])->orderBy('id_task','desc')->get();
            return response() -> json($result);
        }
        catch(Exception $error){
            Log::error($error);
        }
    }

    public function getDetailTask(Request $request){
        try{
            $data = $request->all();
            // $result = Planning::where('item_no',$data['id'])->orderBy('id_task','desc')->get();
            $result_ac_backflush = Activity::where('id_task',$data['id'])->orderBy('time_start')->get();
            $result_ac_rework = ActivityRework::where('id_task',$data['id'])->orderBy('time_start')->get();
            $result =(object)array_merge(
                array($result_ac_backflush),
                array($result_ac_rework),
            );
            return response() -> json($result);
        }
        catch(Exception $error){
            Log::error($error);
        }
    }
}

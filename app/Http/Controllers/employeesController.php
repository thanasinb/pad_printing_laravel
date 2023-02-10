<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Exception;
use App\Models\Activity;
use App\Models\ActivityDowntime;
use App\Models\ActivityRework;
use App\Models\Staff;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class employeesController extends Controller
{
    //
    public function getEmployeesAll(){
        try{
            $result = DB::select('SELECT id_staff, id_rfid, name_first, name_last, s.site, id_shif, r.role, r.id_role, p.prefix, p.id_prefix from staff as s , role as r, prefix as p 
            where 
            s.prefix = p.id_prefix AND
            s.id_role = r.id_role');
            return response() -> json($result);
        }
        catch(Exception $error){
            Log::error($error);
        }
    }

    public function editEmployee(Request $request){
        try{
            $data = $request->all();
            $result = Staff::where('id_staff','=',$data['id_staff'])->update([
                'id_staff'=> $data['id_staff'],
                'id_rfid'=> $data['id_rfid'],
                'prefix'=> (int)$data['prefix'],
                'name_first'=> $data['name_first'],
                'name_last'=> $data['name_last'],
                'site'=> $data['site'],
                'id_role'=> (int)$data['id_role'],
                'id_shif'=> $data['id_shif'],
            ]);
            return response() -> json($result);
        }
        catch(Exception $error){
            Log::error($error);
        }
    }

    public function getActivityEmployees (Request $request){
        try{
            $data = $request->all();
            // print_r($data['id_staff']);
            $result1 = DB::select('select * from activity as b, planning as p where 
            b.id_task = p.id_task and 
            b.id_staff = '.$data['id_staff'].' order by b.time_start');
            $result2 = DB::select('select * from activity_rework as r, planning as p where 
            r.id_task = p.id_task and 
            r.id_staff = '.$data['id_staff'].' order by r.time_start');
            $resultI1 = DB::select('select p.item_no, p.item_des from activity as b, planning as p where 
            b.id_task = p.id_task and 
            b.id_staff = '.$data['id_staff'].'
            group by p.item_no
            order by b.time_start desc');
            $resultI2 = DB::select('select p.item_no, p.item_des from activity_rework as r, planning as p where 
            r.id_task = p.id_task and 
            r.id_staff = '.$data['id_staff'].'
            group by p.item_no
            order by r.time_start desc');
                $resultData = array_merge(  
                    ($result1),
                    ($result2));
                $resultItem = array_merge(  
                    ($resultI1),
                    ($resultI2));
                $result = [$resultData,$resultItem];

            return response() -> json($result);
            
        }
        catch(Exception $error){
            Log::error($error);
        }
    }
}

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
            $result = DB::select('SELECT id_staff, id_rfid, name_first, name_last, s.site, id_shif, r.role, p.prefix from staff as s , role as r, prefix as p 
            where 
            s.prefix = p.id_prefix AND
            s.id_role = r.id_role');
            return response() -> json($result);
        }
        catch(Exception $error){
            Log::error($error);
        }
    }

    public function editEmployee(){
        
    }
}

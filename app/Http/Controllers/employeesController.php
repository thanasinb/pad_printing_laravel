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
            $result = Staff::All();
            return response() -> json($result);
        }
        catch(Exception $error){
            Log::error($error);
        }
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log;
use Exception;
use App\Models\Activity;
use App\Models\ActivityDowntime;
use App\Models\ActivityRework;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class timelineController extends Controller
{
    //
    public function getInfoActivity(){
        try
        {
            $queryActivity = Activity::all();
            return response() -> json($queryActivity);
        }
        catch(Exception $error)
        {
            Log::error($error);
        }
    }

    public function getInfoActivityDowntime(){
        try
        {
            $queryActivity = ActivityDowntime::all();
            return response() -> json($queryActivity);
        }
        catch(Exception $error)
        {
            Log::error($error);
        }
    }

    public function getInfoActivityRework(){
        try
        {
            $queryActivity = ActivityRework::all();
            return response() -> json($queryActivity);
        }
        catch(Exception $error)
        {
            Log::error($error);
        }
    }
}

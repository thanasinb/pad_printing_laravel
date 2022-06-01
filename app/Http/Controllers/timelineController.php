<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log;
use Exception;
use App\Models\Activity;
use App\Models\ActivityDowntime;
use App\Models\ActivityRework;
use App\Models\BreakRework;
use App\Models\BreakTable;
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

    public function getInfoBreak(){
        try
        {
            $queryActivity = DB::select('SELECT a.id_machine, b.break_start, b.break_stop  FROM break as b,activity as a WHERE a.id_activity = b.id_activity');
            return response() -> json($queryActivity);
        }
        catch(Exception $error)
        {
            Log::error($error);
        }
    }

    public function getInfoBreakRework(){
        try
        {
            $queryActivity = DB::select('SELECT a.id_machine, b.break_start, b.break_stop  FROM break_rework as b,activity as a WHERE a.id_activity = b.id_activity');
            return response() -> json($queryActivity);
        }
        catch(Exception $error)
        {
            Log::error($error);
        }
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Exception;
use App\Models\Activity;
use App\Models\ActivityDowntime;
use App\Models\ActivityRework;
use App\Models\BreakRework;
use App\Models\BreakTable;
use App\Models\MachineQueue;
use App\Models\Comment;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class timelineController extends Controller
{
    //
    public function getInfoAllActivityAndAllBreak(){
        try
        {
            $queryActivity1 = DB::select('SELECT * FROM activity as a ,break as b ,divider as d ,planning as p  
            WHERE a.id_break = b.id_break and a.id_task = p.id_task 
            and p.op_color = d.op_color and p.op_side =  d.op_side');
            
            $queryActivity1_noBreak = DB::select('SELECT * FROM activity as a ,divider as d ,planning as p  
            WHERE a.id_break = 0 and a.id_task = p.id_task 
            and p.op_color = d.op_color and p.op_side =  d.op_side');
            // $num_break = count($queryActivity1);
            // $num_nobreak = count($queryActivity1_noBreak);

            $queryActivity2 = DB::select('SELECT * FROM activity_rework as a ,break as b ,divider as d ,planning as p  
            WHERE a.id_break = b.id_break and a.id_task = p.id_task 
            and p.op_color = d.op_color and p.op_side =  d.op_side');

            $queryActivity2_noBreak = DB::select('SELECT * FROM activity_rework as a ,divider as d ,planning as p  
            WHERE a.id_break = 0 and a.id_task = p.id_task 
            and p.op_color = d.op_color and p.op_side =  d.op_side');
            // $num_r_break = count($queryActivity2);
            // $num_r_nobreak = count($queryActivity2_noBreak);

            $queryActivity3 = ActivityDowntime::all();

            $result =(object)array_merge(  
            array($queryActivity1),
            array($queryActivity1_noBreak),
            array($queryActivity2),
            array($queryActivity2_noBreak),
            array($queryActivity3));

            return response() -> json($result);
        }
        catch(Exception $error)
        {
            Log::error($error);
        }
    }
    public function getQueueMachineInfo(){
        try
        {
            $queryActivity = MachineQueue::where('queue_number','1')->get();
            $IdMachine = array();
            for($i=0;$i<$queryActivity->count();$i++){
                array_push($IdMachine,$queryActivity[$i]->id_machine);
            }

            return response() -> json($IdMachine);
        }
        catch(Exception $error)
        {
            Log::error($error);
        }
    }

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

    public function addComment(Request $request){
        try
        {
            $start = $request->input('unix_start');
            $stop = $request->input('unix_stop');
            $data = $request->input('comment_data');
            $result = Comment::create([
                'unix_time_start' => $start,
                'unix_time_stop' => $stop,
                'comment_data' => $data
            ]);

            return response() -> json('ok');
        }
        catch(Exception $error)
        {
            Log::error($error);
        }
    }

    public function getComment(){
        try
        {
            $queryActivity = Comment::all();
            return response() -> json($queryActivity);
        }
        catch(Exception $error)
        {
            Log::error($error);
        }
    }
}

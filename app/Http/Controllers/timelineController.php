<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Exception;
use App\Models\Activity;
use App\Models\ActivityIdle;
use App\Models\ActivityDowntime;
use App\Models\ActivityRework;
use App\Models\BreakRework;
use App\Models\BreakTable;
use App\Models\MachineQueue;
use App\Models\Comment;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use DateTime;

class timelineController extends Controller
{
    //
        // public function getInfoAllActivityAndAllBreak(){
        //     try
        //     {
        //         $queryCommentAc = Comment::where('activity_type','1')->get();
        //         $queryActivity = Activity::all();
        //         foreach($queryActivity as $ac){
        //         }
        //         return response() -> json($queryActivity);
        //     }
        //     catch(Exception $error)
        //     {
        //         Log::error($error);
        //     }
        // }
    public function getInfoAllActivityAndAllBreak(){
        try
        {
            $queryActivity1 = DB::select('SELECT a.*, b.*, d.*, p.*, 1 as activity_type ,c.comment_des FROM activity as a ,break as b ,divider as d ,planning as p ,comment as c
            WHERE a.id_break = b.id_break and a.id_task = p.id_task and a.id_comment = c.id_comment 
            and p.op_color = d.op_color and p.op_side =  d.op_side');

            $commentBreak = DB::select('SELECT b.id_break ,b.id_activity, b.id_staff, c.* from break as b, comment as c where b.id_comment = c.id_comment and b.id_comment != 0');
            
            if(count($commentBreak)!=0){
                for($i=0;$i<count($queryActivity1);$i++){
                    for($j=0;$j<count($commentBreak);$j++){
                        if($queryActivity1[$i]->id_comment == $commentBreak[$j]->id_comment){
                            $queryActivity1[$i]->comment_break = $commentBreak[$j]->comment_des;
                        }
                    }
                }
            }
            
            $queryActivity1_noBreak = DB::select('SELECT a.*, d.*, p.*, 1 as activity_type ,c.comment_des FROM activity as a ,divider as d ,planning as p ,comment as c
            WHERE a.id_break = 0 and a.id_task = p.id_task and a.id_comment = c.id_comment 
            and p.op_color = d.op_color and p.op_side =  d.op_side');
            // $num_break = count($queryActivity1);
            // $num_nobreak = count($queryActivity1_noBreak);

            $queryActivity2 = DB::select('SELECT a.*, b.*, d.*, p.*, 4 as activity_type ,c.comment_des FROM activity_rework as a ,break_rework as b ,divider as d ,planning as p ,comment as c
            WHERE a.id_break = b.id_break and a.id_task = p.id_task and a.id_comment = c.id_comment 
            and p.op_color = d.op_color and p.op_side =  d.op_side');

            $commentBreakRework = DB::select('SELECT b.id_break ,b.id_activity, b.id_staff, c.* from break_rework as b, comment as c where b.id_comment = c.id_comment and b.id_comment != 0');
            
            if(count($commentBreakRework)!=0){
                for($i=0;$i<count($queryActivity2);$i++){
                    for($j=0;$j<count($commentBreakRework);$j++){
                        if($queryActivity2[$i]->id_comment == $commentBreakRework[$j]->id_comment){
                            $queryActivity2[$i]->comment_break = $commentBreakRework[$j]->comment_des;
                        }
                    }
                }
            }

            $queryActivity2_noBreak = DB::select('SELECT a.*, d.*, p.*, 4 as activity_type ,c.comment_des FROM activity_rework as a ,divider as d ,planning as p ,comment as c
            WHERE a.id_break = 0 and a.id_task = p.id_task and a.id_comment = c.id_comment
            and p.op_color = d.op_color and p.op_side =  d.op_side');
            // $num_r_break = count($queryActivity2);
            // $num_r_nobreak = count($queryActivity2_noBreak);

            $queryActivity3 = DB::select('SELECT a.*, p.*, 3 as activity_type ,c.comment_des FROM activity_downtime as a ,comment as c ,planning as p where a.id_comment = c.id_comment and a.id_task = p.id_task');
            $queryActivity4 = DB::select('SELECT a.*, 0 as activity_type ,c.comment_des FROM activity_idle as a ,comment as c where a.id_comment = c.id_comment');

            $result =(object)array_merge(  
            array($queryActivity1),
            array($queryActivity1_noBreak),
            array($queryActivity2),
            array($queryActivity2_noBreak),
            array($queryActivity3),
            array($queryActivity4),
        );

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
            $queryActivity = MachineQueue::where('queue_number','1')->orderBy('id_machine')->get();
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
            $ac = $request->input('id_activity');
            $ac_type = $request->input('activity_type');
            $data = $request->input('comment_data');
            $result = Comment::create([
                'id_activity' => $ac,
                'activity_type' => $ac_type,
                'comment_des' => $data,
                'comment_datetime' => new DateTime()
            ]);
            $get_comment_id = Comment::select('id_comment')->orderBy('id_comment','desc')->first();
            if($ac_type == 0){
                $result = ActivityIdle::where('id_activity',$ac)->update([
                    'id_comment' => $get_comment_id->id_comment,
                ]);
            }
            if($ac_type == 1){
                $result = Activity::where('id_activity',$ac)->update([
                    'id_comment' => $get_comment_id->id_comment,
                ]);
            }
            if($ac_type == 2){
                $result = BreakTable::where('id_break',$ac)->update([
                    'id_comment' => $get_comment_id->id_comment,
                ]);
            }
            if($ac_type == 3){
                $result = ActivityDowntime::where('id_activity_downtime',$ac)->update([
                    'id_comment' => $get_comment_id->id_comment,
                ]);
            }
            if($ac_type == 4){
                $result = ActivityRework::where('id_activity',$ac)->update([
                    'id_comment' => $get_comment_id->id_comment,
                ]);
            }
            if($ac_type == 5){
                $result = BreakRework::where('id_break',$ac)->update([
                    'id_comment' => $get_comment_id->id_comment,
                ]);
            }
            

            

            return response() -> json([
                                        'status' => 'ok',
                                        'event' => 'add comment',
                                        // 'timestamp' => new DataTime()
                                    ]);
            // return response() -> json($get_comment_id);
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

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

            $queryActivity3 = DB::select('SELECT a.*, p.*, 3 as activity_type ,c.comment_des, cdt.des_downtime_thai as des_downtime FROM code_downtime as cdt, activity_downtime as a ,comment as c ,planning as p where a.id_comment = c.id_comment and a.id_task = p.id_task and a.id_code_downtime = cdt.id_code_downtime');
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

    public function addScrap(Request $request){
        try
        {
            $data = $request->all();
            $dataActivity = Activity::where('id_activity',$data['id_activity'])->first();
            // $sql = "INSERT INTO `activity_scrap`(`id_task`, `id_machine`, `id_staff`,
            // `shif`, `id_code_scrap`, `status_scrap`, `date_eff`, 
            // `time_start`, `time_close`, `total_work`, `no_send`, 
            // `no_pulse1`, `no_pulse2`, `no_pulse3`) 
            // VALUES ('".$dataActivity['id_task']."','".$dataActivity['id_machine']."',
            // '".$dataActivity['id_staff']."','".$dataActivity['shif']."','".$data['code_scrap']."',
            // '3','".date("Y-m-d")."','".date("Y-m-d H:i:s")."',
            // '".date("Y-m-d H:i:s")."','"."00:00:00"."','1',
            // '0','".$data['value']."','0')";
            // return response() -> json($sql);
            DB::insert("INSERT INTO `activity_scrap`(`id_task`, `id_machine`, `id_staff`,
                `shif`, `id_code_scrap`, `status_scrap`, `date_eff`, 
                `time_start`, `time_close`, `total_work`, `no_send`, 
                `no_pulse1`, `no_pulse2`, `no_pulse3`) 
                VALUES ('".$dataActivity['id_task']."','".$dataActivity['id_machine']."',
                '".$dataActivity['id_staff']."','".$dataActivity['shif']."','".$data['code_scrap']."',
                '3','".gmdate("Y-m-d", strtotime("+7 hours"))."','".gmdate("Y-m-d H:i:s", strtotime("+7 hours"))."',
                '".gmdate("Y-m-d H:i:s", strtotime("+7 hours"))."','"."00:00:00"."','1',
                '0','".$data['value']."','0')");

            
            return response() -> json([
                'status'=>'OK',
            ]);
        }
        catch(Exception $error)
        {
            Log::error($error);
        }
    }

    public function addTestActivity(Request $request){
        try
        {
            $data = $request->all();
            $idleData = ActivityIdle::where('id_machine',$data['id_mc'])->orderBy('time_start','desc')->first();
            // return response() -> json($idleData);
            if($idleData['time_close'] == "0000-00-00 00:00:00"){
                ActivityIdle::where('id_activity',$idleData['id_activity'])->update([
                    'time_close' => gmdate("Y-m-d H:i:s", strtotime("+7 hours")),
                ]);
            }
            Activity::create([
                'id_task' => '12699',
                'id_machine' => $data['id_mc'],
                'id_staff' => $data['id_staff'],
                'id_comment' => '0',
                'shif' => 'D5',
                'status_work' => '3',
                'id_break' => '0',
                'date_eff' => gmdate("Y-m-d", strtotime("+7 hours")),
                'time_start' => gmdate("Y-m-d H:i:s", strtotime("+7 hours")),
                'time_close' => "0000-00-00 00:00:00",
                'total_work' => "00:00:00",
                'total_food' => "00:00:00",
                'total_toilet' => "00:00:00",
                'no_send' => '0',
                'no_pulse1' => '0',
                'no_pulse2' => '0',
                'no_pulse3' => '0',
                'multiplier' => '1',
                'run_time_actual' => '0',
            ]);

            $dataReturn = Activity::orderBy('id_activity','desc')->first();
            return response() -> json($dataReturn);
        }
        catch(Exception $error)
        {
            Log::error($error);
        }
    }

    public function addTestActivityDT(Request $request){
        try
        {
            $data = $request->all();
            $idleData = ActivityIdle::where('id_machine',$data['id_mc'])->orderBy('time_start','desc')->first();
            // return response() -> json($idleData);
            if($idleData['time_close'] == "0000-00-00 00:00:00"){
                ActivityIdle::where('id_activity',$idleData['id_activity'])->update([
                    'time_close' => gmdate("Y-m-d H:i:s", strtotime("+7 hours")),
                ]);
            }
            ActivityDowntime::create([
                'id_task' => '12699',
                'id_machine' => $data['id_mc'],
                'id_staff' => $data['id_staff'],
                'id_comment' => '0',
                'shif' => 'D5',
                'id_code_downtime' => 'D07',
                'status_work' => '3',
                'date_eff' => gmdate("Y-m-d", strtotime("+7 hours")),
                'time_start' => gmdate("Y-m-d H:i:s", strtotime("+7 hours")),
                'time_close' => "0000-00-00 00:00:00",
                'total_work' => "00:00:00",
                'total_food' => "00:00:00",
                'total_toilet' => "00:00:00",
                'no_send' => '0',
                'no_pulse1' => '0',
                'no_pulse2' => '0',
                'no_pulse3' => '0',
                'multiplier' => '1',
                'run_time_actual' => '0',
            ]);

            $dataReturn = ActivityDowntime::orderBy('id_activity_downtime','desc')->first();
            return response() -> json($dataReturn);
        }
        catch(Exception $error)
        {
            Log::error($error);
        }
    }

    public function addTestBreak(Request $request){
        try
        {
            $data = $request->all();
            BreakTable::create([
                'id_activity' => $data['id_activity'],
                'id_staff' => $data['id_staff'],
                'id_comment' => '0',
                'break_code' => '1',
                'break_start' => gmdate("Y-m-d H:i:s", strtotime("+7 hours")),
                'break_stop' => "0000-00-00 00:00:00",
                'break_duration' => "00:00:00",
            ]);
            $breakLested = BreakTable::orderBy('id_break','desc')->first();
            Activity::where('id_activity',$data['id_activity'])->update([
                'id_break' => $breakLested['id_break']
            ]);
            return response() -> json([
                'status'=>'OK',
            ]);
        }
        catch(Exception $error)
        {
            Log::error($error);
        }
    }

    public function TestContinue(Request $request){
        try
        {
            $data = $request->all();
            $dataActivity = Activity::where('id_activity',$data['id_activity'])->first();
            BreakTable::where('id_break',$dataActivity['id_break'])->update([
                'break_stop' => gmdate("Y-m-d H:i:s", strtotime("+7 hours")),
            ]);
            return response() -> json([
                'status'=>'OK',
            ]);
        }
        catch(Exception $error)
        {
            Log::error($error);
        }
    }

    public function testExit(Request $request){
        try
        {
            $data = $request->all();
            if(isset($data['id_activity'])){
                Activity::where('id_activity',$data['id_activity'])->update([
                    'time_close' => gmdate("Y-m-d H:i:s", strtotime("+7 hours")),
                ]);
            }
            else{
                ActivityDowntime::where('id_activity_downtime',$data['id_activity_downtime'])->update([
                    'time_close' => gmdate("Y-m-d H:i:s", strtotime("+7 hours")),
                ]);
            }
            ActivityIdle::create([
                'id_machine' => $data['id_machine'],
                'id_comment' => '0',
                'status_work' => '3',
                'time_start' => gmdate("Y-m-d H:i:s", strtotime("+7 hours")),
                'time_close' => "0000-00-00 00:00:00",
                'duration' => "00:00:00",
            ]);
            
            return response() -> json([
                'status'=>'OK',
            ]);
        }
        catch(Exception $error)
        {
            Log::error($error);
        }
    }
}

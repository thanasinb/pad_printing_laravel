<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Response;
use File;
use XLSXWriter;

class exportController extends Controller
{

    

    

    public function exportFile(Request $request){

        ini_set('display_errors', 0);
        error_reporting(E_ERROR | E_WARNING | E_PARSE);
        function make_machine_name($id_machine){
            $id_machine = str_replace('-','',$id_machine);
            return ('PD0' . $id_machine);
        }
        
        function make_first_operation_array($ar){
            // $ar = get_object_vars($ar);
            $array_space=array('');
            $array_filler1=array('','','','','0','','','','','y');
            $array_filler2=array('{space}','y','{f4}');
            array_splice( $ar, 8, 0, $array_space);
            array_splice( $ar, 8, 0, $array_space);
            array_splice( $ar, 12, 0, $array_space);
            array_splice( $ar, 14, 0, $array_space);
            array_splice( $ar, 15, 0, $array_filler1);
            array_splice( $ar, 26, 0, $array_space);
            array_splice( $ar, 27, 0, $ar['time_start']);
            array_splice( $ar, 29, 0, $array_filler2);
            return $ar;
        }
        function make_next_operation_array($ar){
            $array_space=array('');
            $array_filler1=array('','','','','0','','','','','y');
            $array_filler2=array('{space}','{space}','y','{f4}');
            array_splice( $ar, 8, 0, $array_space);
            array_splice( $ar, 8, 0, $array_space);
            array_splice( $ar, 12, 0, $array_space);
            array_splice( $ar, 14, 0, $array_space);
            array_splice( $ar, 15, 0, $array_filler1);
            array_splice( $ar, 26, 0, $array_space);
            array_splice( $ar, 27, 0, $ar["time_start"]);
            array_splice( $ar, 29, 0, $array_filler2);
            return $ar;
        }
        function make_downtime_array($ar){
            $array_space=array('');
        //    $array_filler1=array('','','','','0','','','','','y');
            $array_filler2=array('{f1}','y','{f4}');
            array_splice( $ar, 8, 0, $array_space);
            array_splice( $ar, 8, 0, $array_space);
            array_splice( $ar, 12, 0, $array_space);
        //    array_splice( $ar, 14, 0, $array_space);
            array_splice( $ar, 15, 0, $array_filler2);
        //    array_splice( $ar, 26, 0, $array_filler2);
            return $ar;
        }
        
        function time2float($t){
            $parts = explode(':', $t);
            return $parts[0] + floor(($parts[1]/60)*100) / 100;
        }

        $data_req = $request->all();
        // return response() -> json($data);
        define( "SHEET_BF_FIRST",'CIM BF-first OP');
        define( "SHEET_BF_NEXT", 'CIM BF-next OP');
        define( "SHEET_DOWNTIME", 'CIM Down Time');
        define( "SHEET_SCRAP", 'Cim Scarp');
        define( "SHEET_SETUP", 'Cim Setup');
        define( "SHEET_REWORK", 'Cim Rework');

        define( "SHIF_DAY_START",'07:00:00');
        define( "SHIF_DAY_CLOSE",'15:45:00');
        define( "SHIF_DAY_OT_START",'07:00:00');
        define( "SHIF_DAY_OT_CLOSE",'19:00:00');
        define( "SHIF_NIGHT_START",'23:00:00');
        define( "SHIF_NIGHT_CLOSE",'07:00:00');
        define( "SHIF_NIGHT_OT_START",'19:00:00');
        define( "SHIF_NIGHT_OT_CLOSE",'07:00:00');
        try{
            $writer = new XLSXWriter();
            $header = array(
                'Employee'=>'string',
                'Document  (ID)'=>'string',
                'Effective date'=>'string',
                'Shift'=>'string',
                'Site'=>'string',
                'Item Number'=>'string',
                'Operation'=>'string',
                'Line'=>'string',
                'routing code'=>'string',
                'bomcode'=>'string',
                'Work Center'=>'string',
                'Machine'=>'string',
                'Department'=>'string',
                'qty process'=>'integer',
                'um'=>'string',
                'conversion'=>'string',
                'Qty scarp'=>'integer',
                'reason code scarp'=>'string',
                'Multi entry scarp'=>'string',
                'Qty reject'=>'integer',
                'reason code reject'=>'string',
                'Multi entry reject'=>'string',
                'reject to op'=>'string',
                'modify bf'=>'string',
                ' move next op'=>'string',
                'actual runtime'=>'string',
                'Earning code'=>'string',
                'start time'=>'string',
                'stop time'=>'string',
                '{space}'=>'string',
                'confirm'=>'string',
                '{f4}'=>'string'
            );
            $writer->writeSheetHeader(SHEET_BF_FIRST, $header, $suppress_row = false);

            $header = array(
                'Employee'=>'string',
                'Document  (ID)'=>'string',
                'Effective date'=>'string',
                'Shift'=>'string',
                'Site'=>'string',
                'Item Number'=>'string',
                'Operation'=>'string',
                'Line'=>'string',
                'routing code'=>'string',
                'bomcode'=>'string',
                'Work Center'=>'string',
                'Machine'=>'string',
                'Department'=>'string',
                'qty process'=>'integer',
                'um'=>'string',
                'conversion'=>'string',
                'Qty scarp'=>'integer',
                'reason code scarp'=>'string',
                'Multi entry scarp'=>'string',
                'Qty reject'=>'integer',
                'reason code reject'=>'string',
                'Multi entry reject'=>'string',
                'reject to op'=>'string',
                'modify bf'=>'string',
                ' move next op'=>'string',
                'actual runtime'=>'string',
                'Earning code'=>'string',
                'start time'=>'string',
                'stop time'=>'string',
                '{space}'=>'string',
                '{space} '=>'string',
                'confirm'=>'string',
                '{f4}'=>'string'
            );
            $writer->writeSheetHeader(SHEET_BF_NEXT, $header, $suppress_row = false);

            $header = array(
                'Employee'=>'string',
                'Document  (ID)'=>'string',
                'Effective date'=>'string',
                'Shift'=>'string',
                'Site'=>'string',
                'Item Number'=>'string',
                'Operation'=>'string',
                'Line'=>'string',
                'routing code'=>'string',
                'bomcode'=>'string',
                'Work Center'=>'string',
                'Machine'=>'string',
                'Department'=>'string',
                'actual runtime'=>'string',
                'Reason Code'=>'string',
                '{f1} '=>'string',
                'confirm'=>'string',
                '{f4}'=>'string'
            );
            $writer->writeSheetHeader(SHEET_DOWNTIME, $header);

            $header = array(
                'Employee'=>'string',
                'Document  (ID)'=>'string',
                'Effective date'=>'string',
                'Shift'=>'string',
                'Site'=>'string',
                'Item Number'=>'string',
                'Operation'=>'string',
                'Line'=>'string',
                'routing code'=>'string',
                'bomcode'=>'string',
                'Work Center'=>'string',
                'Machine'=>'string',
                'Department'=>'string',
                'actual runtime'=>'string',
                '{f1} '=>'string',
                'confirm'=>'string',
                '{f4}'=>'string'
            );
            $writer->writeSheetHeader(SHEET_SCRAP, $header);
            $writer->writeSheetHeader(SHEET_SETUP, $header);
            $writer->writeSheetHeader(SHEET_REWORK, $header);
            
            //if(strcmp($_GET['shif'], 'day_2')==0){
                $sql_where = "(status_work=3 OR status_work=5) AND (time_start BETWEEN '" .
                    $data_req['dateAt'] . ' ' . $data_req['shifTimeAt'] . "' AND '" .
                    $data_req['dateTo'] . ' ' . $data_req['shifTimeTo'] . "')";
                $sql_where_downtime = "status_downtime=3 AND (time_start BETWEEN '" .
                    $data_req['dateAt'] . ' ' . $data_req['shifTimeAt'] . "' AND '" .
                    $data_req['dateTo'] . ' ' . $data_req['shifTimeTo'] . "')";
            //}
            $sql_order_by = " ORDER BY planning.id_job, planning.operation, activity.id_machine, activity.time_start";
            $sql_order_by_downtime = " ORDER BY planning.id_job, planning.operation, activity_downtime.id_machine, activity_downtime.time_start";

            // SELECT TASKS WHICH OPERATE DURING THE SHIF
            $sql = "SELECT planning.id_task, planning.id_job, planning.operation FROM activity 
                INNER JOIN planning ON activity.id_task=planning.id_task WHERE " . $sql_where . " GROUP BY activity.id_task ORDER BY planning.id_job, planning.operation";

            // $query_tasks_in_shif = $conn->query($sql);
            // return response() -> json($sql);
            $query_tasks_in_shif = DB::select($sql);
            //echo $sql . "<br><br>";
            if(count($query_tasks_in_shif)>0){
                // SELECT THE FIRST OPERATION (id_task) OF SUCH TASKS
                $sql = "SELECT id_task FROM planning WHERE first_op=1 AND id_job IN (";
                foreach ($query_tasks_in_shif as $data_tasks_in_shif){
                    $sql = $sql . "'" . $data_tasks_in_shif->id_job . "',";
                }
                $sql = rtrim($sql, ',') . ") ORDER BY id_job ASC";
                // return response() -> json($sql);
                $query_first_op_planning = DB::select($sql);
                //echo $sql . "<br><br>";
                // return response() -> json($query_first_op_planning);

                $array_space=array('');
                $array_tail=array('','','','','','0','','','','','y','','','','','{space}','y','{f4}');


            $list_first_op_activity = array();
            
                foreach ($query_first_op_planning as $data_first_op_planning){
                    
                    //SELECT THE FIRST ACTIVITY OF SUCH FIRST OPERATION
                    $sql = "SELECT activity.id_staff, planning.id_job, date_eff AS time_start, shif, planning.site, item_no, planning.operation, prod_line, work_center, activity.id_machine,
                        no_pulse2, activity.total_work, time_close, divider.divider AS multiplier, no_pulse3 FROM activity
                        INNER JOIN staff ON activity.id_staff=staff.id_staff
                        INNER JOIN planning ON activity.id_task=planning.id_task
                        INNER JOIN divider ON (planning.op_color=divider.op_color AND planning.op_side=divider.op_side)
                        WHERE activity.id_task=" . $data_first_op_planning->id_task . "
                        AND time_start = (SELECT MIN(time_start) FROM activity
                        WHERE activity.id_task=" . $data_first_op_planning->id_task . ")" . $sql_order_by;
            //            echo $sql . "<br><br>";
            
                    $query_first_op_activity = DB::select($sql);
                    // return response() -> json($query_first_op_activity);

                    if(!empty($query_first_op_activity)){
                        $data_first_op_activity = get_object_vars($query_first_op_activity[0]);
                        
                        $data_first_op_activity['id_machine'] = make_machine_name($data_first_op_activity['id_machine']);
                        // return response() -> json($data_first_op_activity["id_machine"]);
                        $data_first_op_activity = make_first_operation_array($data_first_op_activity);
                        // return response() -> json($query_first_op_activity);
                        $data_first_op_activity['time_start'] = date( 'd/m/y', strtotime($data_first_op_activity['time_start']));
                        $data_first_op_activity['time_close'] = date( 'd/m/y', strtotime($data_first_op_activity['time_close']));
                        $data_first_op_activity['total_work'] = number_format(time2float($data_first_op_activity['total_work']), 2);
            //            $data_first_op_activity['no_pulse1']= strval(floor(floatval($data_first_op_activity['no_pulse1'])*floatval($data_first_op_activity['multiplier'])) - intval($data_first_op_activity['num_repeat']) );
                        $data_first_op_activity['no_pulse2']= strval(intval($data_first_op_activity['no_pulse2']) + intval($data_first_op_activity['no_pulse3']));
                        unset($data_first_op_activity['multiplier']);
                        unset($data_first_op_activity['no_pulse3']);
                        array_push($list_first_op_activity,$data_first_op_activity);
                    }
                    
                }
                
                $qty_sumary_list = array();
                $temp_first_op_activity = $list_first_op_activity;
                $main_list=0;

                foreach($list_first_op_activity as $data){
                    // return response() -> json($temp_first_op_activity);
                    $count = 0;
                    $reach = 0;
                    $qty_sumary = 0;
                    $qty_time_work = 0.00;
                    foreach($list_first_op_activity as $data_in){
                        

                        if($data['id_staff'] == $data_in['id_staff'] 
                        and $data['id_job'] == $data_in['id_job']
                        and $data['shif'] == $data_in['shif']
                        and $data['item_no'] == $data_in['item_no']
                        and $data['operation'] == $data_in['operation']
                        and $data['time_start'] == $data_in['time_start']
                        and $data['id_machine'] == $data_in['id_machine']
                        ){
                            // return response() -> json($data_in['id_staff'] ."+". $data['id_staff']);
                            if($reach == 0){
                                $main_list = $count;
                            }
                            $qty_sumary += $data_in['no_pulse2'];
                            $qty_time_work += $data_in['total_work'];
                            if($reach >= 1){
                                unset($temp_first_op_activity[$count]);
                                    $temp_first_op_activity[$main_list]['no_pulse2'] = strval($qty_sumary);
                                    $temp_first_op_activity[$main_list]['total_work'] = strval($qty_time_work);
                                    
                            }
                            $reach++;
                        }
                        $count++;
                    }
                }
                // return response() -> json($list_first_op_activity);
                $temp_first_op_activity = array_values($temp_first_op_activity);
                for($x = 0;$x < count($temp_first_op_activity);$x++){
                    if($temp_first_op_activity[$x]['no_pulse2'] == 0){
                        continue;
                    }
                    $writer->writeSheetRow(SHEET_BF_FIRST, $temp_first_op_activity[$x]);
                }
            }
            // return response() -> json($temp_first_op_activity);
            
            $sql = "SELECT activity.id_staff, planning.id_job, date_eff AS time_start, shif, planning.site, item_no, planning.operation, prod_line, work_center, activity.id_machine,
                    no_pulse2, activity.total_work, time_close, divider.divider AS multiplier, no_pulse3 FROM activity
                    INNER JOIN staff ON activity.id_staff=staff.id_staff
                    INNER JOIN planning ON activity.id_task=planning.id_task
                    INNER JOIN divider ON (planning.op_color=divider.op_color AND planning.op_side=divider.op_side)
                    WHERE " . $sql_where . $sql_order_by;
            $query_current_op_activity = DB::select($sql);
            // return response() -> json($query_current_op_activity);
            $list_current_op_activity = array();

            foreach ($query_current_op_activity as $data_current_op_activity){
                $data_current_op_activity = get_object_vars($data_current_op_activity);
                
                $data_current_op_activity['id_machine'] = make_machine_name($data_current_op_activity['id_machine']);
                $data_current_op_activity = make_next_operation_array($data_current_op_activity);
                $data_current_op_activity['time_start'] = date( 'd/m/y', strtotime($data_current_op_activity['time_start']));
                $data_current_op_activity['time_close'] = date( 'd/m/y', strtotime($data_current_op_activity['time_close']));
                $data_current_op_activity['total_work'] = number_format(time2float($data_current_op_activity['total_work']), 2);
            //    $data_current_op_activity['no_pulse1']= strval(floor(floatval($data_current_op_activity['no_pulse1'])*floatval($data_current_op_activity['multiplier'])) - intval($data_current_op_activity['num_repeat']) );
                $data_current_op_activity['no_pulse2']= strval(intval($data_current_op_activity['no_pulse2']) + intval($data_current_op_activity['no_pulse3']));
                unset($data_current_op_activity['multiplier']);
                unset($data_current_op_activity['no_pulse3']);
                array_push($list_current_op_activity,$data_current_op_activity);
                
            }
            // return response() -> json($list_current_op_activity);
            // print_r($list_first_op_activity.'--test123--'.$list_current_op_activity);
            $qty_sumary_list = array();
            $temp_current_op_activity = $list_current_op_activity;
            $main_list=0;

            foreach($list_current_op_activity as $data){
                $count = 0;
                $reach = 0;
                $qty_sumary = 0;
                $qty_time_work = 0.00;
                foreach($list_current_op_activity as $data_in){

                    if($data['id_staff'] == $data_in['id_staff'] 
                    and $data['id_job'] == $data_in['id_job']
                    and $data['shif'] == $data_in['shif']
                    and $data['item_no'] == $data_in['item_no']
                    and $data['operation'] == $data_in['operation']
                    and $data['time_start'] == $data_in['time_start']
                    and $data['id_machine'] == $data_in['id_machine']
                    ){
                        if($reach == 0){
                            $main_list = $count;
                        }
                        $qty_sumary += $data_in['no_pulse2'];
                        $qty_time_work += $data_in['total_work'];
                        if($reach >= 1){
                            unset($temp_current_op_activity[$count]);
                                $temp_current_op_activity[$main_list]['no_pulse2'] = strval($qty_sumary);
                                $temp_current_op_activity[$main_list]['total_work'] = strval($qty_time_work);
                        }
                        $reach++;
                    }
                    $count++;
                }
            }
            $temp_current_op_activity = array_values($temp_current_op_activity);
            for($x = 0;$x < count($temp_current_op_activity);$x++){
                if($temp_current_op_activity[$x]['no_pulse2'] == 0){
                    continue;
                }
                $writer->writeSheetRow(SHEET_BF_NEXT, $temp_current_op_activity[$x]);
            }
            
            $sql = "SELECT activity_downtime.id_staff, planning.id_job, date_eff AS time_start, shif, planning.site, item_no, planning.operation, prod_line, work_center, activity_downtime.id_machine,
                    activity_downtime.total_work, code_downtime FROM activity_downtime
                    INNER JOIN staff ON activity_downtime.id_staff=staff.id_staff
                    INNER JOIN planning ON activity_downtime.id_task=planning.id_task
                    INNER JOIN code_downtime ON activity_downtime.id_code_downtime=code_downtime.id_code_downtime
                    WHERE activity_downtime.id_code_downtime <> 'D07' AND " . $sql_where_downtime . $sql_order_by_downtime;
            //echo $sql;
            $query_activity_downtime = DB::select($sql);
            
            foreach ($query_activity_downtime as $data_activity_downtime) {
                $data_activity_downtime = get_object_vars($data_activity_downtime);
                $data_activity_downtime['id_machine'] = make_machine_name($data_activity_downtime['id_machine']);
            //    $data_activity_downtime['id_shif'] = make_shif_code($data_activity_downtime['id_shif'], $data_activity_downtime['time_start']);
                $data_activity_downtime = make_downtime_array($data_activity_downtime);
                $data_activity_downtime['time_start'] = date( 'd/m/y', strtotime($data_activity_downtime['time_start']));
                $data_activity_downtime['total_work'] = number_format(time2float($data_activity_downtime['total_work']), 2);
                $writer->writeSheetRow(SHEET_DOWNTIME, $data_activity_downtime);
            }
            
            $sql = "SELECT activity_downtime.id_staff, planning.id_job, date_eff AS time_start, shif, planning.site, item_no, planning.operation, prod_line, work_center, activity_downtime.id_machine,
                    activity_downtime.total_work FROM activity_downtime
                    INNER JOIN staff ON activity_downtime.id_staff=staff.id_staff
                    INNER JOIN planning ON activity_downtime.id_task=planning.id_task
                    WHERE activity_downtime.id_code_downtime = 'D07' AND " . $sql_where_downtime . $sql_order_by_downtime;
            $query_activity_setup = DB::select($sql);
            foreach ($query_activity_setup as $data_activity_setup) {
                $data_activity_setup = get_object_vars($data_activity_setup);
                $data_activity_setup['id_machine'] = make_machine_name($data_activity_setup['id_machine']);
            //    $data_activity_setup['id_shif'] = make_shif_code($data_activity_setup['id_shif'], $data_activity_setup['time_start']);
                $data_activity_setup = make_downtime_array($data_activity_setup);
                $data_activity_setup['time_start'] = date( 'd/m/y', strtotime($data_activity_setup['time_start']));
                $data_activity_setup['total_work'] = number_format(time2float($data_activity_setup['total_work']), 2);
                $writer->writeSheetRow(SHEET_SETUP, $data_activity_setup);
            }

            $sql = "SELECT activity_downtime.id_staff, planning.id_job, date_eff AS time_start, shif, planning.site, item_no, planning.operation, prod_line, work_center, activity_downtime.id_machine,
                    activity_downtime.total_work FROM activity_downtime
                    INNER JOIN staff ON activity_downtime.id_staff=staff.id_staff
                    INNER JOIN planning ON activity_downtime.id_task=planning.id_task
                    WHERE activity_downtime.id_code_downtime = 'D07' AND " . $sql_where_downtime . $sql_order_by_downtime;
            $query_activity_rework = DB::select($sql);
            foreach ($query_activity_rework as $data_activity_rework) {
                $data_activity_rework = get_object_vars($data_activity_rework);
                $data_activity_rework['id_machine'] = make_machine_name($data_activity_rework['id_machine']);
            //    $data_activity_rework['id_shif'] = make_shif_code($data_activity_rework['id_shif'], $data_activity_rework['time_start']);
                $data_activity_rework = make_downtime_array($data_activity_rework);
                $data_activity_rework['time_start'] = date( 'd/m/y', strtotime($data_activity_rework['time_start']));
                $data_activity_rework['total_work'] = number_format(time2float($data_activity_rework['total_work']), 2);
                $writer->writeSheetRow(SHEET_REWORK, $data_activity_rework);
            }

            $sql = "SELECT activity_downtime.id_staff, planning.id_job, date_eff AS time_start, shif, planning.site, item_no, planning.operation, prod_line, work_center, activity_downtime.id_machine,
                    activity_downtime.total_work FROM activity_downtime
                    INNER JOIN staff ON activity_downtime.id_staff=staff.id_staff
                    INNER JOIN planning ON activity_downtime.id_task=planning.id_task
                    WHERE activity_downtime.id_code_downtime = 'D07' AND " . $sql_where_downtime . $sql_order_by_downtime;
            $query_activity_scrap = DB::select($sql);
            foreach ($query_activity_scrap as $data_activity_scrap) {
                $data_activity_scrap = get_object_vars($data_activity_scrap);
                $data_activity_scrap['id_machine'] = make_machine_name($data_activity_scrap['id_machine']);
            //    $data_activity_scrap['id_shif'] = make_shif_code($data_activity_scrap['id_shif'], $data_activity_scrap['time_start']);
                $data_activity_scrap = make_downtime_array($data_activity_scrap);
                $data_activity_scrap['time_start'] = date( 'd/m/y', strtotime($data_activity_scrap['time_start']));
                $data_activity_scrap['total_work'] = number_format(time2float($data_activity_scrap['total_work']), 2);
                $writer->writeSheetRow(SHEET_SCRAP, $data_activity_scrap);
            }
            // return response()->json($data_req['name']);
            $name='Download/export.xlsx';
            
            $filename = public_path($name);
            $writer->writeToFile($filename);

            // header('Content-Type: application/octet-stream');
            // header("Content-Type: application/xls");
            // header("Content-Disposition: attachment; filename=$filename");
            // header("Pragma: no-cache");
            // header("Expires: 0");
            // header('Content-disposition: attachment; filename="'.XLSXWriter::sanitize_filename($filename).'"');
            // header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            // header('Content-Transfer-Encoding: binary');
            // header('Cache-Control: must-revalidate');
            // header('Pragma: public');
            // $writer->writeToStdOut();
            // exit(0);
            // return response()->download($filename);
            // Return a response indicating success
            // return response()->download(public_path($filename.".xlsx")); 
            return response()->json(['success' => true]);

        }
        catch(Exception $error){
            Log::error($error);
        }
    }
}

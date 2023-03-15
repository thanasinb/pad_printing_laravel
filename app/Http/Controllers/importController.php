<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Exception;
use Shuchkin\SimpleXLSX;
use Shuchkin\SimpleXLS;



class importController extends Controller
{
    //
    public function uploadFile (Request $request){
        try{
            $file = $request->file('file');
            $fileName = $file->getClientOriginalName();
            // return response() -> json($fileName);
            // Store the file in the public/images/machines directory
            $filePath = $file->move(public_path('import/'), $fileName);
            return response() -> json(['event'=>'upload_import_file','status' => 'OK']);
        }
        catch(Exception $erorr){
            Log::error($error);
        }
    }

    public function insertData (Request $request){
    
        try{
            ini_set('error_reporting', E_ALL);
            ini_set('display_errors', true);

            // require_once __DIR__.'/../vendor/autoload.php';
            // include __DIR__.'/../src/SimpleXLS.php';
            // include __DIR__.'/../src/SimpleXLSX.php';

            $data = $request->all();
            $filename = $data['filename'];
            $filePath = public_path('import/'.$filename);
            // return response()->json($filename);

            // Check if the file exists in the specified path
            if (file_exists($filePath)) {
                $extension = pathinfo($filePath, PATHINFO_EXTENSION);
                $fileContents = file_get_contents($filePath);
                // return response()->json(['message' => 'File found', 'file'=>$filename, 'extention'=>$extension]);
                $allowed_types = array('xlsx','xls');

                if (!in_array($extension, $allowed_types)) {
                    return response() -> json(["status"=>"error","detail"=>"Not file type .xlsx ."]);
                } else {
                    
                    if($extension == 'xls'){
                        $xlsx = SimpleXLS::parse($filePath);
                        // return response() -> json(["status"=>"OK","detail"=>"Found SimpleXLS"]);
                    }
                    elseif($extension == 'xlsx'){
                        $xlsx = SimpleXLSX::parse($filePath);
                        // return response() -> json(["status"=>"OK","detail"=>"Found SimpleXLSX"]);
                    }
                    // print_r($xlsx);
                    // return response() -> json(["status"=>"ERROR","detail"=>"Not Found SimpleXLSX or SimpleXLS"]);

                    define( "FIELD_ID_JOB",0);
                    define( "FIELD_OPERATION",11);
                    define( "FIELD_FIRST_OP",12);
                    define( "FIELD_OP_DESCRIPTION",13);
                    define( "FIELD_QTY_ORDER",16);
                    define( "FIELD_QTY_COMP",17);
                    define( "FIELD_QTY_OPEN",18);

                    $sql = "INSERT INTO planning (";
                    $sql = $sql . "id_job, work_order, sales_job, prod_line, item_no, item_des, mold, site, type, ";
                    $sql = $sql . "work_center, machine, operation, first_op, op_des, op_side, op_color, run_time_std, run_open_total, qty_order, qty_comp, qty_open, date_due, wo_status, datetime_update, qty_per_pulse2";
                    $sql = $sql . ") ";
                    $sql = $sql . "VALUES (";

                    $list_planning = "(";
                    // if($xlsx->success()){
                    //     return response() -> json('OK');
                    // }
                    // else{
                    //     return response() -> json('Fail');
                    // }
                    // return response() -> json($sql);
                    // $count=0;
                    foreach ($xlsx->rows() as $p => $fields)
                    {   
                        // if($count==0){
                        //     $count++;
                        //     continue;
                        // }
                        
                        return response() -> json($fields);
                        $id_job = $fields[FIELD_ID_JOB];
                        $operation = $fields[FIELD_OPERATION];
                        $first_op = $fields[FIELD_FIRST_OP];
                        $op_description = $fields[FIELD_OP_DESCRIPTION];
                        $qty_order = $fields[FIELD_QTY_ORDER];
                        $qty_comp = $fields[FIELD_QTY_COMP];
                        $qty_open = $fields[FIELD_QTY_OPEN];
                        // return response() -> json($fields);
                        // return response() -> json($id_job."-".$operation."-".$first_op."-".$op_description."-".$qty_order."-".$qty_comp."-".$qty_open);
                //        $op_description = preg_replace('/[^A-Za-z0-9\-]/', '', $op_description);
                //        echo $op_description . "<br>";
                //        echo substr($op_description, 0, 3) . "<br>";
                        $offset=-2;
                        $op_side = substr($op_description, $offset, 1);
                //        echo $op_side . "<br>";
                //        echo strpos($op_description,"TOP") . "<br>";
                        if (strcmp($op_side,"X")==0) {
                            $offset--;
                            $op_side = substr($op_description, $offset, 1);
                //            echo "hello0<br>";
                            if (strcmp(($op_side), " ") == 0) {
                                $offset--;
                                $op_side = substr($op_description, $offset, 1);
                            } elseif (strcmp(($op_side), ".") == 0) {
                                $offset--;
                                $op_side = substr($op_description, $offset, 1);
                            }
                            if (strcmp(($op_side), "5") == 0) {
                                $offset = $offset - 2;
                                $op_side = substr($op_description, $offset, 3);
                            } elseif (strcmp(($op_side), "L") == 0) {
                                $offset--;
                                $op_side = substr($op_description, $offset, 1);

                            } elseif (strcmp(($op_side), "R") == 0) {
                                $offset--;
                                $op_side = substr($op_description, $offset, 1);
                            }
                            $offset = $offset--;
                            $op_color = substr($op_description, $offset, 1);
                            while (!is_numeric($op_color) and $offset > -20) {
                                $offset--;
                                $op_color = substr($op_description, $offset, 1);
                            }
                        }elseif (strpos($op_description, "TOP")) {
                            $op_side = "B";
                            $op_color = "1";
                //            echo "hello1<br>";
                        }
                //        elseif (strpos($op_description, "LIGHT")){
                //            $op_side = "B";
                //            $op_color = "1";
                //            echo "hello1<br>";
                //        }
                        elseif (strpos($op_description,"MIRROR")){
                            $op_side="B";
                            $op_color="1";
                //            echo "hello1<br>";
                        }else{
                //            echo "hello3<br>";
                            continue;
                        }
                        
                        $stmt = $sql;
                        if ($p == 0) continue;
                        for ($item=0; $item<12; $item++){
                            $stmt = $stmt . "'" . $fields[$item] . "', ";
                        }
                        // return response() -> json('123');
                        if (strcmp($first_op, 'Yes')==0){
                            $stmt = $stmt . " 1, ";
                        }else{
                            $stmt = $stmt . " 0, ";
                        }
                        $stmt = $stmt . "'" . $op_description . "', ";
                        $stmt = $stmt . "'" . $op_side . "', ";
                        $stmt = $stmt . "'" . $op_color . "', ";
                        for ($item=14; $item<19; $item++){
                            $stmt = $stmt . $fields[$item] . ",";
                        }
                        $stmt = $stmt . "'" . substr($fields[$item++],0,-9) . "',";
                        $stmt = $stmt . "'" . $fields[$item] . "', '" . date('Y-m-d H:i:s') . "',";

                        $stmt = $stmt . "80" . ")";

                        $list_planning = $list_planning . "(" . $id_job . "," . $operation . "),";

                        $sql_select = "SELECT id_task FROM planning WHERE id_job='" . $id_job . "' AND operation = '" . $operation . "'";
                //        echo $sql_select . "<br>";
                //        echo $stmt . "<br>";
                //        echo $op_description . "," . $op_color . "," . $op_side . "<br>";

                        $query_planning = DB::select($sql_select);
                        // $data_planning = get_object_vars($query_planning_raw[0]);
                        // return response() -> json($query_planning);
                        
                        // $data_planning = $query_planning->fetch_assoc();

                        // IF THE RECORD DOES NOT EXIST, ADD THE NEW ONE
                        if (empty($query_planning)){
                            // $conn->query($stmt);
                            DB::query($stmt);
                            // if ($conn->errno){
                            //     $error_code = $conn->errno;
                            //     add_log($conn, $stmt);
                            //     break;
                            // }
                        }

                        // IF THE RECORD EXISTS, UPDATE QTY_COMP, QTY_OPEN
                        else{
                            // return response() -> json($query_planning[0]->id_task);
                            $sql_update = "UPDATE planning SET ";
                            $sql_update = $sql_update . "qty_order=" . $qty_order . ", ";
                            $sql_update = $sql_update . "qty_comp=" . $qty_comp . ", ";
                            $sql_update = $sql_update . "qty_open=" . $qty_open . ", ";
                            $sql_update = $sql_update . "datetime_update='" . date('Y-m-d H:i:s') . "' ";
                            $sql_update = $sql_update . "WHERE id_task=" . $query_planning[0]->id_task;
                            // $conn->query($sql_update);
                            // return response() -> json($sql_update);
                            DB::query($sql_update);
                            

                            $sql_update = "UPDATE activity SET status_work=6 WHERE status_work=5 AND id_task=" . $query_planning[0]->id_task;
                            // $conn->query($sql_update);
                            DB::query($sql_update);
                        }
                    }

            $list_planning = rtrim($list_planning, ",");
            $list_planning = $list_planning . ")";
            // return response() -> json('123');

            $sql_backup = "UPDATE activity INNER JOIN planning ON activity.id_task=planning.id_task SET activity.status_work=6 WHERE activity.status_work=5 AND (planning.id_job, planning.operation) NOT IN " . $list_planning;
        //    echo $sql_backup . "<br>";
            // $conn->query($sql_backup);
            DB::query($sql_backup);
            

            $sql_backup = "UPDATE planning SET status_backup=1 WHERE (id_job, operation) NOT IN " . $list_planning;
            // $conn->query($sql_backup);
            DB::query($sql_backup);

                return response() -> json(["status"=>"success","detail"=>"Import file success."]);
            }
                
            } 
            else {
                return response()->json(['message' => 'File not found']);
            }
            

        }
        catch(Exception $error){
            Log::error($error);
        }
        
    }
}

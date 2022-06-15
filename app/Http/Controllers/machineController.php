<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Machine;
use App\Models\MachineQueue;
use App\Models\planning;
use Log;
use Exception;

class machineController extends Controller
{
    //
    public function getInfoMachine(Request $request){
        try
        {  
            $select_r = strval($_GET['selected_radio']);
            $isCurrent = strval($_GET['is_current_task']);
            $idJob = strval($_GET['id_job']);
            $operation = strval($_GET['operation']);
            $idMachine = strval($_GET['id_machine']);
            $idMc = strval($_GET['id_mc']);
            // $idJob = $request->get("id_job");
            // $operation = $request->get("operation");
            //$operationNew = $_POST['operation_new'];
            // $idMachine = $_POST['id_machine'];
            // $idMc = $_POST['id_mc'];
            // $idMcType = $_POST["id_mc_type"];
            // $mcDes = $_POST["mc_des"];
            // $isCurrentTask = $_POST['is_current_task'];


                
                // $sql = "UPDATE machine_queue SET comp_date='0000-00-00', comp_time='00:00:00', id_task = (";
                // $sql = $sql . "SELECT id_task FROM planning WHERE id_job=" . $_POST['id_job'] . " AND ";
                // $sql = $sql . "operation=" . $_POST['operation_new'];
                // $sql = $sql . ") WHERE id_machine='" . $_POST['id_machine'] . "' AND queue_number=1";
                // echo $sql;
                // $conn->query($sql);
                // $sql = "UPDATE machine_queue SET queue_number = queue_number - 1 WHERE id_machine='" . $_POST['id_mc'] . "' AND queue_number > 0";
                // $conn->query($sql);
            if ($select_r==1){
    
                    $dataPlan = Planning::where('id_job' ,$idJob) 
                                        ->where('operation' ,$operation)
                                        ->get(); //ผ่าน 
                                        return response() -> json($dataPlan);

                    MachineQueue::where('id_machine',$idMachine)
                                 ->where('queue_number' ,'1')
                                 ->update([
                                    // 'comp_date'=>'0000-00-00',
                                    // 'comp_time'=>'00:00:00',
                                    'id_task' => $dataPlan->id_task
                                    ]); //
                    $dataMach = MachineQueue::where('id_task',$dataPlan->id_task)
                                            ->get();  
                    return response() -> json($dataMach); 
                    
                    MachineQueue::where('id_machine',$idMc)
                                 ->where('queue_number' ,'>' ,'0')
                                 ->update([
                                    'queue_number'=>'queue_number - 1'
                                    ]);

            }elseif ($select_r==3) {

                    Planning::where('id_job',$id_job)
                            ->where('operation',$operation)
                            ->update([
                                'task_complete' => '1'
                            ]);  //ผ่าน

             }elseif ($select_r==4) {

                    MachineQueue::where('id_machine' ,$idMachine)
                                ->where('queue_number' ,'1')
                                ->delete(); //ผ่าน


            }elseif ($select_r==5) {

                    MachineQueue::where('id_machine' ,$idMc)
                                ->where('queue_number' , '>', '0')
                                ->update([
                                    'queue_number'=>'queue_number - 1'
                                    ]);
                                //->get();

            }elseif($select_r==6){
                if($isCurrent==1){



                }else{



                }
            }

        }     
        catch(Exception $error){
                
            Log::error($error);
            
        }
 }

}
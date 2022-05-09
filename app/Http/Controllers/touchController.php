<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Log;
use Exception;
use App\Models\Staff;
use App\Models\MachineQueue;
use App\Models\Planning;

class touchController extends Controller
{
    //
    public function getTouchInfo1(Request $request){
        try
        {
            $rfid = (string)$_GET["idRfid"];
            $touchStaff = Staff::where('id_rfid',$rfid)->get();
            // $touchMachQueue = MachineQueue::where('id_machine',$_GET['idMach'])->get();
            // $touchPlan = Planning::where('id_task',$touchMachQueue['id_task'])->get();
            return response() -> json($touchStaff);
            // return response()->json([
            //     'name_first' => $touchStaff['name_first'],
            //     'name_last' => $touchStaff['name_last'],
            //     'id_role' => $touchStaff['id_role'],
            //     'id_job' => $touchPlan['id_job'],
            //     'item_no' => $touchPlan['item_no'],
            //     'operation' => $touchPlan['operation'],
            //     'op_name' => $touchPlan['op_name'],
            //     'qty_order' => $touchPlan['qty_order'],
            //     'qty_comp' => $touchPlan['qty_comp'],
            //     'qty_open' => $touchPlan['qty_open'],
            //     'id_task' => $touchMachQueue['id_task'],
            //     'id_staff' => $touchStaff['id_staff'],
            // ])->withCallback($request->input('callback'));;
        }
        catch(Exception $error)
        {
            Log::error($error);
        }
    }



    public function getTouchInfo2(Request $request){
        try
        {
            $rfid = (string)$_GET["idRfid"];
            $touchStaff = Staff::where('id_rfid',$rfid)->get();
            // $touchMachQueue = MachineQueue::where('id_machine',$_GET['idMach'])->get();
            // $touchPlan = Planning::where('id_task',$touchMachQueue['id_task'])->get();
            return response() -> json($touchStaff);
            // return response()->json([
            //     'name_first' => $touchStaff['name_first'],
            //     'name_last' => $touchStaff['name_last'],
            //     'id_role' => $touchStaff['id_role'],
            //     'id_job' => $touchPlan['id_job'],
            //     'item_no' => $touchPlan['item_no'],
            //     'operation' => $touchPlan['operation'],
            //     'op_name' => $touchPlan['op_name'],
            //     'qty_order' => $touchPlan['qty_order'],
            //     'qty_comp' => $touchPlan['qty_comp'],
            //     'qty_open' => $touchPlan['qty_open'],
            //     'id_task' => $touchMachQueue['id_task'],
            //     'id_staff' => $touchStaff['id_staff'],
            // ])->withCallback($request->input('callback'));;
        }
        catch(Exception $error)
        {
            Log::error($error);
        }
    }



    public function getTouchInfo3(Request $request){
        try
        {
            $rfid = (string)$_GET["idRfid"];
            $touchStaff = Staff::where('id_rfid',$rfid)->get();
            // $touchMachQueue = MachineQueue::where('id_machine',$_GET['idMach'])->get();
            // $touchPlan = Planning::where('id_task',$touchMachQueue['id_task'])->get();
            return response() -> json($touchStaff);
            // return response()->json([
            //     'name_first' => $touchStaff['name_first'],
            //     'name_last' => $touchStaff['name_last'],
            //     'id_role' => $touchStaff['id_role'],
            //     'id_job' => $touchPlan['id_job'],
            //     'item_no' => $touchPlan['item_no'],
            //     'operation' => $touchPlan['operation'],
            //     'op_name' => $touchPlan['op_name'],
            //     'qty_order' => $touchPlan['qty_order'],
            //     'qty_comp' => $touchPlan['qty_comp'],
            //     'qty_open' => $touchPlan['qty_open'],
            //     'id_task' => $touchMachQueue['id_task'],
            //     'id_staff' => $touchStaff['id_staff'],
            // ])->withCallback($request->input('callback'));;
        }
        catch(Exception $error)
        {
            Log::error($error);
        }
    }
}

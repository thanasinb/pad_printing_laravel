<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Exception;
use App\Models\MachineQueue;
use App\Models\Machine;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class machinesController extends Controller
{
    //
    public function getMachinesAll(){
        try{
            $result = Machine::join('machine_type','machine.id_mc_type','=','machine_type.id_mc_type')->get();
            return response() -> json($result);
        }
        catch(Exception $error){
            Log::error($error);
        }
    }

    public function addMachine(Request $request){
        try{
            $data = $request->all();
            $checkExistRecord = Machine::where("id_mc",$data['id_mc'])->first();
            if($checkExistRecord){
                return response() -> json([
                    'id_mc' => $data['id_mc'],
                    'event' => 'Add',
                    'status' => 'Exist',
                ]);
            }
            else{
                if($data['mc_img']=="-"){
                    $result = Machine::create([
                        'id_mc' => $data['id_mc'],
                        'id_mc_type' => (int)$data['id_mc_type'],
                        'mc_des' => $data['mc_des'],
                        'mc_img' => "",
                        'id_wip' => 0,
                        'id_workmode' => 0,
                        'id_wip_next' => 0,
                        'id_box' => 0,
                        'time_contact' => date("Y-m-d H:i:s"),
                        'contact_count' => 0,
                    ]);
                }
                else{
                    $result = Machine::create([
                        'id_mc' => $data['id_mc'],
                        'id_mc_type' => (int)$data['id_mc_type'],
                        'mc_des' => $data['mc_des'],
                        'mc_img' => $data['mc_img'],
                        'id_wip' => 0,
                        'id_workmode' => 0,
                        'id_wip_next' => 0,
                        'id_box' => 0,
                        'time_contact' => date("Y-m-d H:i:s"),
                        'contact_count' => 0,
                    ]);
                }
                
                return response() -> json([
                    'id_mc' => $data['id_mc'],
                    'id_mc_type' => (int)$data['id_mc_type'],
                    'mc_des' => $data['mc_des'],
                    'mc_img' => "",
                    'id_wip' => 0,
                    'id_workmode' => 0,
                    'id_wip_next' => 0,
                    'id_box' => 0,
                    'time_contact' => gmdate("Y-m-d H:i:s", strtotime("+7 hours")),
                    'contact_count' => 0,
                    'event' => 'Add',
                    'status' => 'OK',
                ]);
            }
            
        }
        catch(Exception $error){
            Log::error($error);
        }
    }

    public function uploadFileImage(Request $request){
        try{
            $request->validate([
                'file' => 'required|file|max:4096', // max file size is 4MB
            ]);
            $file = $request->file('file');
            $fileName = $file->getClientOriginalName();
            // return response() -> json($fileName);
            // Store the file in the public/images/machines directory
            $filePath = $file->move(public_path('images/machines'), $fileName);
            // Save the file information to the database
            // $fileData = new File();
            // $fileData->name = $fileName;
            // $fileData->path = '/images/machines/'.$filePath;
            // $fileData->save();

            return redirect()->back()->with('success', 'File uploaded successfully.');
            // return response() -> json(['event'=>'upload_image','status' => 'OK']);
        }
        catch(Exception $error){
            Log::error($error);
        }
    }

    public function deleteMachine(Request $request){
        try{
            $data = $request->all();
            $result = Machine::where('id_mc',$data['id_mc'])->delete();

            return response() -> json([
                'event' => 'Delete',
                'id_mc' => $data['id_mc'],
                'status' => 'OK',
            ]);
        }
        catch(Exception $error){
            Log::error($error);
        }
    }

    public function editMachine(Request $request){
        try{
            $data = $request->all();
            if($data['id_mc_old'] == $data['id_mc']){

                if($data['mc_img']=="-"){
                    $result = Machine::where('id_mc','=',$data['id_mc_old'])->update([
                        'id_mc'=> $data['id_mc'],
                        'id_mc_type'=> (int)$data['id_mc_type'],
                        'mc_des'=> $data['mc_des'],
                    ]);
                }
                else{
                    $result = Machine::where('id_mc','=',$data['id_mc_old'])->update([
                        'id_mc'=> $data['id_mc'],
                        'id_mc_type'=> (int)$data['id_mc_type'],
                        'mc_des'=> $data['mc_des'],
                        'mc_img'=> $data['mc_img'],
                    ]);
                }
                
                // print_r($result."123");
                return response() -> json([
                    'event' => 'Update',
                    'id_mc' => $data['id_mc'],
                    'status' => 'OK',
                ]);
            }
            else{
                $check_duplicate = Machine::where('id_mc',$data['id_mc'])->get();
                if(!empty($check_duplicate)){
                    return response() -> json([
                        'event' => 'Update',
                        'id_mc' => $data['id_mc'],
                        'status' => 'Exist',
                    ]);
                }
                else{
                    if($data['mc_img']=="-"){
                        $result = Machine::where('id_mc','=',$data['id_mc_old'])->update([
                            'id_mc'=> $data['id_mc'],
                            'id_mc_type'=> (int)$data['id_mc_type'],
                            'mc_des'=> $data['mc_des'],
                        ]);
                    }
                    else{
                        $result = Machine::where('id_mc','=',$data['id_mc_old'])->update([
                            'id_mc'=> $data['id_mc'],
                            'id_mc_type'=> (int)$data['id_mc_type'],
                            'mc_des'=> $data['mc_des'],
                            'mc_img'=> $data['mc_img'],
                        ]);
                    }
                    
                    // print_r($result."123");
                    return response() -> json([
                        'event' => 'Update',
                        'id_mc' => $data['id_mc'],
                        'status' => 'OK',
                    ]);
                }
                
            }
            
        }
        catch(Exception $error){
            Log::error($error);
        }
    }
}

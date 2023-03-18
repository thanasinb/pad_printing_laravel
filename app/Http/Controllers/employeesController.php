<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Exception;
use App\Models\Activity;
use App\Models\ActivityDowntime;
use App\Models\ActivityRework;
use App\Models\Staff;
use App\Models\Machine;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class employeesController extends Controller
{
    //
    public function getEmployeesAll(){
        try{
            $result = DB::select('SELECT id_staff, id_rfid, name_first, name_last, s.site, id_shif, r.role, r.id_role, p.prefix, p.id_prefix, s.staff_img from staff as s , role as r, prefix as p 
            where 
            s.prefix = p.id_prefix AND
            s.id_role = r.id_role');
            return response() -> json($result);
        }
        catch(Exception $error){
            Log::error($error);
        }
    }

    public function editEmployee(Request $request){
        try{
            $data = $request->all();
            // return response()->json($data);
            // $result = Staff::where('id_staff','=',$data['id_staff_old'])->update([
            //     'id_staff'=> $data['id_staff'],
            //     'id_rfid'=> $data['id_rfid'],
            //     'prefix'=> (int)$data['prefix'],
            //     'name_first'=> $data['name_first'],
            //     'name_last'=> $data['name_last'],
            //     'site'=> $data['site'],
            //     'id_role'=> (int)$data['id_role'],
            //     'id_shif'=> $data['id_shif'],
            //     'staff_img' => $data['staff_img'],
            // ]);

            if($data['id_staff'] == $data['id_staff_old']){

                if($data['staff_img']=="-"){
                    $result = Staff::where('id_staff','=',$data['id_staff_old'])->update([
                        'id_staff'=> $data['id_staff'],
                        'id_rfid'=> $data['id_rfid'],
                        'prefix'=> (int)$data['prefix'],
                        'name_first'=> $data['name_first'],
                        'name_last'=> $data['name_last'],
                        'site'=> $data['site'],
                        'id_role'=> (int)$data['id_role'],
                        'id_shif'=> $data['id_shif'],
                    ]);
                }
                else{
                    $filename = Staff::where('id_staff','=',$data['id_staff_old'])->first();
                    $path = public_path('images/employees/' . $filename['staff_img']);
                        if (File::exists($path)) {
                            File::delete($path);
                        }
                    $result = Staff::where('id_staff','=',$data['id_staff_old'])->update([
                        'id_staff'=> $data['id_staff'],
                        'id_rfid'=> $data['id_rfid'],
                        'prefix'=> (int)$data['prefix'],
                        'name_first'=> $data['name_first'],
                        'name_last'=> $data['name_last'],
                        'site'=> $data['site'],
                        'id_role'=> (int)$data['id_role'],
                        'id_shif'=> $data['id_shif'],
                        'staff_img' => $data['staff_img'],
                    ]);
                }
                
                // print_r($result."123");
                return response() -> json([
                    'event' => 'Update',
                    'id_staff' => $data['id_staff_old'],
                    'status' => 'OK',
                ]);
            }
            else{
                $check_duplicate = Staff::where('id_staff',$data['id_staff'])->first();
                if(!empty($check_duplicate)){
                    return response() -> json([
                        'event' => 'Update',
                        'id_staff' => $data['id_staff'],
                        'status' => 'Exist',
                    ]);
                }
                else{
                    if($data['staff_img']=="-"){
                        $result = Staff::where('id_staff','=',$data['id_staff_old'])->update([
                            'id_staff'=> $data['id_staff'],
                            'id_rfid'=> $data['id_rfid'],
                            'prefix'=> (int)$data['prefix'],
                            'name_first'=> $data['name_first'],
                            'name_last'=> $data['name_last'],
                            'site'=> $data['site'],
                            'id_role'=> (int)$data['id_role'],
                            'id_shif'=> $data['id_shif'],
                        ]);
                    }
                    else{
                        $filename = Staff::where('id_staff','=',$data['id_staff_old'])->get();
                        $path = public_path('images/employees/' . $filename['staff_img']);
                            if (File::exists($path)) {
                                File::delete($path);
                            }
                        $result = Staff::where('id_staff','=',$data['id_staff_old'])->update([
                            'id_staff'=> $data['id_staff'],
                            'id_rfid'=> $data['id_rfid'],
                            'prefix'=> (int)$data['prefix'],
                            'name_first'=> $data['name_first'],
                            'name_last'=> $data['name_last'],
                            'site'=> $data['site'],
                            'id_role'=> (int)$data['id_role'],
                            'id_shif'=> $data['id_shif'],
                            'staff_img' => $data['staff_img'],
                        ]);
                    }

                    return response() -> json([
                        'event' => 'Update',
                        'id_staff' => $data['id_staff_old'],
                        'status' => 'OK',
                    ]);
                }
        }
    }
        catch(Exception $error){
            Log::error($error);
        }
    }

    public function deleteImage(Request $request){
        try{
            $data = $request->all();
            $filename = $data['image'];
            if($data['type'] == 'employee'){
                Staff::where('id_staff',$data['id_staff'])->update([
                    'staff_img' => "",
                ]);
                $path = public_path('images/employees/' . $filename);
                    if (File::exists($path)) {
                        File::delete($path);
                    }
            }
            else{
                Machine::where('id_mc',$data['id_mc'])->update([
                    'mc_img' => "",
                ]);
                $path = public_path('images/machines/' . $filename);
                    if (File::exists($path)) {
                        File::delete($path);
                    }
            }
            return response() -> json(['status'=>'Delete Success']);
        }
        catch(Exception $error){
            Log::erorr($error);
        }
    }

    public function uploadFileImage(Request $request){
        try{
            $request->validate([
                'file' => 'required|file|max:4096', // max file size is 1MB
            ]);
            $file = $request->file('file');
            $fileName = $file->getClientOriginalName();
            // return response() -> json($fileName);
            // Store the file in the public/images/employees directory
            $filePath = $file->move(public_path('images/employees'), $fileName);
            // Save the file information to the database
            // $fileData = new File();
            // $fileData->name = $fileName;
            // $fileData->path = '/images/employees/'.$filePath;
            // $fileData->save();

            return response() -> json(['event'=>'upload_image','status' => 'OK']);
        }
        catch(Exception $error){
            Log::error($error);
        }
    }

    public function getActivityEmployees (Request $request){
        try{
            $data = $request->all();
            // print_r($data['id_staff']);
            $result1 = DB::select('select * from activity as b, planning as p where 
            b.id_task = p.id_task and 
            b.id_staff = '.$data['id_staff'].' order by b.time_start');
            $result2 = DB::select('select * from activity_rework as r, planning as p where 
            r.id_task = p.id_task and 
            r.id_staff = '.$data['id_staff'].' order by r.time_start');
            $resultI1 = DB::select('select p.item_no, p.item_des from activity as b, planning as p where 
            b.id_task = p.id_task and 
            b.id_staff = '.$data['id_staff'].'
            group by p.item_no
            order by b.time_start desc');
            $resultI2 = DB::select('select p.item_no, p.item_des from activity_rework as r, planning as p where 
            r.id_task = p.id_task and 
            r.id_staff = '.$data['id_staff'].'
            group by p.item_no
            order by r.time_start desc');
                $resultData = array_merge(  
                    ($result1),
                    ($result2));
                $resultItem = array_merge(  
                    ($resultI1),
                    ($resultI2));
                $result = [$resultData,$resultItem];

            return response() -> json($result);
            
        }
        catch(Exception $error){
            Log::error($error);
        }
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\UserLogin;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class loginController extends Controller
{
    //
    public function userLoginAuth (Request $request){
        $data=$request->only('user','pass');
        $user=UserLogin::where('user',$data['user'])->first();
        if (!$user) {
            return response()->json(['auth'=>'fail', 'status'=>'Not found user']);
        }
        // return response() -> json(gettype($data['pass']));


        if (Hash::check($data['pass'], $user->password)) {
            // The passwords match...
            if($user->role == 'manager'){
                $token = 'mgr_'.Str::random(20);
            }
            else{
                $token = 'emp_'.Str::random(20);
            }
            
            return response() -> json(['auth'=>'pass', 'status'=>'Login Success.', 'token'=>$token]);
        }
        else{
            return response() -> json(['auth'=>'fail', 'status'=>'Password is incorrect']);
        }


    }

    public function userRegister (Request $request){
        // $data = $request->only('user','pass');
        // return response() -> json(['Status'=>'Create user in database success.']);
        UserLogin::create([
            'user'=> 'data_entry',
            'password'=> Hash::make('1212312121'),
            'role' => 'employee',
            'datetime_create'=>date("Y-m-d H:i:s"),
        ]);

        UserLogin::create([
            'user'=> 'manager',
            'password'=> Hash::make('1234567890'),
            'role' => 'manager',
            'datetime_create'=>date("Y-m-d H:i:s"),
        ]);

        return response() -> json(['Status'=>'Create user in database success.']);
    }
}

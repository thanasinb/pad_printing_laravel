<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Exception;
use App\Models\MachineQueue;
use App\Models\Machine;
use App\Models\Planning;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class productsController extends Controller
{
    //
    public function getPlanningAll(){
        try{
            $result = Planning::groupBy('item_no')->get();
            return response() -> json($result);
        }
        catch(Exception $error){
            Log::error($error);
        }
    }
}

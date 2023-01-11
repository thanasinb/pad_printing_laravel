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
            $result = Machine::All();
            return response() -> json($result);
        }
        catch(Exception $error){
            Log::error($error);
        }
    }
}

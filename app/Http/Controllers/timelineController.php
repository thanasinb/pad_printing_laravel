<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log;
use Exception;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class timelineController extends Controller
{
    //
    public function getInfoTimeline(){
        try
        {
            
        }
        catch(Exception $error)
        {
            Log::error($error);
        }
    }
}

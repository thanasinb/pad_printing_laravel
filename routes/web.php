<?php

use App\Http\Controllers\activityController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\touchController;
use App\Http\Controllers\countController;
use App\Http\Controllers\repeatController;
use App\Http\Controllers\timelineController;
use Illuminate\Support\Facades\Redirect;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/update/touch/',   
    [touchController::class, 'getTouchInfo']
);

Route::get('/update/activity/',
    [activityController::class, 'getInfoActivity']
);

Route::get('/update/count/',
    [countController::class, 'getInfoCount']
);

Route::get('/update/repeat/',
    [repeatController::class, 'getInfoRepeat']
);

Route::get('/update/count_v2/',
    [countController::class, 'getInfoCountV2']
);

Route::get('/update/repeat_v2/',
    [repeatController::class, 'getInfoRepeatV2']
);

Route::get('/update/timelineActivity/',
    [timelineController::class, 'getInfoActivity']
);

Route::get('/update/timelineActivityDowntime/',
    [timelineController::class, 'getInfoActivityDowntime']
);

Route::get('/update/timelineActivityRework/',
    [timelineController::class, 'getInfoActivityRework']
);
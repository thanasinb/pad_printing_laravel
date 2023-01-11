<?php

use App\Http\Controllers\activityController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\touchController;
use App\Http\Controllers\countController;
use App\Http\Controllers\repeatController;
use App\Http\Controllers\timelineController;
use App\Http\Controllers\dashboardController;
use App\Http\Controllers\dashboardRefreshController;
use Illuminate\Support\Facades\Redirect;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/update/timelineAll/',
    [timelineController::class, 'getInfoAllActivityAndAllBreak']
);

Route::get('/update/getQueueMachineInfo/',
    [timelineController::class, 'getQueueMachineInfo']
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

Route::get('/update/timelineBreak/',
    [timelineController::class, 'getInfoBreak']
);

Route::get('/update/timelineBreakRework/',
    [timelineController::class, 'getInfoBreakRework']
);

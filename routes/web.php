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

Route::get('/update/DashboardRefresh/',
    [dashboardRefreshController::class, 'dashboardRefreshV3']
);

Route::get('/update/DashboardRefreshQueue2/',
    [dashboardRefreshController::class, 'dashboardRefreshQueue2']
);

Route::get('/update/DashboardRefresh/',
    [dashboardRefreshController::class, 'dashboardRefreshV5']
);

Route::post('/get/indivvidual/dashboard/details',
[dashboardRefreshController::class, 'getDashboardDetails'])->name('dashboard.details');

Route::get('/update/DashboardRefreshQueue2/',
    [dashboardRefreshController::class, 'dashboardRefreshQueue2']
);

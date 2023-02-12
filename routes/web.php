<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\timelineController;
use App\Http\Controllers\machinesController;
use App\Http\Controllers\employeesController;
use App\Http\Controllers\productsController;
use Illuminate\Support\Facades\Redirect;

//Part  Route Page >>>>>>>>>>>>>>>>>>>>>>>

Route::get('/', function () {
    return view('majorette.timeline');
});

// Route::resource('majorette', timelineController::class);

Route::get('/import', function () {
    return view('majorette.import');
});

Route::get('/export', function () {
    return view('majorette.export');
});

Route::get('/productTimeline', function () {
    return view('majorette.productTimeline');
});

Route::get('/humanTimeline', function () {
    return view('majorette.humanTimeline');
});

Route::get('/machineTimeline', function () {
    return view('majorette.machineTimeline');
});

Route::get('/update/machinesAll',
    [machinesController::class, 'getMachinesAll']
);
Route::post('/update/addMachine',
    [machinesController::class, 'addMachine']
);
Route::post('/update/deleteMachine',
    [machinesController::class, 'deleteMachine']
);
Route::post('/update/editMachine',
    [machinesController::class, 'editMachine']
);



Route::get('/update/employeesAll',
    [employeesController::class, 'getEmployeesAll']
);
Route::post('/update/editEmployee',
    [employeesController::class, 'editEmployee']
);
Route::post('/update/timelineEmployees/',
    [employeesController::class, 'getActivityEmployees']
);


Route::get('/update/planningAll',
    [productsController::class, 'getPlanningAll']
);

Route::get('/update/create/comment/',
    [timelineController::class, 'addComment']
);

Route::get('/update/comment/',
    [timelineController::class, 'getComment']
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

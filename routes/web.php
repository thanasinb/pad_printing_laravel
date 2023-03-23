<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\timelineController;
use App\Http\Controllers\machinesController;
use App\Http\Controllers\employeesController;
use App\Http\Controllers\productsController;
use App\Http\Controllers\exportController;
use App\Http\Controllers\importController;
use Illuminate\Support\Facades\Redirect;
use App\Http\Controllers\manualController;
use App\Http\Controllers\loginController;

//Part  Route Page >>>>>>>>>>>>>>>>>>>>>>>

Route::get('/', function () {
    return view('majorette.timeline');
});

Route::get('/login', function () {
    return view('majorette.login');
});
// Route::resource('majorette', timelineController::class);

Route::get('/importfile', function () {
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

Route::get('/test', function () {
    return view('majorette.simulator');
});

// Route::get('/update/exportFile', function () {
//     return view('export.update.');
// });

// Route::get("/update/exportFile", function() {
//     ob_start();
//     require(path("public/update")."pp-export-action-2-new");
//     return ob_get_clean();
// });

// Route::get("/update/exportFile", function() { return Redirect::to("update/pp-export-action-2-new.php"); })


Route::post('/update/exportFile',
    [exportController::class, 'exportFile']
);

Route::post('/update/importData',
    [importController::class, 'insertData']
);

Route::post('/update/uploadImport',
    [importController::class, 'uploadFile']
);

Route::post('/update/userLogin',
    [loginController::class, 'userLoginAuth']
);
Route::post('/update/userRegister',
    [loginController::class, 'userRegister']
);


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
Route::post('/update/uploadFileImage',
    [machinesController::class, 'uploadFileImage']
);


// Route::get('/update/manualCreateActivityIdle',
//     [manualController::class, 'manualAddIdle']
// );

Route::get('/update/employeesAll',
    [employeesController::class, 'getEmployeesAll']
);
Route::post('/update/editEmployee',
    [employeesController::class, 'editEmployee']
);
Route::post('/update/timelineEmployees/',
    [employeesController::class, 'getActivityEmployees']
);
Route::post('/update/uploadFileImage/employee',
    [employeesController::class, 'uploadFileImage']
);
Route::post('/update/deleteImage',
    [employeesController::class, 'deleteImage']
);


Route::get('/update/planningAll',
    [productsController::class, 'getPlanningAll']
);
Route::post('/update/planningSelect',
    [productsController::class, 'getPlanningSelect']
);
Route::post('/update/getDetailTask',
    [productsController::class, 'getDetailTask2']
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

Route::post('/update/scrap',
    [timelineController::class, 'addScrap']
);

// TEST TIMELINE --------------------
Route::post('/test/AddActivity',
    [timelineController::class, 'addTestActivity']
);

Route::post('/test/AddActivityDT',
    [timelineController::class, 'addTestActivityDT']
);

Route::post('/test/AddBreakActivity',
    [timelineController::class, 'addTestBreak']
);

Route::post('/test/ContinueActivity',
    [timelineController::class, 'TestContinue']
);

Route::post('/test/ExitActivity',
    [timelineController::class, 'testExit']
);
// -----------------------------------
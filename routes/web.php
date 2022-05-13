<?php

use App\Http\Controllers\activityController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\touchController;
use App\Http\Controllers\countController;
use App\Http\Controllers\repeatController;
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
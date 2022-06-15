<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\countController;
use App\Http\Controllers\activityController;
use App\http\Controllers\machineController;
use App\http\Controllers\dashboardRefreshController;
use App\http\Controllers\RefreshController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/update/activity/',   
    [activityController::class, 'getInfoActivity']);


Route::get('/update/count/', 
    [countController::class, 'getInfoCount']);


Route::get('/update/count_V2/', 
    [countController::class, 'getInfoCountV2']);  

Route::get('/update/machine/', 
    [machineController::class, 'getInfoMachine']); 

Route::get('/update/dashboard/', 
    [dashboardRefreshController::class, 'dashboardRefreshV3']); 

Route::get('/update/Refresh/', 
    [RefreshController::class, 'fetchRefresh']); 

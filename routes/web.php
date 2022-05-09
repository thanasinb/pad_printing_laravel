<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\touchController;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/update/touch/',   
    [touchController::class, 'getTouchInfo1']);
Route::get('/update/touch/',   
    [touchController::class, 'getTouchInfo2']);
Route::get('/update/touch/',   
    [touchController::class, 'getTouchInfo3']);
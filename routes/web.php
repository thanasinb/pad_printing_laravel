<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\touchController;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/info/touch',   
    [touchController::class, 'getTouchInfo']);
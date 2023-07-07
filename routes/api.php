<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\ElectionController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\YearLevelController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/createElection', [ElectionController::class, 'store']);
    Route::apiResource('survey', SurveyController::class);
    Route::get('/election', [ElectionController::class, 'index']);
    Route::put('/createElection/{id}', [ElectionController::class, 'update']);
    Route::get('/elections/{id}', [ElectionController::class, 'show']);
    Route::post('/elections/{id}/uploadVoter', [ElectionController::class, 'uploadFile']);
});

Route::post('/getvotercode', [AuthController::class, 'checkEmail']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/yearLevel', [YearLevelController::class, 'index']);
Route::get('/department', [DepartmentController::class, 'index']);

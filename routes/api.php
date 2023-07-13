<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\ElectionController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\VotingController;
use App\Http\Controllers\YearLevelController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
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

    // POST    
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/createElection', [ElectionController::class, 'store']);
    Route::post('/elections/position', [ElectionController::class, 'positionStore']);
    Route::post('/elections/partylist', [ElectionController::class, 'partylistStore']);
    Route::post('/elections/{id}/uploadVoter', [ElectionController::class, 'uploadFile']);
    Route::post('/candidateStore/{id}', [ElectionController::class, 'candidateStore']);
    Route::post('/castVote', [VotingController::class, 'castVote']);

    // GET
    Route::get('/election', [ElectionController::class, 'index']);
    Route::get('/elections/{id}', [ElectionController::class, 'show']);
    Route::get('/showElectionData/{id}', [ElectionController::class, 'showElectionData']);
    Route::get('/positonPartylist/{id}', [ElectionController::class, 'positonPartylist']);
    Route::get('/showVoter/{id}', [VotingController::class, 'showVoter']);
    Route::get('/showElection/{id}', [VotingController::class, 'showElection']);
    Route::get('/{filename}', function ($filename) {
        $path = storage_path('app/' . $filename);

        if (!file_exists($path)) {
            abort(404);
        }

        $file = File::get($path);
        $type = File::mimeType($path);

        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);

        return $response;
    });

    // PUT
    Route::put('/createElection/{id}', [ElectionController::class, 'update']);

    Route::apiResource('survey', SurveyController::class);
});

Route::post('/getvotercode', [AuthController::class, 'checkEmail']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/yearLevel', [YearLevelController::class, 'index']);
Route::get('/department', [DepartmentController::class, 'index']);

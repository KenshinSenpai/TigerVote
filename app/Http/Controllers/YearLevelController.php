<?php

namespace App\Http\Controllers;

use App\Models\YearLevel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class YearLevelController extends Controller
{
    public function index()
    {
        $yearLevel = DB::table('yearlevel')->select('id', 'yearLevel')->get();
        return response()->json($yearLevel);
    }
}

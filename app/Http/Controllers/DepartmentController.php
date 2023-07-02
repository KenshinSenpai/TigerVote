<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DepartmentController extends Controller
{
    public function index()
    {
        $department = DB::table('department')->select('id', 'departmentName')->get();
        return response()->json($department);
    }
}

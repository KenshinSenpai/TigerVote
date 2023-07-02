<?php

namespace App\Http\Controllers;

use App\Http\Requests\ElectionStoreRequest;
use App\Models\Election;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ElectionController extends Controller
{
    public function index()
    {
        // $election = DB::table('election')->get();

        $election = DB::select('SELECT election.id, election.electionName, department.departmentName,  yearlevel.yearLevel, election.electionStart, election.electionEnd FROM department, election, yearlevel WHERE department.id = election.departmentID AND election.yearLevelID = yearlevel.id');
        
        return response()->json($election);
    }

    public function store(ElectionStoreRequest $request)
    {
        $data = $request->validated();

        try {
            $data = $request->only(['yearLevel', 'department', 'startDate', 'startTime', 'endDate', 'endTime', 'electionName']);
    
            DB::table('election')->insert([
                'yearLevelID' => $data['yearLevel'],
                'departmentID' => $data['department'],
                'electionStart' => $data['startDate'] . ' ' . $data['startTime'],
                'electionEnd' => $data['endDate'] . ' ' . $data['endTime'],
                'electionName' => $data['electionName'],
            ]);
    
            return response()->json(['message' => 'Data stored successfully']);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to store data'], 500);
        }
    }

    // public function update(Request $request, $id)
    // {
    //     // Validate the request data
    //     $validatedData = $request->validate([
    //         'electionName' => 'required',
    //         'startDate' => 'required',
    //         'endDate' => 'required',
    //         'startTime' => 'required',
    //         'endTime' => 'required',
    //         'yearLevel' => 'required',
    //         'department' => 'required',
    //     ]);
        
    //     // dd($request);

    //     // Find the election by ID
    //     $election = DB::table('election')
    //         ->where('id', (int)$id)
    //         ->get();

    //     // Update the election data
    //     // $election->update($validatedData);

    //     // Return a response
    //     return response()->json([
    //         $request
    //     ]);
    // }




    public function update(Request $request, $id)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'electionName' => 'required',
            'startDate' => 'required',
            'endDate' => 'required',
            'startTime' => 'required',
            'endTime' => 'required',
            'yearLevelID' => 'required',
            'departmentID' => 'required',
        ]);

        // Find the election by ID
        $election = Election::where('id', $id)->first();
            

        $status = true;
        $message = null;
        // Update the election data
        try {
            $election->update($validatedData);
        } catch(Exception $e) {
            $status = false;
            $message = $e;
        }

        // Return a response
        return response()->json([
            'status' => $status,
            'message' => $message,
            'election' => $election,
            'data' => $validatedData,
        ]);
    }


    public function show($id)
    {
        // // Find the election by ID
        $election = DB::table('election')
            ->where('id', $id)
            ->get();
        return response()->json($election);
    }

}
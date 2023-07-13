<?php

namespace App\Http\Controllers;

use App\Http\Requests\ElectionStoreRequest;
use App\Models\Election;
use App\Models\User;
use App\Models\Voter;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\Candidates;

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

    public function positionStore(Request $request)
    {
        $data = $request->all();

        $data = array_map(function ($positionData) {
            $positionData['electionID'] = (int) $positionData['electionID'];
            return $positionData;
        }, $data);

        $validator = Validator::make($data, [
            '*.positionName' => 'required|string',
            '*.positionAbvr' => 'required|string',
            '*.electionID' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            foreach ($data as $positionData) {
                DB::table('position')->insert([
                    'positionName' => $positionData['positionName'],
                    'positionAbvr' => $positionData['positionAbvr'],
                    'electionID' => (int) $positionData['electionID']
                ]);
            }
            return response()->json(['message' => 'Data stored successfully']);
        } catch (Exception $e) {
            Log::error($e);
            return response()->json(['error' => 'Failed to store data'], 500);
        }
    }

    public function candidateStore(Request $request, $id)
    {
        try {
            if ($request->hasFile('fileUpload')) {
                $path = $request->file('fileUpload')->store('uploads');

                // Save the $path to your database or perform other operations
                $candidate = new Candidates();
                $candidate->userID = $request->input('userID');
                $candidate->image = $path;
                $candidate->partylistID = $request->input('partylistID');
                $candidate->positionID = $request->input('positionID');
                $candidate->electionID = $id;
                $candidate->save();

                return response()->json(['message' => 'Candidate successfully added']);
            }
            return response()->json(['message' => 'No file uploaded'], 400);
        } catch (Exception $e) {
            // Log the error for debugging
            Log::error('Error in candidateStore: ' . $e->getMessage());
            return response()->json(['message' => 'Error uploading file'], 500);
        }
    }

    public function partylistStore(Request $request)
    {
        $data = $request->all();

        $data = array_map(function ($partylistData) {
            $partylistData['electionID'] = (int) $partylistData['electionID'];
            return $partylistData;
        }, $data);

        $validator = Validator::make($data, [
            '*.partylistName' => 'required|string',
            '*.partylistAbvr' => 'required|string',
            '*.electionID' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            foreach ($data as $partylistData) {
                DB::table('partylists')->insert([
                    'partylistName' => $partylistData['partylistName'],
                    'partylistAbvr' => $partylistData['partylistAbvr'],
                    'electionID' => (int) $partylistData['electionID']
                ]);
            }
            return response()->json(['message' => 'Data stored successfully']);
        } catch (Exception $e) {
            Log::error($e);
            return response()->json(['error' => 'Failed to store data'], 500);
        }
    }

    public function uploadFile(Request $request, $id)
    {
        if ($request->hasFile('file') && $request->file('file')->isValid()) {
            $file = $request->file('file');

            // Get the file extension
            $extension = $file->getClientOriginalExtension();

            // Check if the file is a CSV
            if ($extension === 'csv') {
                $rows = file($file->getRealPath());
                $header = str_getcsv(array_shift($rows));

                foreach ($rows as $row) {
                    $rowData = str_getcsv($row);

                    // Extract the desired columns (Name, Email, Year, and Department)
                    $name = (string) Str::of($rowData[0])->before(' ');
                    $email = $rowData[1];
                    $year = $rowData[2];
                    $department = $rowData[3];

                    // Check if the email is unique
                    if (User::where('email', $email)->exists()) {
                        continue; // Skip creating the User record if the email already exists
                    }

                    // Make a unique voterCode
                    do {
                        $voterCode = Str::random(6);
                    } while (DB::table('users')->where('voterCode', $voterCode)->exists());

                    // Store the data in the appropriate table

                    // Insert into the User table
                    $user = User::create([
                        'name' => $name,
                        'email' => $email,
                        'voterCode' => $voterCode,
                        'password' => Hash::make($voterCode),
                        'remember_token' => Str::random(10),
                    ]);

                    Voter::create([
                        'userID' => $user->id,
                        'department' => $department,
                        'yearLevel' => $year,
                        'electionID' => $id,
                    ]);
                }

                return response()->json(['message' => 'Data stored successfully']);
            }
        }

        // Return an error response if the file is invalid or unsupported
        return response()->json(['error' => 'Invalid file or unsupported format'], 400);
    }

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
        } catch (Exception $e) {
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
        $election = DB::table('election')
            ->where('id', $id)
            ->get();
        return response()->json($election);
    }

    public function showElectionData($id)
    {
        $voters = DB::table('voter')
            ->join('users', 'voter.userID', '=', 'users.id')
            ->select('users.name', 'voter.department', 'voter.userID', 'voter.yearLevel')
            ->where('voter.electionID', $id)
            ->get();

        $election = DB::table('election')
            ->select('electionName')
            ->where('id', $id)
            ->get();

        return response()->json([
            'voters' => $voters,
            'election' => $election,
        ]);
    }

    public function positonPartylist($id)
    {
        $positions = DB::table('position')
            ->where('electionID', $id)
            ->get();

        $partylist = DB::table('partylists')
            ->where('electionID', $id)
            ->get();

        return response()->json([
            'position' => $positions,
            'partylist' => $partylist,
        ]);
    }
}

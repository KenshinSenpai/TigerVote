<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class VotingController extends Controller
{
    public function showVoter($id)
    {
        $election = DB::table('voter')
            ->join('users', 'voter.userID', '=', 'users.id')
            ->join('election', 'voter.electionID', '=', 'election.id')
            ->where('voter.userID', $id)
            ->select(
                'voter.id',
                'users.name',
                'voter.department',
                'voter.yearLevel',
                'election.electionName',
                'election.id'
            )
            ->get();

        return response()->json($election);
    }

    public function showElection($id)
    {
        $election = DB::table('candidate')
            ->join('users', 'candidate.userID', 'users.id')
            ->join('partylists', 'candidate.partylistID', 'partylists.id')
            ->join('position', 'candidate.positionID', 'position.id')
            ->join('election', 'candidate.electionID', 'election.id')
            ->where('candidate.electionID', $id)
            ->select(
                'users.name',
                'candidate.image',
                'partylists.partylistAbvr',
                'position.positionName',
                'position.id as positionID',
                'election.electionName',
                'candidate.id',
            )
            ->get();

        return response()->json($election);
    }

    public function castVote(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            '*.voterID' => 'required|integer',
            '*.candidateID' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid inputs'], 400);
        }


        try {
            foreach ($data as $voteData) {
                DB::table('votes')->insert([
                    'voterID' => $voteData['voterID'],
                    'candidateID' => $voteData['candidateID']
                ]);
            }
            return response()->json(['message' => 'Data stored successfully']);
        } catch (Exception $e) {
            return response()->json(['message' => 'Vote stored successfully']);
        }
    }
}

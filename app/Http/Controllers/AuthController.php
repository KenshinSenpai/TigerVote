<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function checkEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid email address'], 400);
        }

        $email = $request->input('email');

        $user = User::where('email', $email)->first();

        if ($user) {
            $voterCode = $user->voterCode;
            // 'body' => 'Please note that this VoterCode is confidential and should not be shared with anyone other than the intended recipient.'
            Mail::send('mail.name', ['voterCode' => $voterCode], function ($message) use ($email) {
                $message->to($email)->subject('Your Voter Code');
            });
            
            return response()->json(['message' => 'Code sent successfully'], 200);
        } else {
            return response()->json(['message' => 'Email not found in database'], 404);
        }
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'error' => 'The Provided credentials are not correct'
            ], 422);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();
        // Revoke the token that was used to authenticate the current request...
        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);
    }

    public function me(Request $request)
    {
        return $request->user();
    }
}
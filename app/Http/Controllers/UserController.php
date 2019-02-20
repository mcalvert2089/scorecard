<?php

namespace App\Http\Controllers;

use App\PasswordReset;
use App\User;
use Illuminate\Auth\Passwords\DatabaseTokenRepository;
use Illuminate\Contracts\Hashing\Hasher as HasherContract;
use Illuminate\Http\Request;

class UserController extends Controller
{
	public function __construct(HasherContract $hasher)
    {
        $this->hasher = $hasher;
    }

    public function me() {
    	return User::select('id', 'first_name', 'last_name', 'email')->whereId(auth()->user()->id)->first();
    }

    public function isActivated(Request $request) {
    	$user = User::whereActivationKey($request->activation_key)->first();
    	$active = ($user->email_verified_at) ? true : false;
    	return [ 'active' => $active ];
    }

    public function checkPasswordResetToken($token, $email) {
    	$reset = PasswordReset::where('email', $email)->firstOrFail();
    	return [ 'valid' => $this->hasher->check($token, $reset->token) ];
	}
}
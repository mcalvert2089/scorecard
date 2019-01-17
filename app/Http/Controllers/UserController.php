<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function isActivated(Request $request) {
    	$user = User::whereActivationKey($request->activation_key)->first();
    	$active = ($user->email_verified_at) ? true : false;
    	return [ 'active' => $active ];
    }
}

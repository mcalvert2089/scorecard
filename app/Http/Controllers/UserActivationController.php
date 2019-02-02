<?php

namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;

class UserActivationController extends Controller
{
    public function activate($activation_key) {
		try {
			$user = User::where('activation_key', $activation_key)->firstOrFail();
		} catch(Exception $e) {
			\Log::error('User verification failed! User not found => KEY: ' . $activation_key);
		}

		User::whereId($user->id)->update([
			'email_verified_at' => Carbon::now()
		]);
    }
}
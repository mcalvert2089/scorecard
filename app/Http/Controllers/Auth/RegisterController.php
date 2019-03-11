<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Notifications\UserRegisteredSuccessfully;
use App\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            // 'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            // 'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);
    }

    /**
     * Register new account.
     *
     * @param Request $request
     * @return User
     */
    protected function register(Request $request)
    {
        $request->validate([
            // 'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            // 'password' => 'required|string|min:6|confirmed',
        ]);

        try {
            $user = User::create([
                'email' => $request->email,
                'password' => str_random(30).time(),
                'activation_key' => str_random(30).time()
            ]);
            dump($user);

            return $user->notify(new UserRegisteredSuccessfully($user));
        } catch (\Exception $exception) {
            logger()->error($exception);
            return 'Unable to create new user.';
        }
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        $activationKey = Hash::make($data['email']);

        return User::create([
            // 'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make(str_random(12)),
            'activation_key' => $activationKey,
        ]);
    }

    public function activateAccount(Request $request) {
        User::whereActivationKey($request->activation_key)
            ->update([ 
                'password' => Hash::make($request->password),
                'email_verified_at' => Carbon::now()
            ]);
    }
}
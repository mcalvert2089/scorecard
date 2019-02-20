<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//USERS
Route::post('user-check-active', 'UserController@isActivated');
Route::post('check-token/{token}/{email}', 'UserController@checkPasswordResetToken');

Route::group([ 'prefix' => 'auth' ], function () {
    Route::post('login', 'AuthController@login');
    // Route::post('signup', 'AuthController@signup');
  
    Route::group([ 'middleware' => 'auth:api' ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});


Route::group([ 'middleware' => 'auth:api' ], function() {
	// USER
    Route::get('me', 'UserController@me');

    Route::resource('teams', 'TeamController');
    Route::resource('players', 'PlayerController');
    Route::resource('positions', 'PositionController');
    Route::resource('scorecard', 'ScorecardController');
    Route::resource('roster', 'ScorecardRosterController');
    Route::get('team-rosters/{team_id}', 'TeamController@getRoster');
    Route::get('scorecard-rosters/{scorecard_id}', 'TeamController@getScorecardRosters');
});




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

Route::group([ 'prefix' => 'auth' ], function () {
    // AUTH
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
  
    Route::group([ 'middleware' => 'auth:api' ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });

    // TEAMS
    Route::get('teams', 'TeamController@index');
    Route::post('teams', 'TeamController@create');
    Route::patch('teams/{id}', 'TeamController@update');


});


<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Auth::routes(['verify' => true]);

Route::post('/account-activate', 'Auth\RegisterController@activateAccount');
Route::get('/activate/{key}', 'UserActivationController@activate')->name('activate.user');

Route::view('/{path?}', 'app')
	->where('path', '.*')
	->name('react');

Auth::routes();
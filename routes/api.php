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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/contracts', 'ContractController@index');
Route::get('/contracts/{student}', 'ContractController@show');
Route::post('/contracts', 'ContractController@store');
Route::put('/contracts/{contract}', 'ContractController@update');
Route::delete('/contracts', 'ContractController@destroy');

Route::get('/parties', 'PartyController@index');
Route::get('/parties/{party}', 'PartyController@show');
Route::post('/parties', 'PartyController@store');
Route::put('/parties/{party}', 'PartyController@update');
Route::delete('/parties', 'PartyController@destroy');

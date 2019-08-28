<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Models\Contract;
use App\Models\Party;

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
Route::get('/contracts/{contract}', 'ContractController@show');
Route::post('/contracts', 'ContractController@store');
Route::put('/contracts/{contract}', 'ContractController@update');
Route::delete('/contracts/{contract}', 'ContractController@destroy');

Route::get('/parties', 'PartyController@index');
Route::get('/parties/{party}', 'PartyController@show');
Route::post('/parties', 'PartyController@store');
Route::put('/parties/{party}', 'PartyController@update');
Route::delete('/parties/{party}', 'PartyController@destroy');

Route::get('/search/party', function(Request $request){
    $search   = Input::get('q');
    $result   = Party::where('name','LIKE','%'.$search.'%')
                    ->orWhere('cpf','LIKE','%'.$search.'%')
                    ->get();
    return $result;
});

Route::get('/search/contract', function(Request $request){
    $search   = Input::get('q');
    $result   = Contract::where('title','LIKE','%'.$search.'%')
                    ->get();
    return $result;
});

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

// Route::get('/', function () {
//     return view('main');
// });

// Route::get( '/{path?}/{edit?}/{id?}', function(){
//     return view( 'main' );
// } )->where('path', '.*')->where('edit', '.*')->where('id', '.*')
// ;

Route::any('{all}', function () {
    return view('main');
})
->where(['all' => '.*']);

// Route::get( '/{path?}', function(){
//     return view( 'main' );
// } )->where('path', '.*');


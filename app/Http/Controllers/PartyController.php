<?php

namespace App\Http\Controllers;

use App\Models\Party;
use Illuminate\Http\Request;

class PartyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //dd(Party::get()->toArray());
        return Party::get()->toArray();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        try{
            return Party::create($request->all());
        }catch(\Throwable $e){
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $party = Party::find($id);

        if($party){
            $party->contracts;
            return response()->json($party);
        }else{
            return response()->json(['message'=>'Not found'], 404);
        }
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $party = Party::find($id);
        
        if(!$party){
            return response()->json(['message'=>'Not found'], 404);
        }

        try{
            $party->update($request->all());
            return [];
        }catch(\Throwable $e){
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $party = Party::find($id);
        
        if(!$party){
            return response()->json(['message'=>'Not found'], 404);
        }

        try{
            $party->delete();
            return [];
        }catch(\Throwable $e){
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }
}

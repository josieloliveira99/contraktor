<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use Illuminate\Http\Request;

class ContractController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Contract::get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($request->hasFile('file') && $request->file('file')->isValid()) {
            $path = $request->file->store('pdfs','public');
            if($path){
                
                $data["title"]    = $request->title;
                $data["start_at"] = $request->start_at;
                $data["end_at"]   = $request->end_at;
                $data["pdf_file"] = $path;

                try{
                    return Contract::create($data);
                }catch(\Throwable $e){
                    return response()->json([
                        'message' => $e->getMessage()
                    ], 500);
                }

            }
        }
        //dd($request->file('file'));
        //$path = $request->file->store('pdfs','public');
        //return response()->json($request->all(), 200);

        // try{
        //     return Contract::create($request->all());
        // }catch(\Throwable $e){
        //     return response()->json([
        //         'message' => $e->getMessage()
        //     ], 500);
        // }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $contract = Contract::find($id);
        
        if($contract){
            $contract->parties;
            return response()->json($contract);
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
        $contract = Contract::find($id);
        
        if(!$contract){
            return response()->json(['message'=>'Not found'], 404);
        }

        try{
            $contract->update($request->all());
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
        $contract = Contract::find($id);
        
        if(!$contract){
            return response()->json(['message'=>'Not found'], 404);
        }

        try{
            $contract->delete();
            return [];
        }catch(\Throwable $e){
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }
}

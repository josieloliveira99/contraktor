<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Relation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
        $arr_pivot = json_decode($request->pivot);
        // foreach($arr_pivot as $relation){
        //     //$contract_saved->parties()->create(['contract_id' => $contract_saved->id, 'party_id' => $relation->value]);
        //     //echo $relation->id;
        //     return $relation->value;
        // }
        // return;


        if ($request->hasFile('file') && $request->file('file')->isValid()) {
            $path = $request->file->store('pdfs','public');
            if($path){
                
                $data["title"]    = $request->title;
                $data["start_at"] = $request->start_at;
                $data["end_at"]   = $request->end_at;
                $data["pdf_file"] = $path;

                try{
                    $contract_saved = Contract::create($data);
                    $contract_saved_id = $contract_saved->id;
                    if($contract_saved){
                        $contract = Contract::find($contract_saved_id);
                        foreach($arr_pivot as $party){
                            try{
                                // $date = date('Y/m/d h:i:s', time());
                                // DB::insert('insert into contract_party (contract_id, party_id, created_at, updated_at) values (?, ?, ?, ?)', [$contract_saved_id, $relation->value, $date, $date]);
                                // $contract->relations->create(['contract_id' => $contract_saved_id, 'party_id' => $relation->value]);
                                $contract->parties()->attach($party->value);
                            }catch(\Throwable $e){
                                return response()->json([
                                    'message' => $e->getMessage()
                                ], 500);
                            }
                            
                        }
                    }
                    return $contract_saved;
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
        //return $contract->pdf_file;
        if(!$contract){
            return response()->json(['message'=>'Not found'], 404);
        }

        $data["title"]    = $request->title;
        $data["start_at"] = $request->start_at;
        $data["end_at"]   = $request->end_at;

        if($request->hasFile('file')){
            Storage::delete($contract->pdf_file);
            $path = $request->file->store('pdfs','public');
            if($path){
                $data["pdf_file"] = $path; 
            }
        }else{
            $data["pdf_file"] = $contract->pdf_file;
        }

        try{
            $contract->update(
                [
                    'title' => $data["title"],
                    'start_at' => $data["start_at"],
                    'end_at' => $data["end_at"],
                    'pdf_file' => $data["pdf_file"]
                ]
            );
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

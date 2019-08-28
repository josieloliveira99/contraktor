<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    protected $fillable = ["title", "start_at", "end_at","pdf_file"];

    public function parties(){
        return $this->belongsToMany('App\Models\Party')->withTimestamps();
    }
}

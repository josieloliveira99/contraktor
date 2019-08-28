<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Party extends Model
{
    protected $fillable = ["cpf", "name", "mail","phone"];

    public function contracts(){
        return $this->belongsToMany('App\Models\Contract')->withTimestamps();
    }
}

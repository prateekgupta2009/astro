<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class PranicPatient extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='pranic_patients';
    protected $guarded = [];

    public function state(){
        return $this->belongsTo(State::class, 'state_id', '_id');
    }
}

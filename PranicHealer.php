<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class PranicHealer extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='pranic_healers';
    protected $guarded = [];

    public function state(){
        return $this->belongsTo(State::class, 'state_id', '_id');
    }
}

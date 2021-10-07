<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class City extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='cities';
    protected $guarded = [];

    public function continent(){
        return $this->belongsTo(Continent::class, 'continent_id', '_id');
    }

    public function country(){
        return $this->belongsTo(Country::class, 'country_id', '_id');
    }

    public function state(){
        return $this->belongsTo(State::class, 'state_id', '_id');
    }
}

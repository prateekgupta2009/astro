<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class State extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='states';
    protected $guarded = [];

    public function continent(){
        return $this->belongsTo(Continent::class, 'continent_id', '_id');
    }

    public function country(){
        return $this->belongsTo(Country::class, 'country_id', '_id');
    }
}

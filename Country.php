<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use App\Continent;

class Country extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='countries';
    protected $guarded = [];

    public function continent(){
        return $this->belongsTo(Continent::class, 'continent_id', '_id');
    }
}

<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Astrologer extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='astrologers';
    protected $guarded = [];

    public function state(){
        return $this->belongsTo(State::class, 'state_id', '_id');
    }

    public function category_filter(){
        return $this->hasMany(AstrologerCategory::class,'astrologer_id');
    }
}

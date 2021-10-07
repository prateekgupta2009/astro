<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class AddonValue extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='addon_values';
    protected $guarded = [];

    public function label(){
        return $this->belongsTo(AddonLabel::class, 'addonlabel_id', '_id');
    }
}

<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class OnlinePoojaAddonValue extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='online_pooja_addon_values';
    protected $guarded = [];

    public function label(){
        return $this->belongsTo(OnlinePoojaAddonLable::class, 'addonlabel_id', '_id');
    }
}

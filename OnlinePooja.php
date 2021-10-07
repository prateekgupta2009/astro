<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class OnlinePooja extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='online_poojas';
    protected $guarded = [];

    public function category(){
        return $this->belongsTo(OnlinePoojaCategory::class, 'category_id', '_id');
    }

    public function addon_filter(){
        return $this->hasMany(OnlinePoojaAddon::class,'product_id');
    }
}

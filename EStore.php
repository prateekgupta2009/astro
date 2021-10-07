<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class EStore extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='e_stores';
    protected $guarded = [];

    public function category(){
        return $this->belongsTo(EstoreCategory::class, 'category_id', '_id');
    }

    public function subcategory(){
        return $this->belongsTo(EstoreSubCategory::class, 'subcategory_id', '_id');
    }

    public function certification_filter(){
        return $this->hasMany(EstoreAddon::class,'product_id');
    }
}

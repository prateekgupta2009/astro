<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class EstoreSubCategory extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='estore_sub_categories';
    protected $guarded = [];

    public function category(){
        return $this->belongsTo(EstoreCategory::class, 'category_id', '_id');
    }
}

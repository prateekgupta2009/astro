<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Subcategory extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='subcategories';
    protected $guarded = [];

    public function category(){
        return $this->belongsTo(Category::class, 'category_id', '_id');
    }
}

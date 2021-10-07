<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Category extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='categories';
    protected $guarded = [];

    public function option(){
        return $this->hasMany(Subcategory::class,'category_id');
    }
}

<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class BlogCategory extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='blog_categories';
    protected $guarded = [];

    public function subcategory(){
        return $this->hasMany(BlogSubcategory::class,'category_id');
    }
}

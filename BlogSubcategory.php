<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class BlogSubcategory extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='blog_subcategories';
    protected $guarded = [];

    public function category(){
        return $this->belongsTo(BlogCategory::class, 'category_id', '_id');
    }
}

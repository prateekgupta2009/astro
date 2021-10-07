<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Blog extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='blogs';
    protected $guarded = [];

    public function category(){
        return $this->belongsTo(BlogCategory::class, 'category_id', '_id');
    }

    public function subcategory(){
        return $this->belongsTo(BlogSubcategory::class, 'subcategory_id', '_id');
    }

    public function author(){
        return $this->belongsTo(BlogAuthor::class, 'author_id', '_id');
    }
}

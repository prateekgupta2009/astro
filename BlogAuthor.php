<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class BlogAuthor extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='blog_authors';
    protected $guarded = [];
}

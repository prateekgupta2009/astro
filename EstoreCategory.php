<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class EstoreCategory extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='estore_categories';
    protected $guarded = [];
}

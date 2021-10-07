<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Cms extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='cms';
    protected $guarded = [];
}

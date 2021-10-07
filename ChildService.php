<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class ChildService extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='child_services';
    protected $guarded = [];
}

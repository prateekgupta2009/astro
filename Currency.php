<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Currency extends Eloquent
{
   	protected $connection = 'mongodb';
    protected $collection='currencies';
    protected $guarded = [];
}

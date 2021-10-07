<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Language extends Eloquent
{
  	protected $connection = 'mongodb';
    protected $collection='languages';
    protected $guarded = [];
}

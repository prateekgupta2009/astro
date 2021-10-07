<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;


class Page extends Eloquent
{
   	protected $connection = 'mongodb';
    protected $collection='pages';
    protected $guarded = [];
}

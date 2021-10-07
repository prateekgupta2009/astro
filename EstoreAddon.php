<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class EstoreAddon extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='estore_addons';
    protected $guarded = [];
}

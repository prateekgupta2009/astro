<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class OnlinePoojaAddon extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='online_pooja_addons';
    protected $guarded = [];
}

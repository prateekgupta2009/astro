<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Customer extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='signupusers';
    protected $guarded = [];
}

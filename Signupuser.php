<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model;

class Signupuser extends Model
{
    protected $connection = 'mongodb';
    protected $collection='signupusers';
    protected $guarded = [];
}

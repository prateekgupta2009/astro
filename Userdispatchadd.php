<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model;

class Userdispatchadd extends Model
{
    protected $connection = 'mongodb';
    protected $collection='userdispatchadds';
    protected $guarded = [];
}

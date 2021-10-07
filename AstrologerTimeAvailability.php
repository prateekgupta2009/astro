<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class AstrologerTimeAvailability extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='astrologer_time_availabilities';
    protected $guarded = [];
}

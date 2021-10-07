<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class AstrologerPrice extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='astrologer_prices';
    protected $guarded = [];
}

<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class AstrologerCommission extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='astrologer_commissions';
    protected $guarded = [];
}

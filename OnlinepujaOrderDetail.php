<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model;

class OnlinepujaOrderDetail extends Model
{
    protected $connection = 'mongodb';
    protected $collection='onlinepuja_order_details';
    protected $guarded = [];
}

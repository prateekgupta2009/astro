<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model;

class EstoreOrderDetail extends Model
{
    protected $connection = 'mongodb';
    protected $collection='estore_order_details';
    protected $guarded = [];
}

<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model;

class EstorePaymentDetail extends Model
{
    protected $connection = 'mongodb';
    protected $collection='estore_payment_details';
    protected $guarded = [];
}

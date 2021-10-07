<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model;

class OnlinePaymentDetail extends Model
{
    protected $connection = 'mongodb';
    protected $collection='online_payment_details';
    protected $guarded = [];
}

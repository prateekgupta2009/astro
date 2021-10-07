<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model;

class EstorePaymentGetway extends Model
{
    protected $connection = 'mongodb';
    protected $collection='estore_payment_getways';
    protected $guarded = [];
}

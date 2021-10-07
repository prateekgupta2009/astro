<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model;

class EstoreCreateOrder extends Model
{
    protected $connection = 'mongodb';
    protected $collection='estore_create_orders';
    protected $guarded = [];

    public function users(){
        return $this->belongsTo(Signupuser::class, 'user_id', '_id');
    }

    public function address(){
        return $this->belongsTo(Userdispatchadd::class, 'address_id', '_id');
    }

    public function payment(){
        return $this->belongsTo(EstorePaymentDetail::class, '_id', 'order_id');
    }

    public function items(){
        return $this->hasMany(EstoreOrderDetail::class, 'order_id', '_id');
    }
}

<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class PranicHealerBankDetail extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='pranic_healer_bank_details';
    protected $guarded = [];
}

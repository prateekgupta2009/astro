<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class AstrologerBankDetail extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='astrologer_bank_details';
    protected $guarded = [];
}

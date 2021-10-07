<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class AstrologerCategory extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='astrologer_categories';
    protected $guarded = [];
}

<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class AstrologerLanguage extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='astrologer_languages';
    protected $guarded = [];
}

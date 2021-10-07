<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class ConsultationLanguage extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='consultation_languages';
    protected $guarded = [];
}

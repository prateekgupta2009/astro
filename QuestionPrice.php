<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class QuestionPrice extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='question_prices';
    protected $guarded = [];
}

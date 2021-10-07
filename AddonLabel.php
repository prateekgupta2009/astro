<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class AddonLabel extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='addon_labels';
    protected $guarded = [];
}

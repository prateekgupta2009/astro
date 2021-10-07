<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class ReportAddonValue extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='report_addon_values';
    protected $guarded = [];
}

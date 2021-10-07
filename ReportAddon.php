<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class ReportAddon extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='report_addons';
    protected $guarded = [];
}

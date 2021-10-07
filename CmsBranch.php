<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class CmsBranch extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection='cms_branches';
    protected $guarded = [];
}

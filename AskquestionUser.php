<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model;

class AskquestionUser extends Model
{
    protected $connection = 'mongodb';
    protected $collection='askquestion_users';
    protected $guarded = [];

    public function users(){
        return $this->belongsTo(Signupuser::class, 'user_id', '_id');
    }
}

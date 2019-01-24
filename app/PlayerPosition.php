<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PlayerPosition extends Model
{
    use Uuids, SoftDeletes;

    public $incrementing = false;
}

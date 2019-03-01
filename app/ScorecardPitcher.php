<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ScorecardPitcher extends Model
{
    use Uuids, SoftDeletes;

    public $incrementing = false;

    protected $guarded = [];
}

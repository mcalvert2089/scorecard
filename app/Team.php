<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Team extends Model
{
	use Uuids, SoftDeletes;
    public $incrementing = false;
    protected $fillable = ['name', 'manager', 'city', 'state'];
}
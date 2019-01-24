<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Team extends Model
{
	use Uuids, SoftDeletes;
    public $incrementing = false;
    protected $fillable = [ 'name', 'manager', 'city', 'state', 'user_id' ];

    public function getAll($userId) {
    	$teams = Team::where('user_id', $userId)->get();
    	return $teams;
    }
}
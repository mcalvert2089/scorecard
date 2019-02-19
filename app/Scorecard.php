<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Scorecard extends Model
{
	use Uuids, SoftDeletes;

    public $incrementing = false;

    protected $fillable = ['home_team_id', 'visiting_team_id', 'user_id', 'game_date', 'start_time'];

    public function home_team() {
    	return $this->hasOne('App\Team', 'id', 'home_team_id');
    }

    public function visiting_team() {
    	return $this->hasOne('App\Team', 'id', 'visiting_team_id');
    }
}

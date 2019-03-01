<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Scorecard extends Model
{
	use Uuids, SoftDeletes;

    public $incrementing = false;

    protected $guarded = [];


    /*** OLD RELATIONS ***/
    public function home_team() {
    	return $this->hasOne('App\Team', 'mlb_org_id', 'home_team_id');
    }

    public function visiting_team() {
    	return $this->hasOne('App\Team', 'mlb_org_id', 'visiting_team_id');
    }

    public function home_team_roster() {
    	return $this->hasMany('App\Player', 'team_id', 'home_team_id');
    }

    public function visiting_team_roster() {
    	return $this->hasMany('App\Player', 'team_id', 'visiting_team_id');
    }

    public function scorecard_roster() {
    	return $this->hasMany('App\ScorecardRoster', 'scorecard_id', 'id');
    }
}

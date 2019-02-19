<?php

namespace App;

use App\Scorecard;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Team extends Model
{
	use Uuids, SoftDeletes;
    public $incrementing = false;
    protected $fillable = [ 'name', 'manager', 'city', 'state', 'user_id' ];

    public function getRoster($team_id) {
        return $this->with('players')
                    ->whereId($team_id)
                    ->get();
    }

    public function getScorecardRosters($scorecard_id) {
    	$scorecard = Scorecard::find($scorecard_id);

    	$homeRoster = Player::with('position')
                        ->whereTeamId($scorecard->home_team_id)
                        ->orderBy('last_name')
                        ->get();
                        
    	$visitingRoster = Player::with('position')
                            ->whereTeamId($scorecard->visiting_team_id)
                            ->orderBy('last_name')
                            ->get();

    	return [ 'home_roster' => $homeRoster, 'visiting_roster' => $visitingRoster ];
    	
    }
    
    public function players() {
    	return $this->hasMany('App\Players', 'id', 'team_id');
    }
}
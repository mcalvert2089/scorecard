<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Team extends Model
{
   	use Uuids, SoftDeletes;
    
    public $incrementing = false;

    protected $guarded = [];

    public function getScorecardRosters($scorecard_id) {
        $scorecard = Scorecard::find($scorecard_id);
        $scorecardRosters = ScorecardRoster::with('player_info')->whereScorecardId($scorecard_id)->get();
        $players = Player::where('team_id', $scorecard->home_team_id)->orWhere('team_id', $scorecard->visiting_team_id)->get();

        // FULL ROSTERS
        $homeRoster = $players->filter(function($row) use($scorecard) {
            return $row->team_id == $scorecard->home_team_id;
        });

        $visitingRoster = $players->filter(function($row) use($scorecard) {
            return $row->team_id == $scorecard->visiting_team_id;
        });
        
        // SCORECARD ROSTERS
        $scorecardRosterHome = $scorecardRosters->filter(function($row) use ($scorecard) {
            return $row->team_id === $scorecard->home_team_id;
        });

        $scorecardRosterVisiting = $scorecardRosters->filter(function($row) use ($scorecard) {
            return $row->team_id === $scorecard->visiting_team_id;
        });

    	return [ 
            'home_roster' => array_values($homeRoster->toArray()), 
            'visiting_roster' => array_values($visitingRoster->toArray()),
            'home_scorecard_roster' => array_values($scorecardRosterHome->toArray()),
            'visiting_scorecard_roster' => array_values($scorecardRosterVisiting->toArray())
        ];
    	
    }
}

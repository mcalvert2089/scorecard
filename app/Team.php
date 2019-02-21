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
        $scorecardRosterPlayerIds = ScorecardRoster::whereScorecardId($scorecard_id)->pluck('player_id');

    	$homeRoster = Player::whereTeamId($scorecard->home_team_id)
                        ->orderBy('name_last')
                        ->get();
                        
    	$visitingRoster = Player::whereTeamId($scorecard->visiting_team_id)
                            ->orderBy('name_last')
                            ->get();

        $homeScorecardRoster = $homeRoster->filter(function($row) use($scorecardRosterPlayerIds) {
            return in_array($row->player_id, $scorecardRosterPlayerIds->toArray());
        });

        $visitingScorecardRoster = $visitingRoster->filter(function($row) use($scorecardRosterPlayerIds) {
            return in_array($row->player_id, $scorecardRosterPlayerIds->toArray());
        });

    	return [ 
            'home_roster' => $homeRoster, 
            'visiting_roster' => $visitingRoster,
            'home_scorecard_roster' => array_values($homeScorecardRoster->toArray()),
            'visiting_scorecard_roster' => array_values($visitingScorecardRoster->toArray()),
        ];
    	
    }
}

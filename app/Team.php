<?php

namespace App;

use App\Scorecard;
use App\ScorecardPitcher;
use App\ScorecardRoster;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Team extends Model
{
   	use Uuids, SoftDeletes;
    
    public $incrementing = false;

    protected $guarded = [];

    public function getScorecardRosters($scorecard_id) {
        $scorecard = Scorecard::find($scorecard_id);
        $pitchers = ScorecardPitcher::whereScorecardId($scorecard_id)->orderBy('scorecard_order')->get();
        $scorecardRosters = ScorecardRoster::with('player_info')->whereScorecardId($scorecard_id)->orderBy('batting_order')->get();
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

        // PITCHERS
        $homePitchers = $pitchers->filter(function($row) use ($scorecard) {
            return $row->team_id === $scorecard->home_team_id;
        });

        $visitingPitchers = $pitchers->filter(function($row) use ($scorecard) {
            return $row->team_id === $scorecard->visiting_team_id;
        });

    	return [ 
            'home_roster' => $homeRoster->values(), 
            'visiting_roster' => $visitingRoster->values(),
            'home_scorecard_roster' => $scorecardRosterHome->values(),
            'visiting_scorecard_roster' => $scorecardRosterVisiting->values(),
            'home_pitchers' => $homePitchers->values(),
            'visiting_pitchers' => $visitingPitchers->values()
        ];
    	
    }
}

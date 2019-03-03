<?php namespace App\Repositories;

use App\Scorecard;
use App\ScorecardPitcher;
use App\ScorecardRoster;
use DB;

class ScorecardRosterRepository {
	 public function store($request) {
        $scorecardId = $request->scorecard_id;

        foreach($request->scorecard_roster_home as $r) {
            ScorecardRoster::updateOrCreate(
                [ 'scorecard_id' => $scorecardId, 'player_id' =>  $r['player_id'] ],
                [
                    'scorecard_id' => $scorecardId,
                    'team_id' => $r['team_id'],
                    'player_id' => $r['player_id'],
                    'position' => $r['position'],
                    'batting_order' => $r['batting_order'] 
                ]
            );
        }

        foreach($request->scorecard_roster_visiting as $r) {
            ScorecardRoster::updateOrCreate(
                [ 'scorecard_id' => $scorecardId, 'player_id' =>  $r['player_id'] ],
                [
                    'scorecard_id' => $scorecardId,
                    'team_id' => $r['team_id'],
                    'player_id' => $r['player_id'],
                    'position' => $r['position'],
                    'batting_order' => $r['batting_order'] 
                ]
            );
        }

        if($request->home_starting_pitcher && $request->home_starting_pitcher['player_id']) {
            ScorecardPitcher::updateOrCreate(
                [ 'scorecard_id' => $scorecardId, 'team_id' => $request->home_starting_pitcher['team_id'] ],
                [ 'player_id' => $request->home_starting_pitcher['player_id'], 'scorecard_order' => 1 ]
            );
        }

        if($request->visiting_starting_pitcher && $request->visiting_starting_pitcher['player_id']) {
            ScorecardPitcher::updateOrCreate(
                [ 'scorecard_id' => $scorecardId, 'team_id' => $request->visiting_starting_pitcher['team_id'] ],
                [ 'player_id' => $request->visiting_starting_pitcher['player_id'], 'scorecard_order' => 1 ]
            );   
        }

        $scorecard = new Scorecard;
        $scorecard->where('id', $scorecardId)->update([ 'active' => $request->active ]);
    }
}
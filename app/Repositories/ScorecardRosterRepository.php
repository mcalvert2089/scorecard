<?php namespace App\Repositories;

use App\Scorecard;
use App\ScorecardRoster;
use DB;

class ScorecardRosterRepository {
	 public function store($request) {
        $scorecardId = $request->scorecard_id;
        dump($request->scorecard_roster_home);

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

        $scorecard = new Scorecard;
        $scorecard->where('id', $scorecardId)->update([ 'active' => $request->active ]);
    }
}
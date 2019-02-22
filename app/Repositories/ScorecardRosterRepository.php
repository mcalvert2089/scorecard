<?php namespace App\Repositories;

use App\Scorecard;
use App\ScorecardRoster;

class ScorecardRosterRepository {
	 public function store($request) {
        $scorecardId = $request->scorecard_id;

        foreach($request->scorecard_roster_home as $r) {
            $data['scorecard_id'] = $scorecardId;
            $data['team_id'] = $r['team_id'];
            $data['player_id'] = $r['player_id'];
            $data['position'] = $r['position'];
            $data['batting_order'] = $r['batting_order'];  

            ScorecardRoster::updateOrCreate($data, [ 'scorecard_id' => $scorecardId, 'player_id' =>  $r['player_id']]);
        }

        foreach($request->scorecard_roster_visiting as $r) {
            $data['scorecard_id'] = $scorecardId;
            $data['player_id'] = $r['player_id'];
            $data['position'] = $r['position'];
            $data['batting_order'] = $r['batting_order'];  

            ScorecardRoster::updateOrCreate($data, [ 'scorecard_id' => $scorecardId, 'player_id' =>  $r['player_id']]);
        }

        $scorecard = new Scorecard;
        $scorecard->where('id', $scorecardId)->update([ 'active' => $request->active ]);
    }
}
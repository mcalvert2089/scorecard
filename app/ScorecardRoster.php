<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ScorecardRoster extends Model
{
    use Uuids, SoftDeletes;

    public $incrementing = false;

    protected $guarded = [];

    public function scorecard() {
    	return $this->hasOne('App\Scorecard', 'id', 'scorecard_id');
    } 

    public function store($request) {
        $scorecardId = $request->scorecard_id;

        foreach($request->scorecard_roster_home as $r) {
            $data['scorecard_id'] = $scorecardId;
            $data['team_id'] = $r['team_id'];
            $data['player_id'] = $r['player_id'];
            $data['position'] = $r['position'];
            $data['batting_order'] = $r['batting_order'];  

            $this->updateOrCreate($data, [ 'scorecard_id' => $scorecardId, 'player_id' =>  $r['player_id']]);
        }

        foreach($request->scorecard_roster_visiting as $r) {
            $data['scorecard_id'] = $scorecardId;
            $data['player_id'] = $r['player_id'];
            $data['position'] = $r['position'];
            $data['batting_order'] = $r['batting_order'];  

            $this->updateOrCreate($data, [ 'scorecard_id' => $scorecardId, 'player_id' =>  $r['player_id']]);
        }

        $scorecard = new Scorecard;
        $scorecard->where('id', $scorecardId)->update([ 'active' => $request->active ]);
    }

    /*** OLD FUNCTIONS ***/
    public function getRosters($scorecard_id) {
        $records = $this->with('scorecard:id,home_team_id,visiting_team_id')
                    ->whereScorecardId($scorecard_id)
                    ->get();

        $home = $records->filter(function($row){
            return $row->team_id == $row->scorecard->home_team_id;
        });

        $visiting = $records->filter(function($row){
            return $row->team_id == $row->scorecard->visiting_team_id;
        });

        return [ 'home_roster' => $home, 'visiting_roster' => $visiting ];
    }
}

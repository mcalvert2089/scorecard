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

    function player_info() {
        return $this->hasOne('App\Player', 'player_id', 'player_id');
    }

    function position_info() {
        return $this->hasOne('App\Position', 'position_id', 'position');
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

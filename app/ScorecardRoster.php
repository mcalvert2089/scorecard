<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ScorecardRoster extends Model
{
    use Uuids, SoftDeletes;

    public $incrementing = false;

    protected $fillable = [ 'scorecard_id', 'team_id', 'player_id', 'position', 'batting_order', 'position_order' ]; 
}

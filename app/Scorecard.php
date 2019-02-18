<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Scorecard extends Model
{
	use Uuids, SoftDeletes;

    public $incrementing = false;
    
    protected $fillable = [ 'home_team_id', 'visiting_team_id', 'user_id', 'game_timestamp' ];
}

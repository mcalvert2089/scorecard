<?php

namespace App;

use App\Player;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;

class Player extends Model
{
    use Uuids, SoftDeletes;
    
    public $incrementing = false;

    protected $guarded = [];

    public function team() {
    	return $this->hasOne('App\Team', 'id', 'team_id');
    }
}

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

    protected $fillable = [ 'first_name', 'last_name', 'team_id', 'user_id', 'bats', 'throws' ];
}

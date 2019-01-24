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

    public function createPlayer($request, $user_id) {
		$data = [];
		$data['first_name'] = $request->first_name;
		$data['last_name'] = $request->last_name;
		$data['team_id'] = $request->team_id;
    	$data['user_id'] = $user_id;
    	$data['bats'] = $request->bats;
    	$data['throws'] = $request->throws;
    	
        Player::create($data);
    }

    public function updatePlayer($request, $id) {
    	$player = Player::find($id);

        return tap($player)->update([
		        	'first_name' => $request->first_name,
			    	'last_name' => $request->last_name,
			    	'team_id' => $request->team_id,
			    	'user_id' => $request->user_id,
			    	'bats' => $request->bats,
			    	'throws' => $request->throws
		        ]);
    }
}

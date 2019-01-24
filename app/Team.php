<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Team extends Model
{
	use Uuids, SoftDeletes;
    public $incrementing = false;
    protected $guarded = [];

    public function getAll($userId) {
    	$teams = Team::where('user_id', $userId)->get();
    	return $teams;
    }

    public function createTeam($request, $user_id) {
		$data = [];

        $data['name'] = $request->name;
        $data['manager'] = $request->manager;
        $data['city'] = $request->city;
        $data['state'] = $request->state;
        $data['user_id'] = $user_id;

        Team::create($data);
    }

    public function updateTeam(Team $team, $request) {
        return tap($team)->update([
                'name' => $request->name,
                'manager' => $request->manager,
                'city' => $request->city,
                'state' => $request->state,
            ]);
    }
}
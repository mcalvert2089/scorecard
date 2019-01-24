<?php

namespace App\Http\Controllers;

use App\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
	private $team;

	public function __construct() {
		$this->team = new Team;
	}

	public function index() {
		$userId = auth()->user()->id;
		return $this->team->getAll($userId);
	}

    public function show(Request $request, $id) {
    	return Team::find($id);
    }

    public function store(Request $request) {
        $user_id = auth()->user()->id;
    	$this->team->createTeam($request, $user_id);
    }

    public function update(Request $request, $id) {
        $team = Team::find($id);
        return $this->team->updateTeam($team, $request);
    }

    public function destroy($id) {
        Team::whereId($id)->delete();
    }
}
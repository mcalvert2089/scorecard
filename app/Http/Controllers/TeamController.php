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

    public function store(Request $request) {
    	$this->team->createTeam($request);
    }

    public function update(Request $request, $id) {
        $this->team->updateTeam($request, $id);
    }
}
<?php

namespace App\Http\Controllers;

use App\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
	public function __construct() {
		$this->team = new Team;
	}

	public function index() {
		return $this->team->all();
	}

    public function store(Request $request) {
    	$this->team->create($request->only($this->team->getModel()->fillable));
    }

    public function update(Request $request) {
    	$this->team->update($request, $request->id);
    }
}
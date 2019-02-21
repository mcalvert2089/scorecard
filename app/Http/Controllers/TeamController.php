<?php

namespace App\Http\Controllers;

use App\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function index() {
    	return Team::orderBy('name_display_long')->get();
    }
}

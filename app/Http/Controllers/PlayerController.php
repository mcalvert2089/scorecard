<?php

namespace App\Http\Controllers;

use App\Player;
use Illuminate\Http\Request;
use Exception;

class PlayerController extends Controller
{
    private $player;

	public function __construct() {
		$this->player = new Player;
	}

	public function index() {
		$userId = auth()->user()->id;
		return $this->player->getAll($userId);
	}

    public function show(Request $request, $id) {
    	return Player::find($id);
    }

    public function store(Request $request) {
    	$user_id = auth()->user()->id;
    	$this->player->createPlayer($request, $user_id);
    }

    public function update(Request $request, $id) {
    	// TO-DO: re-instate ID check once roles have been added.
    	// if($id !== auth()->user()->id) {
    	// 	throw new Exception('User cannot edit this player!');
    	// }

        return $this->player->updatePlayer($request, $id);
    }

    public function destroy($id) {
    	Player::whereId($id)->delete();
    }
}

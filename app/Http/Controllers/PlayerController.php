<?php

namespace App\Http\Controllers;

use App\Player;
use App\Team;
use App\Repositories\Repository;
use Illuminate\Http\Request;

class PlayerController extends Controller
{
    protected $model;

    public function __construct(Player $player) {
        $this->model = new Repository($player);
    }

    public function index() {
        return Player::with('position', 'team')
                ->whereUserId(auth()->user()->id)
                ->orderBy('last_name')
                ->get();
    }

    public function show($id) {
        return Player::with('position', 'team:id,city,name')->whereId($id)->first();
    }

    public function store(Request $request) {
        $data = $request->only($this->model->getModel()->fillable);
        $data['user_id'] = auth()->user()->id;
        return $this->model->create($data);
    }

    public function update(Request $request, $id) {
        $this->model->update($request->only($this->model->getModel()->fillable), $id);
        return Player::with('position', 'team:id,city,name')->whereId($id)->first();
    }

    public function destroy($id) {
        $this->model->delete($id);
    }
}
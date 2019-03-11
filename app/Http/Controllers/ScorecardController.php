<?php

namespace App\Http\Controllers;

use App\Scorecard;
use App\Team;
use App\Repositories\Repository;
use Illuminate\Http\Request;

class ScorecardController extends Controller
{
    protected $model;

    public function __construct(Scorecard $scorecard) {
        $this->model = new Repository($scorecard);
    }

    public function index() {
        return Scorecard::with([ 'home_team', 'visiting_team' ])
                ->whereUserId(auth()->user()->id)
                ->orderBy('game_date', 'desc')
                ->get();
    }

    public function show($id) {
        return $this->model->show($id);
    }

    public function store(Request $request) {
        $data = $request->only($this->model->getModel()->fillable);
        $data['game_date'] = date('Y-m-d', strtotime($request->game_date));
        $data['user_id'] = auth()->user()->id;
        return $this->model->create($data);
    }

    public function update(Request $request, $id) {
        $data = $this->model->update($request->only($this->model->getModel()->fillable), $id);
        return $this->model->update($data, $id);
    }

    public function destroy($id) {
        Scorecard::delete($id);
    }
}
<?php

namespace App\Http\Controllers;

use App\Repositories\Repository;
use App\Team;
use Illuminate\Http\Request;

class TeamController__CUSTOM extends Controller
{
    protected $model;

    public function __construct(Team $team) {
        $this->model = new Repository($team);
    }

    public function index() {
        return $this->model->allByUserId(auth()->user()->id, 'name');
    }

    public function show($id) {
        return Team::find($id);
    }

    public function store(Request $request) {
        $data = $request->only($this->model->getModel()->fillable);
        $data['user_id'] = auth()->user()->id;
        $this->model->create($data);
    }

    public function update(Request $request, $id) {
        $this->model->update($request->only($this->model->getModel()->fillable), $id);
         return Team::find($id);
    }

    public function destroy($id) {
        $this->model->delete($id);
    }

    public function getRoster($team_id) {
        $team = new Team;
        return $team->getRoster($team_id);
    }

    public function getScorecardRosters($scorecard_id) {
        $team = new Team;
        return $team->getScorecardRosters($scorecard_id);
    }
}
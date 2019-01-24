<?php

namespace App\Http\Controllers;

use App\Repositories\Repository;
use App\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    protected $model;

    public function __construct(Team $team) {
        $this->model = new Repository($team);
    }

    public function index() {
        return $this->model->allByUserId(auth()->user()->id);
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
    }

    public function destroy($id) {
        $this->model->delete($id);
    }
}
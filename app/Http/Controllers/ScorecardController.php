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
        return Scorecard::whereUserId(auth()->user()->id)
                ->orderBy('game_timestamp')
                ->get();
    }

    public function show($id) {
        return Scorecard::whereId($id)->first();
    }

    public function store(Request $request) {
        $data = $request->only($this->model->getModel()->fillable);
        $data['game_date'] = date('Y-m-d', strtotime($request->game_date));
        $data['user_id'] = auth()->user()->id;
        return $this->model->create($data);
    }

    public function update(Request $request, $id) {
        $this->model->update($request->only($this->model->getModel()->fillable), $id);
        return Scorecard::whereId($id)->first();
    }

    public function destroy($id) {
        Scorecard::delete($id);
    }
}
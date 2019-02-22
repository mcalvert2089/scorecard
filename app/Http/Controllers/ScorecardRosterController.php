<?php

namespace App\Http\Controllers;

use App\Repositories\Repository;
use App\Repositories\ScorecardRosterRepository;
use App\ScorecardRoster;
use App\Team;
use Illuminate\Http\Request;

class ScorecardRosterController extends Controller
{
    protected $model;

    public function __construct(ScorecardRoster $roster) {
        $this->model = new Repository($roster);
    }

    public function index() {
        return ScorecardRoster::whereUserId(auth()->user()->id)
                ->orderBy('batting_order')
                ->get();
    }

    public function show($id) {
        $records = ScorecardRoster::whereId($id)->first();
    }

    public function store(Request $request) {
        $repository = new ScorecardRosterRepository;
        return $repository->store($request);
    }

    public function update(Request $request, $id) {
        $this->model->update($request->only($this->model->getModel()->fillable), $id);
        return ScorecardRoster::whereId($id)->first();
    }

    public function destroy($id) {
        $this->model->delete($id);
    }

    public function getRosters($scorecard_id) {
        $roster = new ScorecardRoster;
        return $roster->getRosters($scorecard_id);
    }
}
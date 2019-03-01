<?php

namespace App\Http\Controllers;

use App\Position;
use App\Repositories\Repository;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    protected $model;

    public function __construct(Position $player) {
        $this->model = new Repository($player);
    }

    public function index() {
        return Position::select('id', 'name', 'position_id', 'position_txt')->orderBy('position_order')->get();
    }

    public function show($id) {
        return $this->model->whereId($id)->get();
    }

    public function store(Request $request) {
        $data = $request->only($this->model->getModel()->fillable);
        $this->model->create($data);
    }

    public function update(Request $request, $id) {
        $this->model->update($request->only($this->model->getModel()->fillable), $id);
    }

    public function destroy($id) {
        $this->model->delete($id);
    }
}

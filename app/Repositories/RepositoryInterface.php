<?php namespace App\Repositories;

interface RepositoryInterface
{
    public function all();

    public function allByUserId($id);

    public function create(array $data);

    public function update(array $data, $id);

    public function delete($id);

    public function show($id);

    public function getModel();

    public function setModel($model);

    public function with($relations);
}
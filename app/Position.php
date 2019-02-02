<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Position extends Model
{
    use Uuids, SoftDeletes;

    public $incrementing = false;

    protected $fillable = [  'name', 'abbreviation', 'pos_number' ];

    public function getPositions() {
    	return $this->all();
    }
}

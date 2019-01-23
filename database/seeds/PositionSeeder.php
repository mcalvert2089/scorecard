<?php

use App\Position;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	Position::create([
    		'name' => 'Pitcher',
    		'abbreviation' => 'P',
    		'pos_number' => 1
    	]);

    	Position::create([
    		'name' => 'Catcher',
    		'abbreviation' => 'C',
    		'pos_number' => 2
    	]);

    	Position::create([
    		'name' => 'First Base',
    		'abbreviation' => '1B',
    		'pos_number' => 3
    	]);

    	Position::create([
    		'name' => 'Second Base',
    		'abbreviation' => '2B',
    		'pos_number' => 4
    	]);

    	Position::create([
    		'name' => 'Third Base',
    		'abbreviation' => '3B',
    		'pos_number' => 5
    	]);

    	Position::create([
    		'name' => 'Shortstop',
    		'abbreviation' => 'SS',
    		'pos_number' => 6
    	]);

    	Position::create([
    		'name' => 'Left Field',
    		'abbreviation' => 'LF',
    		'pos_number' => 7
    	]);

    	Position::create([
    		'name' => 'Center Field',
    		'abbreviation' => 'CF',
    		'pos_number' => 8
    	]);

    	Position::create([
    		'name' => 'Right Field',
    		'abbreviation' => 'RF',
    		'pos_number' => 9
    	]);
    }
}

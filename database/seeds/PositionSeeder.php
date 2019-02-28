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
    		'position_txt' => 'P',
    		'position_id' => 1,
            'position_order' => 10
    	]);

    	Position::create([
    		'name' => 'Catcher',
    		'position_txt' => 'C',
    		'position_id' => 2,
            'position_order' => 1
    	]);

    	Position::create([
    		'name' => 'First Base',
    		'position_txt' => '1B',
    		'position_id' => 3,
            'position_order' => 2
    	]);

    	Position::create([
    		'name' => 'Second Base',
    		'position_txt' => '2B',
    		'position_id' => 4,
            'position_order' => 3
    	]);

    	Position::create([
    		'name' => 'Third Base',
    		'position_txt' => '3B',
    		'position_id' => 5,
            'position_order' => 4
    	]);

    	Position::create([
    		'name' => 'Shortstop',
    		'position_txt' => 'SS',
    		'position_id' => 6,
            'position_order' => 5
    	]);

    	Position::create([
    		'name' => 'Left Field',
    		'position_txt' => 'LF',
    		'position_id' => 7,
            'position_order' => 6
    	]);

    	Position::create([
    		'name' => 'Center Field',
    		'position_txt' => 'CF',
    		'position_id' => 8,
            'position_order' => 7
    	]);

    	Position::create([
    		'name' => 'Right Field',
    		'position_txt' => 'RF',
    		'position_id' => 9,
            'position_order' => 8
    	]);

        Position::create([
            'name' => 'Designated Hitter',
            'position_txt' => 'DH',
            'position_id' => 'D',
            'position_order' => 9
        ]);
    }
}

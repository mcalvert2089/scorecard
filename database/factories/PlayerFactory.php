<?php

use Faker\Generator as Faker;

$factory->define(App\Player::class, function (Faker $faker) {
    return [
        'first_name' => $faker->firstName,
    	'last_name' => $faker->lastName,
    	'team_id' => $faker->uuid,
    	'primary_position_id' => $faker->uuid,
    	'user_id' => $faker->uuid,
    	'bats' => 'R',
    	'throws' => 'R'
    ];
});

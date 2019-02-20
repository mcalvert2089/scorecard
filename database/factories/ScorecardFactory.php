<?php

use Faker\Generator as Faker;

$factory->define(App\Scorecard::class, function (Faker $faker) {
    return [
        'home_team_id' => $faker->uuid,
        'visiting_team_id' => $faker->uuid,
        'user_id' => $faker->uuid,
        'game_date' => $faker->date('Y-m-d'),
        'start_time' => $faker->time('H:i A'),
        'end_time' => null
    ];
});

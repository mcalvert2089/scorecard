<?php

use Faker\Generator as Faker;

$factory->define(App\ScorecardRoster::class, function (Faker $faker) {
    return [
        'scorecard_id' => $faker->uuid,
        'team_id' => $faker->uuid,
        'player_id' => $faker->uuid,
        'position' => $faker->uuid,
        'batting_order' => 1,
        'position_order' => 1
    ];
});

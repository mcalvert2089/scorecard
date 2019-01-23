<?php

use Faker\Generator as Faker;

$factory->define(App\Team::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'manager' => $faker->name,
        'user_id' => $faker->uuid,
        'city' => $faker->city,
        'state' => $faker->state,
    ];
});

<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateScorecardPitchersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scorecard_pitchers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('scorecard_id');
            $table->integer('player_id');
            $table->integer('team_id');
            $table->integer('scorecard_order');
            $table->integer('decision')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('scorecard_pitchers');
    }
}

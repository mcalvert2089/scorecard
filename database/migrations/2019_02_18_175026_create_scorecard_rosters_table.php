<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateScorecardRostersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scorecard_rosters', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('scorecard_id');
            $table->uuid('team_id');
            $table->uuid('player_id');
            $table->uuid('position');
            $table->integer('batting_order');
            $table->integer('position_order');
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
        Schema::dropIfExists('scorecard_rosters');
    }
}

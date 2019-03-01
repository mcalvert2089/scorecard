<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterScorecardRostersTableChangeIdsToInteger extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('scorecard_rosters', function (Blueprint $table) {
            $table->integer('team_id')->change();
            $table->integer('player_id')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('scorecard_rosters', function (Blueprint $table) {
            $table->char('team_id', 36)->change();
            $table->char('player_id', 36)->change();
        });
    }
}

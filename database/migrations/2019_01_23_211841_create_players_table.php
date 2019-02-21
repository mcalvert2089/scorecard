<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlayersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('players', function (Blueprint $table) {
            $table->primary('id');
            $table->uuid('id');
            $table->string('name_first');
            $table->string('name_last');
            $table->string('name_full');
            $table->string('name_display_first_last');
            $table->string('name_display_last_first');
            $table->string('name_use');
            $table->integer('player_id');
            $table->integer('team_id');
            $table->char('jersey_number', 3)->nullable();
            $table->char('primary_position', 1);
            $table->char('position_txt', 2);
            $table->char('bats', 1);
            $table->char('throws', 1);
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
        Schema::dropIfExists('players');
    }
}

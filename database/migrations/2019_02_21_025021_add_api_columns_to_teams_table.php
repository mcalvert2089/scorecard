<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddApiColumnsToTeamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('teams', function (Blueprint $table) {
            $table->string('name_short')->after('name')->nullable();
            $table->string('mlb_org_short')->after('name_short')->nullable();
            $table->string('mlb_org_brief')->after('mlb_org_short')->nullable();
            $table->string('name_display_short')->after('mlb_org_brief')->nullable();
            $table->string('mlb_org_abbrev')->after('name_display_short')->nullable();
            $table->string('name_display_long')->after('mlb_org_abbrev')->nullable();
            $table->integer('mlb_org_id')->after('name_display_long')->nullable();
            $table->integer('league_id')->after('mlb_org_id')->nullable();
            $table->integer('division_id')->after('league_id')->nullable();
            $table->string('venue_short')->after('division_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('teams', function (Blueprint $table) {
            $table->dropColumn('name_short');
            $table->dropColumn('mlb_org_short');
            $table->dropColumn('mlb_org_brief');
            $table->dropColumn('name_display_short');
            $table->dropColumn('mlb_org_abbrev');
            $table->dropColumn('name_display_long');
            $table->dropColumn('mlb_org_id');
            $table->dropColumn('league_id');
            $table->dropColumn('division_id');
            $table->dropColumn('venue_short');
        });
    }
}

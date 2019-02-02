<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterOauthTablesChangeToUuids extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('oauth_access_tokens', function (Blueprint $table) {
            DB::statement('ALTER TABLE oauth_access_tokens MODIFY user_id char(36);');
        });

        Schema::table('oauth_auth_codes', function (Blueprint $table) {
            DB::statement('ALTER TABLE oauth_auth_codes MODIFY user_id char(36);');
        });

        Schema::table('oauth_clients', function (Blueprint $table) {
            DB::statement('ALTER TABLE oauth_clients MODIFY user_id char(36);');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('oauth_access_tokens', function (Blueprint $table) {
            $table->integer('user_id')->change();
        });

        Schema::table('oauth_auth_codes', function (Blueprint $table) {
            $table->integer('user_id')->change();
        });

        Schema::table('oauth_clients', function (Blueprint $table) {
            $table->integer('user_id')->change();
        });
    }
}
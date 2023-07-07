<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('partylists', function (Blueprint $table) {
            $table->id();
            $table->string("partylistName")->unique();
            $table->string("partylistAbrv");
            $table->foreignIdFor(\App\Models\Election::class, 'electionID');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('partylists');
    }
};

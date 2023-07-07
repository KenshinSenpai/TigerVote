<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('voter', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\User::class, 'userID');
            $table->string('department');
            $table->integer('yearLevel');
            $table->foreignIdFor(\App\Models\Election::class, 'electionID');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voter');
    }
};

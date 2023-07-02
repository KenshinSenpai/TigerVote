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
        Schema::create('election', function (Blueprint $table) {
            $table->id();
            $table->string('electionName');
            $table->foreignIdFor(\App\Models\Department::class,'departmentID');
            $table->foreignIdFor(\App\Models\YearLevel::class,'yearLevelID');
            $table->dateTime('electionStart');
            $table->dateTime('electionEnd');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('election');
    }
};

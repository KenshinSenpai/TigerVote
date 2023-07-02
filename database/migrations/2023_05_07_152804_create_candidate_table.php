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
        Schema::create('candidate', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\User::class,'userID');
            $table->foreignIdFor(\App\Models\Department::class,'departmentID');
            $table->foreignIdFor(\App\Models\YearLevel::class,'yearLevelID');
            $table->foreignIdFor(\App\Models\Position::class,'positionID');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidate');
    }
};

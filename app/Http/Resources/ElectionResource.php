<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ElectionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // $electionStart = Carbon::parse($this->electionStart);
        // $electionEnd = Carbon::parse($this->electionEnd);

        // $startDate = $electionStart->toDateString()->format('Y-m-d');
        // $startTime = $electionStart->toTimeString()->format('H:i:s');

        // $endDate = $electionEnd->toDateString();
        // $endTime = $electionEnd->toTimeString();

        return [
            'id' => $this->id,
            'electionName' => $this->electionName,
            'departmentID' => $this->departmentID,
            'yearLevelID' => $this->yearLevelID,
            'startDate' => (new \DateTime($this->electionStart))->format('Y-m-d'),
            'startTime' => (new \DateTime($this->electionStart))->format('H:i:s'),
            'endDate' => (new \DateTime($this->electionEnd))->format('Y-m-d'),
            'endTime' => (new \DateTime($this->electionEnd))->format('H:i:s'),
            
        ];
    }
}

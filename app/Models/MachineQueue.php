<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MachineQueue extends Model
{
    use HasFactory;
    protected $table = "machine_queue";
    protected $fillable = [
        'id_machine_queue',
        'id_machine',
        'queue_number',
        'id_task',
        'id_staff',
        'status_work',
        'id_activity',
        'id_activity_downtime',
        'id_activity_rework'
    ];
    public $timestamps = false;
}

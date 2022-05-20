<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;
    protected $table = 'activity';
    protected $fillable = [
        'id_activity',
        'id_task',
        'id_job',
        'operation',
        'id_machine',
        'id_staff',
        'shif',
        'status_work',
        'id_break',
        'date_eff',
        'time_start',
        'time_close',
        'total_work',
        'total_food',
        'total_toilet',
        'no_send',
        'no_pulse1',
        'no_pulse2',
        'no_pulse3',
        'num_repeat',
        'run_time_actual'
    ];
    public $timestamps = false;
}

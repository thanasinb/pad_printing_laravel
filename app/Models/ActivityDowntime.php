<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityDowntime extends Model
{
    use HasFactory;
    protected $table = 'activity_downtime';
    protected $fillable = [
        'id_activity_downtime',
        'id_task',
        'id_machine',
        'id_staff',
        'id_comment',
        'shif',
        'id_code_downtime',
        'status_downtime',
        'date_eff',
        'time_start',
        'time_close',
        'total_work',
        'comment'
    ];
    public $timestamps = false;
}

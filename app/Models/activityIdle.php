<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityIdle extends Model
{
    use HasFactory;
    protected $table = 'activity_idle';
    protected $fillable = [
        'id_activity',
        'id_machine',
        'id_comment',
        'status_work',
        'time_start',
        'time_end',
        'duration'
    ];
    public $timestamps = false;
}

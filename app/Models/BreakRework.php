<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BreakRework extends Model
{
    use HasFactory;
    protected $table = 'break_rework';
    protected $fillable = [
        'id_break',
        'id_activity',
        'id_staff',
        'id_comment',
        'break_code',
        'break_start',
        'break_stop',
        'break_duration',
        'comment'
    ];
    public $timestamps = false;
}

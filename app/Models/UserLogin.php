<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLogin extends Model
{
    use HasFactory;
    protected $table = "login_user";
    protected $fillable = [
        'user',
        'password',
        'role',
        'datetime_create',
    ];
    public $timestamps = false;
}

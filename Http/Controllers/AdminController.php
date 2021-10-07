<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function __invoke(Request $request){
        
    }
    public function index(){
        return view('admin.login');
    }
}

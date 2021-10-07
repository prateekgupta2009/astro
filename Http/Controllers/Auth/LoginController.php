<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Session;
use Illuminate\Support\Facades\Crypt;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function login(Request $request)
    {
        $this->validateLogin($request);
        // $user_type = $request->role;
        $remember_me = $request->has('remember_me') ? true : false;
       // if($user_type=='5f478def2756ec3ba46610cc'){
       //      $checkUser= \App\User::where('email',$request->email)->where('role',$user_type)->where('status','1')->first();
       //     if($checkUser){
       //         Session::put('email', $request->email);
               
             //   $data["client_name"] = "Skf";
             //   $data["subject"] = 'OTP Verification';
             //   $data["otp"] = $this->number();
             //   $data["email"] = $request->email;
               
             //  \App\User::where('email',$request->email)->update(['otp'=>$data["otp"]]);
               
             // \Mail::send('emails.EmailOtp', $data, function($message)use($data) {
                 
             //  $message->to($data['email']);
             //         $message->from('tenders@skf.com');   
             //        $message->subject($data["subject"]);
             //   });
       //         return redirect('email-verify')->with('success', 'Please check your email and verify otp');
               
       //     }else{
       //          return redirect()->back()->with('message', 'Invalid Credentials or account is disabled'); 
       //     }
       // }else{
             if (Auth::attempt(['email' => $request->email, 'password' => $request->password, 'status' => '1'], $remember_me)) {
            //$url = $this->redirectTo();
         return redirect('/home');
        } else {
            return redirect()->back()->with('message', 'Invalid Credentials or account is disabled'); 
        } 
      // }
    }

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
}

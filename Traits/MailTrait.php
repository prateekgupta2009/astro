<?php

namespace App\Traits;
use Illuminate\Http\Request;
use App\Models\ShippingModel;
use Mail;
use Flash;
use Response;
use Auth;
use Carbon\Carbon;

trait MailTrait
{
    public function orderMail($data, $status){
        // dd($data);
        Mail::send('emails.order_status_mail', ['order' => $data, 'status' => $status], function($message) use ($data, $status) {
            $message->to($data['orderDetails']->users->signupEmail)->subject('Order has been '.$status.' successfully form Astrosarathi');
        });
    }

    public function questionReplyMail($data){
        // dd($data);
        Mail::send('emails.question_reply_mail', ['data' => $data], function($message) use ($data) {
            $message->to($data->email)->subject('Question Reply[Astrosarathi]');
        });
    }
}

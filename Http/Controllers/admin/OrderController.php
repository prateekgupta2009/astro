<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\EstoreCreateOrder;
use App\EstoreOrderDetail;
use App\OnlinepujaCreateOrder;
use App\OnlinepujaOrderDetail;
use App\Traits\MailTrait;

class OrderController extends Controller
{
    use MailTrait;

    public function estoreOrders(Request $request){
        $query = EstoreCreateOrder::with(['users', 'address', 'items']);
        if(isset($request->search_key) && ($request->search_key!='')) {
            $query->where('currentorederId', $request->search_key);
        }
         if(isset($request->status) && ($request->status!='')) {
            $query->where('status', $request->status);
        }
        $data['orders'] = $query->get();
        return view('admin.orders.estore_order')->with($data);
    }

    public function estoreOrderDetails($id, Request $request){
        // $data['orderDetails'] = EstoreOrderDetail::where('order_id', $id)->get();
        $data['orderDetails'] = EstoreCreateOrder::with(['users', 'address', 'items'])->where('_id', $id)->first();
        // dd($data['orderDetails']);
        return view('admin.orders.estore_order_details')->with($data);
    }

    public function estoreChangeStatus(Request $request){
        // dd($request->all());
        if(is_array($request->order_id)){
            foreach($request->order_id as $order_id){
                $data['orderDetails'] = EstoreCreateOrder::with(['users', 'address', 'payment', 'items'])->where('_id', $order_id)->first();
                $sucess= EstoreCreateOrder::where('_id',$order_id)->update(['status'=>$request->status]);
                if($request->status == '2'){
                    $status = 'Confirmed';
                }else if($request->status == '3'){
                    $status = 'Dispatched';
                }else if($request->status == '4'){
                    $status = 'Delivered';
                }else if($request->status == '5'){
                    $status = 'Undelivered';
                }else if($request->status == '6'){
                    $status = 'Cancelled';
                }
                $this->orderMail($data, $status);
            }
        }else{
            $data['orderDetails'] = EstoreCreateOrder::with(['users', 'address', 'payment', 'items'])->where('_id', $request->order_id)->first();
                $sucess= EstoreCreateOrder::where('_id',$request->order_id)->update(['status'=>$request->status]);
                if($request->status == '2'){
                    $status = 'Confirmed';
                }else if($request->status == '3'){
                    $status = 'Dispatched';
                }else if($request->status == '4'){
                    $status = 'Delivered';
                }else if($request->status == '5'){
                    $status = 'Undelivered';
                }else if($request->status == '6'){
                    $status = 'Cancelled';
                }
                $this->orderMail($data, $status);
        }
        if($sucess){
            echo 'yes';
        }
    }

    public function onlinepoojaOrders(Request $request){
        $query = OnlinepujaCreateOrder::with(['users', 'address', 'items']);
        if(isset($request->search_key) && ($request->search_key!='')) {
            $query->where('currentorederId', $request->search_key);
        }
        if(isset($request->status) && ($request->status!='')) {
            $query->where('status', $request->status);
        }
        $data['orders'] = $query->get();
        return view('admin.orders.onlinepooja_order')->with($data);
    }

    public function onlinepoojaOrderDetails($id, Request $request){
        $data['orderDetails'] = OnlinepujaCreateOrder::with(['users', 'address', 'items'])->where('_id', $id)->first();
        return view('admin.orders.onlinepooja_order_details')->with($data);
    }

    public function onlinepoojaChangeStatus(Request $request){
        if(is_array($request->order_id)){
            foreach($request->order_id as $order_id){
                $sucess= OnlinepujaCreateOrder::where('_id',$order_id)->update(['status'=>$request->status]);
                $data['orderDetails'] = OnlinepujaCreateOrder::with(['users', 'address', 'payment', 'items'])->where('_id', $order_id)->first();
                if($request->status == '2'){
                    $status = 'Confirmed';
                }else if($request->status == '3'){
                    $status = 'Dispatched';
                }else if($request->status == '4'){
                    $status = 'Delivered';
                }else if($request->status == '5'){
                    $status = 'Undelivered';
                }else if($request->status == '6'){
                    $status = 'Cancelled';
                }
                $this->orderMail($data, $status);
            }
        }else{
            $sucess= OnlinepujaCreateOrder::where('_id',$request->order_id)->update(['status'=>$request->status]);
            $data['orderDetails'] = OnlinepujaCreateOrder::with(['users', 'address', 'payment', 'items'])->where('_id', $request->order_id)->first();
            if($request->status == '2'){
                $status = 'Confirmed';
            }else if($request->status == '3'){
                $status = 'Dispatched';
            }else if($request->status == '4'){
                $status = 'Delivered';
            }else if($request->status == '5'){
                $status = 'Undelivered';
            }else if($request->status == '6'){
                $status = 'Cancelled';
            }
            $this->orderMail($data, $status);
        }
        if($sucess){
            echo 'yes';
        }
    }
}

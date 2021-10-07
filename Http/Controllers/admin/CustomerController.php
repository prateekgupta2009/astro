<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use DB;
use Hash;
use Validator;
use App\Customer;
use App\Country;
use App\State;

class CustomerController extends Controller
{
    public function index(Request $request){
        $data = Customer::query();
        if ((isset($request->search_name) && $request->search_name != '') || (isset($request->search_phone) && $request->search_phone != '') || (isset($request->search_email) && $request->search_email != '')) {
            $data->where(function ($qry) use($request) {
                $qry->where('first_name', 'like', '%' . $request->search_name . '%')
                		->orWhere('last_name', 'like', '%' . $request->search_name . '%')
                        ->orWhere('mobileNo', 'like', '%' . $request->search_phone . '%')
                        ->orWhere('signupEmail', 'like', '%' . $request->search_email . '%');
            });
        }
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        if(isset($request->gender) && ($request->gender!='')) {
            $data->where('gender', $request->gender);
        }
        $customers = $data->orderBy('createdOn','DESC')->get();
        return view('admin.customers.index', compact('customers'));
    }

    public function create(){
    	$countries = Country::all();
        return view('admin.customers.create', compact('countries'));
    }

    public function store(Request $request){
        if(isset($request->draft) && $request->draft == 'Draft'){
            $request->validate([
                'first_name' => 'required',
                'last_name' => 'required',
                'signupEmail' => 'required|email|unique:signupusers',
            ], [
                'first_name.required' => 'The First name field is required.',
                'last_name.required' => 'The Last name field is required.',
            ]);
        }else{
            $request->validate([
                'first_name' => 'required|max:150',
                'last_name' => 'required|max:150',
                'gender' => 'required',
                'dob' => 'required',
                'signupEmail' => 'required|email|unique:signupusers',
                'mobileNo' => 'required|digits:10',            
                'address' => 'required|max:500',
                'country_id' => 'required|max:125',
                'state_id' => 'required|max:125',
                'city' => 'required|max:125',
                'status' => 'required',
                'signupPassword' => 'required|same:confirm-password',
            ]);
        }
        $input = $request->all();
        unset($input['draft']);
        if ($request->file()) {
            $fileName = time() . '_' . $request->file->getClientOriginalName();
            $filePath = $request->file('file')->storeAs('customer_image', $fileName, 'public');
        }
        
       	$password = Hash::make($request->signupPassword);
       	$input['signupPassword'] = $password;
       	$input['image'] = isset($fileName) && $fileName!=''?$fileName:null;
        $input['image_path'] = isset($filePath) && $filePath!=''?'/storage/' . $filePath:null;
        $input['created_by'] = $request->user()->id;
        $input['save_status'] = isset($request->draft)?strtolower($request->draft):'published';

        $customers = Customer::create($input);

        $lastInsertedId= $customers->_id;
        
        if(isset($request->draft)){
            return redirect('admin/customers/'.$lastInsertedId.'/edit')->with('success','Customer saved successfully');
        }else{
            return redirect()->route('admin.customers.index')
                        ->with('success','Customer created successfully');
        }
    }

    public function show($id)
    {
        $customers = Customer::find($id);
        return view('admin.customers.show',compact('customers'));
    }

    public function edit($id)
    {
    	$countries = Country::all();
        $customer = Customer::find($id);
        $states = State::where('country_id', $customer['country_id'])->get();
        return view('admin.customers.edit',compact('customer', 'countries', 'states'));
    }

    public function update(Request $request, $id){
    	if(isset($request->draft) && $request->draft == 'Draft'){
            $request->validate([
                'first_name' => 'required',
                'last_name' => 'required',
                'signupEmail' => 'required|email|unique:signupusers',
            ], [
                'first_name.required' => 'The First name field is required.',
                'last_name.required' => 'The Last name field is required.',
            ]);
        }else{
            $request->validate([
                'first_name' => 'required|max:150',
                'last_name' => 'required|max:150',
                'gender' => 'required',
                'dob' => 'required',
                'signupEmail' => 'required|email|unique:signupusers,'.$id,
                'mobileNo' => 'required|digits:10',            
                'address' => 'required|max:500',
                'country_id' => 'required|max:125',
                'state_id' => 'required|max:125',
                'city' => 'required|max:125',
                'status' => 'required',
                'signupPassword' => 'same:confirm-password',
            ]);
        }
        $customer = Customer::find($id);
        $input = $request->all();
        if ($request->file()) {
        	$path = str_replace('/storage', '', $customer->image_path);
	        Storage::disk('public')->delete($path);
            $fileName = time() . '_' . $request->file->getClientOriginalName();
            $filePath = $request->file('file')->storeAs('customer_image', $fileName, 'public');
        }
       
       	if(!empty($input['signupPassword'])){ 
            $input['signupPassword'] = Hash::make($input['signupPassword']);
        }else{
            $input = Arr::except($input,array('signupPassword'));    
        }

       	$input['image'] = isset($fileName) && $fileName!=''?$fileName:null;
        $input['image_path'] = isset($filePath) && $filePath!=''?'/storage/' . $filePath:null;
        $input['created_by'] = $request->user()->id;
        $input['save_status'] = isset($request->draft)?strtolower($request->draft):'published';

        $customers = $customer->update($input);
        
        if(isset($request->draft)){
            return redirect()->back()->with('success','Customer saved successfully');
        }else{
            return redirect()->route('admin.customers.index')
                        ->with('success','Customer updated successfully');
        }
    }

    public function destroy($id){
    	$customer = Customer::find($id);
    	if($customer->image_path!=null){
        	$path = str_replace('/storage', '', $customer->image_path);
            Storage::disk('public')->delete($path);
        }
    	Customer::where('_id',$id)->delete();
        return redirect()->back()->with('success','Customer deleted successfully');
    }

    public function statusChange(Request $request){
        foreach($request->customer_id as $customer_id){
            $sucess= Customer::where('_id',$customer_id)->update(['status'=>$request->status]);
        }
        if($sucess){
            echo 'yes';
        }
    }
}

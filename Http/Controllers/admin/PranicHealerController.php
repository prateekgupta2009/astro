<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;
use DB;
use Hash;
use Validator;
use App\PranicHealer;
use App\PranicHealerBankDetail;
use App\PranicPatient;
use App\ConsultationLanguage;
use App\Country;
use App\State;

class PranicHealerController extends Controller
{
    
    public function index(Request $request){
    	$data = PranicHealer::query();
        if (isset($request->search_key) && ($request->search_key != '')) {
            $data->where(function ($qry) use($request) {
                $qry->where('name', 'like', '%' . $request->search_key . '%')
                        ->orWhere('mobile', 'like', '%' . $request->search_key . '%')
                        ->orWhere('email', 'like', '%' . $request->search_key . '%');
            });
        }
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        if(isset($request->country) && ($request->country!='')) {
            $data->where('country_id', $request->country);
        }
        if(isset($request->state) && ($request->state!='')) {
            $data->where('state_id', $request->state);
        }
        if(isset($request->category) && ($request->category!='')) {
            $data->whereHas('category_filter', function($q) use($request) {
                $q->where('category_id', $request->category);
            });
        }
        if(isset($request->search_city) && ($request->search_city!='')) {
            $data->where('city', 'like', '%' . $request->search_city . '%');
        }
        if(isset($request->gender) && ($request->gender!='')) {
            $data->where('gender', $request->gender);
        }
        $pranic_healers = $data->orderBy('id','DESC')->get();
        $countries = Country::all();
        $states = State::all();
        return view('admin.pranic_healer.index', compact('pranic_healers','countries','states'));
    }
    
    public function create(){
        $countries = Country::all();
         return view('admin.pranic_healer.create',compact('countries'));
    }
 
    public function store(Request $request){
         if(isset($request->draft) && $request->draft == 'Draft'){
            $request->validate([
                'name' => 'required'
            ], [
                'name.required' => 'The full name field is required.'
            ]);
        }else{
            $request->validate([
                'salutation' => 'required',
                'name' => 'required|max:150',
                'gender' => 'required',
                'dob' => 'required',            
                'email' => 'required|email|unique:astrologers',
                'mobile' => 'required|digits:10',            
                'address' => 'required|max:500',
                'country_id' => 'required|max:125',
                'state_id' => 'required|max:125',
                'city' => 'required|max:125',
                'status' => 'required',
                'rating' => 'numeric|min:1|max:5',
                'experience' => 'numeric|min:0',
                'clients' => 'numeric|min:0',
                'password' => 'required|same:confirm-password',           
                'language' => 'required|array',
                'file' => 'required|mimes:jpeg,jpg,png|max:2048',
                'account_no' => 'integer',
                'ifsc' => 'regex:/^[A-Za-z]{4}\d{7}$/',
                'regular_price_inr' => 'required|numeric|min:0',
                'regular_price_usd' => 'required|numeric|min:0',
                'commission' => 'required|numeric',
            ], [
                'name.required' => 'The full name field is required.',
                'name.max' => 'The full name may not be greater than 150 characters.',
                'address.required' => 'The street address field is required.',
                'address.max' => 'The street address may not be greater than 500 characters.',
                'country_id.required' => 'The Country name field is required.',
                'state_id.required' => 'The State name field is required.',
                'city.required' => 'The City name field is required.',
                'ifsc.regex' => 'IFSC code is incorrect.',
            ]);
        }

        if ($request->file()) {
            $fileName = time() . '_' . $request->file->getClientOriginalName();
            $filePath = $request->file('file')->storeAs('pranic_healer_image', $fileName, 'public');            
        }
        $password = Hash::make($request->password);
        $pranic_healer = PranicHealer::create([
            'salutation'=> $request->salutation,
            'name'=> $request->name,
            'gender'=> $request->gender,
            'dob'=> $request->dob,
            'email'=> $request->email,
            'mobile'=> $request->mobile,
            'password'=> $password,            
            'address'=> $request->address,
            'country_id'=> $request->country_id,
            'state_id'=> $request->state_id,
            'city'=> $request->city,
            'status'=> $request->status,
            'rating' => $request->rating,
            'experience' => $request->experience,
            'clients' => $request->clients,
            'commission' => $request->commission,
            'language' => json_encode($request->language),
            'regular_price_inr' => $request->regular_price_inr,
        	'sell_price_inr' => $request->sell_price_inr,
        	'regular_price_usd' => $request->regular_price_usd,
        	'sell_price_usd' => $request->sell_price_usd,
            'image' => isset($fileName) && $fileName!=''?$fileName:null,
            'image_path' => isset($filePath) && $filePath!=''?'/storage/' . $filePath:null,
            'about_us'=> $request->editor,
            'created_by' => $request->user()->id,
            'save_status' => isset($request->draft)?strtolower($request->draft):'published',
        ]);

         // Add Bnak Details
         $bankDetails = PranicHealerBankDetail::create([
                'pranic_healer_id'=> $pranic_healer->_id,
                'account_holder_name'=> $request->account_holder_name,
                'bank_name'=> $request->bank_name,
                'branch'=> $request->branch,
                'account_no'=> $request->account_no,
                'ifsc'=> $request->ifsc,
                'bank_address'=> $request->bank_address,
                'created_by' => $request->user()->id,
            ]);
        if(isset($request->draft)){
            return redirect('admin/pranic-healers/'.$pranic_healer->_id.'/edit')->with('success','Pranic healer saved successfully');
        }else{
            return redirect()->route('admin.pranic-healers.index')
                        ->with('success','Pranic healer created successfully');
        }
    }
    
    public function show($id){
        $pranic_healer = PranicHealer::find($id);
        $panic_healer_bank = PranicHealerBankDetail::where('pranic_healer_id',$id)->first();
        $countries = Country::all();
        $states = State::where('country_id', $pranic_healer->country_id)->get();
        return view('admin.pranic_healer.show',compact('pranic_healer', 'panic_healer_bank', 'countries', 'states'));
    }
    
    public function edit($id){
        $pranic_healer = PranicHealer::find($id);
        $panic_healer_bank = PranicHealerBankDetail::where('pranic_healer_id',$id)->first();
        $countries = Country::all();
        $states = State::where('country_id', $pranic_healer->country_id)->get();
        return view('admin.pranic_healer.edit',compact('pranic_healer', 'panic_healer_bank', 'countries', 'states'));
    }
    
    public function update(Request $request, $id){
        if(isset($request->draft) && $request->draft == 'Draft'){
            $request->validate([
                'name' => 'required'
            ], [
                'name.required' => 'The Product name field is required.'
            ]);
        }else{
            $request->validate([
                'salutation' => 'required',
                'name' => 'required|max:150',
                'gender' => 'required',
                'dob' => 'required',            
                'email' => 'required|email|unique:pranic_healers,'.$id,
                'mobile' => 'required|digits:10',            
                'address' => 'required|max:500',
                'country_id' => 'required|max:125',
                'state_id' => 'required|max:125',
                'city' => 'required|max:125',
                'status' => 'required',
                'rating' => 'numeric|min:1|max:5',
                'experience' => 'numeric|min:0',
                'clients' => 'numeric|min:0',
                'password' => 'same:confirm-password',           
                'language' => 'required|array',
                'account_no' => 'integer',
                'ifsc' => 'regex:/^[A-Za-z]{4}\d{7}$/',
                'regular_price_inr' => 'required|numeric|min:0',
                'regular_price_usd' => 'required|numeric|min:0',
                'commission' => 'required|numeric',
            ], [
                'name.required' => 'The full name field is required.',
                'name.max' => 'The full name may not be greater than 150 characters.',
                'address.required' => 'The street address field is required.',
                'address.max' => 'The street address may not be greater than 500 characters.',
                'country_id.required' => 'The Country name field is required.',
                'state_id.required' => 'The State name field is required.',
                'city.required' => 'The City name field is required.',
                'ifsc.regex' => 'IFSC code is incorrect.',
            ]);
        }

        $pranic_healer = PranicHealer::find($id);
        if ($request->file()) {
            $request->validate([
                'file' => 'required|mimes:jpeg,jpg,png|max:2048'
            ]);
            Storage::disk('public')->delete('/pranic_healer_image/' . $pranic_healer->image);
            $fileName = time() . '_' . $request->file->getClientOriginalName();
            $filePath = $request->file('file')->storeAs('pranic_healer_image', $fileName, 'public');
            $input['image'] = $fileName;
            $input['image_path'] = '/storage/' . $filePath;
        }
        	$input['salutation'] =  $request->salutation;
            $input['name'] = $request->name;
            $input['gender'] = $request->gender;
            $input['dob'] = $request->dob;
            $input['email'] = $request->email;
            $input['mobile'] = $request->mobile;
            $input['address'] = $request->address;
            $input['country_id'] = $request->country_id;
            $input['state_id'] = $request->state_id;
            $input['city'] = $request->city;
            $input['status'] = $request->status;
            $input['rating'] = $request->rating;
            $input['experience'] = $request->experience;
            $input['clients'] = $request->clients;
            $input['commission'] = $request->commission;
            $input['language'] = json_encode($request->language);
            $input['regular_price_inr'] = $request->regular_price_inr;
        	$input['sell_price_inr'] = $request->sell_price_inr;
        	$input['regular_price_usd'] = $request->regular_price_usd;
        	$input['sell_price_usd'] = $request->sell_price_usd;
            $input['about_us'] = $request->editor;
            $input['created_by'] = $request->user()->id;
            $input['save_status'] = isset($request->draft)?strtolower($request->draft):'published';

        if(!empty($input['password'])){ 
            $input['password'] = Hash::make($input['password']);
        }else{
            $input = Arr::except($input,array('password'));    
        }
        
        $pranic_healer->update($input);
         // Add Bnak Details
        $objbankDetails =  PranicHealerBankDetail::where([['pranic_healer_id', '=', $id]])->first();
        if(!empty($objbankDetails)){
            $bankDetails = [
                'account_holder_name'=> $request->account_holder_name,
                'bank_name'=> $request->bank_name,
                'branch'=> $request->branch,
                'account_no'=> $request->account_no,
                'ifsc'=> $request->ifsc,
                'bank_address'=> $request->bank_address,
                'created_by' => $request->user()->id,
            ];
            $objbankDetails->update($bankDetails);
        }
        if(isset($request->draft)){
            return redirect()->back()
                        ->with('success','Pranic healer saved successfully');
        }else{
            return redirect()->route('admin.pranic-healers.index')
                        ->with('success','Pranic healer updated successfully');
        }
    }
    
    public function destroy($id){
    	$pranic_healer = PranicHealer::find($id);
        $success = PranicHealer::where('_id',$id)->delete();
        Storage::disk('public')->delete('/pranic_healer_image/' . $pranic_healer->image);
        if($success){            
            PranicHealerBankDetail::where('pranic_healer_id', $id)->delete();
        }
        return redirect()->back()->with('success','Pranic healer deleted successfully');
    }

    public function changeStatus(Request $request){
        foreach($request->id as $id){
            $success= PranicHealer::where('_id',$id)->update(['status'=>$request->status]);
        }
        if($success){
            echo 'yes';
        }
    }

    public function getPatientList($id, Request $request){
    	$data = PranicPatient::query();
    	$data->where('pranic_healer_id', $id);
        if (isset($request->search_key) && ($request->search_key != '')) {
            $data->where(function ($qry) use($request) {
                $qry->where('name', 'like', '%' . $request->search_key . '%')
                        ->orWhere('mobile', 'like', '%' . $request->search_key . '%')
                        ->orWhere('email', 'like', '%' . $request->search_key . '%');
            });
        }
        if(isset($request->state_id) && ($request->state_id!='')) {
            $data->where('state_id', $request->state_id);
        }
        if(isset($request->gender) && ($request->gender!='')) {
            $data->where('gender', $request->gender);
        }
        $patients = $data->orderBy('id','DESC')->get();
        return view('admin.pranic_healer.patients.index', compact('patients'));
    }

    public function showPatient($id){
    	$pranic_patient = PranicPatient::find($id);
        return view('admin.pranic_healer.patients.show',compact('pranic_patient'));
    }

    public function editPatient($id){
    	$pranic_patient = PranicPatient::find($id);
        return view('admin.pranic_healer.patients.edit',compact('pranic_patient'));
    }

    public function updatePatient(Request $request, $id){
    	$request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'mobile' => 'required|digits:10',
            'gender' => 'required',
            'age_group' => 'required',
            'marital_status' => 'required',
            'medical_condition' => 'required',
            'symptoms' => 'required',
        ]);
        $input = $request->all();
        $pranicPatient = PranicPatient::find($id);
        $pranicPatient->update($input);    
        return redirect('admin/patient-list/'.$pranicPatient->pranic_healer_id)
                        ->with('success','Patient updated successfully');
    }

    public function destroyPatient($id){
        $success = PranicPatient::where('_id',$id)->delete();      
        return redirect()->back()->with('success','Patient deleted successfully');
    }

    public function changePatientStatus(Request $request){
    	foreach($request->id as $id){
            $success= PranicPatient::where('_id',$id)->update(['status'=>$request->status]);
        }
        if($success){
            echo 'yes';
        }
    }
}

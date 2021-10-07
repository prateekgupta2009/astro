<?php
    
namespace App\Http\Controllers\Admin;
    
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Http\FormRequest;
use App\User;
use App\UserType;
use App\Category;
use App\Subcategory;
use App\ConsultationLanguage;
use DB;
use Hash;
use Validator;
use App\Astrologer;
use App\AstrologerCategory;
use App\AstrologerLanguage;
use App\AstrologerPrice;
use App\AstrologerTimeAvailability;
use App\AstrologerBankDetail;
use App\AstrologerCommission;
use App\Country;
use App\State;
use App\City;

    
class AstrologerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){
        $data = Astrologer::query();
        if (isset($request->search_name) && ($request->search_name != '')) {
            $data->where(function ($qry) use($request) {
                $qry->where('name', 'like', '%' . $request->search_name . '%');
            });
        }
        if (isset($request->search_phone) && ($request->search_phone != '')) {
            $data->where(function ($qry) use($request) {
                $qry->where('mobile', 'like', '%' . $request->search_phone . '%');
            });
        }
        if (isset($request->search_email) && ($request->search_email != '')) {
            $data->where(function ($qry) use($request) {
                $qry->where('email', 'like', '%' . $request->search_email . '%');
            });
        }
        if (isset($request->address) && ($request->address != '')) {
            $data->where(function ($qry) use($request) {
                $qry->where('address', 'like', '%' . $request->address . '%');
            });
        }
        if (isset($request->address) && ($request->address != '')) {
            $data->where(function ($qry) use($request) {
                $qry->where('city_id', 'like', '%' . $request->address . '%');
            });
        }
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        if(isset($request->state_id) && ($request->state_id!='')) {
            $data->where('state_id', $request->state_id);
        }
        if(isset($request->category) && ($request->category!='')) {
            $data->whereHas('category_filter', function($q) use($request) {
                $q->where('category_id', $request->category);
            });
        }
        if(isset($request->feature) && ($request->feature!='')) {
            $data->where('featuredStatus', $request->feature);
        }
        if(isset($request->gender) && ($request->gender!='')) {
            $data->where('gender', $request->gender);
        }
        if(isset($request->pranic_healer) && ($request->pranic_healer!='')) {
            $data->where('is_pranic_healer', $request->pranic_healer);
        }
        $astrologers = $data->orderBy('id','DESC')->get();
        $states = State::all();
        return view('admin.astrologers.index', compact('astrologers', 'states'));
    }
    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(){
        $categories = Category::all();
        $subcategory = Subcategory::all();
        $languages = ConsultationLanguage::all();
        $countries = Country::all();
        return view('admin.astrologers.create', compact('categories', 'languages', 'countries'));
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){


        if(isset($request->draft) && $request->draft == 'Draft'){
            $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:pranic_healers',
            ], [
                'name.required' => 'The full name field is required.'
            ]);
        }else{
            $request->validate([
                'salutation' => 'required',
                'name' => 'required|max:150',
                'display_name' => 'required|max:150',
                'gender' => 'required',
                'dob' => 'required',
                // 'religion' => 'required',
                'email' => 'required|email|unique:pranic_healers',
                'mobile' => 'required|digits:10',            
                'address' => 'required|max:500',
                'country_id' => 'required|max:125',
                'state_id' => 'required|max:125',
                'city_id' => 'required|max:125',
                'status' => 'required',
                'rating' => 'required|numeric|min:1|max:5',
                'experience' => 'required|numeric|min:0',
                'password' => 'required|same:confirm-password',
                'category' => 'required|array',
                'language' => 'required|array',
                'file' => 'required|mimes:jpeg,jpg,png|max:2048',
                // 'bank_name' => 'required',
                // 'branch' => 'required',
                // 'account_no' => 'required|integer',
                // 'ifsc' => 'required|regex:/^[A-Za-z]{4}\d{7}$/',
                // 'bank_address' => 'required',
                // 'bank_country_id' => 'required',
                // 'bank_state_id' => 'required',
            ], [
                'name.required' => 'The full name field is required.',
                'name.max' => 'The full name may not be greater than 150 characters.',
                'address.required' => 'The street address field is required.',
                'address.max' => 'The street address may not be greater than 500 characters.',
                'country_id.required' => 'The Country name field is required.',
                'state_id.required' => 'The State name field is required.',
                'city_id.required' => 'The City name field is required.',
                'ifsc.regex' => 'IFSC code is incorrect.',
            ]);
        }

        if(isset($request->call) && $request->call!=''){
            $request->validate([
            'call_minut' => 'required|numeric',
            'call_price' => 'required|numeric',
            'dolar_call_price' => 'required|numeric',
            'call_commission' => 'required|numeric',
        ], [
            'call_minut.required' => 'The call minut field is required.',
            'call_price.required' => 'The call price field is required.',
            'dolar_call_price.required' => 'The dolar call price field is required.',
            'call_commission.required' => 'The Commission field is required.',
        ]);
        }
        if(isset($request->chat) && $request->chat!=''){
            $request->validate([
            'chat_minut' => 'required|numeric',
            'chat_price' => 'required|numeric',
            'dolar_chat_price' => 'required|numeric',
            'chat_commission' => 'required|numeric',
        ], [
            'chat_minut.required' => 'The chat minut field is required.',
            'chat_price.required' => 'The chat price field is required.',
            'dolar_chat_price.required' => 'The dolar chat price field is required.',
            'chat_commission.required' => 'The Commission field is required.',
        ]);
        }
        if(isset($request->video) && $request->video!=''){
            $request->validate([
            'video_minut' => 'required|numeric',
            'video_price' => 'required|numeric',
            'dolar_video_price' => 'required|numeric',
            'video_commission' => 'required|numeric',
        ], [
            'video_minut.required' => 'The video minut field is required.',
            'video_price.required' => 'The video price field is required.',
            'dolar_video_price.required' => 'The dolar video price field is required.',
            'video_commission.required' => 'The Commission field is required.',
        ]);
        }

        if(isset($request->pranic_healer) && $request->pranic_healer!=''){
            $request->validate([
            'pranic_healer_price' => 'required|numeric',
            'dolar_pranic_healer_price' => 'required|numeric',
            'pranic_healer_commission' => 'required|numeric',
        ], [
            'pranic_healer_price.required' => 'The pranic healer price field is required.',
            'dolar_pranic_healer_price.required' => 'The dolar pranic healer price field is required.',
            'pranic_healer_commission.required' => 'The Commission field is required.',
        ]);
            $pranic_healer = '1';
        }

        // if(isset($request->commission) && $request->commission!=''){
        //     $request->validate([
        //     'commission' => 'required|integer',
        // ], [
        //     'commission.integer' => 'The commission field should be numeric.',
        // ]);
        // }

        if ($request->file()) {
            // Storage::disk('public')->delete('/astrloger_image/' . $astrologer->image);
            $fileName = time() . '_' . $request->file->getClientOriginalName();
            $filePath = $request->file('file')->storeAs('astrloger_image', $fileName, 'public');
            // $input['image'] = $fileName;
            // $input['image_path'] = '/storage/' . $filePath;
        }
        
       $password = Hash::make($request->password);

        $astrologer = Astrologer::create([
            'salutation'=> $request->salutation,
            'name'=> $request->name,
            'display_name'=> $request->display_name,
            'gender'=> $request->gender,
            'dob'=> $request->dob,
            // 'religion'=> $request->religion,
            'email'=> $request->email,
            'mobile'=> $request->mobile,
            'password'=> $password,            
            'address'=> $request->address,
            'country_id'=> $request->country_id,
            'state_id'=> $request->state_id,
            'city_id'=> $request->city_id,
            'status'=> $request->status,
            'rating' => $request->rating,
            'experience' => $request->experience,
            'image' => isset($fileName) && $fileName!=''?$fileName:null,
            'image_path' => isset($filePath) && $filePath!=''?'/storage/' . $filePath:null,
            'about_us'=> $request->editor,
            'created_by' => $request->user()->id,
            'save_status' => isset($request->draft)?strtolower($request->draft):'published',
            'is_pranic_healer' => isset($pranic_healer)?strtolower($pranic_healer):'0',
        ]);

        $lastInsertedId= $astrologer->_id;
        //Add Category
        //dd($request);
        if(isset($request->subcategory) && !empty($request->subcategory)){
        foreach($request->subcategory as $category){
            $subcategories = Subcategory::where('_id', $category)->first();
            $astrologer = AstrologerCategory::create([
                'astrologer_id'=> $lastInsertedId,
                'category_id'=> $subcategories->category_id,
                'sub_category_id'=> $category,
                'created_by' => $request->user()->id,
            ]);
        }
        }else{
            if(isset($request->category) && !empty($request->category)){
            foreach($request->category as $category){
            $astrologer = AstrologerCategory::create([
                'astrologer_id'=> $lastInsertedId,
                'category_id'=> $category,
                'sub_category_id'=> null,
                'created_by' => $request->user()->id,
            ]);
            }
            }
        }
        // Add Language
        if(isset($request->language) && !empty($request->language)){
        foreach($request->language as $languages){
            $language = AstrologerLanguage::create([
                'astrologer_id'=> $lastInsertedId,
                'language_id'=> $languages,
                'created_by' => $request->user()->id,
            ]);
        }
        }
        // Add Pricing
         $pricing = AstrologerPrice::create([
                'astrologer_id'=> $lastInsertedId,
                'call_minut'=> $request->call_minut!=''?$request->call_minut:null,
                'call_price'=> $request->call_price!=''?$request->call_price:null,
                'call_sell_price'=> $request->call_sell_price!=''?$request->call_sell_price:null,
                'chat_minut'=> $request->chat_minut!=''?$request->chat_minut:null,
                'chat_price'=> $request->chat_price!=''?$request->chat_price:null,
                'chat_sell_price'=> $request->chat_sell_price!=''?$request->chat_sell_price:null,
                'video_minut'=> $request->video_minut!=''?$request->video_minut:null,
                'video_price'=> $request->video_price!=''?$request->video_price:null,
                'video_sell_price'=> $request->video_sell_price!=''?$request->video_sell_price:null,
                'dolar_call_price'=> $request->dolar_call_price!=''?$request->dolar_call_price:null,
                'dolar_call_sell_price'=> $request->dolar_call_sell_price!=''?$request->dolar_call_sell_price:null,
                'dolar_chat_price'=> $request->dolar_chat_price!=''?$request->dolar_chat_price:null,
                'dolar_chat_sell_price'=> $request->dolar_chat_sell_price!=''?$request->dolar_chat_sell_price:null,
                'dolar_video_price'=> $request->dolar_video_price!=''?$request->dolar_video_price:null,
                'dolar_video_sell_price'=> $request->dolar_video_sell_price!=''?$request->dolar_video_sell_price:null,
                'call_commission'=> $request->call_commission!=''?$request->call_commission:null,
                'chat_commission'=> $request->chat_commission!=''?$request->chat_commission:null,
                'video_commission'=> $request->video_commission!=''?$request->video_commission:null,
                'created_by' => $request->user()->id,

                'call_forever'=>$request->call_forever,
                'call_sell_price_from_date'=>$request->call_sell_price_to_date !=''?date('d-m-Y'):null,
                'call_sell_price_to_date'=>$request->call_sell_price_to_date !=''?$request->call_sell_price_to_date:null,

                'chat_forever'=>$request->chat_forever,
                'chat_sell_price_from_date'=>$request->chat_sell_price_to_date !=''?date('d-m-y'):null,
                'chat_sell_price_to_date'=>$request->chat_sell_price_to_date !=''?$request->chat_sell_price_to_date:null,
                'video_forever'=>$request->video_forever,

                'video_sell_price_from_date'=>$request->video_sell_price_to_date !=''?date('d-m-Y'):null,
                'video_sell_price_to_date'=>$request->video_sell_price_to_date !=''?$request->video_sell_price_to_date:null,

                // Pranic Healer
                'pranic_healer_price'=> $request->pranic_healer_price!=''?$request->pranic_healer_price:null,
                'pranic_healer_sell_price'=> $request->pranic_healer_sell_price!=''?$request->pranic_healer_sell_price:null,
                'dolar_pranic_healer_price'=> $request->dolar_pranic_healer_price!=''?$request->dolar_pranic_healer_price:null,
                'dolar_pranic_healer_sell_price'=> $request->dolar_pranic_healer_sell_price!=''?$request->dolar_pranic_healer_sell_price:null,
                'pranic_healer_forever'=>$request->pranic_healer_forever,
                'pranic_healer_from_date'=>$request->pranic_healer_to_date !=''?date('d-m-Y'):null,
                'pranic_healer_to_date'=>$request->pranic_healer_to_date !=''?$request->pranic_healer_to_date:null,
                'pranic_healer_commission'=> $request->pranic_healer_commission!=''?$request->pranic_healer_commission:null,


            ]);
        // Add Time Availability
        foreach($request->timeSlot as $timeSlots){
            $slots = AstrologerTimeAvailability::create([
                'astrologer_id'=> $lastInsertedId,
                'days'=> $timeSlots['days'],
                'all_same_time'=> $request->all_same,
                'closed_day'=> isset($timeSlots['closed_day']) && $timeSlots['closed_day']!=''?$timeSlots['closed_day']:null,
                'slot_one_opening'=> isset($timeSlots['slot_one_opening']) && $timeSlots['slot_one_opening']!=''?$timeSlots['slot_one_opening']:null,
                'slot_one_closing'=> isset($timeSlots['slot_one_closing']) && $timeSlots['slot_one_closing']!=''?$timeSlots['slot_one_closing']:null,
                'slot_two_opening'=> isset($timeSlots['slot_two_opening']) && $timeSlots['slot_two_opening']!=''?$timeSlots['slot_two_opening']:null,
                'slot_two_closing'=> isset($timeSlots['slot_two_closing']) && $timeSlots['slot_two_closing']!=''?$timeSlots['slot_two_closing']:null,
                'slot_three_opening'=> isset($timeSlots['slot_three_opening']) && $timeSlots['slot_three_opening']!=''?$timeSlots['slot_three_opening']:null,
                'slot_three_closing'=> isset($timeSlots['slot_three_closing']) && $timeSlots['slot_three_closing']!=''?$timeSlots['slot_three_closing']:null,
                'created_by' => $request->user()->id,
            ]);
        }

        // Add Bnak Details
         $bankDetails = AstrologerBankDetail::create([
                'astrologer_id'=> $lastInsertedId,
                'account_holder_name'=> $request->account_holder_name,
                'bank_name'=> $request->bank_name,
                'branch'=> $request->branch,
                'account_no'=> $request->account_no,
                'ifsc'=> $request->ifsc,
                'bank_address'=> $request->bank_address,
                'bank_country_id'=> $request->bank_country_id,
                'bank_state_id'=> $request->bank_state_id,
                'created_by' => $request->user()->id,
            ]);

         // Add Commission
         // $bankDetails = AstrologerCommission::create([
         //        'astrologer_id'=> $lastInsertedId,
         //        'commission'=> $request->commission!=''?$request->commission:null,
         //        'created_by' => $request->user()->id,
         //    ]);
         if(isset($request->draft)){
            return redirect('admin/astro-profile/'.$lastInsertedId.'/edit')->with('success','Astrologer saved successfully');
        }else{
            return redirect()->route('admin.astro-profile.index')
                        ->with('success','Astrologer created successfully');
        }
    }
    
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id){
        $astrologer = Astrologer::find($id);
        $astro_cat = AstrologerCategory::where('astrologer_id',$id)->get();
        $astro_lan = AstrologerLanguage::where('astrologer_id',$id)->get();
        $astro_price = AstrologerPrice::where('astrologer_id',$id)->first();
        $astro_time = AstrologerTimeAvailability::where('astrologer_id',$id)->get();
        $astro_bank = AstrologerBankDetail::where('astrologer_id',$id)->first();
        return view('admin.astrologers.show',compact('astrologer', 'astro_cat', 'astro_lan', 'astro_price', 'astro_time', 'astro_bank'));
    }
    
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id){
        $astrologer = Astrologer::find($id);
        $astro_cat = AstrologerCategory::where('astrologer_id',$id)->get();
        $astro_lan = AstrologerLanguage::where('astrologer_id',$id)->get();
        $astro_price = AstrologerPrice::where('astrologer_id',$id)->first();
        $astro_time = AstrologerTimeAvailability::where('astrologer_id',$id)->get();
        $astro_bank = AstrologerBankDetail::where('astrologer_id',$id)->first();
        $categories = Category::all();
        $subcategory = Subcategory::all();
        $languages = ConsultationLanguage::all();
        $countries = Country::all();
        $states = State::all();
        $cities = City::all();
        return view('admin.astrologers.edit',compact('astrologer', 'astro_cat', 'astro_lan', 'astro_price', 'astro_time', 'astro_bank', 'categories', 'subcategory', 'languages', 'countries', 'states', 'cities'));
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id

$states = State::all();     * @return \Illuminate\Http\Response
     */
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
                'display_name' => 'required|max:150',
                'gender' => 'required',
                'dob' => 'required',
                // 'religion' => 'required',
                'email' => 'required|email|unique:astrologers,'.$id,
                'mobile' => 'required|digits:10',            
                'address' => 'required|max:500',
                'country_id' => 'required|max:125',
                'state_id' => 'required|max:125',
                'city_id' => 'required|max:125',
                'status' => 'required',
                'rating' => 'required|numeric|min:1|max:5',
                'experience' => 'required|numeric|min:0',
                'password' => 'same:confirm-password',
                'category' => 'required|array',
                'language' => 'required|array',
                // 'bank_name' => 'required',
                // 'branch' => 'required',
                // 'account_no' => 'required|integer',
                // 'ifsc' => 'required|regex:/^[A-Za-z]{4}\d{7}$/',
                // 'bank_address' => 'required',
                // 'bank_country_id' => 'required',
                // 'bank_state_id' => 'required',
            ], [
                'name.required' => 'The full name field is required.',
                'name.max' => 'The full name may not be greater than 150 characters.',
                'address.required' => 'The street address field is required.',
                'address.max' => 'The street address may not be greater than 500 characters.',
                'country_id.required' => 'The Country name field is required.',
                'state_id.required' => 'The State name field is required.',
                'city_id.required' => 'The City name field is required.',
                'ifsc.regex' => 'IFSC code is incorrect.',
            ]);
        }

        if(isset($request->call) && $request->call!=''){
            $request->validate([
            'call_minut' => 'required|numeric',
            'call_price' => 'required|numeric',
            'dolar_call_price' => 'required|numeric',
            'call_commission' => 'required|numeric',
        ], [
            'call_minut.required' => 'The call minut field is required.',
            'call_price.required' => 'The call price field is required.',
            'dolar_call_price.required' => 'The dolar call price field is required.',
            'call_commission.required' => 'The Commission field is required.',
        ]);
        }
        if(isset($request->chat) && $request->chat!=''){
            $request->validate([
            'chat_minut' => 'required|numeric',
            'chat_price' => 'required|numeric',
            'dolar_chat_price' => 'required|numeric',
            'chat_commission' => 'required|numeric',
        ], [
            'chat_minut.required' => 'The chat minut field is required.',
            'chat_price.required' => 'The chat price field is required.',
            'dolar_chat_price.required' => 'The dolar chat price field is required.',
            'chat_commission.required' => 'The Commission field is required.',
        ]);
        }
        if(isset($request->video) && $request->video!=''){
            $request->validate([
            'video_minut' => 'required|numeric',
            'video_price' => 'required|numeric',
            'dolar_video_price' => 'required|numeric',
            'video_commission' => 'required|numeric',
        ], [
            'video_minut.required' => 'The video minut field is required.',
            'video_price.required' => 'The video price field is required.',
            'dolar_video_price.required' => 'The dolar video price field is required.',
            'video_commission.required' => 'The Commission field is required.',
        ]);
        }

        if(isset($request->pranic_healer) && $request->pranic_healer!=''){
            $request->validate([
            'pranic_healer_price' => 'required|numeric',
            'dolar_pranic_healer_price' => 'required|numeric',
            'pranic_healer_commission' => 'required|numeric',
        ], [
            'pranic_healer_price.required' => 'The pranic healer price field is required.',
            'dolar_pranic_healer_price.required' => 'The dolar pranic healer price field is required.',
            'pranic_healer_commission.required' => 'The Commission field is required.',
        ]);
            $pranic_healer = '1';
        }
        // if(isset($request->commission) && $request->commission!=''){
        //     $request->validate([
        //     'commission' => 'required|integer',
        // ], [
        //     'commission.integer' => 'The commission field should be numeric.',
        // ]);
        // }

        $astrologer = Astrologer::find($id);
        if ($request->file()) {
            $request->validate([
                'file' => 'required|mimes:jpeg,jpg,png|max:2048'
            ]);
            Storage::disk('public')->delete('/astrloger_image/' . $astrologer->image);
            $fileName = time() . '_' . $request->file->getClientOriginalName();
            $filePath = $request->file('file')->storeAs('astrloger_image', $fileName, 'public');
            $input['image'] = $fileName;
            $input['image_path'] = '/storage/' . $filePath;
        }
            
            $input['salutation'] = $request->salutation;
            $input['name'] = $request->name;
            $input['display_name'] = $request->display_name;
            $input['gender'] = $request->gender;
            $input['dob'] = $request->dob;
            // $input['religion'] = $request->religion;
            $input['email'] = $request->email;
            $input['mobile'] = $request->mobile;
            $input['password'] = $request->password;            
            $input['address'] = $request->address;
            $input['country_id'] = $request->country_id;
            $input['state_id'] = $request->state_id;
            $input['city_id'] = $request->city_id;
            $input['status'] = $request->status;
            $input['rating'] = $request->rating;
            $input['experience'] = $request->experience;
            $input['about_us'] = $request->editor;
            $input['created_by'] = $request->user()->id;
            $input['save_status'] = isset($request->draft)?strtolower($request->draft):'published';
            $input['is_pranic_healer'] = isset($pranic_healer)?strtolower($pranic_healer):'0';

        if(!empty($input['password'])){ 
            $input['password'] = Hash::make($input['password']);
        }else{
            $input = Arr::except($input,array('password'));    
        }
        
        $astrologer->update($input);

        $lastInsertedId= $id;
        //Add Category
        //dd($request);
        if(isset($request->subcategory) && !empty($request->subcategory)){
           AstrologerCategory::where('astrologer_id', $lastInsertedId)->delete();
        foreach($request->subcategory as $category){
            $subcategories = Subcategory::where('_id', $category)->first();
            $astrologer = AstrologerCategory::create([
                'astrologer_id'=> $lastInsertedId,
                'category_id'=> $subcategories->category_id,
                'sub_category_id'=> $category,
                'created_by' => $request->user()->id,
            ]);
        }
        }else{
            if(isset($request->category) && !empty($request->category)){
                AstrologerCategory::where('astrologer_id', $lastInsertedId)->delete();
            foreach($request->category as $category){
            $astrologer = AstrologerCategory::create([
                'astrologer_id'=> $lastInsertedId,
                'category_id'=> $category,
                'sub_category_id'=> null,
                'created_by' => $request->user()->id,
            ]);
            }
            }
        }
        // Add Language
        if(isset($request->language) && !empty($request->language)){
            AstrologerLanguage::where('astrologer_id', $lastInsertedId)->delete();
        foreach($request->language as $languages){
            $language = AstrologerLanguage::create([
                'astrologer_id'=> $lastInsertedId,
                'language_id'=> $languages,
                'created_by' => $request->user()->id,
            ]);
        }
        }
        // Add Pricing
        $request->call_sell_price_from_date=$request->call_sell_price_from_date !=''?$request->call_sell_price_from_date:date('d-m-Y');
        $request->chat_sell_price_from_date=$request->chat_sell_price_from_date !=''?$request->chat_sell_price_from_date:date('d-m-Y');
        $request->video_sell_price_from_date=$request->video_sell_price_from_date !=''?$request->video_sell_price_from_date:date('d-m-Y');

        $objpricing =  AstrologerPrice::updateOrInsert(['astrologer_id' => $lastInsertedId],[
                'astrologer_id'=> $lastInsertedId,
                'call_minut'=> $request->call_minut!=''?$request->call_minut:null,
                'call_price'=> $request->call_price!=''?$request->call_price:null,
                'call_sell_price'=> $request->call_sell_price!=''?$request->call_sell_price:null,
                'chat_minut'=> $request->chat_minut!=''?$request->chat_minut:null,
                'chat_price'=> $request->chat_price!=''?$request->chat_price:null,
                'chat_sell_price'=> $request->chat_sell_price!=''?$request->chat_sell_price:null,
                'video_minut'=> $request->video_minut!=''?$request->video_minut:null,
                'video_price'=> $request->video_price!=''?$request->video_price:null,
                'video_sell_price'=> $request->video_sell_price!=''?$request->video_sell_price:null,
                'dolar_call_price'=> $request->dolar_call_price!=''?$request->dolar_call_price:null,
                'dolar_call_sell_price'=> $request->dolar_call_sell_price!=''?$request->dolar_call_sell_price:null,
                'dolar_chat_price'=> $request->dolar_chat_price!=''?$request->dolar_chat_price:null,
                'dolar_chat_sell_price'=> $request->dolar_chat_sell_price!=''?$request->dolar_chat_sell_price:null,
                'dolar_video_price'=> $request->dolar_video_price!=''?$request->dolar_video_price:null,
                'dolar_video_sell_price'=> $request->dolar_video_sell_price!=''?$request->dolar_video_sell_price:null,
                'call_commission'=> $request->call_commission!=''?$request->call_commission:null,
                'chat_commission'=> $request->chat_commission!=''?$request->chat_commission:null,
                'video_commission'=> $request->video_commission!=''?$request->video_commission:null,


                'call_forever'=>$request->call_forever,
                'call_sell_price_from_date'=>$request->call_sell_price_from_date !=''?$request->call_sell_price_from_date:null,
                'call_sell_price_to_date'=>$request->call_sell_price_to_date !=''?$request->call_sell_price_to_date:null,

                'chat_forever'=>$request->chat_forever,
                'chat_sell_price_from_date'=>$request->chat_sell_price_to_date !=''?$request->chat_sell_price_from_date:null,
                'chat_sell_price_to_date'=>$request->chat_sell_price_to_date !=''?$request->chat_sell_price_to_date:null,
                'video_forever'=>$request->video_forever,

                'video_forever'=>$request->chat_forever,
                'video_sell_price_from_date'=>$request->video_sell_price_to_date !=''?$request->video_sell_price_from_date:null,
                'video_sell_price_to_date'=>$request->video_sell_price_to_date !=''?$request->video_sell_price_to_date:null,
                'created_by' => $request->user()->id,

                // Pranic Healer
                'pranic_healer_price'=> $request->pranic_healer_price!=''?$request->pranic_healer_price:null,
                'pranic_healer_sell_price'=> $request->pranic_healer_sell_price!=''?$request->pranic_healer_sell_price:null,
                'dolar_pranic_healer_price'=> $request->dolar_pranic_healer_price!=''?$request->dolar_pranic_healer_price:null,
                'dolar_pranic_healer_sell_price'=> $request->dolar_pranic_healer_sell_price!=''?$request->dolar_pranic_healer_sell_price:null,
                'pranic_healer_forever'=>$request->pranic_healer_forever,
                'pranic_healer_from_date'=>$request->pranic_healer_to_date !=''?date('d-m-Y'):null,
                'pranic_healer_to_date'=>$request->pranic_healer_to_date !=''?$request->pranic_healer_to_date:null,
                'pranic_healer_commission'=> $request->pranic_healer_commission!=''?$request->pranic_healer_commission:null,
            ]);
        
        // Add Time Availability
        AstrologerTimeAvailability::where('astrologer_id', $lastInsertedId)->delete();
        foreach($request->timeSlot as $timeSlots){
            $slots = AstrologerTimeAvailability::create([
                'astrologer_id'=> $lastInsertedId,
                'days'=> $timeSlots['days'],
                'all_same_time'=> $request->all_same,
                'closed_day'=> isset($timeSlots['closed_day']) && $timeSlots['closed_day']!=''?$timeSlots['closed_day']:null,
                'slot_one_opening'=> isset($timeSlots['slot_one_opening']) && $timeSlots['slot_one_opening']!=''?$timeSlots['slot_one_opening']:null,
                'slot_one_closing'=> isset($timeSlots['slot_one_closing']) && $timeSlots['slot_one_closing']!=''?$timeSlots['slot_one_closing']:null,
                'slot_two_opening'=> isset($timeSlots['slot_two_opening']) && $timeSlots['slot_two_opening']!=''?$timeSlots['slot_two_opening']:null,
                'slot_two_closing'=> isset($timeSlots['slot_two_closing']) && $timeSlots['slot_two_closing']!=''?$timeSlots['slot_two_closing']:null,
                'slot_three_opening'=> isset($timeSlots['slot_three_opening']) && $timeSlots['slot_three_opening']!=''?$timeSlots['slot_three_opening']:null,
                'slot_three_closing'=> isset($timeSlots['slot_three_closing']) && $timeSlots['slot_three_closing']!=''?$timeSlots['slot_three_closing']:null,
                'created_by' => $request->user()->id,
            ]);
        }

        // Add Bnak Details
        $objbankDetails =  AstrologerBankDetail::where([['astrologer_id', '=', $lastInsertedId]])->first();
        if(!empty($objbankDetails)){
            $bankDetails = [
                'astrologer_id'=> $lastInsertedId,
                'account_holder_name'=> $request->account_holder_name,
                'bank_name'=> $request->bank_name,
                'branch'=> $request->branch,
                'account_no'=> $request->account_no,
                'ifsc'=> $request->ifsc,
                'bank_address'=> $request->bank_address,
                'bank_country_id'=> $request->bank_country_id,
                'bank_state_id'=> $request->bank_state_id,
                'created_by' => $request->user()->id,
            ];
            $objbankDetails->update($bankDetails);
        }

        // Add Commission
         // $bankDetails = AstrologerCommission::updateOrInsert(['astrologer_id' => $lastInsertedId],[
         //        'astrologer_id'=> $lastInsertedId,
         //        'commission'=> $request->commission!=''?$request->commission:null,
         //        'created_by' => $request->user()->id,
         //    ]);
        if(isset($request->draft)){
            return redirect()->back()
                        ->with('success','Astrologer saved successfully');
        }else{
            return redirect()->route('admin.astro-profile.index')
                        ->with('success','Astrologer updated successfully');
        }
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id){
        $success = Astrologer::where('_id',$id)->delete();
        if($success){
            $astrologer = Astrologer::find($id);
            AstrologerCategory::where('astrologer_id', $id)->delete();
            AstrologerLanguage::where('astrologer_id', $id)->delete();
            AstrologerPrice::where('astrologer_id', $id)->delete();
            AstrologerTimeAvailability::where('astrologer_id', $id)->delete();
            // AstrologerCommission::where('astrologer_id', $id)->delete();
            AstrologerBankDetail::where('astrologer_id', $id)->delete();
            if(isset($astrologer->image)){
                Storage::disk('public')->delete('/astrloger_image/' . $astrologer->image);
            }
        }
        return redirect()->back()->with('success','Astrologer deleted successfully');
    }

    public function changeStatus(Request $request){
        foreach($request->id as $id){
            $success= Astrologer::where('_id',$id)->update(['status'=>$request->status]);
        }
        if($success){
            echo 'yes';
        }
    }

    public function get_subcategory(Request $request){
       $subcategory = Subcategory::whereIn('category_id', $request->ids)->get();
       $html = '';
       foreach($subcategory as $subcategory_list){
        $html .= '<option value="'.$subcategory_list->_id.'" cat_id="'.$subcategory_list->category_id.'">'.$subcategory_list->name.'</option>';
       }
       return $html;
    }

    public function changeFeatureStatus(Request $request){

        if($request->status == 'true'){
            $status = '1';
        }else{
            $status = '0';
        }
        $success= Astrologer::where('_id',$request->id)->update(['featuredStatus'=>$status]);
        if($success){
            echo 'yes';
        }
    }
}
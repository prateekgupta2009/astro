<?php
    
namespace App\Http\Controllers\Admin;
    
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Http\Controllers\Controller;
use Validator;
use Auth;
use DB;
use App\Continent;
use App\Country;
use App\State;
use App\City;
use App\Area;
    
class LocationController extends Controller
{
    
    public function index(Request $request)
    {
        $data = Continent::query();
        if(isset($request->continent) && ($request->continent!='')) {
            $data->where('_id', $request->continent);
        }
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        $query = $data->orderBy('name','ASC')->get();
        $continents = Continent::all();
        return view('admin.continents.index', compact('continents', 'query'));
    }

    public function create()
    {   
        return view('admin.continents.create');
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);
        
        $input = $request->all();
        Continent::create($input);
        return redirect()->route('admin.continents')
                        ->with('success','Continents created successfully');
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);
        $input = $request->all();
        $continents = Continent::find($request->_id);
        $continents->update($input);    
        return redirect()->route('admin.continents')
                        ->with('success','Continents updated successfully');
    }

    public function edit($id)
    { 
        $continents = Continent::find($id);    
        return view('admin.continents.edit',compact('continents'));
    }

    public function destroy(Request $request)
    {
        $continents = Continent::where('_id',$request->id)->delete();
        return redirect()->back()->with('success','Continent deleted successfully');
    }

    public function changeStatus(Request $request){
        foreach($request->id as $id){
            $sucess= Continent::updateOrCreate(
                ['id' => $id], [
            'id' => $id,
            'status' => $request->status,
        ]);
        }
        if($sucess){
            echo 'yes';
        }
    }

    // Country
    public function countryindex(Request $request)
    {
        $data = Country::query();
        // if(isset($request->continent) && ($request->continent!='')) {
        //     $data->where('continent_id', $request->continent);
        // }
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        if(isset($request->country) && ($request->country!='')) {
            $data->where('_id', $request->country);
        }
        $query = $data->orderBy('_id','DESC')->get();
        $continents = Continent::all();
        $country = Country::all();
        return view('admin.countries.index', compact('continents', 'country', 'query'));
    }

    public function countrycreate()
    {   
        // $continents = Continent::all();
        return view('admin.countries.create');
    }
    
    public function countrystore(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'sortname' => 'required',
            'phoneCode' => 'regex:/^\+\d{1,3}$/'
        ]);
        
        $input = $request->all();
        Country::create($input);
        return redirect()->route('admin.country')
                        ->with('success','Country created successfully');
    }

    public function countryupdate(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'sortname' => 'required',
            'phoneCode' => 'regex:/^\+\d{1,3}$/'
        ]);
        $input = $request->all();
        $country = Country::find($request->_id);
        $country->update($input);    
        return redirect()->route('admin.country')
                        ->with('success','Country updated successfully');
    }

    public function countryedit($id)
    { 
        $country = Country::find($id); 
        //$continents = Continent::all();  
        return view('admin.countries.edit',compact('country'));
    }

    public function countrydestroy(Request $request)
    {
        $country = Country::where('_id',$request->id)->delete();
        State::where('country_id',$request->id)->delete();
        City::where('country_id',$request->id)->delete();
        Area::where('country_id',$request->id)->delete();
        return redirect()->back()->with('success','Country deleted successfully');
    }

    public function changecountryStatus(Request $request){
        foreach($request->id as $id){
            $success= Country::where('_id',$id)->update(['status'=>$request->status]);
        }
        if($success){
            echo 'yes';
        }
    }

    // State
     public function stateindex(Request $request)
    {
        $data = State::query();
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        if(isset($request->country) && ($request->country!='')) {
            $data->where('country_id', $request->country);
        }
        if(isset($request->state) && ($request->state!='')) {
            $data->where('_id', $request->state);
        }
        $query = $data->orderBy('_id','DESC')->get();
        $continents = Continent::all();
        $country = Country::all();
        $state = State::all();
        return view('admin.states.index', compact('continents', 'country', 'state', 'query'));
    }

    public function statecreate()
    {
        $countries = Country::all();
        return view('admin.states.create', compact('countries'));
    }
    
    public function statestore(Request $request)
    {
        $request->validate([
            // 'continent_id' => 'required',
            'country_id' => 'required',
            'name' => 'required'
        ]);
        
        $input = $request->all();
        State::create($input);
        return redirect()->route('admin.state')
                        ->with('success','State created successfully');
    }

    public function stateupdate(Request $request)
    {
        $request->validate([
            // 'continent_id' => 'required',
            'country_id' => 'required',
            'name' => 'required'
        ]);
        $input = $request->all();
        $state = State::find($request->_id);
        $state->update($input);    
        return redirect()->route('admin.state')
                        ->with('success','State updated successfully');
    }

    public function stateedit($id)
    { 
        $state = State::find($id); 
        $countries = Country::all();  
        return view('admin.states.edit',compact('countries', 'state'));
    }

    public function statedestroy(Request $request)
    {
        $state = State::where('_id',$request->id)->delete();
        City::where('state_id',$request->id)->delete();
        Area::where('state_id',$request->id)->delete();
        return redirect()->back()->with('success','State deleted successfully');
    }

    public function changestateStatus(Request $request){
        foreach($request->id as $id){
            $success= State::where('_id',$id)->update(['status'=>$request->status]);
        }
        if($success){
            echo 'yes';
        }
    }

    public function get_country(Request $request){
       $country = Country::where('continent_id', $request->id)->get();
       $html = '<option value="">---Select Country---</option>';
       foreach($country as $country_list){
        $html .= '<option value="'.$country_list->_id.'">'.$country_list->name.'</option>';
       }
       return $html;
    }

    // City
     public function cityindex(Request $request)
    {
        $data = City::query();
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        if(isset($request->country) && ($request->country!='')) {
            $data->where('country_id', $request->country);
        }
        if(isset($request->state) && ($request->state!='')) {
            $data->where('state_id', $request->state);
        }
        if(isset($request->city) && ($request->city!='')) {
            $data->where('_id', $request->city);
        }
        $query = $data->orderBy('_id','DESC')->get();
        $country = Country::all();
        $state = State::all();
        $city = City::all();
        return view('admin.cities.index', compact('country', 'state', 'city', 'query'));
    }

    public function citycreate()
    {   
        $countries = Country::all();
        return view('admin.cities.create', compact('countries'));
    }
    
    public function citystore(Request $request)
    {
        $request->validate([
            'country_id' => 'required',
            'state_id' => 'required',
            'name' => 'required'
        ]);
        
        $input = $request->all();
        City::create($input);
        return redirect()->route('admin.city')
                        ->with('success','City created successfully');
    }

    public function cityupdate(Request $request)
    {
        $request->validate([
            'country_id' => 'required',
            'state_id' => 'required',
            'name' => 'required'
        ]);
        $input = $request->all();
        $city = City::find($request->_id);
        $city->update($input);    
        return redirect()->route('admin.city')
                        ->with('success','City updated successfully');
    }

    public function cityedit($id)
    { 
        $city = City::find($id); 
        $countries = Country::all();
        $state = State::all();  
        return view('admin.cities.edit',compact('countries', 'state', 'city'));
    }

    public function citydestroy(Request $request)
    {
        $city = City::where('_id',$request->id)->delete();
        Area::where('city_id',$request->id)->delete();
        return redirect()->back()->with('success','City deleted successfully');
    }

    public function changecityStatus(Request $request){
        foreach($request->id as $id){
            $success= City::where('_id',$id)->update(['status'=>$request->status]);
        }
        if($success){
            echo 'yes';
        }
    }

    public function get_state(Request $request){
       $states = State::where('country_id', $request->id)->get();
       $html = '<option value="">---Select State---</option>';
       foreach($states as $state){
        $html .= '<option value="'.$state->_id.'">'.$state->name.'</option>';
       }
       return $html;
    }

    // Area
     public function areaindex(Request $request)
    {
        $data = Area::query();
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        if(isset($request->country) && ($request->country!='')) {
            $data->where('country_id', $request->country);
        }
        if(isset($request->state) && ($request->state!='')) {
            $data->where('state_id', $request->state);
        }
        if(isset($request->city) && ($request->city!='')) {
            $data->where('city_id', $request->city);
        }
        if(isset($request->area) && ($request->area!='')) {
            $data->where('_id', $request->area);
        }
        $query = $data->orderBy('_id','DESC')->get();
        $country = Country::all();
        $state = State::all();
        $city = City::all();
        $areas = Area::all();
        return view('admin.areas.index', compact('country', 'state', 'city', 'areas', 'query'));
    }

    public function areacreate()
    {   
        $countries = Country::all();
        return view('admin.areas.create', compact('countries'));
    }
    
    public function areastore(Request $request)
    {
        $request->validate([
            'country_id' => 'required',
            'state_id' => 'required',
            'city_id' => 'required',
            'name' => 'required',
            'pincode' => 'required|integer|regex:/\b\d{6}\b/'
        ]);
        
        $input = $request->all();
        Area::create($input);
        return redirect()->route('admin.area')
                        ->with('success','Area created successfully');
    }

    public function areaupdate(Request $request)
    {
        $request->validate([
            'country_id' => 'required',
            'state_id' => 'required',
            'city_id' => 'required',
            'name' => 'required',
            'pincode' => 'required|integer|regex:/\b\d{6}\b/'
        ]);
        $input = $request->all();
        $area = Area::find($request->_id);
        $area->update($input);    
        return redirect()->route('admin.area')
                        ->with('success','Area updated successfully');
    }

    public function areaedit($id)
    { 
        $area = Area::find($id);
        $countries = Country::all();
        $state = State::all();
        $city = City::all();
        return view('admin.areas.edit',compact('countries', 'state', 'city', 'area'));
    }

    public function areadestroy(Request $request)
    {
        $area = Area::where('_id',$request->id)->delete();
        return redirect()->back()->with('success','Area deleted successfully');
    }

    public function changeareaStatus(Request $request){
        foreach($request->id as $id){
            $success= Area::where('_id',$id)->update(['status'=>$request->status]);
        }
        if($success){
            echo 'yes';
        }
    }

    public function get_city(Request $request){
       $city = City::where('state_id', $request->id)->get();
       $html = '<option value="">---Select City---</option>';
       foreach($city as $city_list){
        $html .= '<option value="'.$city_list->_id.'">'.$city_list->name.'</option>';
       }
       return $html;
    }
}
<?php
    
namespace App\Http\Controllers\Admin;
    
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Http\Controllers\Controller;
use Validator;
use Auth;
use DB;
use App\ConsultationLanguage;
    
class ConsultLanguageController extends Controller
{
    
    public function index(Request $request)
    {
        $data = ConsultationLanguage::query();
        if(isset($request->language) && ($request->language!='')) {
            $data->where('_id', $request->language);
        }
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        $query = $data->orderBy('_id','DESC')->get();
        $languages = ConsultationLanguage::all();
        return view('admin.consultation_languages.index', compact('languages', 'query'));
    }

    public function create()
    {   
        return view('admin.consultation_languages.create');
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);
        
        $input = $request->all();
        $input['created_by'] = $request->user()->id;
        ConsultationLanguage::create($input);
        return redirect()->route('admin.consultation-languages.index')
                        ->with('success','Consultation Language created successfully');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
        ]);
        $input = $request->all();
        $input['updated_by'] = $request->user()->id;
        $languages = ConsultationLanguage::find($id);
        $languages->update($input);    
        return redirect()->route('admin.consultation-languages.index')
                        ->with('success','Consultation Language updated successfully');
    }

    public function edit($id)
    { 
        $language = ConsultationLanguage::find($id);    
        return view('admin.consultation_languages.edit',compact('language'));
    }

    public function destroy($id)
    {
        $languages = ConsultationLanguage::where('_id',$id)->delete();
        return redirect()->back()->with('success','Consultation Language deleted successfully');
    }

    public function changeStatus(Request $request){
        foreach($request->user_id as $user_id){
            $sucess= ConsultationLanguage::updateOrCreate(
                ['_id' => $user_id], [
            '_id' => $user_id,
            'status' => $request->status,
        ]);
        }
        if($sucess){
            echo 'yes';
        }
    }
}
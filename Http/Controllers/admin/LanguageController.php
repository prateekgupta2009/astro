<?php
    
namespace App\Http\Controllers\Admin;
    
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Http\Controllers\Controller;
use Validator;
use Auth;
use DB;
use App\Language;
    
class LanguageController extends Controller
{
    
    public function index(Request $request)
    {
        $data = Language::query();
        if(isset($request->languages) && ($request->languages!='')) {
            $data->where('_id', $request->languages);
        }
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        $query = $data->orderBy('_id','DESC')->get();
        $language = Language::all();
        return view('admin.language.index', compact('language', 'query'));
    }

    public function create()
    {   
        return view('admin.language.create');
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);
        
        $input = $request->all();
        Language::create($input);
        return redirect()->route('admin.language')
                        ->with('success','Language created successfully');
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);
        $input = $request->all();
        $language = Language::find($request->id);
        $language->update($input);    
        return redirect()->route('admin.language')
                        ->with('success','Language updated successfully');
    }

    public function edit($id)
    { 
        $language = Language::find($id);    
        return view('admin.language.edit',compact('language'));
    }

    public function destroy(Request $request)
    {
        $language = Language::where('_id',$request->id)->delete();
        return redirect()->back()->with('success','Language deleted successfully');
    }

    public function changeStatus(Request $request){
        foreach($request->user_id as $user_id){
            $sucess= Language::updateOrCreate(
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
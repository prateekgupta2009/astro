<?php
    
namespace App\Http\Controllers\Admin;
    
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Http\Controllers\Controller;
use Validator;
use Auth;
use DB;
use App\Service;
    
class ServiceController extends Controller
{
    
    public function index(Request $request)
    {
        $data = Service::query();
        if(isset($request->service) && ($request->service!='')) {
            $data->where('_id', $request->service);
        }
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        $query = $data->orderBy('_id','DESC')->get();
        $services = Service::all();
        return view('admin.services.index', compact('services', 'query'));
    }

    public function create()
    {   
        return view('admin.services.create');
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);
        
        $input = $request->all();
        $input['created_by'] = $request->user()->id;
        Service::create($input);
        return redirect()->route('admin.services.index')
                        ->with('success','Service created successfully');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
        ]);
        $input = $request->all();
        $input['updated_by'] = $request->user()->id;
        $services = Service::find($id);
        $services->update($input);    
        return redirect()->route('admin.services.index')
                        ->with('success','Service updated successfully');
    }

    public function edit($id)
    { 
        $service = Service::find($id);    
        return view('admin.services.edit',compact('service'));
    }

    public function destroy($id)
    {
        $services = Service::where('_id',$id)->delete();
        return redirect()->back()->with('success','Service deleted successfully');
    }

    public function changeStatus(Request $request){
        foreach($request->user_id as $user_id){
            $sucess= Service::updateOrCreate(
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
<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\AddonLabel;
use Validator;
use Auth;

class AddonLabelController extends Controller
{
    public function index(Request $request){
    	$data = AddonLabel::query();
        if(isset($request->addonlabels) && ($request->addonlabels!='')) {
            $data->where('_id', $request->addonlabels);
        }
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        $query = $data->orderBy('_id','DESC')->get();
        $label = AddonLabel::all();
        return view('admin.estore.addonslabel.index', compact('label', 'query'));
    }

    public function show(Request $request){

    }

    public function create(Request $request){
    	return view('admin.estore.addonslabel.create');
    }

    public function store(Request $request){
    	$request->validate([
            'name' => 'required',
        ]);
        
        $input = $request->all();
        $input['created_by'] = $request->user()->_id;
        AddonLabel::create($input);
        return redirect()->route('admin.e-store-addonlabel.index')
                        ->with('success','AddonLabel created successfully');
    }

    public function edit($id){
    	$label = AddonLabel::find($id);    
        return view('admin.estore.addonslabel.edit',compact('label'));
    }

    public function update(Request $request, $id){
    	$request->validate([
            'name' => 'required',
        ]);
        $input = $request->all();
        $input['updated_by'] = $request->user()->_id;
        $products = AddonLabel::find($id);
        $products->update($input); 
        return redirect()->route('admin.e-store-addonlabel.index')
                        ->with('success','AddonLabel updated successfully');
    }

    public function destroy($id){
    	$language = AddonLabel::where('_id',$id)->delete();
        return redirect()->back()->with('success','AddonLabel deleted successfully');
    }

    public function statusChange(Request $request){
    	foreach($request->user_id as $user_id){
            $sucess= AddonLabel::updateOrCreate(
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

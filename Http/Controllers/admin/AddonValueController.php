<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\AddonValue;
use App\AddonLabel;
use Validator;
use Auth;

class AddonValueController extends Controller
{
    public function index(Request $request){
    	$data = AddonValue::query();

        if(isset($request->addlabel) && ($request->addlabel!='')) {
            $data->where('addonlabel_id', $request->addlabel);
        }else{
            return redirect('admin/e-store-addonlabel');
        }

        if(isset($request->addvalue) && ($request->addvalue!='')) {
            $data->where('_id', $request->addvalue);
        }
        
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        $query = $data->orderBy('_id','DESC')->get();
        $labels = AddonLabel::find($request->addlabel);
        $value = AddonValue::where('addonlabel_id', $request->addlabel)->get();
        return view('admin.estore.addonsvalue.index', compact('labels','value', 'query'));
    }

    public function show(Request $request){

    }

    public function create($id){
    	$labels = AddonLabel::find($id);
        if($labels!=null){
    	   return view('admin.estore.addonsvalue.create', compact('labels'));
        }
        return abort(404);
    }

    public function store(Request $request){
    	$request->validate([
            'name' => 'required',
        ]);

        $input = $request->all();
        $input['created_by'] = $request->user()->_id;
        AddonValue::create($input);
        return redirect()->route('admin.e-store-addonvalue.index', ['addlabel'=>$request->addonlabel_id])
                        ->with('success','Option created successfully');
    }

    public function edit($id, $lab_id){
    	$product = AddonValue::find($id);
    	$labels = AddonLabel::find($lab_id);
        if($product!=null && $labels != null){
            return view('admin.estore.addonsvalue.edit',compact('product', 'labels'));
        }
        return abort(404);
    }

    public function update(Request $request, $id){
    	$request->validate([
            'name' => 'required',
        ]);
        $input = $request->all();
        $input['updated_by'] = $request->user()->_id;
        $products = AddonValue::find($id);
        $products->update($input);
        return redirect()->route('admin.e-store-addonvalue.index', ['addlabel'=>$request->addonlabel_id])
                        ->with('success','Option updated successfully');
    }

    public function destroy($id){
    	$language = AddonValue::where('_id',$id)->delete();
        return redirect()->back()->with('success','Option deleted successfully');
    }

    public function statusChange(Request $request){
    	foreach($request->user_id as $user_id){
            $sucess= AddonValue::where('_id',$user_id)->update(['status'=>$request->status]);
        }
        if($sucess){
            echo 'yes';
        }
    }
}

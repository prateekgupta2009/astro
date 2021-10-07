<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Validator;
use App\Report;
use App\ReportAddon;
use App\ReportAddonValue;

class ReportController extends Controller
{
	public function index(Request $request){
    	$data = Report::query();
        if(isset($request->title) && ($request->title!='')) {
            $data->where('_id', $request->title);
        }
        $query = $data->orderBy('_id','DESC')->get();
        $reports = Report::all();
        $addon = ReportAddon::where('name','Language')->first();
    	$language = ReportAddonValue::where('addon_id',$addon['_id'])->where('status','1')->get();
        return view('admin.reports.index', compact('reports', 'query', 'language'));
    }

    public function create(Request $request){
    	$addon = ReportAddon::where('name','Language')->first();
    	$language = ReportAddonValue::where('addon_id',$addon['_id'])->where('status','1')->get();
    	return view('admin.reports.create', compact('language'));
    }

    public function store(Request $request){
        if(isset($request->draft) && $request->draft == 'Draft'){
            $request->validate([
                'title' => 'required'
            ], [
                'title.required' => 'The Title field is required.'
            ]);
        }else{
        	$request->validate([
                'title' => 'required',
                'regular_price_inr' => 'required|numeric|min:0',
                'regular_price_usd' => 'required|numeric|min:0',
                'description' => 'required',
                'image' => 'required|mimes:jpeg,jpg,png|max:2048',
                'sample_report_1' => 'mimes:pdf',
                'sample_report_2' => 'mimes:pdf',
                'sample_report_3' => 'mimes:pdf',
                'sample_report_4' => 'mimes:pdf',
            ], [
                'title.required' => 'The Title field is required.',
                'regular_price_inr.required' => 'The Regular price field is required.',
                'regular_price_usd.required' => 'The Regular price field is required.',
            ]);
        }
        if ($request->file()) {
            // Storage::disk('public')->delete('/product_image/'.$request->sku.'/' . $astrologer->image);
            $image = time() . '_' . $request->image->getClientOriginalName();
            $imagePath = $request->file('image')->storeAs('report_image', $image, 'public');
            $image_name = $image;
            $image_path = '/storage/' . $imagePath;
            if(isset($request->sample_report_1) && $request->sample_report_1 !=null){
                $fileName_1 = time() . '_' . $request->sample_report_1->getClientOriginalName();
                $filePath_1 = $request->file('sample_report_1')->storeAs('reports_pdf', $fileName_1, 'public');
                $file_name_1 = $fileName_1;
                $file_path_1 = '/storage/' . $filePath_1;
            }
            if(isset($request->sample_report_2) && $request->sample_report_2 !=null){
                $fileName_2 = time() . '_' . $request->sample_report_2->getClientOriginalName();
                $filePath_2 = $request->file('sample_report_2')->storeAs('reports_pdf', $fileName_2, 'public');
                $file_name_2 = $fileName_2;
                $file_path_2 = '/storage/' . $filePath_2;
            }
            if(isset($request->sample_report_3) && $request->sample_report_3 !=null){
                $fileName_3 = time() . '_' . $request->sample_report_3->getClientOriginalName();
                $filePath_3 = $request->file('sample_report_3')->storeAs('reports_pdf', $fileName_3, 'public');
                $file_name_3 = $fileName_3;
                $file_path_3 = '/storage/' . $filePath_3;
            }
            if(isset($request->sample_report_4) && $request->sample_report_4 !=null){
                $fileName_4 = time() . '_' . $request->sample_report_4->getClientOriginalName();
                $filePath_4 = $request->file('sample_report_4')->storeAs('reports_pdf', $fileName_4, 'public');
                $file_name_4 = $fileName_4;
                $file_path_4 = '/storage/' . $filePath_4;
            }
        }        
        $input = $request->all();
        $input['image'] = isset($image_name)?$image_name:null;
        $input['image_path'] = isset($image_path)?$image_path:null;
        $input['sample_report_1'] = isset($file_path_1)?$file_path_1:null;
        $input['sample_language_id_1'] = isset($input['sample_report_1']) && $input['sample_report_1'] != null?$request->sample_language_id_1:null;
        $input['sample_report_2'] = isset($file_path_2)?$file_path_2:null;
        $input['sample_language_id_2'] = isset($input['sample_report_2']) && $input['sample_report_2']!=null?$request->sample_language_id_2:null;
        $input['sample_report_3'] = isset($file_path_3)?$file_path_3:null;
        $input['sample_language_id_3'] = isset($input['sample_report_3']) && $input['sample_report_3']!=null?$request->sample_language_id_3:null;
        $input['sample_report_4'] = isset($file_path_4)?$file_path_4:null;
        $input['sample_language_id_4'] = isset($input['sample_report_4']) && $input['sample_report_4']!=null?$request->sample_language_id_4:null;
        $input['created_by'] = $request->user()->_id;
        $input['save_status'] = isset($request->draft)?strtolower($request->draft):'published';
        $report = Report::create($input);
       
        if(isset($request->draft)){
            return redirect('admin/reports/'.$report->_id.'/edit')->with('success','Report saved successfully');
        }else{
            return redirect()->route('admin.reports.index')
                        ->with('success','Report created successfully');
        }
    }

    public function edit($id){
    	$report = Report::find($id);
        $addon = ReportAddon::where('name','Language')->first();
    	$language = ReportAddonValue::where('addon_id',$addon['_id'])->where('status','1')->get();
        if($report!=null){
            return view('admin.reports.edit',compact('report', 'language'));
        }
        return abort(404);
    }

    public function update(Request $request, $id){
        if(isset($request->draft) && $request->draft == 'Draft'){
            $request->validate([
                'title' => 'required'
            ], [
                'title.required' => 'The Title field is required.'
            ]);
        }else{
        	$request->validate([
                'title' => 'required',
                'regular_price_inr' => 'required|numeric|min:0',
                'regular_price_usd' => 'required|numeric|min:0',
                'description' => 'required',
                'sample_report_1' => 'mimes:pdf',
                'sample_report_2' => 'mimes:pdf',
                'sample_report_3' => 'mimes:pdf',
                'sample_report_4' => 'mimes:pdf',
            ], [
                'title.required' => 'The Title field is required.',
                'regular_price_inr.required' => 'The Regular price field is required.',
                'regular_price_usd.required' => 'The Regular price field is required.',
            ]);
        }
        $report = Report::find($id);
        $input = $request->all();
        if($report->image_path==null && !isset($request->draft)){
            $request->validate([
                'image' => 'required|mimes:jpeg,jpg,png|max:2048'
            ]);
        }
        if ($request->file()) {
            // Storage::disk('public')->delete('/product_image/'.$request->sku.'/' . $astrologer->image);
            if(isset($request->image) && $request->image != null){
	            if($report->image_path!=null){
	            	$path = str_replace('/storage', '', $report->image_path);
	                Storage::disk('public')->delete($path);
	            }
	            $image = time() . '_' . $request->image->getClientOriginalName();
	            $imagePath = $request->file('image')->storeAs('report_image', $image, 'public');
	            $image_name = $image;
	            $image_path = '/storage/' . $imagePath;
	            $input['image'] = isset($image_name)?$image_name:null;
	        	$input['image_path'] = isset($image_path)?$image_path:null;
        	}
            if(isset($request->sample_report_1) && $request->sample_report_1 !=null){
            	if($report->sample_report_1!=null){
	                $path = str_replace('/storage', '', $report->sample_report_1);
	                Storage::disk('public')->delete($path);
	            }
                $fileName_1 = time() . '_' . $request->sample_report_1->getClientOriginalName();
                $filePath_1 = $request->file('sample_report_1')->storeAs('reports_pdf', $fileName_1, 'public');
                $file_name_1 = $fileName_1;
                $file_path_1 = '/storage/' . $filePath_1;
                $input['sample_report_1'] = isset($file_path_1)?$file_path_1:null;
            }
            if(isset($request->sample_report_2) && $request->sample_report_2 !=null){
            	if($report->sample_report_2!=null){
	               $path = str_replace('/storage', '', $report->sample_report_2);
	               Storage::disk('public')->delete($path);
	            }
                $fileName_2 = time() . '_' . $request->sample_report_2->getClientOriginalName();
                $filePath_2 = $request->file('sample_report_2')->storeAs('reports_pdf', $fileName_2, 'public');
                $file_name_2 = $fileName_2;
                $file_path_2 = '/storage/' . $filePath_2;
                $input['sample_report_2'] = isset($file_path_2)?$file_path_2:null;
            }
            if(isset($request->sample_report_3) && $request->sample_report_3 !=null){
            	if($report->sample_report_3!=null){
	               $path = str_replace('/storage', '', $report->sample_report_3);
	               Storage::disk('public')->delete($path);
	            }
                $fileName_3 = time() . '_' . $request->sample_report_3->getClientOriginalName();
                $filePath_3 = $request->file('sample_report_3')->storeAs('reports_pdf', $fileName_3, 'public');
                $file_name_3 = $fileName_3;
                $file_path_3 = '/storage/' . $filePath_3;
                $input['sample_report_3'] = isset($file_path_3)?$file_path_3:null;
            }
            if(isset($request->sample_report_4) && $request->sample_report_4 !=null){
            	if($report->sample_report_4!=null){
	                $path = str_replace('/storage', '', $report->sample_report_4);
	                Storage::disk('public')->delete($path);
	            }
                $fileName_4 = time() . '_' . $request->sample_report_4->getClientOriginalName();
                $filePath_4 = $request->file('sample_report_4')->storeAs('reports_pdf', $fileName_4, 'public');
                $file_name_4 = $fileName_4;
                $file_path_4 = '/storage/' . $filePath_4;
                $input['sample_report_4'] = isset($file_path_4)?$file_path_4:null;
            }
        }        
                
        
        $input['sample_language_id_1'] = isset($input['sample_report_1']) && $input['sample_report_1'] != null?$request->sample_language_id_1:null;        
        $input['sample_language_id_2'] = isset($input['sample_report_2']) && $input['sample_report_2']!=null?$request->sample_language_id_2:null;        
        $input['sample_language_id_3'] = isset($input['sample_report_3']) && $input['sample_report_3']!=null?$request->sample_language_id_3:null;        
        $input['sample_language_id_4'] = isset($input['sample_report_4']) && $input['sample_report_4']!=null?$request->sample_language_id_4:null;
        $input['created_by'] = $request->user()->_id;
        $input['save_status'] = isset($request->draft)?strtolower($request->draft):'published';
        $report = $report->update($input);
       
        if(isset($request->draft)){
            return redirect()->back()->with('success','Report saved successfully');
        }else{
            return redirect()->route('admin.reports.index')
                        ->with('success','Report updated successfully');
        }
    }

    public function destroy($id){
    	$report = Report::find($id);
    	if($report->image_path!=null){
        	$path = str_replace('/storage', '', $report->image_path);
            Storage::disk('public')->delete($path);
        }
        if($report->sample_report_1!=null){
            $path = str_replace('/storage', '', $report->sample_report_1);
            Storage::disk('public')->delete($path);
        }
        if($report->sample_report_2!=null){
            $path = str_replace('/storage', '', $report->sample_report_2);
            Storage::disk('public')->delete($path);
        }
        if($report->sample_report_3!=null){
            $path = str_replace('/storage', '', $report->sample_report_3);
            Storage::disk('public')->delete($path);
        }
        if($report->sample_report_4!=null){
            $path = str_replace('/storage', '', $report->sample_report_4);
            Storage::disk('public')->delete($path);
        }
    	Report::where('_id',$id)->delete();
        return redirect()->back()->with('success','Report deleted successfully');
    }

    public function removeFile(Request $request){
        $sucess= Report::where('_id',$request->id)->update([$request->column_name=>null]);
        if($request->path!=''){
            $path = str_replace('/storage', '', $request->path);
            Storage::disk('public')->delete($path);
        }
        if($sucess){
            echo 'yes';
        }
    }

    public function statusChange(Request $request){
        foreach($request->report_id as $report_id){
            $sucess= Report::where('_id',$report_id)->update(['status'=>$request->status]);
        }
        if($sucess){
            echo 'yes';
        }
    }

    public function addonList(Request $request){
    	$data = ReportAddon::query();
    	$query = $data->orderBy('_id','DESC')->get();
    	return view('admin.reports.addon.index', compact('query'));
    }

    public function addonValueList(Request $request, $id){
    	$query = ReportAddonValue::where('addon_id', $id)->get();
    	$addon = ReportAddon::find($id);
    	return view('admin.reports.addon.addon_value', compact('query', 'addon', 'id'));
    }

    public function createAddonValue($id)
    {   
        $addon = ReportAddon::find($id);
        if($addon!=null){
            return view('admin.reports.addon.create_addon_value', compact('addon'));
        }
        return abort(404);
    }

    public function storeAddonValue(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);        
        $input = $request->all();
        $input['created_by'] = $request->user()->_id;
        ReportAddonValue::create($input);
        return redirect('admin/reports-addon/'.$request->addon_id)->with('success','Addon value created successfully');
    }

    public function editAddonValue($id, $addon_id)
    { 
        $value = ReportAddonValue::find($id);
        $addon = ReportAddon::find($addon_id);
        if($value!=null && $addon_id != null){  
            return view('admin.reports.addon.edit_addon_value',compact('value', 'addon'));
        }
        return abort(404);
    }

    public function updateAddonValue(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);
        $input = $request->all();
        $input['updated_by'] = $request->user()->_id;
        $value = ReportAddonValue::find($request->_id);
        $value->update($input);    
        return redirect('admin/reports-addon/'.$request->addon_id)->with('success','Addon value updated successfully');
    }

    public function deleteAddonValue(Request $request)
    {
        ReportAddonValue::where('_id',$request->_id)->delete();
        return redirect()->back()->with('success','Addon value deleted successfully');
    }

    public function changeStatus(Request $request){
        foreach($request->id as $id){
        	if($request->status=='1' && $request->name == 'Delivery Direction'){
        		$success= ReportAddonValue::where('_id','!=',$id)->where('addon_id',$request->addon_id)->update(['status'=>'0']);
        	}
            $success= ReportAddonValue::where('_id',$id)->update(['status'=>$request->status]);
        }
        if($success){
            echo 'yes';
        }
    }
}

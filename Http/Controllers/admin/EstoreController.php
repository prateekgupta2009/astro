<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Http\FormRequest;
use Validator;
use Auth;
use App\EStore;
use App\EstoreAddon;
use App\EstoreCategory;
use App\EstoreSubCategory;
use App\Country;

class EstoreController extends Controller
{
    public function index(Request $request){
    	$data = EStore::query();
        if(isset($request->product) && ($request->product!='')) {
            $data->where('_id', $request->product);
        }
         if(isset($request->sku) && ($request->sku!='')) {
            $data->where('_id', $request->sku);
        }
         if(isset($request->category) && ($request->category!='')) {
            $data->where('category_id', $request->category);
        }
         if(isset($request->subcategory) && ($request->subcategory!='')) {
            $data->where('subcategory_id', $request->subcategory);
        }
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        if(isset($request->search_key) && ($request->search_key!='')) {
            $data->where('quantity', $request->search_key);
        }
        if(isset($request->certification) && ($request->certification!='')) {
            $data->whereHas('certification_filter', function($q) use($request) {
                $q->where('type', $request->certification);
            });
        }
        if(isset($request->energization) && ($request->energization!='')) {
            $data->whereHas('certification_filter', function($q) use($request) {
                $q->where('type', $request->energization);
            });
        }
        $query = $data->orderBy('_id','DESC')->get();
        $products = EStore::all();
        $categories = EstoreCategory::where('status','1')->get();
        $subcategories = EstoreSubCategory::where('status','1')->get();
        return view('admin.estore.products.index', compact('products', 'query', 'categories', 'subcategories'));
    }

    public function show($id){
        $arrObj['product'] = EStore::find($id);
        $arrObj['certification'] = EstoreAddon::where(['product_id' => $id, 'type' => 'certification'])->get()->toArray();
        $arrObj['energization'] = EstoreAddon::where(['product_id' => $id, 'type' => 'energization'])->get()->toArray();
        if($arrObj['product']!=null){
    	   return view('admin.estore.products.show')->with($arrObj);
        }
        return abort(404);
    }

    public function create(Request $request){
    	$categories = EstoreCategory::where('status','1')->get();
    	$subcategories = EstoreSubCategory::where('status','1')->get();
    	$countries = Country::where('status','1')->get();
    	return view('admin.estore.products.create', compact('categories', 'subcategories', 'countries'));
    }

    public function store(Request $request){
        if(isset($request->draft) && $request->draft == 'Draft'){
            $request->validate([
                'name' => 'required'
            ], [
                'name.required' => 'The Product name field is required.'
            ]);
        }else{
        	$request->validate([
                'name' => 'required',
                'sku' => 'required',            
                'category_id' => 'required',
                'quantity' => 'required|numeric',
                'warn_quantity' => 'required|numeric',
                'regular_price_inr' => 'required|numeric|min:0',
                'regular_price_usd' => 'required|numeric|min:0',
                'details' => 'required',
                'file_1' => 'required|mimes:jpeg,jpg,png|max:2048'
            ], [
                'name.required' => 'The Product name field is required.',
                'sku.required' => 'The SKU field is required.',
                'category_id.required' => 'The Category field is required.',
                'quantity.required' => 'The Quantity field is required.',
                'warn_quantity.required' => 'The Warn quantity field is required.',
                'regular_price_inr.required' => 'The Regular price field is required.',
                'regular_price_usd.required' => 'The Regular price field is required.',
            ]);
        }
        if ($request->file()) {
            // Storage::disk('public')->delete('/product_image/'.$request->sku.'/' . $astrologer->image);
            $fileName_1 = time() . '_' . $request->file_1->getClientOriginalName();
            $filePath_1 = $request->file('file_1')->storeAs('product_image/'.$request->sku, $fileName_1, 'public');
            $image_1 = $fileName_1;
            $image_path_1 = '/storage/' . $filePath_1;
            if(isset($request->file_2) && $request->file_2 !=null){
                $fileName_2 = time() . '_' . $request->file_2->getClientOriginalName();
                $filePath_2 = $request->file('file_2')->storeAs('product_image/'.$request->sku, $fileName_2, 'public');
                $image_2 = $fileName_2;
                $image_path_2 = '/storage/' . $filePath_2;
            }
            if(isset($request->file_3) && $request->file_3 !=null){
                $fileName_3 = time() . '_' . $request->file_3->getClientOriginalName();
                $filePath_3 = $request->file('file_3')->storeAs('product_image/'.$request->sku, $fileName_3, 'public');
                $image_3 = $fileName_3;
                $image_path_3 = '/storage/' . $filePath_3;
            }
            if(isset($request->file_4) && $request->file_4 !=null){
                $fileName_4 = time() . '_' . $request->file_4->getClientOriginalName();
                $filePath_4 = $request->file('file_4')->storeAs('product_image/'.$request->sku, $fileName_4, 'public');
                $image_4 = $fileName_4;
                $image_path_4 = '/storage/' . $filePath_4;
            }
            if(isset($request->file_5) && $request->file_5 !=null){
                $fileName_5 = time() . '_' . $request->file_5->getClientOriginalName();
                $filePath_5 = $request->file('file_5')->storeAs('product_image/'.$request->sku, $fileName_5, 'public');
                $image_5 = $fileName_5;
                $image_path_5 = '/storage/' . $filePath_5;
            }
            if(isset($request->file_6) && $request->file_6 !=null){
                $fileName_6 = time() . '_' . $request->file_6->getClientOriginalName();
                $filePath_6 = $request->file('file_6')->storeAs('product_image/'.$request->sku, $fileName_6, 'public');
                $image_6 = $fileName_6;
                $image_path_6 = '/storage/' . $filePath_6;
            }
            if(isset($request->file_7) && $request->file_7 !=null){
                $fileName_7 = time() . '_' . $request->file_7->getClientOriginalName();
                $filePath_7 = $request->file('file_7')->storeAs('product_image/'.$request->sku, $fileName_7, 'public');
                $image_7 = $fileName_7;
                $image_path_7 = '/storage/' . $filePath_7;
            }
            if(isset($request->file_8) && $request->file_8 !=null){
                $fileName_8 = time() . '_' . $request->file_8->getClientOriginalName();
                $filePath_8 = $request->file('file_8')->storeAs('product_image/'.$request->sku, $fileName_8, 'public');
                $image_8 = $fileName_8;
                $image_path_8 = '/storage/' . $filePath_8;
            }
        }
        // dd($request->energization_enable);
        if(isset($request->energization_enable) && $request->energization_enable == 'energization' && isset($request->energization) && !empty($request->energization)){
            $request->validate([
                'energization.*.price_inr' => 'required|numeric',
                'energization.*.price_usd' => 'required|numeric',
            ]);
        }
        if(isset($request->certification_enable) && $request->certification_enable == 'certification' && isset($request->certification) && !empty($request->certification)){
            $request->validate([
                'certification.*.price_inr' => 'required|numeric',
                'certification.*.price_usd' => 'required|numeric',
            ]);
        }
        
        
        $input['name'] = $request->name;
        $input['sku'] = $request->sku;
        $input['status'] = $request->status;
        $input['category_id'] = $request->category_id;
        $input['subcategory_id'] = $request->subcategory_id;
        $input['quantity'] = $request->quantity;
        $input['warn_quantity'] = $request->warn_quantity;
        $input['regular_price_inr'] = $request->regular_price_inr;
        $input['sell_price_inr'] = $request->sell_price_inr;
        $input['regular_price_usd'] = $request->regular_price_usd;
        $input['sell_price_usd'] = $request->sell_price_usd;
        $input['weight_carat'] = $request->weight_carat;
        $input['weight_ratti'] = $request->weight_ratti;
        $input['details'] = $request->details;
        $input['key_feature'] = $request->key_feature;
        $input['description'] = $request->description;
        $input['disclaimer'] = $request->disclaimer;
        $input['url'] = $request->url;
        $input['file_1'] = isset($image_path_1)?$image_path_1:null;
        $input['file_2'] = isset($image_path_2)?$image_path_2:null;
        $input['file_3'] = isset($image_path_3)?$image_path_3:null;
        $input['file_4'] = isset($image_path_4)?$image_path_4:null;
        $input['file_5'] = isset($image_path_5)?$image_path_5:null;
        $input['file_6'] = isset($image_path_6)?$image_path_6:null;
        $input['file_7'] = isset($image_path_7)?$image_path_7:null;
        $input['file_8'] = isset($image_path_8)?$image_path_8:null;
        $input['created_by'] = $request->user()->_id;
        $input['save_status'] = isset($request->draft)?strtolower($request->draft):'published';
        $product = EStore::create($input);

        $product_id = $product->_id;
        $input = $request->all();
        if(isset($input['energization_enable']) && $input['energization_enable'] == 'energization' && isset($input['energization']) && !empty($input['energization'])){
            foreach($input['energization'] as $energization){
                $energizationData['product_id'] = $product_id;
                $energizationData['type'] = $request->energization_enable;
                $energizationData['type_id'] = $request->energization_id;
                $energizationData['option'] = $energization['option_name'];
                $energizationData['option_id'] = $energization['option_id'];
                $energizationData['price_inr'] = $energization['price_inr'];
                $energizationData['price_usd'] = $energization['price_usd'];
                EstoreAddon::create($energizationData);
            }
        }
        if(isset($input['certification_enable']) && $input['certification_enable'] == 'certification' && isset($input['certification']) && !empty($input['certification'])){
            foreach($input['certification'] as $certification){
                $certificationData['product_id'] = $product_id;
                $certificationData['type'] = $request->certification_enable;
                $certificationData['type_id'] = $request->certification_id;
                $certificationData['option'] = $certification['option_name'];
                $certificationData['option_id'] = $certification['option_id'];
                $certificationData['price_inr'] = $certification['price_inr'];
                $certificationData['price_usd'] = $certification['price_usd'];
                EstoreAddon::create($certificationData);
            }
        }
        if(isset($request->draft)){
            return redirect('admin/e-store/'.$product_id.'/edit')->with('success','Product saved successfully');
        }else{
            return redirect()->route('admin.e-store.index')
                        ->with('success','Product created successfully');
        }
    }

    public function edit($id){
    	$product = EStore::find($id);
        $certification = EstoreAddon::where(['product_id' => $id, 'type' => 'certification'])->get()->toArray();
        $energization = EstoreAddon::where(['product_id' => $id, 'type' => 'energization'])->get()->toArray();
        $categories = EstoreCategory::where('status','1')->get();
        $subcategories = EstoreSubCategory::where('status','1')->get();
        $countries = Country::where('status','1')->get();
        if($product!=null){
            return view('admin.estore.products.edit',compact('product', 'countries', 'categories', 'subcategories', 'energization', 'certification'));
        }
        return abort(404);
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
                'name' => 'required',
                'sku' => 'required',            
                'category_id' => 'required',
                'quantity' => 'required|numeric',
                'warn_quantity' => 'required|numeric',
                'regular_price_inr' => 'required|numeric|min:0',
                'regular_price_usd' => 'required|numeric|min:0',
                'details' => 'required'
            ], [
                'name.required' => 'The Product name field is required.',
                'sku.required' => 'The SKU field is required.',
                'category_id.required' => 'The Category field is required.',
                'quantity.required' => 'The Quantity field is required.',
                'warn_quantity.required' => 'The Warn quantity field is required.',
                'regular_price_inr.required' => 'The Regular price field is required.',
                'regular_price_usd.required' => 'The Regular price field is required.',
            ]);
        }
        $products = EStore::find($id);
        if($products->file_1==null && !isset($request->draft)){
            $request->validate([
                'file_1' => 'required|mimes:jpeg,jpg,png|max:2048'
            ]);
        }
        if ($request->file()) {
            if(isset($request->file_1) && $request->file_1 !=null){
                if($products->file_1!=null){
                    $a = explode("/", $products->file_1);
                    $path = $a['2'].'/'.$a['3'].'/'.$a['4'];
                    Storage::disk('public')->delete($path);
                }
                $fileName_1 = time() . '_' . $request->file_1->getClientOriginalName();
                $filePath_1 = $request->file('file_1')->storeAs('product_image/'.$request->sku, $fileName_1, 'public');
                $image_1 = $fileName_1;
                $image_path_1 = '/storage/' . $filePath_1;
                $input['file_1'] = $image_path_1;
            }
            if(isset($request->file_2) && $request->file_2 !=null){
                if($products->file_2!=null){
                $a = explode("/", $products->file_2);
                $path = $a['2'].'/'.$a['3'].'/'.$a['4'];
                Storage::disk('public')->delete($path);
                }
                $fileName_2 = time() . '_' . $request->file_2->getClientOriginalName();
                $filePath_2 = $request->file('file_2')->storeAs('product_image/'.$request->sku, $fileName_2, 'public');
                $image_2 = $fileName_2;
                $image_path_2 = '/storage/' . $filePath_2;
                $input['file_2'] = isset($image_path_2)?$image_path_2:null;
            }
            if(isset($request->file_3) && $request->file_3 !=null){
                if($products->file_3!=null){
                    $a = explode("/", $products->file_3);
                    $path = $a['2'].'/'.$a['3'].'/'.$a['4'];
                    Storage::disk('public')->delete($path);
                }
                $fileName_3 = time() . '_' . $request->file_3->getClientOriginalName();
                $filePath_3 = $request->file('file_3')->storeAs('product_image/'.$request->sku, $fileName_3, 'public');
                $image_3 = $fileName_3;
                $image_path_3 = '/storage/' . $filePath_3;
                $input['file_3'] = isset($image_path_3)?$image_path_3:null;
            }
            if(isset($request->file_4) && $request->file_4 !=null){
                if($products->file_4!=null){
                    $a = explode("/", $products->file_4);
                    $path = $a['2'].'/'.$a['3'].'/'.$a['4'];
                    Storage::disk('public')->delete($path);
                }
                $fileName_4 = time() . '_' . $request->file_4->getClientOriginalName();
                $filePath_4 = $request->file('file_4')->storeAs('product_image/'.$request->sku, $fileName_4, 'public');
                $image_4 = $fileName_4;
                $image_path_4 = '/storage/' . $filePath_4;
                $input['file_4'] = isset($image_path_4)?$image_path_4:null;
            }
            if(isset($request->file_5) && $request->file_5 !=null){
                if($products->file_5!=null){
                    $a = explode("/", $products->file_5);
                    $path = $a['2'].'/'.$a['3'].'/'.$a['4'];
                    Storage::disk('public')->delete($path);
                }
                $fileName_5 = time() . '_' . $request->file_5->getClientOriginalName();
                $filePath_5 = $request->file('file_5')->storeAs('product_image/'.$request->sku, $fileName_5, 'public');
                $image_5 = $fileName_5;
                $image_path_5 = '/storage/' . $filePath_5;
                $input['file_5'] = isset($image_path_5)?$image_path_5:null;
            }
            if(isset($request->file_6) && $request->file_6 !=null){
                if($products->file_6!=null){
                    $a = explode("/", $products->file_6);
                    $path = $a['2'].'/'.$a['3'].'/'.$a['4'];
                    Storage::disk('public')->delete($path);
                }
                $fileName_6 = time() . '_' . $request->file_6->getClientOriginalName();
                $filePath_6 = $request->file('file_6')->storeAs('product_image/'.$request->sku, $fileName_6, 'public');
                $image_6 = $fileName_6;
                $image_path_6 = '/storage/' . $filePath_6;
                $input['file_6'] = isset($image_path_6)?$image_path_6:null;
            }
            if(isset($request->file_7) && $request->file_7 !=null){
                if($products->file_7!=null){
                    $a = explode("/", $products->file_7);
                    $path = $a['2'].'/'.$a['3'].'/'.$a['4'];
                    Storage::disk('public')->delete($path);
                }
                $fileName_7 = time() . '_' . $request->file_7->getClientOriginalName();
                $filePath_7 = $request->file('file_7')->storeAs('product_image/'.$request->sku, $fileName_7, 'public');
                $image_7 = $fileName_7;
                $image_path_7 = '/storage/' . $filePath_7;
                $input['file_7'] = isset($image_path_7)?$image_path_7:null;
            }
            if(isset($request->file_8) && $request->file_8 !=null){
                if($products->file_8!=null){
                    $a = explode("/", $products->file_8);
                    $path = $a['2'].'/'.$a['3'].'/'.$a['4'];
                    Storage::disk('public')->delete($path);
                }
                $fileName_8 = time() . '_' . $request->file_8->getClientOriginalName();
                $filePath_8 = $request->file('file_8')->storeAs('product_image/'.$request->sku, $fileName_8, 'public');
                $image_8 = $fileName_8;
                $image_path_8 = '/storage/' . $filePath_8;
                $input['file_8'] = isset($image_path_8)?$image_path_8:null;
            }
        }
        if(isset($request->energization_enable) && $request->energization_enable == 'energization' && isset($request->energization) && !empty($request->energization)){
            $request->validate([
                'energization.*.price_inr' => 'required|numeric',
                'energization.*.price_usd' => 'required|numeric',
            ]);
        }
        if(isset($request->certification_enable) && $request->certification_enable == 'certification' && isset($request->certification) && !empty($request->certification)){
            $request->validate([
                'certification.*.price_inr' => 'required|numeric',
                'certification.*.price_usd' => 'required|numeric',
            ]);
        }
        //$input = $request->all();
        $input['name'] = $request->name;
        $input['sku'] = $request->sku;
        $input['status'] = $request->status;
        $input['category_id'] = $request->category_id;
        $input['subcategory_id'] = $request->subcategory_id;
        $input['quantity'] = $request->quantity;
        $input['warn_quantity'] = $request->warn_quantity;
        $input['regular_price_inr'] = $request->regular_price_inr;
        $input['sell_price_inr'] = $request->sell_price_inr;
        $input['regular_price_usd'] = $request->regular_price_usd;
        $input['sell_price_usd'] = $request->sell_price_usd;
        $input['weight_carat'] = $request->weight_carat;
        $input['weight_ratti'] = $request->weight_ratti;
        $input['details'] = $request->details;
        $input['key_feature'] = $request->key_feature;
        $input['description'] = $request->description;
        $input['disclaimer'] = $request->disclaimer;
        $input['url'] = $request->url;
        $input['updated_by'] = $request->user()->_id;
        $input['save_status'] = isset($request->draft)?strtolower($request->draft):'published';
        
        $products->update($input);
        $input = $request->all();
        if(isset($input['energization_enable']) && $input['energization_enable'] == 'energization' && isset($input['energization']) && !empty($input['energization'])){
            EstoreAddon::where(['product_id' => $id, 'type' => 'energization'])->delete();
            foreach($input['energization'] as $energization){
                $energizationData['product_id'] = $id;
                $energizationData['type'] = $request->energization_enable;
                $energizationData['type_id'] = $request->energization_id;
                $energizationData['option'] = $energization['option_name'];
                $energizationData['option_id'] = $energization['option_id'];
                $energizationData['price_inr'] = $energization['price_inr'];
                $energizationData['price_usd'] = $energization['price_usd'];
                EstoreAddon::create($energizationData);
            }
        }else{
            EstoreAddon::where(['product_id' => $id, 'type' => 'energization'])->delete();
        }
        if(isset($input['certification_enable']) && $input['certification_enable'] == 'certification' && isset($input['certification']) && !empty($input['certification'])){
            EstoreAddon::where(['product_id' => $id, 'type' => 'certification'])->delete();
            foreach($input['certification'] as $certification){
                $certificationData['product_id'] = $id;
                $certificationData['type'] = $request->certification_enable;
                $certificationData['type_id'] = $request->certification_id;
                $certificationData['option'] = $certification['option_name'];
                $certificationData['option_id'] = $certification['option_id'];
                $certificationData['price_inr'] = $certification['price_inr'];
                $certificationData['price_usd'] = $certification['price_usd'];
                EstoreAddon::create($certificationData);
            }
        }else{
            EstoreAddon::where(['product_id' => $id, 'type' => 'certification'])->delete();
        }
        if(isset($request->draft)){
            return redirect()->back()
                        ->with('success','Product saved successfully');
        }else{
            return redirect()->route('admin.e-store.index')
                        ->with('success','Product updated successfully');
        }
    }

    public function destroy($id){
    	EStore::where('_id',$id)->delete();
        EstoreAddon::where('product_id',$id)->delete();
        return redirect()->back()->with('success','Product deleted successfully');
    }

    public function statusChange(Request $request){
        foreach($request->product_id as $product_id){
            $sucess= EStore::where('_id',$product_id)->update(['status'=>$request->status]);
        }
        if($sucess){
            echo 'yes';
        }
    }

    public function get_esubcategory(Request $request){
       $subcategory = EstoreSubCategory::where('category_id', $request->id)->where('status','1')->get();
       $html = '<option value="">---Select Sub Category---</option>';
       foreach($subcategory as $subcategory_list){
        $html .= '<option value="'.$subcategory_list->_id.'" cat_id="'.$subcategory_list->category_id.'">'.$subcategory_list->name.'</option>';
       }
       return $html;
    }

    public function removeImage(Request $request){
        $sucess= EStore::where('_id',$request->id)->update([$request->column_name=>null]);
        if($request->path!=''){
            $a = explode("/", $request->path);
            $path = $a['2'].'/'.$a['3'].'/'.$a['4'];
            Storage::disk('public')->delete($path);
        }
        if($sucess){
            echo 'yes';
        }
    }

    /**
    **Estore Category
    **/
    public function eCategory(Request $request){
    	$data = EstoreCategory::query();
        if(isset($request->category) && ($request->category!='')) {
            $data->where('_id', $request->category);
        }
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        $query = $data->orderBy('_id','DESC')->get();
        $categories = EstoreCategory::all();
        return view('admin.estore.categories.index', compact('categories', 'query'));
    }

    public function eCategoryShow(Request $request){
    	
    }

    public function eCategoryCreate(Request $request){
    	return view('admin.estore.categories.create');
    }

    public function eCategoryStore(Request $request){
    	$request->validate([
            'name' => 'required',
        ]);
        
        $input = $request->all();
        $input['created_by'] = $request->user()->_id;
        EstoreCategory::create($input);
        return redirect()->route('admin.e-store-categories')
                        ->with('success','Category created successfully');
    }

    public function eCategoryEdit($id){
    	$category = EstoreCategory::find($id);
        if($category!=null){
            return view('admin.estore.categories.edit',compact('category'));
        }
        return abort(404);
    }

    public function eCategoryUpdate(Request $request){
    	$request->validate([
            'name' => 'required',
        ]);
        $input = $request->all();
        $input['updated_by'] = $request->user()->_id;
        $categories = EstoreCategory::find($request->_id);
        $categories->update($input); 
        return redirect()->route('admin.e-store-categories')
                        ->with('success','Category updated successfully');
    }

    public function eCategoryaDestroy(Request $request){
    	EstoreCategory::where('_id',$request->id)->delete();
        EstoreSubCategory::where('category_id',$request->_id)->delete();
        return redirect()->back()->with('success','Category deleted successfully');
    }

    public function changeEcatStatus(Request $request){
        foreach($request->user_id as $user_id){
            $sucess= EstoreCategory::where('_id',$user_id)->update(['status'=>$request->status]);
        }
        if($sucess){
            echo 'yes';
        }
    }

    /**
    **Estore Sub Category
    **/

    public function eSubCategory(Request $request){
    	$data = EstoreSubCategory::query();
        if(isset($request->category) && ($request->category!='')) {
            $data->where('category_id', $request->category);
        }else{
            return redirect('admin/e-store-categories');
        }
        if(isset($request->subcategory) && ($request->subcategory!='')) {
            $data->where('_id', $request->subcategory);
        }
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        $query = $data->orderBy('_id','DESC')->get();
        $categories = EstoreCategory::find($request->category);
        $subcategories = EstoreSubCategory::where('category_id', $request->category)->get();
        return view('admin.estore.subcategories.index', compact('categories', 'subcategories', 'query'));
    }

    public function eSubCategoryShow(Request $request){
    	
    }

    public function eSubCategoryCreate($id){
    	$categories = EstoreCategory::find($id);
        if($categories!=null){
            return view('admin.estore.subcategories.create', compact('categories'));
        }
        return abort(404);
    }

    public function eSubCategoryStore(Request $request){
    	 $request->validate([
            'name' => 'required',
        ]);
        
        $input = $request->all();
        $input['created_by'] = $request->user()->_id;
        EstoreSubCategory::create($input);
        return redirect()->route('admin.e-store-subcategories', ['category'=>$request->category_id])
                        ->with('success','Subcategory created successfully');
    }

    public function eSubCategoryEdit($id, $category_id){
    	$subcategory = EstoreSubCategory::find($id);
        $categories = EstoreCategory::find($category_id);
        if($categories!=null && $subcategory != null){  
            return view('admin.estore.subcategories.edit',compact('subcategory', 'categories'));
        }
        return abort(404);
    }

    public function eSubCategoryUpdate(Request $request){
    	$request->validate([
            'name' => 'required',
        ]);
        $input = $request->all();
        $input['updated_by'] = $request->user()->_id;
        $subcategories = EstoreSubCategory::find($request->_id);
        $subcategories->update($input);    
        return redirect()->route('admin.e-store-subcategories', ['category'=>$request->category_id])
                        ->with('success','Subcategory updated successfully');
    }

    public function eSubCategoryaDestroy(Request $request){
    	EstoreSubCategory::where('_id',$request->_id)->delete();
        return redirect()->back()->with('success','Subcategory deleted successfully');
    }

    public function changeEsubCatStatus(Request $request){
        foreach($request->id as $id){
            $success= EstoreSubCategory::where('_id',$id)->update(['status'=>$request->status]);
        }
        if($success){
            echo 'yes';
        }
    }
}

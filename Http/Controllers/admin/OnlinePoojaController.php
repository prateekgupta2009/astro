<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Http\FormRequest;
use Validator;
use Auth;
use App\OnlinePooja;
use App\Country;
use App\OnlinePoojaAddon;
use App\OnlinePoojaCategory;
use App\OnlinePoojaAddonLable;
use App\OnlinePoojaAddonValue;

class OnlinePoojaController extends Controller
{

	public function index(Request $request){
    	$data = OnlinePooja::query();
        if(isset($request->product) && ($request->product!='')) {
            $data->where('_id', $request->product);
        }
         if(isset($request->sku) && ($request->sku!='')) {
            $data->where('_id', $request->sku);
        }
         if(isset($request->category) && ($request->category!='')) {
            $data->where('category_id', $request->category);
        }
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        // if(isset($request->search_key) && ($request->search_key!='')) {
        //     $data->where('quantity', $request->search_key);
        // }
        if(isset($request->bhojan) && ($request->bhojan!='')) {
            $data->whereHas('addon_filter', function($q) use($request) {
                $q->where('type', $request->bhojan);
            });
        }
        if(isset($request->dakshina) && ($request->dakshina!='')) {
            $data->whereHas('addon_filter', function($q) use($request) {
                $q->where('type', $request->dakshina);
            });
        }
        $query = $data->orderBy('_id','DESC')->get();
        $products = OnlinePooja::all();
        $categories = OnlinePoojaCategory::where('status','1')->get();
        return view('admin.online_pooja.products.index', compact('products', 'query', 'categories'));
    }

    public function show($id){
        $arrObj['product'] = OnlinePooja::find($id);
        $arrObj['bhojan'] = OnlinePoojaAddon::where(['product_id' => $id, 'type' => 'bhojan'])->get()->toArray();
        $arrObj['dakshina'] = OnlinePoojaAddon::where(['product_id' => $id, 'type' => 'dakshina'])->get()->toArray();
        if($arrObj['product']!=null){
    	   return view('admin.online_pooja.products.show')->with($arrObj);
        }
        return abort(404);
    }

    public function create(Request $request){
    	$categories = OnlinePoojaCategory::where('status','1')->get();
    	$countries = Country::where('status','1')->get();
    	return view('admin.online_pooja.products.create', compact('categories', 'countries'));
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
                'duration_type' => 'required',
                'duration_number' => 'required|numeric',
                'sku' => 'required',            
                'category_id' => 'required',        
                'regular_price_inr' => 'required|numeric|min:0',
                'regular_price_usd' => 'required|numeric|min:0',
                'details' => 'required',
                'file_1' => 'required|mimes:jpeg,jpg,png|max:2048'
            ], [
                'name.required' => 'The Product name field is required.',
                'sku.required' => 'The SKU field is required.',
                'category_id.required' => 'The Category field is required.',           
                'regular_price_inr.required' => 'The Regular price field is required.',
                'regular_price_usd.required' => 'The Regular price field is required.',
            ]);
        }
        if ($request->file()) {
            // Storage::disk('public')->delete('/online_pooja_image/'.$request->sku.'/' . $astrologer->image);
            $fileName_1 = time() . '_' . $request->file_1->getClientOriginalName();
            $filePath_1 = $request->file('file_1')->storeAs('online_pooja_image/'.$request->sku, $fileName_1, 'public');
            $image_1 = $fileName_1;
            $image_path_1 = '/storage/' . $filePath_1;
            if(isset($request->file_2) && $request->file_2 !=null){
                $fileName_2 = time() . '_' . $request->file_2->getClientOriginalName();
                $filePath_2 = $request->file('file_2')->storeAs('online_pooja_image/'.$request->sku, $fileName_2, 'public');
                $image_2 = $fileName_2;
                $image_path_2 = '/storage/' . $filePath_2;
            }
            if(isset($request->file_3) && $request->file_3 !=null){
                $fileName_3 = time() . '_' . $request->file_3->getClientOriginalName();
                $filePath_3 = $request->file('file_3')->storeAs('online_pooja_image/'.$request->sku, $fileName_3, 'public');
                $image_3 = $fileName_3;
                $image_path_3 = '/storage/' . $filePath_3;
            }
            if(isset($request->file_4) && $request->file_4 !=null){
                $fileName_4 = time() . '_' . $request->file_4->getClientOriginalName();
                $filePath_4 = $request->file('file_4')->storeAs('online_pooja_image/'.$request->sku, $fileName_4, 'public');
                $image_4 = $fileName_4;
                $image_path_4 = '/storage/' . $filePath_4;
            }
            if(isset($request->file_5) && $request->file_5 !=null){
                $fileName_5 = time() . '_' . $request->file_5->getClientOriginalName();
                $filePath_5 = $request->file('file_5')->storeAs('online_pooja_image/'.$request->sku, $fileName_5, 'public');
                $image_5 = $fileName_5;
                $image_path_5 = '/storage/' . $filePath_5;
            }
            if(isset($request->file_6) && $request->file_6 !=null){
                $fileName_6 = time() . '_' . $request->file_6->getClientOriginalName();
                $filePath_6 = $request->file('file_6')->storeAs('online_pooja_image/'.$request->sku, $fileName_6, 'public');
                $image_6 = $fileName_6;
                $image_path_6 = '/storage/' . $filePath_6;
            }
            if(isset($request->file_7) && $request->file_7 !=null){
                $fileName_7 = time() . '_' . $request->file_7->getClientOriginalName();
                $filePath_7 = $request->file('file_7')->storeAs('online_pooja_image/'.$request->sku, $fileName_7, 'public');
                $image_7 = $fileName_7;
                $image_path_7 = '/storage/' . $filePath_7;
            }
            if(isset($request->file_8) && $request->file_8 !=null){
                $fileName_8 = time() . '_' . $request->file_8->getClientOriginalName();
                $filePath_8 = $request->file('file_8')->storeAs('online_pooja_image/'.$request->sku, $fileName_8, 'public');
                $image_8 = $fileName_8;
                $image_path_8 = '/storage/' . $filePath_8;
            }
        }
        // dd($request->dakshina_enable);
        if(isset($request->dakshina_enable) && $request->dakshina_enable == 'dakshina' && isset($request->dakshina) && !empty($request->dakshina)){
            $request->validate([
                'dakshina.*.price_inr' => 'required|numeric',
                'dakshina.*.price_usd' => 'required|numeric',
            ]);
        }
        if(isset($request->bhojan_enable) && $request->bhojan_enable == 'bhojan' && isset($request->bhojan) && !empty($request->bhojan)){
            $request->validate([
                'bhojan.*.price_inr' => 'required|numeric',
                'bhojan.*.price_usd' => 'required|numeric',
            ]);
        }
        
        
        $input['name'] = $request->name;
        $input['duration_type'] = $request->duration_type;
        $input['duration_number'] = $request->duration_number;
        $input['sku'] = $request->sku;
        $input['status'] = $request->status;
        $input['category_id'] = $request->category_id;        
        $input['regular_price_inr'] = $request->regular_price_inr;
        $input['sell_price_inr'] = $request->sell_price_inr;
        $input['regular_price_usd'] = $request->regular_price_usd;
        $input['sell_price_usd'] = $request->sell_price_usd;    
        $input['details'] = $request->details;
        $input['benifit'] = $request->benifit;
        $input['description'] = $request->description;        
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
        $product = OnlinePooja::create($input);

        $product_id = $product->_id;
        $input = $request->all();
        if(isset($input['dakshina_enable']) && $input['dakshina_enable'] == 'dakshina' && isset($input['dakshina']) && !empty($input['dakshina'])){
            foreach($input['dakshina'] as $dakshina){
                $dakshinaData['product_id'] = $product_id;
                $dakshinaData['type'] = $request->dakshina_enable;
                $dakshinaData['type_id'] = $request->dakshina_id;
                $dakshinaData['option'] = $dakshina['option_name'];
                $dakshinaData['option_id'] = $dakshina['option_id'];
                $dakshinaData['price_inr'] = $dakshina['price_inr'];
                $dakshinaData['price_usd'] = $dakshina['price_usd'];
                OnlinePoojaAddon::create($dakshinaData);
            }
        }
        if(isset($input['bhojan_enable']) && $input['bhojan_enable'] == 'bhojan' && isset($input['bhojan']) && !empty($input['bhojan'])){
            foreach($input['bhojan'] as $bhojan){
                $bhojanData['product_id'] = $product_id;
                $bhojanData['type'] = $request->bhojan_enable;
                $bhojanData['type_id'] = $request->bhojan_id;
                $bhojanData['option'] = $bhojan['option_name'];
                $bhojanData['option_id'] = $bhojan['option_id'];
                $bhojanData['price_inr'] = $bhojan['price_inr'];
                $bhojanData['price_usd'] = $bhojan['price_usd'];
                OnlinePoojaAddon::create($bhojanData);
            }
        }
        if(isset($request->draft)){
            return redirect('admin/online-pooja/'.$product_id.'/edit')->with('success','Product saved successfully');
        }else{
            return redirect()->route('admin.online-pooja.index')
                        ->with('success','Product created successfully');
        }
    }

    public function edit($id){
    	$product = OnlinePooja::find($id);
        $bhojan = OnlinePoojaAddon::where(['product_id' => $id, 'type' => 'bhojan'])->get()->toArray();
        $dakshina = OnlinePoojaAddon::where(['product_id' => $id, 'type' => 'dakshina'])->get()->toArray();
        $categories = OnlinePoojaCategory::where('status','1')->get();
        $countries = Country::where('status','1')->get();
        if($product!=null){
            return view('admin.online_pooja.products.edit',compact('product', 'countries', 'categories', 'dakshina', 'bhojan'));
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
                'duration_type' => 'required',
                'duration_number' => 'required|numeric',
                'sku' => 'required',            
                'category_id' => 'required',
                'regular_price_inr' => 'required|numeric|min:0',
                'regular_price_usd' => 'required|numeric|min:0',
                'details' => 'required'
            ], [
                'name.required' => 'The Product name field is required.',
                'sku.required' => 'The SKU field is required.',
                'category_id.required' => 'The Category field is required.',
                'regular_price_inr.required' => 'The Regular price field is required.',
                'regular_price_usd.required' => 'The Regular price field is required.',
            ]);
        }
        $products = OnlinePooja::find($id);
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
                $filePath_1 = $request->file('file_1')->storeAs('online_pooja_image/'.$request->sku, $fileName_1, 'public');
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
                $filePath_2 = $request->file('file_2')->storeAs('online_pooja_image/'.$request->sku, $fileName_2, 'public');
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
                $filePath_3 = $request->file('file_3')->storeAs('online_pooja_image/'.$request->sku, $fileName_3, 'public');
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
                $filePath_4 = $request->file('file_4')->storeAs('online_pooja_image/'.$request->sku, $fileName_4, 'public');
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
                $filePath_5 = $request->file('file_5')->storeAs('online_pooja_image/'.$request->sku, $fileName_5, 'public');
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
                $filePath_6 = $request->file('file_6')->storeAs('online_pooja_image/'.$request->sku, $fileName_6, 'public');
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
                $filePath_7 = $request->file('file_7')->storeAs('online_pooja_image/'.$request->sku, $fileName_7, 'public');
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
                $filePath_8 = $request->file('file_8')->storeAs('online_pooja_image/'.$request->sku, $fileName_8, 'public');
                $image_8 = $fileName_8;
                $image_path_8 = '/storage/' . $filePath_8;
                $input['file_8'] = isset($image_path_8)?$image_path_8:null;
            }
        }
        if(isset($request->dakshina_enable) && $request->dakshina_enable == 'dakshina' && isset($request->dakshina) && !empty($request->dakshina)){
            $request->validate([
                'dakshina.*.price_inr' => 'required|numeric',
                'dakshina.*.price_usd' => 'required|numeric',
            ]);
        }
        if(isset($request->bhojan_enable) && $request->bhojan_enable == 'bhojan' && isset($request->bhojan) && !empty($request->bhojan)){
            $request->validate([
                'bhojan.*.price_inr' => 'required|numeric',
                'bhojan.*.price_usd' => 'required|numeric',
            ]);
        }
        //$input = $request->all();
        $input['name'] = $request->name;
        $input['sku'] = $request->sku;
        $input['duration_type'] = $request->duration_type;
        $input['duration_number'] = $request->duration_number;
        $input['status'] = $request->status;
        $input['category_id'] = $request->category_id;
        $input['regular_price_inr'] = $request->regular_price_inr;
        $input['sell_price_inr'] = $request->sell_price_inr;
        $input['regular_price_usd'] = $request->regular_price_usd;
        $input['sell_price_usd'] = $request->sell_price_usd;
        $input['details'] = $request->details;
        $input['benifit'] = $request->benifit;
        $input['description'] = $request->description;
        $input['url'] = $request->url;
        $input['updated_by'] = $request->user()->_id;
        $input['save_status'] = isset($request->draft)?strtolower($request->draft):'published';
        
        $products->update($input);
        $input = $request->all();
        if(isset($input['dakshina_enable']) && $input['dakshina_enable'] == 'dakshina' && isset($input['dakshina']) && !empty($input['dakshina'])){
            OnlinePoojaAddon::where(['product_id' => $id, 'type' => 'dakshina'])->delete();
            foreach($input['dakshina'] as $dakshina){
                $dakshinaData['product_id'] = $id;
                $dakshinaData['type'] = $request->dakshina_enable;
                $dakshinaData['type_id'] = $request->dakshina_id;
                $dakshinaData['option'] = $dakshina['option_name'];
                $dakshinaData['option_id'] = $dakshina['option_id'];
                $dakshinaData['price_inr'] = $dakshina['price_inr'];
                $dakshinaData['price_usd'] = $dakshina['price_usd'];
                OnlinePoojaAddon::create($dakshinaData);
            }
        }else{
            OnlinePoojaAddon::where(['product_id' => $id, 'type' => 'dakshina'])->delete();
        }
        if(isset($input['bhojan_enable']) && $input['bhojan_enable'] == 'bhojan' && isset($input['bhojan']) && !empty($input['bhojan'])){
            OnlinePoojaAddon::where(['product_id' => $id, 'type' => 'bhojan'])->delete();
            foreach($input['bhojan'] as $bhojan){
                $bhojanData['product_id'] = $id;
                $bhojanData['type'] = $request->bhojan_enable;
                $bhojanData['type_id'] = $request->bhojan_id;
                $bhojanData['option'] = $bhojan['option_name'];
                $bhojanData['option_id'] = $bhojan['option_id'];
                $bhojanData['price_inr'] = $bhojan['price_inr'];
                $bhojanData['price_usd'] = $bhojan['price_usd'];
                OnlinePoojaAddon::create($bhojanData);
            }
        }else{
            OnlinePoojaAddon::where(['product_id' => $id, 'type' => 'bhojan'])->delete();
        }
        if(isset($request->draft)){
            return redirect()->back()
                        ->with('success','Product saved successfully');
        }else{
            return redirect()->route('admin.online-pooja.index')
                        ->with('success','Product updated successfully');
        }
    }

    public function destroy($id){
    	OnlinePooja::where('_id',$id)->delete();
        OnlinePoojaAddon::where('product_id',$id)->delete();
        return redirect()->back()->with('success','Product deleted successfully');
    }

    public function statusChange(Request $request){
        foreach($request->product_id as $product_id){
            $sucess= OnlinePooja::where('_id',$product_id)->update(['status'=>$request->status]);
        }
        if($sucess){
            echo 'yes';
        }
    }

    public function removeImage(Request $request){
        $sucess= OnlinePooja::where('_id',$request->id)->update([$request->column_name=>null]);
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
    ** Category
    **/
    public function onlinePoojaCategory(Request $request){
    	$data = OnlinePoojaCategory::query();
        if(isset($request->category) && ($request->category!='')) {
            $data->where('_id', $request->category);
        }
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        $query = $data->orderBy('_id','DESC')->get();
        $categories = OnlinePoojaCategory::all();
        return view('admin.online_pooja.categories.index', compact('categories', 'query'));
    }

    public function eCategoryShow(Request $request){
    	
    }

    public function onlinePoojaCategoryCreate(Request $request){
    	return view('admin.online_pooja.categories.create');
    }

    public function onlinePoojaCategoryStore(Request $request){
    	$request->validate([
            'name' => 'required',
        ]);
        
        $input = $request->all();
        $input['created_by'] = $request->user()->_id;
        OnlinePoojaCategory::create($input);
        return redirect()->route('admin.online-pooja-categories')
                        ->with('success','Category created successfully');
    }

    public function onlinePoojaCategoryEdit($id){
    	$category = OnlinePoojaCategory::find($id);
        if($category!=null){
            return view('admin.online_pooja.categories.edit',compact('category'));
        }
        return abort(404);
    }

    public function onlinePoojaCategoryUpdate(Request $request){
    	$request->validate([
            'name' => 'required',
        ]);
        $input = $request->all();
        $input['updated_by'] = $request->user()->_id;
        $categories = OnlinePoojaCategory::find($request->_id);
        $categories->update($input); 
        return redirect()->route('admin.online-pooja-categories')
                        ->with('success','Category updated successfully');
    }

    public function onlinePoojaCategoryaDestroy(Request $request){
    	OnlinePoojaCategory::where('_id',$request->id)->delete();
        return redirect()->back()->with('success','Category deleted successfully');
    }

    public function changePoojaStatus(Request $request){
        foreach($request->user_id as $user_id){
            $sucess= OnlinePoojaCategory::where('_id',$user_id)->update(['status'=>$request->status]);
        }
        if($sucess){
            echo 'yes';
        }
    }

    /**
    ** Addons
    **/
    public function addonLabels(Request $request){
    	$data = OnlinePoojaAddonLable::query();
        if(isset($request->addonlabels) && ($request->addonlabels!='')) {
            $data->where('_id', $request->addonlabels);
        }
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        $query = $data->orderBy('_id','DESC')->get();
        $label = OnlinePoojaAddonLable::all();
        return view('admin.online_pooja.addons.addon_lable', compact('label', 'query'));
    }

    public function addonValue(Request $request){
    	$data = OnlinePoojaAddonValue::query();

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
        $labels = OnlinePoojaAddonLable::find($request->addlabel);
        $value = OnlinePoojaAddonValue::where('addonlabel_id', $request->addlabel)->get();
        return view('admin.online_pooja.addons.index', compact('labels','value', 'query'));
    }

    public function addonValueShow(Request $request){

    }

    public function addonValueCreate($id){
    	$labels = OnlinePoojaAddonLable::find($id);
        if($labels!=null){
    	   return view('admin.online_pooja.addons.create', compact('labels'));
        }
        return abort(404);
    }

    public function addonValueStore(Request $request){
    	$request->validate([
            'name' => 'required',
        ]);

        $input = $request->all();
        $input['created_by'] = $request->user()->_id;
        OnlinePoojaAddonValue::create($input);
        return redirect()->route('admin.online-pooja-addonvalue', ['addlabel'=>$request->addonlabel_id])
                        ->with('success','Value created successfully');
    }

    public function addonValueEdit($id, $lab_id){
    	$product = OnlinePoojaAddonValue::find($id);
    	$labels = OnlinePoojaAddonLable::find($lab_id);
        if($product!=null && $labels != null){
            return view('admin.online_pooja.addons.edit',compact('product', 'labels'));
        }
        return abort(404);
    }

    public function addonValueUpdate(Request $request){
    	$request->validate([
            'name' => 'required',
        ]);
        $input = $request->all();
        $input['updated_by'] = $request->user()->_id;
        $products = OnlinePoojaAddonValue::find($request->_id);
        $products->update($input);
        return redirect()->route('admin.online-pooja-addonvalue', ['addlabel'=>$request->addonlabel_id])
                        ->with('success','Value updated successfully');
    }

    public function addonValueaDestroy(Request $request){
    	$language = OnlinePoojaAddonValue::where('_id',$request->id)->delete();
        return redirect()->back()->with('success','Value deleted successfully');
    }

    public function changeAddonLableStatus(Request $request){
    	foreach($request->user_id as $user_id){
    		$sucess= OnlinePoojaAddonValue::where('_id',$user_id)->update(['status'=>$request->status]);
        }
        if($sucess){
            echo 'yes';
        }
    }
}

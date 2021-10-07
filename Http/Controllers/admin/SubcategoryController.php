<?php
    
namespace App\Http\Controllers\Admin;
    
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Http\Controllers\Controller;
use Validator;
use Auth;
use DB;
use App\Category;
use App\Subcategory;
    
class SubcategoryController extends Controller
{
    
    public function index(Request $request)
    {
        $data = Subcategory::query();
        if(isset($request->category) && ($request->category!='')) {
            $data->where('category_id', $request->category);
        }else{
            return redirect('admin/categories');
        }
        if(isset($request->subcategory) && ($request->subcategory!='')) {
            $data->where('_id', $request->subcategory);
        }
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        $query = $data->orderBy('_id','DESC')->get();
        $categories = Category::find($request->category);
        $subcategories = Subcategory::where('category_id', $request->category)->get();
        return view('admin.subcategories.index', compact('categories', 'subcategories', 'query'));
    }

    public function create($id)
    {   
        $categories = Category::find($id);
        if($categories!=null){
            return view('admin.subcategories.create', compact('categories'));
        }
        return abort(404);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);        
        $input = $request->all();
        $input['created_by'] = $request->user()->_id;
        Subcategory::create($input);
        return redirect()->route('admin.subcategories',['category'=>$request->category_id])
                        ->with('success','Subcategory created successfully');
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);
        $input = $request->all();
        $input['updated_by'] = $request->user()->_id;
        $subcategories = Subcategory::find($request->_id);
        $subcategories->update($input);    
        return redirect()->route('admin.subcategories',['category'=>$request->category_id])
                        ->with('success','Subcategory updated successfully');
    }

    public function edit($id, $category_id)
    { 
        $subcategory = Subcategory::find($id);
        $categories = Category::find($category_id);
        if($categories!=null && $subcategory != null){  
            return view('admin.subcategories.edit',compact('subcategory', 'categories'));
        }
        return abort(404);
    }

    public function destroy(Request $request)
    {
        Subcategory::where('_id',$request->_id)->delete();
        return redirect()->back()->with('success','Subcategory deleted successfully');
    }

    public function changeStatus(Request $request){
        foreach($request->id as $id){
            $success= Subcategory::where('_id',$id)->update(['status'=>$request->status]);
        }
        if($success){
            echo 'yes';
        }
    }
}
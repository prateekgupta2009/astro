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
    
class CategoryController extends Controller
{
    
    public function index(Request $request)
    {
        $data = Category::query();
        if(isset($request->category) && ($request->category!='')) {
            $data->where('_id', $request->category);
        }
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        $query = $data->orderBy('_id','DESC')->get();
        $categories = Category::all();
        return view('admin.categories.index', compact('categories', 'query'));
    }

    public function create()
    {   
        return view('admin.categories.create');
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);
        
        $input = $request->all();
        $input['created_by'] = $request->user()->_id;
        Category::create($input);
        return redirect()->route('admin.categories')
                        ->with('success','Category created successfully');
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);
        $input = $request->all();
        $input['updated_by'] = $request->user()->_id;
        $categories = Category::find($request->_id);
        $categories->update($input);    
        return redirect()->route('admin.categories')
                        ->with('success','Category updated successfully');
    }

    public function edit($id)
    { 
        $category = Category::find($id);
        if($category!=null){  
            return view('admin.categories.edit',compact('category'));
        }
        return abort(404);
    }

    public function destroy(Request $request)
    {
        Category::where('_id',$request->_id)->delete();
        Subcategory::where('category_id',$request->_id)->delete();
        return redirect()->back()->with('success','Category deleted successfully');
    }

    public function changeStatus(Request $request){
        foreach($request->user_id as $user_id){
            $sucess= Category::updateOrCreate(
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
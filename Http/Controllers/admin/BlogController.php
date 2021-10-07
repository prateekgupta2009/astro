<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Blog;
use App\BlogAuthor;
use App\BlogCategory;
use App\BlogSubcategory;

class BlogController extends Controller
{
	/**
    **Blogs Authors
    **/
    public function getAuthor(Request $request){
    	$data = BlogAuthor::query();
        if(isset($request->author) && ($request->author!='')) {
            $data->where('_id', $request->author);
        }
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        $query = $data->orderBy('_id','DESC')->get();
        $authors = BlogAuthor::all();
        return view('admin.blogs.authors.index', compact('authors', 'query'));
    }

    public function createAuthor(){
    	return view('admin.blogs.authors.create');
    }

    public function storeAuthor(Request $request){
    	$request->validate([
            'name' => 'required',
        ]);
        
        $input = $request->all();
        $input['created_by'] = $request->user()->_id;
        BlogAuthor::create($input);
        return redirect()->route('admin.blog-authors')
                        ->with('success','Author created successfully');
    }

    public function editAuthor($id){
    	$author = BlogAuthor::find($id);
        if($author!=null){
            return view('admin.blogs.authors.edit',compact('author'));
        }
        return abort(404);
    }

    public function updateAuthor(Request $request){
    	$request->validate([
            'name' => 'required',
        ]);
        $input = $request->all();
        $input['updated_by'] = $request->user()->_id;
        $authors = BlogAuthor::find($request->_id);
        $authors->update($input); 
        return redirect()->route('admin.blog-authors')
                        ->with('success','Author updated successfully');
    }

    public function destroyAuthor(Request $request){
    	BlogAuthor::where('_id',$request->id)->delete();
        return redirect()->back()->with('success','Author deleted successfully');
    }

    public function statusChangeAuthor(Request $request){
        foreach($request->user_id as $user_id){
            $sucess= BlogAuthor::where('_id',$user_id)->update(['status'=>$request->status]);
        }
        if($sucess){
            echo 'yes';
        }
    }

	/**
    **Blogs Category
    **/
    public function getBlogCategory(Request $request){
    	$data = BlogCategory::query();
        if(isset($request->category) && ($request->category!='')) {
            $data->where('_id', $request->category);
        }
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        $query = $data->orderBy('_id','DESC')->get();
        $categories = BlogCategory::all();
        return view('admin.blogs.categories.index', compact('categories', 'query'));
    }

    public function createBlogCategory(){
    	return view('admin.blogs.categories.create');
    }

    public function storeBlogCategory(Request $request){
    	$request->validate([
            'name' => 'required',
        ]);
        
        $input = $request->all();
        $input['created_by'] = $request->user()->_id;
        BlogCategory::create($input);
        return redirect()->route('admin.blog-categories')
                        ->with('success','Category created successfully');
    }

    public function editBlogCategory($id){
    	$category = BlogCategory::find($id);
        if($category!=null){
            return view('admin.blogs.categories.edit',compact('category'));
        }
        return abort(404);
    }

    public function updateBlogCategory(Request $request){
    	$request->validate([
            'name' => 'required',
        ]);
        $input = $request->all();
        $input['updated_by'] = $request->user()->_id;
        $categories = BlogCategory::find($request->_id);
        $categories->update($input); 
        return redirect()->route('admin.blog-categories')
                        ->with('success','Category updated successfully');
    }

    public function destroyBlogCategory(Request $request){
    	BlogCategory::where('_id',$request->id)->delete();
        BlogSubcategory::where('category_id',$request->_id)->delete();
        return redirect()->back()->with('success','Category deleted successfully');
    }

    public function statusChangeBlogCategory(Request $request){
        foreach($request->user_id as $user_id){
            $sucess= BlogCategory::where('_id',$user_id)->update(['status'=>$request->status]);
        }
        if($sucess){
            echo 'yes';
        }
    }

    /**
    **Blogs Sub Category
    **/
    public function getBlogSubcategory(Request $request){
    	$data = BlogSubcategory::query();
        if(isset($request->category) && ($request->category!='')) {
            $data->where('category_id', $request->category);
        }else{
            return redirect('admin/blog-categories');
        }
        if(isset($request->subcategory) && ($request->subcategory!='')) {
            $data->where('_id', $request->subcategory);
        }
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        $query = $data->orderBy('_id','DESC')->get();
        $categories = BlogCategory::find($request->category);
        $subcategories = BlogSubcategory::where('category_id', $request->category)->get();
        return view('admin.blogs.subcategories.index', compact('categories', 'subcategories', 'query'));
    }

    public function createBlogSubcategory($id){
    	$categories = BlogCategory::find($id);
        if($categories!=null){
            return view('admin.blogs.subcategories.create', compact('categories'));
        }
        return abort(404);
    }

    public function storeBlogSubcategory(Request $request){
    	 $request->validate([
            'name' => 'required',
        ]);
        
        $input = $request->all();
        $input['created_by'] = $request->user()->_id;
        BlogSubcategory::create($input);
        return redirect()->route('admin.blog-subcategories', ['category'=>$request->category_id])
                        ->with('success','Subcategory created successfully');
    }

    public function editBlogSubcategory($id, $category_id){
    	$subcategory = BlogSubcategory::find($id);
        $categories = BlogCategory::find($category_id);
        if($categories!=null && $subcategory != null){  
            return view('admin.blogs.subcategories.edit',compact('subcategory', 'categories'));
        }
        return abort(404);
    }

    public function updateBlogSubcategory(Request $request){
    	$request->validate([
            'name' => 'required',
        ]);
        $input = $request->all();
        $input['updated_by'] = $request->user()->_id;
        $subcategories = BlogSubcategory::find($request->_id);
        $subcategories->update($input);    
        return redirect()->route('admin.blog-subcategories', ['category'=>$request->category_id])
                        ->with('success','Subcategory updated successfully');
    }

    public function destroyBlogSubcategory(Request $request){
    	BlogSubcategory::where('_id',$request->_id)->delete();
        return redirect()->back()->with('success','Subcategory deleted successfully');
    }

    public function statusChangeBlogSubcategory(Request $request){
        foreach($request->id as $id){
            $success= BlogSubcategory::where('_id',$id)->update(['status'=>$request->status]);
        }
        if($success){
            echo 'yes';
        }
    }

    /**
    **Manage Blogs
    **/
    public function index(Request $request){
    	$data = Blog::query();
        if(isset($request->blog) && ($request->blog!='')) {
            $data->where('_id', $request->blog);
        }
        if(isset($request->author) && ($request->author!='')) {
            $data->where('author_id', $request->author);
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
        $query = $data->orderBy('_id','DESC')->get();
        $blogs = Blog::all();
        $authors = BlogAuthor::where('status','1')->get();
        $categories = BlogCategory::where('status','1')->get();
        $subcategories = BlogSubcategory::where('status','1')->get();
        return view('admin.blogs.index', compact('blogs', 'query', 'categories', 'subcategories', 'authors'));
    }

    public function show($id){
        $arrObj['blogs'] = Blog::find($id);
        if($arrObj['blogs']!=null){
    	   return view('admin.blogs.show')->with($arrObj);
        }
        return abort(404);
    }

    public function create(Request $request){
    	$categories = BlogCategory::where('status','1')->get();
    	$subcategories = BlogSubcategory::where('status','1')->get();
    	$authors = BlogAuthor::where('status','1')->get();
    	return view('admin.blogs.create', compact('categories', 'subcategories', 'authors'));
    }

    public function store(Request $request){
        if(isset($request->draft) && $request->draft == 'Draft'){
            $request->validate([
                'title' => 'required'
            ], [
                'title.required' => 'The Blog title field is required.'
            ]);
        }else{
        	$request->validate([
                'title' => 'required',          
                'category_id' => 'required',
                'author_id' => 'required',
                'description' => 'required',
                'image' => 'required|mimes:jpeg,jpg,png|max:2048'
            ]);
        }
        if ($request->file()) {
            $fileName_1 = time() . '_' . $request->image->getClientOriginalName();
            $filePath_1 = $request->file('image')->storeAs('blog_images', $fileName_1, 'public');
            $image_1 = $fileName_1;
            $image_path_1 = '/storage/' . $filePath_1;
        }
        $input = $request->all();  
        unset($input['draft']);
        $input['image'] = isset($image_path_1)?$image_path_1:null;
        $input['created_by'] = $request->user()->_id;
        $input['save_status'] = isset($request->draft)?strtolower($request->draft):'published';
        $blog = Blog::create($input);

        $blog_id = $blog->_id;
        if(isset($request->draft)){
            return redirect('admin/blogs/'.$blog_id.'/edit')->with('success','Blog saved successfully');
        }else{
            return redirect()->route('admin.blogs.index')
                        ->with('success','Blog created successfully');
        }
    }

    public function edit($id){
    	$blog = Blog::find($id);
        $categories = BlogCategory::where('status','1')->get();
        $subcategories = BlogSubcategory::where('category_id', $blog['category_id'])->where('status','1')->get();
        $authors = BlogAuthor::where('status','1')->get();
        if($blog!=null){
            return view('admin.blogs.edit',compact('blog', 'authors', 'categories', 'subcategories'));
        }
        return abort(404);
    }

    public function update(Request $request, $id){
        if(isset($request->draft) && $request->draft == 'Draft'){
            $request->validate([
                'title' => 'required'
            ], [
                'title.required' => 'The Blog title field is required.'
            ]);
        }else{
        	$request->validate([
                'title' => 'required',          
                'category_id' => 'required',
                'author_id' => 'required',
                'description' => 'required',
            ]);
        }
        $blog = Blog::find($id);
        $input = $request->all();
        if($blog->image==null && !isset($request->draft)){
            $request->validate([
                'image' => 'required|mimes:jpeg,jpg,png|max:2048'
            ]);
        }
        if ($request->file()) {
        	if($blog->image!=null){
                $path = str_replace('/storage', '', $blog->image);
	            Storage::disk('public')->delete($path);
            }
            $fileName_1 = time() . '_' . $request->image->getClientOriginalName();
            $filePath_1 = $request->file('image')->storeAs('blog_images', $fileName_1, 'public');
            $image_1 = $fileName_1;
            $image_path_1 = '/storage/' . $filePath_1;
            $input['image'] = isset($image_path_1)?$image_path_1:null;
        }
          
        unset($input['draft']);
        
        $input['created_by'] = $request->user()->_id;
        $input['save_status'] = isset($request->draft)?strtolower($request->draft):'published';
        $blog = $blog->update($input);
        if(isset($request->draft)){
            return redirect()->back()->with('success','Blog saved successfully');
        }else{
            return redirect()->route('admin.blogs.index')
                        ->with('success','Blog updated successfully');
        }
    }

    public function destroy($id){
    	$blog = Blog::find($id);
    	if($blog->image!=null){
        	$path = str_replace('/storage', '', $blog->image);
            Storage::disk('public')->delete($path);
        }
    	Blog::where('_id',$id)->delete();
        return redirect()->back()->with('success','Blog deleted successfully');
    }

    public function removeFile(Request $request){
        $sucess= Blog::where('_id',$request->id)->update([$request->column_name=>null]);
        if($request->path!=''){
            $path = str_replace('/storage', '', $request->path);
            Storage::disk('public')->delete($path);
        }
        if($sucess){
            echo 'yes';
        }
    }

    public function statusChange(Request $request){
        foreach($request->blog_id as $blog_id){
            $sucess= Blog::where('_id',$blog_id)->update(['status'=>$request->status]);
        }
        if($sucess){
            echo 'yes';
        }
    }

    public function get_subcategory(Request $request){
       $subcategory = BlogSubcategory::where('category_id', $request->id)->where('status','1')->get();
       $html = '<option value="">Select Subcategory</option>';
       foreach($subcategory as $subcategory_list){
        $html .= '<option value="'.$subcategory_list->_id.'" cat_id="'.$subcategory_list->category_id.'">'.$subcategory_list->name.'</option>';
       }
       return $html;
    }
}

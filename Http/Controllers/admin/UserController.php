<?php
    
namespace App\Http\Controllers\Admin;
    
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Http\Controllers\Controller;
use App\User;
use App\UserType;
use Maklad\Permission\Models\Role;
use Maklad\Permission\Models\Permission;
use DB;
use Hash;
use Validator;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\Admin\StoreRolesRequest;
use App\Http\Requests\Admin\UpdateRolesRequest;
    
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // dd($request);
        $data = User::query();
        if (isset($request->search_name) && ($request->search_name != '')) {
            $data->where(function ($qry) use($request) {
                $qry->where('name', 'like', '%' . $request->search_name . '%');
            });
        }
        if (isset($request->search_phone) && ($request->search_phone != '')) {
            $data->where(function ($qry) use($request) {
                $qry->where('mobile', 'like', '%' . $request->search_phone . '%');
            });
        }
        if (isset($request->search_email) && ($request->search_email != '')) {
            $data->where(function ($qry) use($request) {
                $qry->where('email', 'like', '%' . $request->search_email . '%');
            });
        }
        if (isset($request->address) && ($request->address != '')) {
            $data->where(function ($qry) use($request) {
                $qry->where('address', 'like', '%' . $request->address . '%');
            });
        }
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        if(isset($request->user_type) && ($request->user_type!='')) {
            $data->where('user_type', $request->user_type);
        }
        if(isset($request->role) && ($request->role!='')) {
            $data->where('role', $request->role);
        }
        $data = $data->orderBy('id','DESC')->get();
        $userType = UserType::all();
        $roles = Role::all();
        return view('admin.users.index',compact('data','userType','roles'));
    }
    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $user_type = UserType::pluck('name','_id')->all();
        $roles = Role::pluck('name','_id')->all();
        return view('admin.users.create',compact('user_type', 'roles'));
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|same:confirm-password',
            'gender' => 'required',
            'dob' => 'required',
            'religion' => 'required',
            'address' => 'required',
            'mobile' => 'required',
        ]);
        
        $input = $request->all();
        //dd($input);
        unset($input['confirm-password']);
        $input['password'] = Hash::make($input['password']);
        
        $user = User::create($input);
       //$user->assignRole($request->input('roles'));
    
        return redirect()->route('admin.users.index')
                        ->with('success','User created successfully');
    }
    
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);
        return view('admin.users.show',compact('user'));
    }
    
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    { 
        $user = User::find($id);
        $user_type = UserType::pluck('name','_id')->all();
        //$userRole = $user->roles->pluck('name','name')->all();
        $roles = Role::pluck('name','_id')->all();
    
        return view('admin.users.edit',compact('user', 'user_type', 'roles'));
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,'.$id,
            'password' => 'same:confirm-password',
            'gender' => 'required',
            'dob' => 'required',
            'religion' => 'required',
            'address' => 'required',
            'mobile' => 'required',
        ]);
    
        $input = $request->all();
        if(!empty($input['password'])){ 
            $input['password'] = Hash::make($input['password']);
        }else{
            $input = Arr::except($input,array('password'));    
        }
    
        $user = User::find($id);
        $user->update($input);
        //DB::table('model_has_roles')->where('model_id',$id)->delete();
    
        //$user->assignRole($request->input('roles'));
    
        return redirect()->route('admin.users.index')
                        ->with('success','User updated successfully');
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        User::find($id)->delete();
        return redirect()->route('admin.users.index')
                        ->with('success','User deleted successfully');
    }

    public function changeStatus(Request $request){
        foreach($request->user_id as $user_id){
            $success= User::where('_id',$user_id)->update(['status'=>$request->status]);
        }
        if($success){
            echo 'yes';
        }
    }
}
<?php
    
namespace App\Http\Controllers\Admin;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Maklad\Permission\Models\Role;
use Maklad\Permission\Models\Permission;
use DB;
use App\UserType;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\Admin\StoreRolesRequest;
use App\Http\Requests\Admin\UpdateRolesRequest;
    
class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    function __construct()
    {
         // $this->middleware('permission:role-list|role-create|role-edit|role-delete', ['only' => ['index','store']]);
         // $this->middleware('permission:role-create', ['only' => ['create','store']]);
         // $this->middleware('permission:role-edit', ['only' => ['edit','update']]);
         // $this->middleware('permission:role-delete', ['only' => ['destroy']]);
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user_type = UserType::pluck('name','_id')->all();
        $roles = Role::all();
        $data = Role::query();
        // if(isset($request->status) && ($request->status!='')) {
        //     $data->where('status', $request->status);
        // }
        if(isset($request->user_type) && ($request->user_type!='')) {
            $data->where('user_type', $request->user_type);
        }
        if(isset($request->role) && ($request->role!='')) {
            $data->where('_id', $request->role);
        }
        $data = $data->orderBy('id','DESC')->get();
        return view('admin.roles.index', compact('data', 'user_type', 'roles'));
    }
    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $permission = Permission::get();
        return view('admin.roles.create',compact('permission'));
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRolesRequest $request)
    {
    //dd($request);
        $this->validate($request, [
            'name' => 'required|unique:roles,name',
            //'permission' => 'required',
        ]);
        // $input = $request->all();
        // $role = Role::firstOrCreate($input);
        //$role->syncPermissions($request->input('permission'));
        $role = new Role();
        $role->user_type = $request->input('user_type');
        $role->name = $request->input('name');
        $role->guard_name = 'web';
        $role->save();
    
        return redirect()->back()->with('success','Role created successfully');
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $role = Role::find($id);
        $rolePermissions = Permission::join("role_has_permissions","role_has_permissions.permission_id","=","permissions.id")
            ->where("role_has_permissions.role_id",$id)
            ->get();
    
        return view('roles.show',compact('role','rolePermissions'));
    }
    
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $role = Role::find($id);
        $user_type = UserType::pluck('name','_id')->all();
        return view('admin.roles.edit',compact('role','user_type'));
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
        
        $this->validate($request, [
            'name' => 'required',
            //'permission' => 'required',
        ]);
    
        $role = Role::find($id);
        $role->user_type = $request->input('user_type');
        $role->name = $request->input('name');
        $role->save();
    
        $role->syncPermissions($request->input('permission'));
    
        return redirect()->route('admin.role.index')
                        ->with('success','Role updated successfully');
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::table("roles")->where('_id',$id)->delete();
        DB::table('users')->where('role', $id)->update(array('status' => 0));
        return redirect()->route('admin.role.index')
                        ->with('success','Role deleted successfully');
    }
}
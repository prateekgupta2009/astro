<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Maklad\Permission\Models\Role;
use Maklad\Permission\Models\Permission;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\Admin\StorePermissionsRequest;
use App\Http\Requests\Admin\UpdatePermissionsRequest;
use DB;
use App\UserType;
use App\Page;
use Maklad\Permission\Traits\HasRoles;

class PermissionsController extends Controller
{
    /**
     * Display a listing of Permission.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // if (! Gate::allows('users_manage')) {
        //     return abort(401);
        // }

        $permissions = Permission::all()->groupBy(function($permission){
            return explode('.', $permission->name)[0]??null;
        });
        $roles = Role::all();
        //dd($permissions);
        return view('admin.permissions.index', compact('permissions', 'roles'));
    }

    /**
     * Show the form for creating new Permission.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // if (! Gate::allows('users_manage')) {
        //     return abort(401);
        // }
        return view('admin.permissions.create');
    }

    /**
     * Store a newly created Permission in storage.
     *
     * @param  \App\Http\Requests\StorePermissionsRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePermissionsRequest $request)
    {
        if (! Gate::allows('users_manage')) {
            return abort(401);
        }
        Permission::create($request->all());

        $per = new Permission;
        $per->xyz="";
        $per->save();

        return redirect()->route('admin.permissions.index');
    }


    /**
     * Show the form for editing Permission.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // if (! Gate::allows('users_manage')) {
        //     return abort(401);
        // }
        $permissions = Permission::all()->groupBy(function($permission){
            return explode('.', $permission->name)[0]??null;
        });
        //dd($permissions);
        $role = Role::find($id);
        
        // $has_permission = Role::where('role_ids',[$id])->get();
        // dd($has_permission);

        return view('admin.permissions.edit', compact('permissions', 'role'));
    }

    /**
     * Update Permission in storage.
     *
     * @param  \App\Http\Requests\UpdatePermissionsRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePermissionsRequest $request, Permission $permission)
    {
        if (! Gate::allows('users_manage')) {
            return abort(401);
        }

        $permission->update($request->all());

        return redirect()->route('admin.permissions.index');
    }


    /**
     * Remove Permission from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Permission $permission)
    {
        if (! Gate::allows('users_manage')) {
            return abort(401);
        }

        $permission->delete();

        return redirect()->route('admin.permissions.index');
    }

    public function show(Permission $permission)
    {
        if (! Gate::allows('users_manage')) {
            return abort(401);
        }

        return view('admin.permissions.show', compact('permission'));
    }

    /**
     * Delete all selected Permission at once.
     *
     * @param Request $request
     */
    public function massDestroy(Request $request)
    {
        Permission::whereIn('id', request('ids'))->delete();

        return response()->noContent();
    }

    public function give_permission(Request $request){
        // foreach($request->input('permission') as $name){
        //     Permission::firstOrCreate(['name' => $name, 'guard_name' => 'web']);
        // }
        $role = Role::firstOrCreate(['_id' => $request->role_id]);
        $role->syncPermissions($request->input('permission'));
        return redirect()->back()->with('success','Access Control added successfully');
    }

    public function addPageName(){
        $pagename = Page::get();
        return view('admin.permissions.pagename', compact('pagename'));
    }

    public function addpage(Request $request){
        $this->validate($request, [
            'name' => 'required|unique:pages,name',
            //'permission' => 'required',
        ]);
        $page = new Page();
        $page->name = $request->input('name');
        $page->save();

        for($i=1;$i<=3;$i++){
            if($i==1){
                $name = $request->input('name').'.read';
            }
            if($i==2){
                $name = $request->input('name').'.write';
            }
            if($i==3){
                $name = $request->input('name').'.full';
            }
            $permission = new Permission();
            $permission->name = $name;
            $permission->guard_name = 'web';
            $permission->save();
        }

        return redirect()->back()->with('success','Page added successfully');
    }

}

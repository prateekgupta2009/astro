<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Cms;

class CmsController extends Controller
{
    public function getAboutPages(){
    	return view('admin.cms.about_us.main');
    }

    public function getNoticePages(){
    	return view('admin.cms.notice.main');
    }

    public function getHelpfulInfoPages(){
    	return view('admin.cms.helpful_info.main');
    }

    // About Us
    public function getCompanyInfoPages(){
    	return view('admin.cms.about_us.company_info.home');
    }

    public function getContactUsPages(){
    	return view('admin.cms.about_us.contact_us.home');
    }

    public function getfaqPages(){
    	return view('admin.cms.about_us.faq.home');
    }

    // Helpful
    public function getCopyrightNoticePages(){
        return view('admin.cms.helpful_info.copyright_notice.home');
    }

    public function getPrivacyPolicyPages(){
        return view('admin.cms.helpful_info.privacy_policy.home');
    }

    public function getRefundPolicyPages(){
        return view('admin.cms.helpful_info.refund_policy.home');
    }

    // Notice
    public function getDisclaimerPages(){
        return view('admin.cms.notice.disclaimer.home');
    }

    public function getSitemapPages(){
        return view('admin.cms.notice.sitemap.home');
    }

    public function getTermsPages(){
        return view('admin.cms.notice.terms.home');
    }

    /**
    **Company Info
    **/
    public function indexCompanyInfo(Request $request){
    	$data = Cms::query();
        $data->where('page_type', $request->segment(2));
        if(isset($request->page_info) && ($request->page_info!='')) {
            $data->where('_id', $request->page_info);
        }
        if(isset($request->status) && ($request->status!='')) {
             $data->where('status', $request->status);
        }
        $query = $data->orderBy('_id','DESC')->get();
        $pages_info = Cms::where('page_type', $request->segment(2))->get();
        return view('admin.cms.pages.index', compact('pages_info', 'query'));
    }

    public function createCompanyInfo(){
    	return view('admin.cms.pages.create');
    }

    public function storeCompanyInfo(Request $request){
    	$request->validate([
            'title' => 'required',
            'status' => 'required',
            'description' => 'required',
            // 'image' => 'required|mimes:jpeg,jpg,png|max:2048'
        ]);

        $input = $request->all();
        if ($request->file()) {
            $fileName_1 = time() . '_' . $request->image->getClientOriginalName();
            $filePath_1 = $request->file('image')->storeAs('cms_pages/'.$input['page_type'], $fileName_1, 'public');
            $image_1 = $fileName_1;
            $image_path_1 = '/storage/' . $filePath_1;
            $input['image'] = $image_1;
            $input['image_path'] = $image_path_1;
        }
        $input['created_by'] = $request->user()->_id;
        $cms_page = Cms::create($input);
        if($input['status'] == '1' && $input['page_type'] != 'faq'){
            Cms::where('_id','!=',$cms_page->_id)->where('page_type',$input['page_type'])->update(['status'=>'0']);
        }

                return redirect()->route('admin.'.$request->segment(2))
                        ->with('success','Page created successfully');

    }

    public function editCompanyInfo($id){
    	$page = Cms::find($id);
        if($page!=null){
            return view('admin.cms.pages.edit',compact('page'));
        }
        return abort(404);
    }

    public function updateCompanyInfo(Request $request){
    	$request->validate([
            'title' => 'required'
        ]);
        $input = $request->all();
        $input['updated_by'] = $request->user()->_id;
        $cms_page = Cms::find($request->_id);

        if ($request->file()) {
            if($cms_page->image_path!=null){
                $path = str_replace('/storage', '', $cms_page->image_path);
                Storage::disk('public')->delete($path);
            }
            $fileName_1 = time() . '_' . $request->image->getClientOriginalName();
            $filePath_1 = $request->file('image')->storeAs('cms_pages/'.$input['page_type'], $fileName_1, 'public');
            $image_1 = $fileName_1;
            $image_path_1 = '/storage/' . $filePath_1;
            $input['image'] = $image_1;
            $input['image_path'] = $image_path_1;
        }

        if(!isset($input['left_side']) &&(isset($cms_page['left_side']))){
            $input['left_side']='off';
        }
        if(!isset($input['right_side']) &&(isset($cms_page['right_side']))){
            $input['right_side']='off';
        }
        if(!isset($input['bottom_side']) &&(isset($cms_page['bottom_side']))){
            $input['bottom_side']='off';
        }

        $cms_page->update($input);
        if($input['status'] == '1' && $input['page_type'] != 'faq'){
            Cms::where('_id','!=',$request->_id)->where('page_type',$input['page_type'])->update(['status'=>'0']);
        }

                return redirect()->route('admin.'.$request->segment(2))
                    ->with('success','Page updated successfully');
        

    }

    public function destroyCompanyInfo(Request $request){
    	Cms::where('_id',$request->_id)->delete();
        // BlogSubcategory::where('category_id',$request->_id)->delete();
        return redirect()->back()->with('success','Page deleted successfully');
    }

    public function statusChangeCompanyInfo(Request $request){
        foreach($request->user_id as $user_id){
            $sucess= Cms::where('_id',$user_id)->update(['status'=>$request->status]);
            if($request->page_type != 'faq'){
                Cms::where('_id','!=',$user_id)->where('page_type',$request->page_type)->update(['status'=>'0']);
            }
        }
        if($sucess){
            echo 'yes';
        }
    }

    /**
    **Company Info
    **/
    public function indexPageBranch(Request $request){
    	$data = Cms::query();
        $data->where('page_type', $request->segment(2));
        if($request->segment(3)){
            $data->where(str_replace('-', '_',$request->segment(3)),'on');
        }
        if(isset($request->page_info) && ($request->page_info!='')) {
            $data->where('_id', $request->page_info);
        }
        if(isset($request->status) && ($request->status!='')) {
            $data->where('status', $request->status);
        }
        $query = $data->orderBy('_id','DESC')->get();
        $pages_info = Cms::where('page_type', $request->segment(2))->where(str_replace('-', '_',$request->segment(3)),'on')->get();
        return view('admin.cms.pages.index', compact('pages_info', 'query'));
    }

    public function createPageBranch(){
    	return view('admin.cms.pages.create');
    }

    public function storePageBranch(Request $request){
    	$request->validate([
            'title' => 'required',
            'status' => 'required',
            'description' => 'required',
            // 'image' => 'required|mimes:jpeg,jpg,png|max:2048'
        ]);

        $input = $request->all();
        if ($request->file()) {
            $fileName_1 = time() . '_' . $request->image->getClientOriginalName();
            $filePath_1 = $request->file('image')->storeAs('cms_pages/'.$input['page_type'], $fileName_1, 'public');
            $image_1 = $fileName_1;
            $image_path_1 = '/storage/' . $filePath_1;
            $input['image'] = $image_1;
            $input['image_path'] = $image_path_1;
        }
        $input['created_by'] = $request->user()->_id;
        $cms_page = Cms::create($input);
        if($input['status'] == '1' && $input['page_type'] != 'faq'){
            Cms::where('_id','!=',$cms_page->_id)->where('page_type',$input['page_type'])->update(['status'=>'0']);
        }
        if($request->segment(3)){ 
            return redirect()->route('admin.'.$request->segment(2).'.'.$request->segment(3))
                ->with('success','Page created successfully');
        }else{
            return redirect()->route('admin.'.$request->segment(2))
                    ->with('success','Page created successfully');
        }
    }

    public function editPageBranch($id){
    	$page = Cms::find($id);
        if($page!=null){
            return view('admin.cms.pages.edit',compact('page'));
        }
        return abort(404);
    }

    public function updatePageBranch(Request $request){
    	$request->validate([
            'title' => 'required'
        ]);
        $input = $request->all();
        $input['updated_by'] = $request->user()->_id;
        $cms_page = Cms::find($request->_id);

        if ($request->file()) {
            if($cms_page->image_path!=null){
                $path = str_replace('/storage', '', $cms_page->image_path);
                Storage::disk('public')->delete($path);
            }
            $fileName_1 = time() . '_' . $request->image->getClientOriginalName();
            $filePath_1 = $request->file('image')->storeAs('cms_pages/'.$input['page_type'], $fileName_1, 'public');
            $image_1 = $fileName_1;
            $image_path_1 = '/storage/' . $filePath_1;
            $input['image'] = $image_1;
            $input['image_path'] = $image_path_1;
        }

        $cms_page->update($input);
        if($input['status'] == '1' && $input['page_type'] != 'faq'){
            Cms::where('_id','!=',$request->_id)->where('page_type',$input['page_type'])->update(['status'=>'0']);
        }
        if($request->segment(3)){
                return redirect()->route('admin.'.$request->segment(2).'.'.$request->segment(3))
                    ->with('success','Page updated successfully');
        }else{
        return redirect()->route('admin.'.$request->segment(2))
            ->with('success','Page updated successfully');
        }

    }

    public function destroyPageBranch(Request $request){
    	Cms::where('_id',$request->_id)->delete();
        // BlogSubcategory::where('category_id',$request->_id)->delete();
        return redirect()->back()->with('success','Page deleted successfully');
    }

    public function statusChangePageBranch(Request $request){
        foreach($request->user_id as $user_id){
            $sucess= Cms::where('_id',$user_id)->update(['status'=>$request->status]);
            if($request->page_type != 'faq'){
                Cms::where('_id','!=',$user_id)->where('page_type',$request->page_type)->update(['status'=>'0']);
            }
        }
        if($sucess){
            echo 'yes';
        }
    }
}

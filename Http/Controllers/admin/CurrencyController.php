<?php
    
namespace App\Http\Controllers\Admin;
    
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Http\Controllers\Controller;
use Validator;
use Auth;
use DB;
use App\Currency;
    
class CurrencyController extends Controller
{
    
    public function index(Request $request)
    {
        $data = Currency::query();
        if(isset($request->currency) && ($request->currency!='')) {
            $data->where('_id', $request->currency);
        }
        $query = $data->orderBy('_id','DESC')->get();
        $currencies = Currency::all();
        return view('admin.currency.index', compact('currencies', 'query'));
    }
    
    public function addCurrency(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|unique:currencies,name|max:3|regex:/^(?=.*[A-Z]).+$/',
            'symbol' => 'required',
        ]);

        $input = $request->all();
        $currency = new Currency();
        $currency->name = $request->name;
        $currency->symbol = $request->symbol;
        $currency->is_default = '0';
        $currency->status = $request->status;
        $currency->created_by = Auth::user()->id;
        $currency->save();
        return redirect()->back()->with('success','Currency added successfully');
    }

     public function edit($id)
    { 
        $currency = Currency::find($id);    
        return view('admin.currency.edit',compact('currency'));
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);
        $input = $request->all();
        $currency = Currency::find($request->id);
        $currency->update($input);    
        return redirect()->route('admin.currency')
                        ->with('success','Currency updated successfully');
    }

    public function baseCurrency(Request $request)
    {
        $request = Currency::find($request->id);
        $request->is_default = 1;
        $request->save();

        DB::table('currencies')->where('_id','!=', $request->id)->update(array('is_default' => 0));
        return redirect()->back()->with('success','This is now your base currency');
    }

    public function destroy(Request $request)
    {
        DB::table("currencies")->where('_id',$request->id)->delete();
        return redirect()->back()->with('success','Currency deleted successfully');
    }
}
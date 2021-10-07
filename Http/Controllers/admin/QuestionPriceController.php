<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\QuestionPrice;
use App\AskquestionUser;
use App\Traits\MailTrait;

class QuestionPriceController extends Controller
{
    use MailTrait;

    public function index(Request $request)
    {
        $data = QuestionPrice::query();
        $query = $data->orderBy('_id','DESC')->get();
        return view('admin.settings.question_price.index', compact('query'));
    }

    public function create()
    {   
        return view('admin.settings.question_price.create');
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'no_of_question' => 'required|integer|unique:question_prices',
            'regular_price_inr' => 'required|numeric|min:0',
            'regular_price_usd' => 'required|numeric|min:0',
        ]);
        
        $input = $request->all();
        QuestionPrice::create($input);
        return redirect()->route('admin.questions-price.index')
                        ->with('success','QuestionPrice created successfully');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'no_of_question' => 'required|integer|unique:question_prices,'.$id,
            'regular_price_inr' => 'required|numeric|min:0',
            'regular_price_usd' => 'required|numeric|min:0',
        ]);
        $input = $request->all();
        // $data['no_of_question'] = $input['no_of_question'];
        // $data['price'] = $input['price'];
        $question_prices = QuestionPrice::find($id);
        $question_prices->update($input);    
        return redirect()->route('admin.questions-price.index')
                        ->with('success','QuestionPrice updated successfully');
    }

    public function edit($id)
    { 
        $question_prices = QuestionPrice::find($id);    
        return view('admin.settings.question_price.edit',compact('question_prices'));
    }

    public function destroy($id)
    {
        $question_prices = QuestionPrice::where('_id',$id)->delete();
        return redirect()->back()->with('success','QuestionPrice deleted successfully');
    }

    public function userList(Request $request){
        $data = AskquestionUser::query();
        $query = $data->orderBy('_id','DESC')->get();
        return view('admin.ask_question_users.index', compact('query'));
    }

    public function reply($id, Request $request){
        $data = AskquestionUser::where('_id',$id)->first();
        return view('admin.ask_question_users.reply', compact('data'));
    }

    public function replyUpdate(Request $request)
    {
        if(isset($request->replayquestion1)){
            $request->validate([
                'replayquestion1' => 'required'
            ]);
        }
        if(isset($request->replayquestion2)){
            $request->validate([
                'replayquestion2' => 'required'
            ]);
        }
        if(isset($request->replayquestion3)){
            $request->validate([
                'replayquestion3' => 'required'
            ]);
        }
        $input = $request->all();
        $input['reply_status'] = '1';
        $question_prices = AskquestionUser::find($request->_id);
        $question_prices->update($input);
        if(isset($request->replayquestion1) || isset($request->replayquestion2) || isset($request->replayquestion3)){
            $this->questionReplyMail($question_prices);
        }   
        return redirect()->route('admin.questions.reply',[$request->_id])
                        ->with('success','Question replied successfully');
    }

}

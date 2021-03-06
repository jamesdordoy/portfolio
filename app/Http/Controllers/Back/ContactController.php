<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use JamesDordoy\LaravelVueDatatable\Http\Resources\DataTableCollectionResource;

class ContactController extends Controller
{
    /**
     * GET show data.
     *
     * @param Request $request
     */
    public function index(Request $request)
    {
        $limit = $request->input('length');
        $index = $request->input('column');
        $orderBy = $request->input('dir', 'asc');
        $search = $request->input('search');

        return new DataTableCollectionResource(
            Contact::eloquentQuery($index, $orderBy, $search)->paginate($limit)
        );
    }
}

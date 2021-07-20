import { MongoClient } from "mongodb";

import {Request , Response} from "express";

let search_faceted = async (req:Request , res:Response , next: Function) => {

    try {
        
        res.status(200).json({message: " faceted search"});
   
      } catch (e) {
        
   
    }
}



let simple_search = async (req:Request , res:Response , next: Function) => {

    try {

        res.status(200).json({message: " simple search"});
        
    } catch (e) {
        
    }


}



let autocomplete_search = async (req:Request , res:Response , next: Function) => {

    try {

        res.status(200).json({message: "autocomplete search"});
        
    } catch (e) {
        
    }
    


}


export default {search_faceted , simple_search, autocomplete_search}

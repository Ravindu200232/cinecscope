// import { MOVIES } from "@/lib/data";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

//Our first GET API ROUTE
export const GET = async()=>{
    try{
        // const res = "http://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=en-US&page=1"
        const movies = await db.collection("movies").find({}).limit(50).toArray();
        return NextResponse.json(movies, {status: 200}) 
    }catch(error){

        console.log("Error fetching movies",error)

        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}


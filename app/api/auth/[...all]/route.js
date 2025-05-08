import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";
 
export const { POST, GET } = toNextJsHandler(auth);

//auth/[...all]/route.js-Designated for handling all auth routes
//this will handle all requests to /api/auth/*
//and will be passed to auth handler


import { Client } from "appwrite";
import { Databases } from "appwrite";
import { Query } from "appwrite";
import {ID} from 'appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client ()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    
    // use appwrite  to check if a searchterm exists in the database and update the count.

    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm )
        ])

        if (result.documents.length > 0){
            const doc = result.documents[0]

            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count+1
            })
        } else {
            // create new record
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            })
        }
    } catch(error) {
        console.log(error)
        throw new Error("Error updating your database.")
    }
    
}

export const getTrendingMovies = async () => {
    try {
        const trendingMovies = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(10),
            Query.orderDesc('count')
        ])

        return trendingMovies.documents
    } catch(error) {
        console.log(error) 
        throw new error("Error updating the database.") 
    }
}
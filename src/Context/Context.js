import { createContext, useContext, useState,useEffect, useReducer} from "react";
import {collection, query, onSnapshot,doc,} from "firebase/firestore"
import { db,auth} from '../firebase-config';
import { cartReducer } from "./Reducer";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";


export const Carts = createContext();

const Context = ({ children }) => {
 
 
  
 const[user,setUser]=useState(null);
    const[content,setContent]=useState([])
    const[role,setRole]=useState([])
    

    useEffect(() => {
      const q = query(collection(db, "customer"));
      const unsub = onSnapshot(q, (querySnapshot) => {
        let empArray = [];
        
        querySnapshot.forEach((doc) => {
          empArray.push({ ...doc.data(), id: doc.id });
        });
        // console.log(empArray)
        setContent(empArray);
      });
      return () => unsub();
    }, []);

    
    useEffect(() => {
      if (user) {
        const customerRef = doc(db, "customer", user?.uid);
        var unsubscribe = onSnapshot(customerRef, (data) => {
          if (data.exists()) {
           
            // console.log('someeee',data.data());
            setRole(data.data())
           
          } else {
            console.log("No Items in Watchlist");
          }
        });
  
        return () => {
          unsubscribe();
        };
      }
    }, [user]);
  

  


    

useEffect(()=>{
  onAuthStateChanged(auth,user=>{
    if (user) setUser(user);
    else setUser(null);
  });
})
   
// const query = collection(db,`customer/${user.uid}/order`);
// const [docs, loading, error] = useCollectionData(query);


    const [state, dispatch] = useReducer(cartReducer,  []);     
   

  return (
    <Carts.Provider value={{ state, dispatch,content,user,role}}>
      {children}
    </Carts.Provider>
  );
};

export const CartState = () => {
  return useContext(Carts);
};


export default Context;
import { createContext, useContext, useState,useEffect, useReducer} from "react";
import {collection, query, onSnapshot,doc,} from "firebase/firestore"
import { db,auth} from '../firebase-config';
import { cartReducer } from "./Reducer";
import {  onAuthStateChanged } from "firebase/auth";



export const Carts = createContext();

const Context = ({ children }) => {
 
 
  
 const[user,setUser]=useState(null);
    const[content,setContent]=useState([])
    const[role,setRole]=useState([])
    const[vendor,setVendor]=useState([])
    const[prod,setProd]=useState([])
    const[singleVendor,setSingleVendor]=useState([])
    const [prodName, setProdName] = useState([]);
   
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
            console.log("No customer");
          }
        });
  
        return () => {
          unsubscribe();
        };
      }
    }, [user]);

    useEffect(() => {
      const q = query(collection(db, "vendor"));
      const unsub = onSnapshot(q, (querySnapshot) => {
        let empArray = [];
        
        querySnapshot.forEach((doc) => {
          empArray.push({ ...doc.data(), id: doc.id });
        });
        // console.log(empArray)
        setVendor(empArray);
      });
      return () => unsub();
    }, []);


    useEffect(() => {
      if (user) {
        const vendorRef = doc(db, "vendor", user?.uid);
        var unsubscribe = onSnapshot(vendorRef, (data) => {
          if (data.exists()) {
           
            // console.log('someeee',data.data());
            setSingleVendor(data.data())
           
          } else {
            console.log("No vender");
          }
        });
  
        return () => {
          unsubscribe();
        };
      }
    }, [user]);
  

    useEffect(() => {
      const q = query(collection(db, "items"));
      const unsub = onSnapshot(q, (querySnapshot) => {
        let empArray = [];
        
        querySnapshot.forEach((doc) => {
          empArray.push({ ...doc.data(), id: doc.id });
        });
        // console.log(empArray)
        setProd(empArray);
      });
      return () => unsub();
    }, []);

// console.log(prod);
    

useEffect(()=>{
  onAuthStateChanged(auth,user=>{
    if (user) setUser(user);
    else setUser(null);
  });
})
   
// const query = collection(db,`customer/${user.uid}/order`);
// const [docs, loading, error] = useCollectionData(query);
console.log('abc',vendor);

    const [state, dispatch] = useReducer(cartReducer,  []);     
   

  return (
    <Carts.Provider value={{ state, dispatch,content,user,role,singleVendor,vendor,prod,prodName,setProdName}}>
      {children}
    </Carts.Provider>
  );
};

export const CartState = () => {
  return useContext(Carts);
};


export default Context;
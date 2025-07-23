/*

no need to use context here because this are just functions but we do have to import useAuth to get tokens
*/

import {useAuth} from "../../store/userAuth.js"

const[loading, setLoading] = useState(false);

const {token} = useAuth();

console.log(token)
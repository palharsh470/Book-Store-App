import { StarIcon } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

export default function StarRating({count, setisrated, israted}) {
    const handleRating =()=>{
        const newrating = [0,0,0,0,0,0]
        for(let i=1;i<=count;i++)
         newrating[i]=1;

        setisrated(newrating)
    }
    return (
        <TouchableOpacity onPress={handleRating}>
 
            <StarIcon size={32} color="#6a6338ff" weight={israted[count] ? "fill" : "bold"} />
        </TouchableOpacity>
    )
}
import { useGetUsersQuery} from "../../../../redux/api/users"
import PrimaryCard from "./PrimaryCard";


const RealTimeCard = () => {
  const { data: visitors } = useGetUsersQuery();

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400 uppercase tracking-wide"> Realtime </p>

          <h2 className="text-3xl font-bold text-white mt-2"> {visitors?.length || 0} </h2>

          <p className="text-sm text-teal-400 mt-2"> ● Live Updates </p>
        </div>

      </div>

      <div className="mt-6"> <PrimaryCard /> </div>
    </div>
  );
};

export default RealTimeCard
import { useRouter } from "next/router";
import AuthRoute from "../../../contexts/authRoute";
import DashboardLayout from "../../../components/Dashboard/Main/DashboardLayout";

export default function MainProfile({ session }) {
  const router = useRouter();
  return (
    <AuthRoute>
      <DashboardLayout session={session} title="Profile">
        <div className="text-black border-r-2 h-full w-[55%] flex flex-col overflow-hidden">
          <div className="px-6 py-6 font-bold text-lg  border-b-2 flex flex-row items-center">
            <div className="p-0.5">Your emotes</div>
          </div>
          <div className="w-full flex flex-col p-6">
            You have not uploaded emotes yet.
          </div>
        </div>

        <div className="text-black bg-border-white h-full w-1/4 flex flex-col">
          <div className="px-6 py-5 flex flex-row items-center justify-center ">
            <div className="font-bold text-accent-purple  px-6 py-2 rounded-2xl  text-lg">
              Your emote sets
            </div>
          </div>
          <div className="w-full overflow-y-auto h-full p-6 flex flex-col space-y-3">
            <div className="space-x-1 flex flex-row p-6 items-center justify-center bg-white w-full rounded-2xl">
              <div className="flex flex-col mr-auto w-full">
                <div className="font-semibold py-1">dope&apos;s set</div>
                <div className="border-2 font-normal w-max px-3 py-0.5 rounded-3xl">
                  Owner
                </div>
              </div>
              <div className="ml-auto flex px-4 py-1 text-darker-purple border-2 font-bold cursor-pointer hover:bg-darker-purple hover:text-white duration-300 hover:border-darker-purple rounded-3xl">
                Edit
              </div>
              <div className="ml-auto flex px-4 py-1 text-darker-purple border-2 font-bold cursor-pointer hover:bg-darker-purple hover:text-white duration-300 hover:border-darker-purple rounded-3xl">
                Settings
              </div>
            </div>
            <div className="space-x-1 flex flex-row p-6 items-center justify-center bg-white w-full rounded-2xl">
              <div className="flex flex-col mr-auto w-full">
                <div className="font-semibold py-1">Ramee&apos;s set</div>
                <div className="border-2 font-normal w-max px-3 py-0.5 rounded-3xl">
                  Editor
                </div>
              </div>
              <div className="ml-auto flex px-4 py-0.5 text-darker-purple border-2 font-bold cursor-pointer hover:bg-darker-purple hover:text-white duration-300 hover:border-darker-purple rounded-3xl">
                Edit
              </div>
            </div>
            <div className="space-x-1 flex flex-row p-6 items-center justify-center bg-white w-full rounded-2xl">
              <div className="flex flex-col mr-auto w-full">
                <div className="font-semibold py-1">Rated&apos;s set</div>
                <div className="border-2 font-normal w-max px-3 py-0.5 rounded-3xl">
                  Editor
                </div>
              </div>
              <div className="ml-auto flex px-4 py-0.5 text-darker-purple border-2 font-bold cursor-pointer hover:bg-darker-purple hover:text-white duration-300 hover:border-darker-purple rounded-3xl">
                Edit
              </div>
            </div>
            <div className="space-x-1 flex flex-row p-6 items-center justify-center bg-white w-full rounded-2xl">
              <div className="flex flex-col mr-auto w-full">
                <div className="font-semibold py-1">Vader&apos;s set</div>
                <div className="border-2 font-normal w-max px-3 py-0.5 rounded-3xl">
                  Editor
                </div>
              </div>
              <div className="ml-auto flex px-4 py-0.5 text-darker-purple border-2 font-bold cursor-pointer hover:bg-darker-purple hover:text-white duration-300 hover:border-darker-purple rounded-3xl">
                Edit
              </div>
            </div>
            <div className="space-x-1 flex flex-row p-6 items-center justify-center bg-white w-full rounded-2xl">
              <div className="flex flex-col mr-auto w-full">
                <div className="font-semibold py-1">Vader&apos;s set</div>
                <div className="border-2 font-normal w-max px-3 py-0.5 rounded-3xl">
                  Editor
                </div>
              </div>
              <div className="ml-auto flex px-4 py-0.5 text-darker-purple border-2 font-bold cursor-pointer hover:bg-darker-purple hover:text-white duration-300 hover:border-darker-purple rounded-3xl">
                Edit
              </div>
            </div>
            <div className="space-x-1 flex flex-row p-6 items-center justify-center bg-white w-full rounded-2xl">
              <div className="flex flex-col mr-auto w-full">
                <div className="font-semibold py-1">Vader&apos;s set</div>
                <div className="border-2 font-normal w-max px-3 py-0.5 rounded-3xl">
                  Editor
                </div>
              </div>
              <div className="ml-auto flex px-4 py-0.5 text-darker-purple border-2 font-bold cursor-pointer hover:bg-darker-purple hover:text-white duration-300 hover:border-darker-purple rounded-3xl">
                Edit
              </div>
            </div>
          </div>
          <div className="border-t-2 px-6 py-6 flex flex-row items-center justify-center bg-white font-bold text-accent-purple text-lg hover:bg-darker-purple duration-300 cursor-pointer hover:text-white border-0">
            Request access to emote sets
          </div>
        </div>
      </DashboardLayout>
    </AuthRoute>
  );
}

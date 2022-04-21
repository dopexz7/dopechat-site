import { useEffect, useState } from "react";
import useHasEdits from "../../../../funcs/useHasEdits";
import { useAuth } from "../../../../contexts/AppContext";
import EditorSet from "./EditorSet";

export default function YourEmoteSets(props) {
  const [editingSet, setEditingSet] = useState("");
  const { user } = useAuth();
  const availEdits = useHasEdits(user?.user_metadata.name);

  const passProps = (d) => {
    setEditingSet(d);
    props.onSuccess(d);
  };
  useEffect(() => {
    console.log(availEdits);
  });

  return (
    <div className="text-black bg-border-white h-full w-1/4 flex flex-col">
      <div className="px-6 py-5 flex flex-row items-center justify-center ">
        <div className="font-normal text-accent-purple  px-6 py-2 text-lg">
          You can edit {availEdits ? availEdits.length : "no"} emote sets
        </div>
      </div>
      <div className="w-full overflow-y-auto h-full p-6 flex flex-col space-y-3 justify-center">
        {availEdits &&
          availEdits
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((data, index) => (
              <EditorSet
                key={index}
                data={data}
                passProps={passProps}
                editingSet={editingSet}
              />
            ))}
      </div>
    </div>
  );
}

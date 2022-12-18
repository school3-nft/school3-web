import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getIsAdmin, getTokensByUid } from "../utils/firebase.util";
import AddTokenDialog from "./add-token-dialog.component";
import TokenFC from "./token.component";
import Button from "./button.component";
import { User } from "../utils/types.util";
import { useUser } from "../hooks/use-user.hook";

type Props = {
  profileUser: User;
};

export default function UserTokens({ profileUser }: Props) {
  const { uid } = profileUser;
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [canMintToken, setCanMintToken] = useState(false);

  const {
    user: { uid: clientUid },
  } = useUser();

  const {
    data: tokens,
    isFetching,
    isLoading,
  } = useQuery([uid, "tokens"], () => getTokensByUid(uid));

  useEffect(() => {
    if (clientUid !== "loading")
      getIsAdmin(clientUid).then((result) =>
        setCanMintToken(uid === clientUid && result)
      );
  }, [clientUid]);

  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center">
        <Button className="px-8 mb-4" onClick={() => setIsOpenDialog(true)}>
          Add Token
        </Button>
        {!!tokens && (
          <div>
            {tokens!.map((token, idx) => (
              <TokenFC key={idx} token={token} />
            ))}
          </div>
        )}
      </div>
      <AddTokenDialog
        isOpen={isOpenDialog}
        close={() => setIsOpenDialog(false)}
        profileUser={profileUser}
      />
    </>
  );
}
